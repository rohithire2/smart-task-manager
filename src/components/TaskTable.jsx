import { CheckCircle2, Eye, Pencil, Trash2 } from 'lucide-react'
import { formatDate, getEmployeeName } from '../utils/taskUtils'

function TaskTable({
  tasks,
  employees,
  isAdmin,
  onEditTask,
  onDeleteTask,
  onCompleteTask,
  onSelectTask,
}) {
  if (tasks.length === 0) {
    return (
      <section className="panel empty-state">
        <h2 className="h5 fw-bold">No tasks found</h2>
        <p className="text-secondary mb-0">Try changing the search, status, or sorting filters.</p>
      </section>
    )
  }

  return (
    <section className="panel">
      <div className="table-responsive">
        <table className="table align-middle task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Priority</th>
              <th>Deadline</th>
              {isAdmin && <th>Employee</th>}
              <th>Status</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <strong>{task.title}</strong>
                  <p className="text-secondary small mb-0">{task.description}</p>
                </td>
                <td>
                  <span className={`badge priority-${task.priority}`}>{task.priority}</span>
                </td>
                <td>{formatDate(task.deadline)}</td>
                {isAdmin && <td>{getEmployeeName(employees, task.assignedEmployee)}</td>}
                <td>
                  <span
                    className={`badge ${
                      task.status === 'completed' ? 'text-bg-success' : 'text-bg-warning'
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary icon-btn"
                      type="button"
                      onClick={() => onSelectTask(task)}
                      title="View details"
                    >
                      <Eye size={16} />
                    </button>
                    {isAdmin ? (
                      <>
                        <button
                          className="btn btn-sm btn-outline-primary icon-btn"
                          type="button"
                          onClick={() => onEditTask(task)}
                          title="Edit task"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger icon-btn"
                          type="button"
                          onClick={() => onDeleteTask(task.id)}
                          title="Delete task"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    ) : (
                      <button
                        className="btn btn-sm btn-success icon-btn"
                        type="button"
                        onClick={() => onCompleteTask(task.id)}
                        disabled={task.status === 'completed'}
                        title="Mark completed"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TaskTable
