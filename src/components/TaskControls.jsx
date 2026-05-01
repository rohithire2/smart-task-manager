import { Search } from 'lucide-react'

function TaskControls({ filters, onChange, isAdmin }) {
  const updateFilter = (name, value) => {
    onChange((previous) => ({ ...previous, [name]: value }))
  }

  return (
    <section className="panel">
      <div className="row g-3 align-items-end">
        <div className="col-12 col-lg-5">
          <label className="form-label" htmlFor="task-search">
            Search tasks
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <Search size={18} />
            </span>
            <input
              className="form-control"
              id="task-search"
              value={filters.search}
              onChange={(event) => updateFilter('search', event.target.value)}
              placeholder="Title, status, priority..."
            />
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <label className="form-label" htmlFor="status-filter">
            Status
          </label>
          <select
            className="form-select"
            id="status-filter"
            value={filters.status}
            onChange={(event) => updateFilter('status', event.target.value)}
          >
            <option value="all">{isAdmin ? 'All tasks' : 'All assigned'}</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <label className="form-label" htmlFor="sort-filter">
            Sort by
          </label>
          <select
            className="form-select"
            id="sort-filter"
            value={filters.sortBy}
            onChange={(event) => updateFilter('sortBy', event.target.value)}
          >
            <option value="deadline">Deadline</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
    </section>
  )
}

export default TaskControls
