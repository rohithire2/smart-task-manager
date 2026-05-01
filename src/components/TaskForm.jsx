import { useState } from 'react'

const emptyTask = {
  title: '',
  description: '',
  priority: 'medium',
  deadline: '',
  assignedEmployee: '',
}

function TaskForm({ employees, editingTask, onCreateTask, onUpdateTask, onCancelEdit }) {
  const [form, setForm] = useState(() => {
    if (editingTask) {
      return {
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        deadline: editingTask.deadline,
        assignedEmployee: editingTask.assignedEmployee,
      }
    }

    return { ...emptyTask, assignedEmployee: employees[0]?.id || '' }
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (editingTask) {
      onUpdateTask(editingTask.id, form)
      onCancelEdit()
      return
    }

    onCreateTask(form)
    setForm({ ...emptyTask, assignedEmployee: employees[0]?.id || '' })
  }

  return (
    <section className="panel">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="h5 fw-bold mb-0">{editingTask ? 'Edit task' : 'Create task'}</h2>
        {editingTask && (
          <button className="btn btn-sm btn-outline-secondary" type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            className="form-control"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="priority">
            Priority
          </label>
          <select
            className="form-select"
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label" htmlFor="deadline">
            Deadline
          </label>
          <input
            className="form-control"
            id="deadline"
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="assignedEmployee">
            Assigned employee
          </label>
          <select
            className="form-select"
            id="assignedEmployee"
            name="assignedEmployee"
            value={form.assignedEmployee}
            onChange={handleChange}
            required
          >
            {employees.map((employee) => (
              <option value={employee.id} key={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-primary w-100" type="submit">
            {editingTask ? 'Save changes' : 'Assign task'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default TaskForm
