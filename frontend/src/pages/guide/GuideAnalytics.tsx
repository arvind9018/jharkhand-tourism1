// pages/guide/GuideAnalytics.tsx
import { useState } from 'react';

export default function GuideAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const stats = {
    totalTours: 12,
    totalBookings: 48,
    totalCustomers: 32,
    averageRating: 4.7,
    totalEarnings: 48500,
    completionRate: 94,
    popularTours: [
      { name: 'Waterfall Trekking Tour', bookings: 28, revenue: 42000 },
      { name: 'Wildlife Safari Tour', bookings: 20, revenue: 70000 },
    ],
    monthlyData: [
      { month: 'Jan', bookings: 4, earnings: 6000 },
      { month: 'Feb', bookings: 6, earnings: 9000 },
      { month: 'Mar', bookings: 8, earnings: 12000 },
      { month: 'Apr', bookings: 10, earnings: 15000 },
    ],
    recentActivity: [
      { id: 1, action: 'New booking for Waterfall Trekking Tour', date: '2024-04-13', customer: 'Rahul Sharma' },
      { id: 2, action: '5-star review received', date: '2024-04-12', customer: 'Priya Singh' },
      { id: 3, action: 'Payment received for Wildlife Safari Tour', date: '2024-04-11', customer: 'Amit Kumar' },
    ],
  };

  const maxEarnings = Math.max(...stats.monthlyData.map(m => m.earnings));

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600 mb-8">Track your performance and insights</p>

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
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white"><p className="text-sm opacity-90">Total Tours</p><p className="text-3xl font-bold">{stats.totalTours}</p><p className="text-xs opacity-75 mt-2">+2 this month</p></div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white"><p className="text-sm opacity-90">Total Bookings</p><p className="text-3xl font-bold">{stats.totalBookings}</p><p className="text-xs opacity-75 mt-2">+12 this month</p></div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"><p className="text-sm opacity-90">Total Customers</p><p className="text-3xl font-bold">{stats.totalCustomers}</p><p className="text-xs opacity-75 mt-2">+8 new this month</p></div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white"><p className="text-sm opacity-90">Avg Rating</p><p className="text-3xl font-bold">{stats.averageRating}</p><p className="text-xs opacity-75 mt-2">⭐ 5-star reviews: 42</p></div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-xl font-bold text-primary mb-4">Monthly Earnings</h2><div className="space-y-3">{stats.monthlyData.map((data, idx) => (<div key={idx}><div className="flex justify-between text-sm mb-1"><span>{data.month}</span><span className="font-semibold">₹{data.earnings}</span></div><div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden"><div className="h-full bg-accent rounded-lg" style={{ width: `${(data.earnings / maxEarnings) * 100}%` }}></div></div></div>))}</div></div>
          <div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-xl font-bold text-primary mb-4">Popular Tours</h2><div className="space-y-4">{stats.popularTours.map((tour, idx) => (<div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"><div><p className="font-semibold text-primary">{tour.name}</p><p className="text-sm text-gray-500">{tour.bookings} bookings</p></div><p className="font-bold text-accent">₹{tour.revenue.toLocaleString()}</p></div>))}</div></div>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><div className="text-4xl mb-3">✅</div><h3 className="text-lg font-semibold text-primary mb-2">Completion Rate</h3><p className="text-3xl font-bold text-accent">{stats.completionRate}%</p><p className="text-sm text-gray-500 mt-2">of tours completed successfully</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><div className="text-4xl mb-3">💰</div><h3 className="text-lg font-semibold text-primary mb-2">Total Earnings</h3><p className="text-3xl font-bold text-accent">₹{stats.totalEarnings.toLocaleString()}</p><p className="text-sm text-gray-500 mt-2">lifetime earnings</p></div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center"><div className="text-4xl mb-3">👥</div><h3 className="text-lg font-semibold text-primary mb-2">Repeat Customers</h3><p className="text-3xl font-bold text-accent">24%</p><p className="text-sm text-gray-500 mt-2">of total customers</p></div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6"><h2 className="text-xl font-bold text-primary mb-4">Recent Activity</h2><div className="space-y-3">{stats.recentActivity.map(activity => (<div key={activity.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition"><div><p className="font-medium text-primary">{activity.action}</p><p className="text-sm text-gray-500">Customer: {activity.customer}</p></div><p className="text-sm text-gray-400">{new Date(activity.date).toLocaleDateString()}</p></div>))}</div></div>
      </div>
    </div>
  );
}