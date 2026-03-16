// src/components/DashboardCard.tsx
import { Link } from "react-router-dom"

interface DashboardCardProps {
  icon: string
  title: string
  description: string
  link: string
}

export default function DashboardCard({ icon, title, description, link }: DashboardCardProps) {
  return (
    <Link to={link}>
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <span className="text-accent text-sm font-semibold flex items-center gap-1">
          View Details <span>→</span>
        </span>
      </div>
    </Link>
  )
}