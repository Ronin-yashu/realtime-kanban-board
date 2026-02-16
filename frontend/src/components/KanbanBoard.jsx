import Column from './Column'

function KanbanBoard({ tasks, onmovetask, onupdatetask, ondeletetask }) {
  const columns = [
    { id: 'todo', title: 'To Do', status: 'todo' },
    { id: 'inprogress', title: 'In Progress', status: 'inprogress' },
    { id: 'done', title: 'Done', status: 'done' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {columns.map(column => (
        <Column
          key={column.id}
          column={column}
          tasks={tasks.filter(task => task.status === column.status)}
          onmovetask={onmovetask}
          onupdatetask={onupdatetask}
          ondeletetask={ondeletetask}
        />
      ))}
    </div>
  )
}

export default KanbanBoard
