// src/pages/OwnerDashboard.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getStoredUser } from "../../services/authApi"
import DashboardCard from "../../components/DashboardCard"

export default function OwnerDashboard() {
  const [user, setUser] = useState(getStoredUser())

  const newLocal = "/owner/analytics"
  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Homestay Owner Dashboard
        </h1>
        <p className="text-gray-600 mb-8">Welcome back, {user?.name}!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            icon="🏡"
            title="My Properties"
            description="Manage your homestays"
            link="/owner/properties"
          />
          <DashboardCard
            icon="📅"
            title="Bookings"
            description="View and manage bookings"
            link="/owner/bookings"
          />
          <DashboardCard
            icon="💰"
            title="Earnings"
            description="Track your revenue"
            link="/owner/earnings"
          />
          <DashboardCard
            icon="⭐"
            title="Reviews"
            description="Guest reviews"
            link="/owner/reviews"
          />
          <DashboardCard
            icon="📊"
            title="Analytics"
            description="View occupancy analytics"
            link={newLocal}
          />
          <DashboardCard
            icon="🔔"
            title="Alerts"
            description="View booking alerts"
            link="/owner/alerts"
          />
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Properties</p>
            <p className="text-3xl font-bold">3</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Active Bookings</p>
            <p className="text-3xl font-bold">8</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Occupancy Rate</p>
            <p className="text-3xl font-bold">75%</p>
          </div>
        </div>
      </div>
    </div>
  )
}