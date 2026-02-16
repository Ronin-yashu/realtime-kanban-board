import { useState } from 'react'
import Select from 'react-select'
import axios from 'axios'

function TaskForm({ onsubmit }) {
  const [title, settitle] = useState('')
  const [description, setdescription] = useState('')
  const [priority, setpriority] = useState({ value: 'medium', label: 'Medium' })
  const [category, setcategory] = useState({ value: 'feature', label: 'Feature' })
  const [file, setfile] = useState(null)
  const [uploading, setuploading] = useState(false)

  const priorityoptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ]

  const categoryoptions = [
    { value: 'bug', label: 'Bug' },
    { value: 'feature', label: 'Feature' },
    { value: 'enhancement', label: 'Enhancement' }
  ]

  const handlefilechange = (e) => {
    const selectedfile = e.target.files[0]
    if (selectedfile && selectedfile.size <= 5 * 1024 * 1024) {
      setfile(selectedfile)
    } else {
      alert('file size must be less than 5MB')
    }
  }

  const handlesubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim()) {
      alert('title is required')
      return
    }

    let filepath = null

    if (file) {
      setuploading(true)
      const formdata = new FormData()
      formdata.append('file', file)

      try {
        const response = await axios.post('http://localhost:3000/api/upload', formdata)
        filepath = response.data.path
      } catch (error) {
        console.log('file upload failed')
        setuploading(false)
        return
      }
      setuploading(false)
    }

    onsubmit({
      title,
      description,
      priority: priority.value,
      category: category.value,
      status: 'todo',
      file: filepath
    })

    settitle('')
    setdescription('')
    setpriority({ value: 'medium', label: 'Medium' })
    setcategory({ value: 'feature', label: 'Feature' })
    setfile(null)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
      <form onSubmit={handlesubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Enter task description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <Select
              value={priority}
              onChange={setpriority}
              options={priorityoptions}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <Select
              value={category}
              onChange={setcategory}
              options={categoryoptions}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attach File (Max 5MB)</label>
          <input
            type="file"
            onChange={handlefilechange}
            accept="image/*,.pdf"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          {file && <p className="text-sm text-gray-600 mt-1">{file.name}</p>}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {uploading ? 'Uploading...' : 'Create Task'}
        </button>
      </form>
    </div>
  )
}

export default TaskForm
