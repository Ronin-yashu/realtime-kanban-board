import { useDrag } from 'react-dnd'
import { useState } from 'react'

function TaskCard({ task, onupdatetask, ondeletetask }) {
  const [isediting, setisediting] = useState(false)
  const [title, settitle] = useState(task.title)
  const [description, setdescription] = useState(task.description)

  const [{ isdragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isdragging: monitor.isDragging()
    })
  }))

  const prioritycolors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  }

  const categorycolors = {
    bug: 'bg-red-100 text-red-800',
    feature: 'bg-blue-100 text-blue-800',
    enhancement: 'bg-purple-100 text-purple-800'
  }

  const handleupdate = () => {
    onupdatetask(task.id, { title, description })
    setisediting(false)
  }

  if (isediting) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setdescription(e.target.value)}
          className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
          rows="3"
        />
        <div className="flex gap-2">
          <button onClick={handleupdate} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
            Save
          </button>
          <button onClick={() => setisediting(false)} className="px-3 py-1 bg-gray-300 rounded text-sm">
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={drag}
      className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition ${isdragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{task.title}</h3>
        <button onClick={() => ondeletetask(task.id)} className="text-red-500 hover:text-red-700">
          ×
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      <div className="flex gap-2 mb-2">
        <span className={`px-2 py-1 rounded text-xs ${prioritycolors[task.priority]}`}>
          {task.priority}
        </span>
        <span className={`px-2 py-1 rounded text-xs ${categorycolors[task.category]}`}>
          {task.category}
        </span>
      </div>
      {task.file && (
        <div className="mt-2">
          <a href={`https://kanban-backend-6mct.onrender.com${task.file}`} target="_blank" rel="noreferrer" className="text-blue-600 text-sm hover:underline">
            View File
          </a>
        </div>
      )}
      <button onClick={() => setisediting(true)} className="mt-2 text-sm text-blue-600 hover:underline">
        Edit
      </button>
    </div>
  )
}

export default TaskCard
