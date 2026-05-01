import { useState } from 'react'
import { CheckSquare } from 'lucide-react'

function Login({ onLogin, alert }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'admin',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const switchRole = (role) => {
    setForm((previous) => ({ ...previous, role }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin(form)
  }

  return (
    <main className="login-shell">
      <section className="login-panel shadow-lg">
        <div className="brand-mark mb-4">
          <CheckSquare size={28} />
        </div>
        <p className="text-uppercase text-primary fw-semibold small mb-2">Smart Task</p>
        <h1 className="display-6 fw-bold mb-3">Task Management Dashboard</h1>
        <p className="text-secondary mb-4">
          Sign in to manage tasks, assign work, and track progress.
        </p>

        {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}

        <div className="btn-group w-100 mb-4" role="group" aria-label="Role">
          <button
            type="button"
            className={`btn ${form.role === 'admin' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => switchRole('admin')}
          >
            Admin
          </button>
          <button
            type="button"
            className={`btn ${form.role === 'employee' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => switchRole('employee')}
          >
            Employee
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-control form-control-lg"
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 text-start">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-control form-control-lg"
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-primary btn-lg w-100" type="submit">
            Sign in
          </button>
        </form>

      </section>
    </main>
  )
}

export default Login
