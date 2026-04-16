// pages/artisan/ArtisanAnalytics.tsx
import { useState } from 'react';

export default function ArtisanAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const stats = {
    totalProducts: 18,
    totalOrders: 156,
    totalCustomers: 89,
    averageRating: 4.7,
    totalRevenue: 285000,
    conversionRate: 68,
    popularProducts: [
      { name: 'Dokra Tribal Horse', sales: 45, revenue: 112500, rating: 4.9 },
      { name: 'Paitkar Scroll Painting', sales: 38, revenue: 68400, rating: 4.8 },
      { name: 'Bamboo Hand Basket', sales: 52, revenue: 46800, rating: 4.6 },
    ],
    monthlyData: [
      { month: 'Jan', revenue: 35000, orders: 18, customers: 12 },
      { month: 'Feb', revenue: 42000, orders: 22, customers: 15 },
      { month: 'Mar', revenue: 55000, orders: 28, customers: 20 },
      { month: 'Apr', revenue: 68000, orders: 35, customers: 24 },
    ],
    categoryBreakdown: [
      { name: 'Dokra', sales: 85000, percentage: 35 },
      { name: 'Paitkar', sales: 68000, percentage: 28 },
      { name: 'Bamboo', sales: 52000, percentage: 22 },
      { name: 'Others', sales: 36000, percentage: 15 },
    ],
    recentOrders: [
      { id: 'ORD001', product: 'Dokra Tribal Horse', amount: 2500, date: '2024-04-14', customer: 'Rahul Sharma' },
      { id: 'ORD002', product: 'Paitkar Painting', amount: 1800, date: '2024-04-13', customer: 'Priya Singh' },
      { id: 'ORD003', product: 'Bamboo Basket', amount: 900, date: '2024-04-12', customer: 'Amit Kumar' },
    ],
  };

  const maxRevenue = Math.max(...stats.monthlyData.map(m => m.revenue));
  const maxOrders = Math.max(...stats.monthlyData.map(m => m.orders));

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600 mb-8">Track your craft sales performance and insights</p>

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
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Products</p>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
            <p className="text-xs opacity-75 mt-2">+5 this month</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Orders</p>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
            <p className="text-xs opacity-75 mt-2">+35 this month</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Customers</p>
            <p className="text-3xl font-bold">{stats.totalCustomers}</p>
            <p className="text-xs opacity-75 mt-2">+24 new this month</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Revenue</p>
            <p className="text-3xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
            <p className="text-xs opacity-75 mt-2">+28% growth</p>
          </div>
        </div>

        {/* Revenue & Orders Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Monthly Revenue</h2>
            <div className="space-y-3">
              {stats.monthlyData.map((data, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{data.month}</span>
                    <span className="font-semibold">₹{data.revenue.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
                    <div className="h-full bg-accent rounded-lg" style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Monthly Orders</h2>
            <div className="space-y-3">
              {stats.monthlyData.map((data, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{data.month}</span>
                    <span className="font-semibold">{data.orders} orders</span>
                  </div>
                  <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
                    <div className="h-full bg-accent rounded-lg" style={{ width: `${(data.orders / maxOrders) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Products & Category Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Most Popular Products</h2>
            <div className="space-y-4">
              {stats.popularProducts.map((product, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-primary">{product.name}</p>
                    <div className="flex gap-3 mt-1 text-sm text-gray-500">
                      <span>{product.sales} sold</span>
                      <span>⭐ {product.rating}</span>
                    </div>
                  </div>
                  <p className="font-bold text-accent">₹{product.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-primary mb-4">Sales by Category</h2>
            <div className="space-y-3">
              {stats.categoryBreakdown.map((cat, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{cat.name}</span>
                    <span className="font-semibold">₹{cat.sales.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-6 bg-gray-200 rounded-lg overflow-hidden">
                    <div className="h-full bg-accent rounded-lg" style={{ width: `${cat.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm font-semibold">
                <span>Total</span>
                <span>₹{(stats.categoryBreakdown.reduce((sum, c) => sum + c.sales, 0)).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">⭐</div>
            <h3 className="text-lg font-semibold text-primary mb-2">Average Rating</h3>
            <p className="text-3xl font-bold text-accent">{stats.averageRating}</p>
            <p className="text-sm text-gray-500 mt-2">from {stats.totalOrders} reviews</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">🔄</div>
            <h3 className="text-lg font-semibold text-primary mb-2">Conversion Rate</h3>
            <p className="text-3xl font-bold text-accent">{stats.conversionRate}%</p>
            <p className="text-sm text-gray-500 mt-2">visitors to customers</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">👥</div>
            <h3 className="text-lg font-semibold text-primary mb-2">Avg Order Value</h3>
            <p className="text-3xl font-bold text-accent">₹{(stats.totalRevenue / stats.totalOrders).toFixed(0)}</p>
            <p className="text-sm text-gray-500 mt-2">per transaction</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="text-lg font-semibold text-primary mb-2">Growth Rate</h3>
            <p className="text-3xl font-bold text-accent">+28%</p>
            <p className="text-sm text-gray-500 mt-2">month over month</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {stats.recentOrders.map(order => (
              <div key={order.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition">
                <div>
                  <p className="font-medium text-primary">{order.product}</p>
                  <p className="text-sm text-gray-500">Customer: {order.customer} • {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-accent">₹{order.amount}</p>
                  <p className="text-xs text-gray-400">Order #{order.id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}