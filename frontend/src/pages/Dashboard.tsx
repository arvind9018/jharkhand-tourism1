// pages/Dashboard.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCurrentUser, type User } from "../services/authApi"

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const userData = await getCurrentUser()
    setUser(userData)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 mb-8">Manage your account and view your activities</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl mb-4">👤</div>
            <h2 className="text-xl font-bold text-primary mb-2">Profile</h2>
            <p className="text-gray-600 mb-4">Manage your personal information</p>
            <Link to="/profile" className="text-accent hover:underline">
              View Profile →
            </Link>
          </div>

          {/* Bookings Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl mb-4">📅</div>
            <h2 className="text-xl font-bold text-primary mb-2">My Bookings</h2>
            <p className="text-gray-600 mb-4">View and manage your homestay bookings</p>
            <Link to="/bookings" className="text-accent hover:underline">
              View Bookings →
            </Link>
          </div>

          {/* Wishlist Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl mb-4">❤️</div>
            <h2 className="text-xl font-bold text-primary mb-2">Wishlist</h2>
            <p className="text-gray-600 mb-4">Your saved destinations and homestays</p>
            <Link to="/wishlist" className="text-accent hover:underline">
              View Wishlist →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}