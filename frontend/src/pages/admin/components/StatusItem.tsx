// pages/admin/components/StatusItem.tsx
interface StatusItemProps {
  label: string
  value: string
  status?: 'success' | 'warning' | 'error'
}

const statusColors = {
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600'
}

const statusDots = {
  success: '🟢',
  warning: '🟡',
  error: '🔴'
}

export const StatusItem = ({ label, value, status }: StatusItemProps) => {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`font-semibold flex items-center gap-1 ${status ? statusColors[status] : 'text-primary'}`}>
        {status && <span>{statusDots[status]}</span>}
        {value}
      </p>
    </div>
  )
}