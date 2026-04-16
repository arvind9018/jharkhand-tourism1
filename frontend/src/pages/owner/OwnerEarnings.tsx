// pages/owner/OwnerEarnings.tsx
import { useState } from 'react';

interface Earning {
  id: string;
  propertyName: string;
  customerName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  amount: number;
  commission: number;
  netAmount: number;
  status: 'pending' | 'paid' | 'processing';
  payoutDate: string | null;
}

export default function OwnerEarnings() {
  const [earnings, setEarnings] = useState<Earning[]>([
    { id: '1', propertyName: 'Mountain View Homestay', customerName: 'Rahul Sharma', checkIn: '2024-04-15', checkOut: '2024-04-18', nights: 3, amount: 4800, commission: 480, netAmount: 4320, status: 'paid', payoutDate: '2024-04-20' },
    { id: '2', propertyName: 'Mountain View Homestay', customerName: 'Priya Singh', checkIn: '2024-04-20', checkOut: '2024-04-22', nights: 2, amount: 2400, commission: 240, netAmount: 2160, status: 'pending', payoutDate: null },
    { id: '3', propertyName: 'Riverside Cottage', customerName: 'Amit Kumar', checkIn: '2024-04-10', checkOut: '2024-04-15', nights: 5, amount: 7500, commission: 750, netAmount: 6750, status: 'processing', payoutDate: null },
    { id: '4', propertyName: 'Riverside Cottage', customerName: 'Sneha Gupta', checkIn: '2024-04-05', checkOut: '2024-04-08', nights: 3, amount: 4500, commission: 450, netAmount: 4050, status: 'paid', payoutDate: '2024-04-12' },
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

  const monthlyData = [
    { month: 'Jan', earnings: 12000 },
    { month: 'Feb', earnings: 15000 },
    { month: 'Mar', earnings: 18000 },
    { month: 'Apr', earnings: 22000 },
  ];

  const propertyStats = [
    { name: 'Mountain View Homestay', bookings: 8, revenue: 38400, occupancy: 65 },
    { name: 'Riverside Cottage', bookings: 6, revenue: 27000, occupancy: 55 },
  ];

  const maxEarnings = Math.max(...monthlyData.map(m => m.earnings));
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = [2024, 2025];

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">Earnings</h1>
        <p className="text-gray-600 mb-8">Track your property earnings and payouts</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Earned</p>
            <p className="text-3xl font-bold">₹{totalEarned.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Pending Amount</p>
            <p className="text-3xl font-bold">₹{pendingAmount.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Processing</p>
            <p className="text-3xl font-bold">₹{processingAmount.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Commission</p>
            <p className="text-3xl font-bold">₹{totalCommission.toLocaleString()}</p>
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

        {/* Property Performance */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-primary mb-4">Property Performance</h2>
          <div className="space-y-4">
            {propertyStats.map((prop, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div><p className="font-semibold text-primary">{prop.name}</p><p className="text-sm text-gray-500">{prop.bookings} bookings • {prop.occupancy}% occupancy</p></div>
                <p className="font-bold text-accent">₹{prop.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Earnings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stay</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nights</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Amount</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payout Date</th></tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {earnings.map((earning) => (
                  <tr key={earning.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{earning.propertyName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{earning.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(earning.checkIn).toLocaleDateString()} - {new Date(earning.checkOut).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{earning.nights}</td>
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
            <div className="flex-1"><label className="block text-sm font-medium text-primary mb-2">Amount</label><input type="number" placeholder="Enter amount" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent" /></div>
            <div className="flex-1"><label className="block text-sm font-medium text-primary mb-2">Bank Account</label><select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent"><option>ICICI Bank - XXXXX1234</option><option>SBI Bank - XXXXX5678</option></select></div>
            <button className="bg-accent text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-dark transition">Request Withdrawal</button>
          </div>
          <p className="text-xs text-gray-500 mt-4">Minimum withdrawal amount: ₹1000. Withdrawals are processed within 3-5 business days.</p>
        </div>
      </div>
    </div>
  );
}