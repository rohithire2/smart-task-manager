import { useMemo, useState } from 'react'
import { filterAndSortTasks, getTaskStats } from '../utils/taskUtils'
import EmployeeForm from './EmployeeForm'
import SummaryCards from './SummaryCards'
import TaskCharts from './TaskCharts'
import TaskControls from './TaskControls'
import TaskDetails from './TaskDetails'
import TaskForm from './TaskForm'
import TaskTable from './TaskTable'

function TaskDashboard({
  currentUser,
  employees,
  tasks,
  onAddEmployee,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onCompleteTask,
}) {
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    sortBy: 'deadline',
  })
  const [editingTask, setEditingTask] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const isAdmin = currentUser.role === 'admin'

  const visibleTasks = useMemo(() => {
    const scopedTasks = isAdmin
      ? tasks
      : tasks.filter((task) => task.assignedEmployee === currentUser.id)

    return filterAndSortTasks(scopedTasks, filters)
  }, [currentUser.id, filters, isAdmin, tasks])

  const stats = useMemo(() => getTaskStats(visibleTasks), [visibleTasks])

  return (
    <>
      <div className="dashboard-stack">
        <SummaryCards stats={stats} />
        <TaskCharts tasks={visibleTasks} />
        {isAdmin && <EmployeeForm employees={employees} onAddEmployee={onAddEmployee} />}

        <div className="row g-3 align-items-start">
          {isAdmin && (
            <div className="col-12 col-xl-4">
              <TaskForm
                key={editingTask?.id || 'new-task'}
                employees={employees}
                editingTask={editingTask}
                onCreateTask={onCreateTask}
                onUpdateTask={onUpdateTask}
                onCancelEdit={() => setEditingTask(null)}
              />
            </div>
          )}
          <div className={isAdmin ? 'col-12 col-xl-8' : 'col-12'}>
            <div className="dashboard-stack">
              <TaskControls filters={filters} onChange={setFilters} isAdmin={isAdmin} />
              <TaskTable
                tasks={visibleTasks}
                employees={employees}
                isAdmin={isAdmin}
                onEditTask={setEditingTask}
                onDeleteTask={onDeleteTask}
                onCompleteTask={onCompleteTask}
                onSelectTask={setSelectedTask}
              />
            </div>
          </div>
        </div>
      </div>

      <TaskDetails task={selectedTask} employees={employees} onClose={() => setSelectedTask(null)} />
    </>
  )
}

export default TaskDashboard
