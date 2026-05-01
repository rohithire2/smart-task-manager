import { CheckCircle2, Clock3, ListTodo } from 'lucide-react'

const cards = [
  {
    label: 'Total tasks',
    key: 'total',
    icon: ListTodo,
    color: 'primary',
  },
  {
    label: 'Completed tasks',
    key: 'completed',
    icon: CheckCircle2,
    color: 'success',
  },
  {
    label: 'Pending tasks',
    key: 'pending',
    icon: Clock3,
    color: 'warning',
  },
]

function SummaryCards({ stats }) {
  return (
    <div className="row g-3">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <div className="col-12 col-md-4" key={card.key}>
            <article className="summary-card">
              <div className={`summary-icon text-bg-${card.color}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-secondary mb-1">{card.label}</p>
                <strong className="fs-2">{stats[card.key]}</strong>
              </div>
            </article>
          </div>
        )
      })}
    </div>
  )
}

export default SummaryCards
