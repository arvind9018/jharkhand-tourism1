// src/pages/guide/GuideDashboard.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getStoredUser } from "../../services/authApi"
import DashboardCard from "../../components/DashboardCard"

export default function GuideDashboard() {
  const [user, setUser] = useState(getStoredUser())
  const [stats, setStats] = useState({
    totalTours: 0,
    totalBookings: 0,
    totalEarnings: 0,
    upcomingTours: 0,
    averageRating: 0
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    // Simulate API call - replace with actual API
    setTimeout(() => {
      setStats({
        totalTours: 12,
        totalBookings: 48,
        totalEarnings: 24500,
        upcomingTours: 5,
        averageRating: 4.7
      })
    }, 500)
  }

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Guide Dashboard
        </h1>
        <p className="text-gray-600 mb-8">Welcome back, {user?.name}!</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Tours</p>
            <p className="text-3xl font-bold">{stats.totalTours}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Bookings</p>
            <p className="text-3xl font-bold">{stats.totalBookings}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Earnings</p>
            <p className="text-3xl font-bold">₹{stats.totalEarnings.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Upcoming Tours</p>
            <p className="text-3xl font-bold">{stats.upcomingTours}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Avg Rating</p>
            <p className="text-3xl font-bold">{stats.averageRating}</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            icon="🧭"
            title="My Tours"
            description="Create and manage your tour packages"
            link="/guide/tours"
          />
          <DashboardCard
            icon="👥"
            title="Tour Bookings"
            description="View and manage customer bookings"
            link="/guide/bookings"
          />
          <DashboardCard
            icon="💰"
            title="Earnings"
            description="Track your tour earnings and payouts"
            link="/guide/earnings"
          />
          <DashboardCard
            icon="⭐"
            title="Reviews"
            description="See what customers say about your tours"
            link="/guide/reviews"
          />
          <DashboardCard
            icon="📊"
            title="Analytics"
            description="View your performance metrics"
            link="/guide/analytics"
          />
          <DashboardCard
            icon="📅"
            title="Schedule"
            description="Manage your tour schedule"
            link="/guide/schedule"
          />
        </div>

        {/* Recent Activity Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <span>🔄</span> Recent Activity
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition">
              <div>
                <p className="font-medium text-primary">New booking received</p>
                <p className="text-sm text-gray-500">Waterfall Trekking Tour - 4 guests</p>
              </div>
              <p className="text-sm text-gray-400">2 hours ago</p>
            </div>
            <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition">
              <div>
                <p className="font-medium text-primary">5-star review received</p>
                <p className="text-sm text-gray-500">"Excellent guide! Very knowledgeable"</p>
              </div>
              <p className="text-sm text-gray-400">1 day ago</p>
            </div>
            <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition">
              <div>
                <p className="font-medium text-primary">Payment received</p>
                <p className="text-sm text-gray-500">₹15,000 for Wildlife Safari Tour</p>
              </div>
              <p className="text-sm text-gray-400">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}