import { useMemo, useState } from 'react'
import { defaultUsers } from './data/seedData'
import { useLocalStorage } from './hooks/useLocalStorage'
import { notify } from './utils/notify'
import DashboardLayout from './components/DashboardLayout'
import Login from './components/Login'
import TaskDashboard from './components/TaskDashboard'

function App() {
  const [users, setUsers] = useLocalStorage('smartTaskUsersV2', defaultUsers)
  const [tasks, setTasks] = useLocalStorage('smartTaskTasksV2', [])
  const [currentUser, setCurrentUser] = useLocalStorage('smartTaskCurrentUserV2', null)
  const [alert, setAlert] = useState(null)

  const employees = useMemo(
    () => users.filter((user) => user.role === 'employee'),
    [users],
  )

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type })
    window.clearTimeout(window.smartTaskAlertTimer)
    window.smartTaskAlertTimer = window.setTimeout(() => setAlert(null), 2800)
  }

  const handleLogin = ({ email, password, role }) => {
    const user = users.find(
      (candidate) =>
        candidate.email.toLowerCase() === email.toLowerCase() &&
        candidate.password === password &&
        candidate.role === role,
    )

    if (!user) {
      showAlert('Invalid email, password, or role.', 'danger')
      return
    }

    const sessionUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }

    setCurrentUser(sessionUser)
    notify(`Welcome back, ${user.name}.`)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    showAlert('You have been signed out.', 'info')
  }

  const addEmployee = (employee) => {
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === employee.email.toLowerCase(),
    )

    if (emailExists) {
      showAlert('An employee or admin already uses that email.', 'danger')
      return false
    }

    setUsers((previous) => [
      ...previous,
      {
        ...employee,
        id: crypto.randomUUID(),
        role: 'employee',
      },
    ])
    showAlert('Employee added. They can now sign in.')
    notify('Employee added successfully.')
    return true
  }

  const createTask = (task) => {
    setTasks((previous) => [
      {
        ...task,
        id: crypto.randomUUID(),
        status: 'pending',
        createdAt: new Date().toISOString(),
      },
      ...previous,
    ])
    showAlert('Task created and assigned.')
    notify('Task created successfully.')
  }

  const updateTask = (taskId, updates) => {
    setTasks((previous) =>
      previous.map((task) => (task.id === taskId ? { ...task, ...updates } : task)),
    )
    showAlert('Task updated.')
    notify('Task updated.')
  }

  const deleteTask = (taskId) => {
    setTasks((previous) => previous.filter((task) => task.id !== taskId))
    showAlert('Task deleted.', 'warning')
    notify('Task deleted.')
  }

  const completeTask = (taskId) => {
    updateTask(taskId, {
      status: 'completed',
      completedAt: new Date().toISOString(),
    })
    showAlert('Task marked as completed.')
    notify('Nice work. Task completed.')
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} alert={alert} />
  }

  return (
    <DashboardLayout user={currentUser} onLogout={handleLogout} alert={alert}>
      <TaskDashboard
        currentUser={currentUser}
        employees={employees}
        tasks={tasks}
        onAddEmployee={addEmployee}
        onCreateTask={createTask}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
        onCompleteTask={completeTask}
      />
    </DashboardLayout>
  )
}

export default App
