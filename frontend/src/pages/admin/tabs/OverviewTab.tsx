// pages/admin/tabs/OverviewTab.tsx
import { DashboardStats, TrendData, OccupancyData, RevenueData, SystemHealth } from "../../../services/authApi"
import { KpiCard } from "../components/KpiCard"
import { SimpleChartCard } from "../components/SimpleChartCard"
import { SystemStatus } from "../components/SystemStatus"

interface OverviewTabProps {
  stats: DashboardStats | null
  touristTrends: TrendData[]
  occupancyData: OccupancyData[]
  revenueData: RevenueData[]
  systemHealth: SystemHealth | null
}

const getColor = (index: number): string => {
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']
  return colors[index % colors.length]
}

export const OverviewTab = ({ stats, touristTrends, occupancyData, revenueData, systemHealth }: OverviewTabProps) => {
  return (
    <>
      {/* KPI CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <KpiCard title="Total Tourists" value={stats?.totalTourists?.value?.toLocaleString() || "12,450"} icon="👥" trend={stats?.totalTourists?.trend} isPositive={stats?.totalTourists?.isPositive} />
        <KpiCard title="Active Homestays" value={stats?.activeHomestays?.value?.toLocaleString() || "128"} icon="🏡" trend={stats?.activeHomestays?.trend} isPositive={stats?.activeHomestays?.isPositive} />
        <KpiCard title="Handicraft Sales" value={stats?.handicraftSales?.currency === 'INR' ? `₹${(stats?.handicraftSales?.value / 100000)?.toFixed(1)}L` : "₹8.6L"} icon="🛍️" trend={stats?.handicraftSales?.trend} isPositive={stats?.handicraftSales?.isPositive} />
        <KpiCard title="Eco Alerts" value={stats?.ecoAlerts?.value?.toString() || "5"} icon="⚠️" status={stats?.ecoAlerts?.status || 'normal'} />
      </section>

      {/* SIMPLE ANALYTICS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <SimpleChartCard title="Tourist Footfall Trends" subtitle="Last 7 days">
          <div className="space-y-2">
            {touristTrends.slice(0, 7).map((item, index) => {
              const maxTotal = Math.max(...touristTrends.map(t => t.total))
              return (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs w-16">{new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <div className="flex-1 h-6 bg-gray-200 rounded overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${(item.total / maxTotal) * 100}%` }} />
                  </div>
                  <span className="text-xs w-12 text-right">{item.total}</span>
                </div>
              )
            })}
          </div>
        </SimpleChartCard>

        <SimpleChartCard title="Homestay Occupancy" subtitle="By district">
          <div className="space-y-3">
            {occupancyData.map((item, index) => (
              <div key={index} className="border-b pb-2 last:border-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{item.district}</span>
                  <span className="text-accent">{item.occupancy}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: `${item.occupancy}%` }} />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Booked: {item.booked}</span>
                  <span>Available: {item.available}</span>
                </div>
              </div>
            ))}
          </div>
        </SimpleChartCard>

        <SimpleChartCard title="Marketplace Revenue" subtitle="By category">
          <div className="space-y-2">
            {revenueData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getColor(index) }} />
                  <span className="text-sm">{item.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">₹{(item.amount / 100000).toFixed(1)}L</span>
                  <span className="text-xs text-gray-500 w-12">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </SimpleChartCard>
      </section>

      {/* SYSTEM STATUS */}
      <SystemStatus health={systemHealth} />
    </>
  )
}