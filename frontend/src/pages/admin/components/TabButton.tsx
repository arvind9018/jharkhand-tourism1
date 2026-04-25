// pages/admin/components/TabButton.tsx
import { motion } from 'framer-motion'

interface TabButtonProps {
  active: boolean
  onClick: () => void
  icon: string
  label: string
  badge?: number
}

export const TabButton = ({ active, onClick, icon, label, badge }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative py-3 px-4 font-medium text-sm transition-all duration-200 ${
        active
          ? 'text-accent'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
        {badge !== undefined && badge > 0 && (
          <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </div>
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  )
}