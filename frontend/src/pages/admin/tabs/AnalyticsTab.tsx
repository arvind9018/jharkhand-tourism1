// pages/admin/tabs/AnalyticsTab.tsx
import { TrendData, OccupancyData, RevenueData } from "../../../services/authApi"
import { SimpleChartCard } from "../components/SimpleChartCard"

interface AnalyticsTabProps {
  touristTrends: TrendData[]
  occupancyData: OccupancyData[]
  revenueData: RevenueData[]
  dateRange: string
}

export const AnalyticsTab = ({ touristTrends, occupancyData, revenueData, dateRange }: AnalyticsTabProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Detailed Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleChartCard title="Tourist Trends" subtitle="Domestic vs International">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-right py-2">Domestic</th>
                <th className="text-right py-2">International</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {touristTrends.slice(0, 10).map((item: any, index: number) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-2">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="text-right">{item.domestic}</td>
                  <td className="text-right">{item.international}</td>
                  <td className="text-right font-medium">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SimpleChartCard>

        <SimpleChartCard title="Revenue Breakdown" subtitle="By category">
          <div className="space-y-3">
            {revenueData.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <span>{item.category}</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-gray-200 rounded overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${item.percentage}%` }} />
                  </div>
                  <span className="w-20 text-right">₹{(item.amount/1000).toFixed(0)}k</span>
                </div>
              </div>
            ))}
          </div>
        </SimpleChartCard>
      </div>
    </div>
  )
}