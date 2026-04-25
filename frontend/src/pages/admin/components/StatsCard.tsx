// pages/admin/components/StatsCard.tsx
import { motion } from 'framer-motion'

interface StatsCardProps {
  title: string
  value: string
  icon: string
  color: 'blue' | 'green' | 'orange' | 'purple' | 'yellow' | 'pink' | 'red'
  trend?: number
  onClick?: () => void
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  green: 'bg-green-50 text-green-600 border-green-100',
  orange: 'bg-orange-50 text-orange-600 border-orange-100',
  purple: 'bg-purple-50 text-purple-600 border-purple-100',
  yellow: 'bg-yellow-50 text-yellow-600 border-yellow-100',
  pink: 'bg-pink-50 text-pink-600 border-pink-100',
  red: 'bg-red-50 text-red-600 border-red-100'
}

const iconColors = {
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  orange: 'bg-orange-100',
  purple: 'bg-purple-100',
  yellow: 'bg-yellow-100',
  pink: 'bg-pink-100',
  red: 'bg-red-100'
}

export const StatsCard = ({ title, value, icon, color, trend, onClick }: StatsCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
      className={`${colorClasses[color]} rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {trend !== undefined && (
            <p className={`text-xs mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last period
            </p>
          )}
        </div>
        <div className={`${iconColors[color]} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}