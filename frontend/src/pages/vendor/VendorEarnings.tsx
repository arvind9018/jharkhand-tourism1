// pages/vendor/VendorEarnings.tsx
import { useState } from 'react';

interface Earning {
  id: string;
  productName: string;
  orderId: string;
  customerName: string;
  orderDate: string;
  quantity: number;
  amount: number;
  commission: number;
  netAmount: number;
  status: 'pending' | 'paid' | 'processing';
  payoutDate: string | null;
}

export default function VendorEarnings() {
  const [earnings, setEarnings] = useState<Earning[]>([
    { id: '1', productName: 'Dokra Tribal Horse', orderId: 'ORD001', customerName: 'Rahul Sharma', orderDate: '2024-04-10', quantity: 2, amount: 5000, commission: 500, netAmount: 4500, status: 'paid', payoutDate: '2024-04-15' },
    { id: '2', productName: 'Paitkar Scroll Painting', orderId: 'ORD002', customerName: 'Priya Singh', orderDate: '2024-04-08', quantity: 1, amount: 1800, commission: 180, netAmount: 1620, status: 'paid', payoutDate: '2024-04-12' },
    { id: '3', productName: 'Bamboo Hand Basket', orderId: 'ORD003', customerName: 'Amit Kumar', orderDate: '2024-04-05', quantity: 3, amount: 2700, commission: 270, netAmount: 2430, status: 'processing', payoutDate: null },
    { id: '4', productName: 'Dokra Tribal Horse', orderId: 'ORD004', customerName: 'Sneha Gupta', orderDate: '2024-04-03', quantity: 1, amount: 2500, commission: 250, netAmount: 2250, status: 'pending', payoutDate: null },
    { id: '5', productName: 'Wooden Mask', orderId: 'ORD005', customerName: 'Vikram Singh', orderDate: '2024-04-01', quantity: 2, amount: 2400, commission: 240, netAmount: 2160, status: 'pending', payoutDate: null },
  ]);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalEarned = earnings.reduce((sum, e) => sum + (e.status === 'paid' ? e.netAmount : 0), 0);
  const pendingAmount = earnings.reduce((sum, e) => sum + (e.status === 'pending' ? e.netAmount : 0), 0);
  const processingAmount = earnings.reduce((sum, e) => sum + (e.status === 'processing' ? e.netAmount : 0), 0);
  const totalCommission = earnings.reduce((sum, e) => sum + e.commission, 0);
  const totalSales = earnings.reduce((sum, e) => sum + e.amount, 0);

  const monthlyData = [
    { month: 'Jan', earnings: 8500, orders: 12 },
    { month: 'Feb', earnings: 10200, orders: 15 },
    { month: 'Mar', earnings: 13500, orders: 20 },
    { month: 'Apr', earnings: 16800, orders: 25 },
  ];

  const productEarnings = [
    { name: 'Dokra Tribal Horse', earnings: 17500, sales: 8 },
    { name: 'Paitkar Scroll Painting', earnings: 12800, sales: 7 },
    { name: 'Bamboo Hand Basket', earnings: 9600, sales: 12 },
    { name: 'Wooden Mask', earnings: 5400, sales: 5 },
  ];

  const maxEarnings = Math.max(...monthlyData.map(m => m.earnings));
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = [2024, 2025];

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">Earnings</h1>
        <p className="text-gray-600 mb-8">Track your sales earnings and payouts</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Earned</p>
            <p className="text-3xl font-bold">₹{totalEarned.toLocaleString()}</p>
            <p className="text-xs opacity-75 mt-2">from {earnings.filter(e => e.status === 'paid').length} payouts</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Pending Amount</p>
            <p className="text-3xl font-bold">₹{pendingAmount.toLocaleString()}</p>
            <p className="text-xs opacity-75 mt-2">awaiting approval</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Processing</p>
            <p className="text-3xl font-bold">₹{processingAmount.toLocaleString()}</p>
            <p className="text-xs opacity-75 mt-2">in transit</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Sales</p>
            <p className="text-3xl font-bold">₹{totalSales.toLocaleString()}</p>
            <p className="text-xs opacity-75 mt-2">gross revenue</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent">
              <option value="month">Monthly</option>
              <option value="quarter">Quarterly</option>
              <option value="year">Yearly</option>
            </select>
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent">
              {months.map((month, idx) => <option key={idx} value={idx}>{month}</option>)}
            </select>
            <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent">
              {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
            <button className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent-dark transition">Apply Filter</button>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">Monthly Earnings Trend</h2>
          <div className="space-y-3">
            {monthlyData.map((data, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{data.month}</span>
                  <span className="font-semibold">₹{data.earnings.toLocaleString()}</span>
                </div>
                <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="h-full bg-accent rounded-lg" style={{ width: `${(data.earnings / maxEarnings) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product-wise Earnings */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">Earnings by Product</h2>
          <div className="space-y-4">
            {productEarnings.map((product, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-primary">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.sales} units sold</p>
                </div>
                <p className="font-bold text-accent">₹{product.earnings.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Amount</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payout Date</th></tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {earnings.map((earning) => (
                  <tr key={earning.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{earning.productName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{earning.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{earning.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(earning.orderDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{earning.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-accent">₹{earning.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">₹{earning.commission}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary">₹{earning.netAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(earning.status)}`}>{earning.status}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{earning.payoutDate ? new Date(earning.payoutDate).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Withdrawal Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-primary mb-4">Request Withdrawal</h2>
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary mb-2">Amount</label>
              <input type="number" placeholder="Enter amount" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary mb-2">Bank Account</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent">
                <option>ICICI Bank - XXXXX1234</option>
                <option>SBI Bank - XXXXX5678</option>
                <option>HDFC Bank - XXXXX9012</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary mb-2">UPI ID (Optional)</label>
              <input type="text" placeholder="username@okhdfcbank" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent" />
            </div>
            <button className="bg-accent text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-dark transition">Request Withdrawal</button>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">📌 Withdrawal Information:</p>
            <ul className="text-xs text-blue-700 mt-2 space-y-1">
              <li>• Minimum withdrawal amount: ₹500</li>
              <li>• Processing time: 3-5 business days</li>
              <li>• No withdrawal fees for amounts above ₹2000</li>
              <li>• Withdrawals are processed only on weekdays</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}