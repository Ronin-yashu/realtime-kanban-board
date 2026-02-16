import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

function ProgressChart({ tasks }) {
  const data = [
    { name: 'To Do', value: tasks.filter(t => t.status === 'todo').length },
    { name: 'In Progress', value: tasks.filter(t => t.status === 'inprogress').length },
    { name: 'Done', value: tasks.filter(t => t.status === 'done').length }
  ]

  const colors = ['#3b82f6', '#f59e0b', '#10b981']

  const total = tasks.length
  const completed = tasks.filter(t => t.status === 'done').length
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Task Progress</h2>
      <div className="flex flex-col md:flex-row items-center justify-around">
        <div className="w-full md:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center mt-4 md:mt-0">
          <div className="text-5xl font-bold text-blue-600">{percentage}%</div>
          <div className="text-gray-600 mt-2">Completion Rate</div>
          <div className="mt-4 space-y-2">
            <div className="text-sm text-gray-600">
              Total Tasks: <span className="font-semibold">{total}</span>
            </div>
            <div className="text-sm text-gray-600">
              Completed: <span className="font-semibold text-green-600">{completed}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressChart
