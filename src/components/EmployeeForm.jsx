import { useState } from 'react'
import { UserPlus } from 'lucide-react'

const emptyEmployee = {
  name: '',
  email: '',
  password: '',
}

function EmployeeForm({ employees, onAddEmployee }) {
  const [form, setForm] = useState(emptyEmployee)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const added = onAddEmployee(form)

    if (added) {
      setForm(emptyEmployee)
    }
  }

  return (
    <section className="panel">
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="mini-icon text-bg-primary">
          <UserPlus size={18} />
        </span>
        <h2 className="h5 fw-bold mb-0">Add employee</h2>
      </div>

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12 col-lg-4">
          <label className="form-label" htmlFor="employee-name">
            Name
          </label>
          <input
            className="form-control"
            id="employee-name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Employee name"
            required
          />
        </div>
        <div className="col-12 col-lg-4">
          <label className="form-label" htmlFor="employee-email">
            Email
          </label>
          <input
            className="form-control"
            id="employee-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@company.com"
            required
          />
        </div>
        <div className="col-12 col-lg-3">
          <label className="form-label" htmlFor="employee-password">
            Password
          </label>
          <input
            className="form-control"
            id="employee-password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Set password"
            minLength="6"
            required
          />
        </div>
        <div className="col-12 col-lg-1 d-grid">
          <label className="form-label d-none d-lg-block">&nbsp;</label>
          <button className="btn btn-primary" type="submit" title="Add employee">
            <UserPlus size={18} />
          </button>
        </div>
      </form>

      <div className="employee-list mt-3">
        {employees.map((employee) => (
          <div className="employee-chip" key={employee.id}>
            <span>{employee.name}</span>
            <small>{employee.email}</small>
          </div>
        ))}
      </div>
    </section>
  )
}

export default EmployeeForm
