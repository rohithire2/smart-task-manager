# Smart Task Management Dashboard

A modern React + Vite task dashboard with role-based authentication, Bootstrap UI, Chart.js summaries, and localStorage persistence.

## Features

- Admin and Employee login roles
- localStorage-backed users, session, and tasks
- Admin employee creation plus task create, assign, edit, delete, filter, search, and sort
- Employee assigned-task view, details modal, and completion action
- Summary cards for total, completed, and pending tasks
- Doughnut and bar charts using Chart.js
- Responsive sidebar dashboard layout
- Browser notifications plus in-app alerts for task updates

## Initial Admin

| Role | Email | Password |
| --- | --- | --- |
| Admin | admin@gmail.com | admin1 |

No employees or tasks are added by default. Sign in as the admin, add employees, then create and assign tasks.

## Folder Structure

```text
src/
  components/
    DashboardLayout.jsx
    Login.jsx
    SummaryCards.jsx
    TaskCharts.jsx
    TaskControls.jsx
    TaskDashboard.jsx
    TaskDetails.jsx
    TaskForm.jsx
    TaskTable.jsx
  data/
    seedData.js
  hooks/
    useLocalStorage.js
  utils/
    notify.js
    taskUtils.js
  App.jsx
  index.css
  main.jsx
```

## Run Locally

```bash
npm install
npm run dev
```

Open the Vite local URL shown in the terminal.

## Production Build

```bash
npm run build
```
