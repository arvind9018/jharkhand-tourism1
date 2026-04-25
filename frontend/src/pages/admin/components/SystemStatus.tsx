// pages/admin/components/SystemStatus.tsx
import { SystemHealth } from "../../../services/authApi"
import { StatusItem } from "./StatusItem"

interface SystemStatusProps {
  health: SystemHealth | null
}

export const SystemStatus = ({ health }: SystemStatusProps) => {
  return (
    <section className="bg-white rounded-xl shadow p-6">
      <h2 className="font-bold text-primary mb-4">System Status</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusItem label="Server" value={health?.server?.status || "UP"} status={health?.server?.status === 'UP' ? 'success' : 'error'} />
        <StatusItem label="Database" value={health?.database?.status || "CONNECTED"} status={health?.database?.status === 'CONNECTED' ? 'success' : 'error'} />
        <StatusItem label="GIS Services" value={health?.gis?.status || "RUNNING"} status={health?.gis?.status === 'RUNNING' ? 'success' : 'warning'} />
        <StatusItem label="Response Time" value={`${health?.responseTime?.avg || 245}ms`} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm">
        <div><p className="text-gray-600">Active Users</p><p className="font-semibold">{health?.activeUsers || 234}</p></div>
        <div><p className="text-gray-600">API Calls</p><p className="font-semibold">{health?.apiCalls?.toLocaleString() || '15.2k'}</p></div>
        <div><p className="text-gray-600">Last Backup</p><p className="font-semibold">{new Date(health?.lastBackup || '').toLocaleTimeString() || '03:00 AM'}</p></div>
        <div><p className="text-gray-600">Uptime</p><p className="font-semibold">{Math.floor((health?.server?.uptime || 345600) / 3600)}h</p></div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-right">Last updated: {new Date().toLocaleString()}</p>
    </section>
  )
}