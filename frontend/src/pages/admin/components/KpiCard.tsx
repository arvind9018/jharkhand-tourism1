// pages/admin/components/KpiCard.tsx
interface KpiCardProps {
  title: string
  value: string
  icon: string
  trend?: number
  isPositive?: boolean
  status?: 'critical' | 'warning' | 'normal'
}

const statusColors = {
  critical: 'bg-red-100 border-red-300',
  warning: 'bg-yellow-100 border-yellow-300',
  normal: 'bg-green-100 border-green-300'
}

export const KpiCard = ({ title, value, icon, trend, isPositive, status }: KpiCardProps) => {
  return (
    <div className={`bg-white rounded-xl shadow p-6 flex items-center gap-4 ${status ? statusColors[status] : ''}`}>
      <div className="text-3xl">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold text-primary">{value}</h3>
        {trend !== undefined && (
          <p className={`text-xs mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? '↑' : '↓'} {Math.abs(trend)}% from last period
          </p>
        )}
        {status && (
          <p className={`text-xs mt-1 ${
            status === 'critical' ? 'text-red-600' : status === 'warning' ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {status === 'critical' ? '🔴 Critical' : status === 'warning' ? '⚠️ Warning' : '🟢 Normal'}
          </p>
        )}
      </div>
    </div>
  )
}