// src/pages/UserDashboard.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getStoredUser } from "../services/authApi"
import DashboardCard from "../components/DashboardCard" // ✅ Add this import

export default function UserDashboard() {
  const [user, setUser] = useState(getStoredUser())

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">
          My Dashboard
        </h1>
        <p className="text-gray-600 mb-8">Welcome back, {user?.name}!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            icon="👤"
            title="My Profile"
            description="Manage your personal information"
            link="/profile"
          />
          <DashboardCard
            icon="📅"
            title="My Bookings"
            description="View and manage your homestay bookings"
            link="/bookings"
          />
          <DashboardCard
            icon="❤️"
            title="Wishlist"
            description="Your saved destinations and homestays"
            link="/wishlist"
          />
          <DashboardCard
            icon="⭐"
            title="Reviews"
            description="Reviews you've written"
            link="/my-reviews"
          />
          <DashboardCard
            icon="🔔"
            title="Notifications"
            description="View your notifications and alerts"
            link="/notifications"
          />
          <DashboardCard
            icon="⚙️"
            title="Settings"
            description="Account settings and preferences"
            link="/settings"
          />
        </div>

        {/* Recent Activity Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500 text-center py-8">No recent activity to show</p>
          </div>
        </div>
      </div>
    </div>
  )
}