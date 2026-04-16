// pages/owner/OwnerAnalytics.tsx
import { useState } from 'react';

export default function OwnerAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const stats = {
    totalProperties: 3,
    totalBookings: 24,
    totalCustomers: 18,
    averageRating: 4.7,
    totalRevenue: 125000,
    occupancyRate: 72,
    properties: [
      { name: 'Mountain View Homestay', bookings: 14, revenue: 67200, occupancy: 78, rating: 4.6 },
      { name: 'Riverside Cottage', bookings: 10, revenue: 57800, occupancy: 65, rating: 4.8 },
    ],
    monthlyData: [
      { month: 'Jan', revenue: 18000, bookings: 4, occupancy: 55 },
      { month: 'Feb', revenue: 22000, bookings: 5, occupancy: 60 },
      { month: 'Mar', revenue: 28000, bookings: 7, occupancy: 68 },
      { month: 'Apr', revenue: 35000, bookings: 8, occupancy: 75 },
    ],
    recentActivity: [
      { id: 1, action: 'New booking for Mountain View Homestay', date: '2024-04-13', customer: 'Rahul Sharma', amount: 4800 },
      { id: 2, action: '5-star review received for Riverside Cottage', date: '2024-04-12', customer: 'Priya Singh' },
      { id: 3, action: 'Payment received for Mountain View Homestay', date: '2024-04-11', customer: 'Amit Kumar', amount: 7500 },
    ],
  };

  const maxRevenue = Math.max(...stats.monthlyData.map(m => m.revenue));

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600 mb-8">Track your property performance and insights</p>

        {/* Period Selector */}
        <div className="flex justify-end mb-6">
          <div className="bg-white rounded-lg shadow p-1 inline-flex">
            {['week', 'month', 'year'].map(period => (
              <button key={period} onClick={() => setSelectedPeriod(period)} className={`px-4 py-2 rounded-lg capitalize transition ${selectedPeriod === period ? 'bg-accent text-white' : 'hover:bg-gray-100'}`}>{period}</button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"><p className="text-sm opacity-90">Total Properties</p><p className="text-3xl font-bold">{stats.totalProperties}</p><p className="text-xs opacity-75 mt-2">+0 this month</p></div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white"><p className="text-sm opacity-90">Total Bookings</p><p className="text-3xl font-bold">{stats.totalBookings}</p><p className="text-xs opacity-75 mt-2">+8 this month</p></div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"><p className="text-sm opacity-90">Total Customers</p><p className="text-3xl font-bold">{stats.totalCustomers}</p><p className="text-xs opacity-75 mt-2">+6 new this month</p></div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white"><p className="text-sm opacity-90">Avg Rating</p><p className="text-3xl font-bold">{stats.averageRating}</p><p className="text-xs opacity-75 mt-2">⭐ 5-star reviews: 18</p></div>
        </div>

        {/* Revenue & Occupancy Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-xl font-bold text-primary mb-4">Monthly Revenue</h2><div className="space-y-3">{stats.monthlyData.map((data, idx) => (<div key={idx}><div className="flex justify-between text-sm mb-1"><span>{data.month}</span><span className="font-semibold">₹{data.revenue.toLocaleString()}</span></div><div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden"><div className="h-full bg-accent rounded-lg" style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}></div></div></div>))}</div></div>
          <div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-xl font-bold text-primary mb-4">Monthly Occupancy</h2><div className="space-y-3">{stats.monthlyData.map((data, idx) => (<div key={idx}><div className="flex justify-between text-sm mb-1"><span>{data.month}</span><span className="font-semibold">{data.occupancy}%</span></div><div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden"><div className="h-full bg-accent rounded-lg" style={{ width: `${data.occupancy}%` }}></div></div></div>))}</div></div>
        </div>

        {/* Property Performance */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">Property Performance</h2>
          <div className="space-y-4">
            {stats.properties.map((prop, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div><h3 className="font-bold text-primary text-lg">{prop.name}</h3><p className="text-sm text-gray-500">⭐ {prop.rating} • {prop.bookings} bookings</p></div>
                  <p className="text-xl font-bold text-accent">₹{prop.revenue.toLocaleString()}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-xs text-gray-500">Occupancy Rate</p><div className="flex items-center gap-2"><div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-accent rounded-full" style={{ width: `${prop.occupancy}%` }}></div></div><span className="text-sm font-semibold">{prop.occupancy}%</span></div></div>
                  <div><p className="text-xs text-gray-500">Avg Nightly Rate</p><p className="font-semibold">₹{(prop.revenue / prop.bookings / 3).toFixed(0)}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><div className="text-4xl mb-3">🏡</div><h3 className="text-lg font-semibold text-primary mb-2">Occupancy Rate</h3><p className="text-3xl font-bold text-accent">{stats.occupancyRate}%</p><p className="text-sm text-gray-500 mt-2">of properties booked</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><div className="text-4xl mb-3">💰</div><h3 className="text-lg font-semibold text-primary mb-2">Total Revenue</h3><p className="text-3xl font-bold text-accent">₹{stats.totalRevenue.toLocaleString()}</p><p className="text-sm text-gray-500 mt-2">lifetime earnings</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><div className="text-4xl mb-3">🔄</div><h3 className="text-lg font-semibold text-primary mb-2">Repeat Guests</h3><p className="text-3xl font-bold text-accent">32%</p><p className="text-sm text-gray-500 mt-2">of total customers</p></div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {stats.recentActivity.map(activity => (
              <div key={activity.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition">
                <div><p className="font-medium text-primary">{activity.action}</p><p className="text-sm text-gray-500">Customer: {activity.customer}</p></div>
                <div className="text-right"><p className="text-sm text-gray-400">{new Date(activity.date).toLocaleDateString()}</p>{activity.amount && <p className="text-xs text-accent font-semibold">₹{activity.amount}</p>}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}