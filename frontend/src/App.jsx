import { useState, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import io from 'socket.io-client'
import KanbanBoard from './components/KanbanBoard'
import TaskForm from './components/TaskForm'
import ProgressChart from './components/ProgressChart'

const socket = io('http://localhost:3000')

function App() {
  const [tasks, settasks] = useState([])
  const [showform, setshowform] = useState(false)

  useEffect(() => {
    socket.on('tasks:init', (initialtasks) => {
      settasks(initialtasks)
    })

    socket.on('task:created', (newtask) => {
      settasks(prev => [...prev, newtask])
    })

    socket.on('task:updated', (updatedtask) => {
      settasks(prev => prev.map(t => t.id === updatedtask.id ? updatedtask : t))
    })

    socket.on('task:moved', (data) => {
      settasks(prev => prev.map(t => 
        t.id === data.id ? { ...t, status: data.status } : t
      ))
    })

    socket.on('task:deleted', (taskid) => {
      settasks(prev => prev.filter(t => t.id !== taskid))
    })

    return () => {
      socket.off('tasks:init')
      socket.off('task:created')
      socket.off('task:updated')
      socket.off('task:moved')
      socket.off('task:deleted')
    }
  }, [])

  const createtask = (taskdata) => {
    socket.emit('task:create', taskdata)
    setshowform(false)
  }

  const updatetask = (id, updates) => {
    socket.emit('task:update', { id, updates })
  }

  const movetask = (id, status) => {
    socket.emit('task:move', { id, status })
  }

  const deletetask = (id) => {
    socket.emit('task:delete', id)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Kanban Board</h1>
            <button 
              onClick={() => setshowform(!showform)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {showform ? 'Cancel' : 'Add Task'}
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {showform && <TaskForm onsubmit={createtask} />}
          <ProgressChart tasks={tasks} />
          <KanbanBoard 
            tasks={tasks}
            onmovetask={movetask}
            onupdatetask={updatetask}
            ondeletetask={deletetask}
          />
        </div>
      </div>
    </DndProvider>
  )
}

export default App
