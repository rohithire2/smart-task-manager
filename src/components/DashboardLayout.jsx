import {
  BarChart3,
  CheckSquare,
  ClipboardList,
  LogOut,
  Search,
  Settings,
  Users,
} from 'lucide-react'

function DashboardLayout({ user, onLogout, alert, children }) {
  const navItems =
    user.role === 'admin'
      ? [
          { label: 'Overview', icon: BarChart3 },
          { label: 'Tasks', icon: ClipboardList },
          { label: 'Team', icon: Users },
        ]
      : [
          { label: 'My Tasks', icon: ClipboardList },
          { label: 'Completed', icon: CheckSquare },
          { label: 'Search', icon: Search },
        ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="d-flex align-items-center gap-2 mb-4">
          <span className="brand-mark brand-mark-sm">
            <CheckSquare size={22} />
          </span>
          <div>
            <h2 className="h5 mb-0">Smart Task</h2>
            <small className="text-secondary">Management</small>
          </div>
        </div>

        <nav className="nav flex-column gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <a className="nav-link activeish" href="#dashboard" key={item.label}>
                <Icon size={18} />
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <a className="nav-link" href="#settings">
            <Settings size={18} />
            Settings
          </a>
          <button className="btn btn-outline-light w-100 mt-3" type="button" onClick={onLogout}>
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      <div className="content-shell">
        <header className="topbar">
          <div>
            <p className="text-uppercase text-primary fw-semibold small mb-1">
              {user.role === 'admin' ? 'Admin Workspace' : 'Employee Workspace'}
            </p>
            <h1 className="h3 fw-bold mb-0">Welcome, {user.name}</h1>
          </div>
          <span className="badge rounded-pill text-bg-light text-capitalize px-3 py-2">
            {user.role}
          </span>
        </header>

        {alert && <div className={`alert alert-${alert.type} mx-3 mx-lg-4 mt-3`}>{alert.message}</div>}

        <main id="dashboard" className="dashboard-main">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
