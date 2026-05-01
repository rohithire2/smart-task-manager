import { X } from 'lucide-react'
import { formatDate, getEmployeeName } from '../utils/taskUtils'

function TaskDetails({ task, employees, onClose }) {
  if (!task) return null

  return (
    <div className="modal-backdrop-custom" role="presentation" onClick={onClose}>
      <article
        className="task-details shadow-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-details-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="btn btn-light icon-btn ms-auto" type="button" onClick={onClose}>
          <X size={18} />
        </button>
        <span className={`badge priority-${task.priority} mb-3`}>{task.priority}</span>
        <h2 className="h4 fw-bold" id="task-details-title">
          {task.title}
        </h2>
        <p className="text-secondary">{task.description}</p>

        <dl className="details-grid">
          <div>
            <dt>Assigned to</dt>
            <dd>{getEmployeeName(employees, task.assignedEmployee)}</dd>
          </div>
          <div>
            <dt>Deadline</dt>
            <dd>{formatDate(task.deadline)}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd className="text-capitalize">{task.status}</dd>
          </div>
          <div>
            <dt>Created</dt>
            <dd>{formatDate(task.createdAt)}</dd>
          </div>
        </dl>
      </article>
    </div>
  )
}

export default TaskDetails
