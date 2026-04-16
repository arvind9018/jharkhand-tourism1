// pages/artisan/ArtisanDashboard.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getStoredUser } from "../../services/authApi"
import { getMyProducts } from "../../services/productApi"
import DashboardCard from "../../components/DashboardCard"

export default function ArtisanDashboard() {
  const [user] = useState(getStoredUser())
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalEarnings: 0,
    pendingOrders: 0
  })

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await getMyProducts();
      const products = response.data || [];
      setStats(prev => ({
        ...prev,
        totalProducts: products.length,
      }));
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">Artisan Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome back, {user?.name}!</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Products</p>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Orders</p>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Earnings</p>
            <p className="text-3xl font-bold">₹{stats.totalEarnings.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Pending Orders</p>
            <p className="text-3xl font-bold">{stats.pendingOrders}</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard icon="🛍️" title="My Products" description="Add and manage your products" link="/artisan/products" />
          <DashboardCard icon="📦" title="Orders" description="View and process orders" link="/artisan/orders" />
          <DashboardCard icon="💰" title="Earnings" description="Track your sales" link="/artisan/earnings" />
          <DashboardCard icon="⭐" title="Reviews" description="Customer reviews" link="/artisan/reviews" />
          <DashboardCard icon="📊" title="Analytics" description="View your sales analytics" link="/artisan/analytics" />
          <DashboardCard icon="🏪" title="Shop Profile" description="Manage your shop profile" link="/artisan/shop-profile" />
        </div>
      </div>
    </div>
  );
}