// pages/admin/components/SimpleChartCard.tsx
import { ReactNode } from 'react'

interface SimpleChartCardProps {
  title: string
  subtitle: string
  children: ReactNode
}

export const SimpleChartCard = ({ title, subtitle, children }: SimpleChartCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bold text-primary mb-1">{title}</h2>
      <p className="text-sm text-gray-600 mb-4">{subtitle}</p>
      {children}
    </div>
  )
}