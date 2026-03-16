// src/pages/GuideDashboard.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getStoredUser } from "../services/authApi"
import DashboardCard from "../components/DashboardCard"

export default function GuideDashboard() {
  const [user, setUser] = useState(getStoredUser())

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Guide Dashboard
        </h1>
        <p className="text-gray-600 mb-8">Welcome back, {user?.name}!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            icon="🧭"
            title="My Tours"
            description="Create and manage your tours"
            link="/my-tours"
          />
          <DashboardCard
            icon="👥"
            title="Tour Bookings"
            description="View bookings from tourists"
            link="/tour-bookings"
          />
          <DashboardCard
            icon="💰"
            title="Earnings"
            description="Track your earnings"
            link="/earnings"
          />
          <DashboardCard
            icon="⭐"
            title="Reviews"
            description="See what tourists say"
            link="/my-reviews"
          />
          <DashboardCard
            icon="📊"
            title="Analytics"
            description="View your performance metrics"
            link="/guide-analytics"
          />
          <DashboardCard
            icon="📅"
            title="Schedule"
            description="Manage your tour schedule"
            link="/schedule"
          />
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Tours</p>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Bookings</p>
            <p className="text-3xl font-bold">48</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Earnings</p>
            <p className="text-3xl font-bold">₹24,500</p>
          </div>
        </div>
      </div>
    </div>
  )
}