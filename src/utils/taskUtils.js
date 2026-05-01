export const priorityWeight = {
  high: 1,
  medium: 2,
  low: 3,
}

export function getEmployeeName(employees, employeeId) {
  return employees.find((employee) => employee.id === employeeId)?.name || 'Unassigned'
}

export function getTaskStats(tasks) {
  const completed = tasks.filter((task) => task.status === 'completed').length
  const pending = tasks.filter((task) => task.status === 'pending').length

  return {
    total: tasks.length,
    completed,
    pending,
  }
}

export function filterAndSortTasks(tasks, { status, search, sortBy }) {
  const query = search.trim().toLowerCase()

  return [...tasks]
    .filter((task) => status === 'all' || task.status === status)
    .filter((task) => {
      if (!query) return true
      return [task.title, task.description, task.priority, task.status]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        return priorityWeight[a.priority] - priorityWeight[b.priority]
      }

      return new Date(a.deadline) - new Date(b.deadline)
    })
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}
