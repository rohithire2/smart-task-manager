import { Bar, Doughnut } from 'react-chartjs-2'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Legend, Tooltip)

function TaskCharts({ tasks }) {
  const completed = tasks.filter((task) => task.status === 'completed').length
  const pending = tasks.filter((task) => task.status === 'pending').length
  const high = tasks.filter((task) => task.priority === 'high').length
  const medium = tasks.filter((task) => task.priority === 'medium').length
  const low = tasks.filter((task) => task.priority === 'low').length

  const doughnutData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ['#14b8a6', '#f59e0b'],
        borderWidth: 0,
      },
    ],
  }

  const barData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Tasks',
        data: [high, medium, low],
        backgroundColor: ['#ef4444', '#3b82f6', '#22c55e'],
        borderRadius: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  return (
    <div className="row g-3">
      <div className="col-12 col-xl-5">
        <section className="panel h-100">
          <h2 className="h5 fw-bold mb-3">Completion</h2>
          <div className="chart-box">
            <Doughnut data={doughnutData} options={options} />
          </div>
        </section>
      </div>
      <div className="col-12 col-xl-7">
        <section className="panel h-100">
          <h2 className="h5 fw-bold mb-3">Priority Mix</h2>
          <div className="chart-box">
            <Bar data={barData} options={options} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default TaskCharts
