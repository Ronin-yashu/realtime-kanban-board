import { useDrop } from 'react-dnd'
import TaskCard from './TaskCard'

function Column({ column, tasks, onmovetask, onupdatetask, ondeletetask }) {
  const [{ isover }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item) => {
      if (item.status !== column.status) {
        onmovetask(item.id, column.status)
      }
    },
    collect: (monitor) => ({
      isover: monitor.isOver()
    })
  }))

  const priorityorder = { high: 1, medium: 2, low: 3 }
  
  const sortedtasks = [...tasks].sort((a, b) => {
    return priorityorder[a.priority] - priorityorder[b.priority]
  })

  return (
    <div 
      ref={drop}
      className={`bg-gray-50 rounded-lg p-4 min-h-[500px] transition-colors ${
        isover ? 'bg-blue-50 border-2 border-blue-300' : 'border border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{column.title}</h2>
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {sortedtasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onupdatetask={onupdatetask}
            ondeletetask={ondeletetask}
          />
        ))}
      </div>
    </div>
  )
}

export default Column
