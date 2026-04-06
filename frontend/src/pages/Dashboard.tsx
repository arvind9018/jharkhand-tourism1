// src/pages/Dashboard.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser, type User } from "../services/authApi"
import DashboardCard from "../components/DashboardCard"

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error('Error loading user:', error)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

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
        </div>
      </div>
    </div>
  )
}