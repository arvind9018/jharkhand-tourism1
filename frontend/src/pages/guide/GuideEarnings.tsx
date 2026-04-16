// pages/guide/GuideEarnings.tsx
import { useState } from 'react';

interface Earning {
  id: string;
  tourName: string;
  customerName: string;
  tourDate: string;
  amount: number;
  commission: number;
  netAmount: number;
  status: 'pending' | 'paid' | 'processing';
  payoutDate: string | null;
}

export default function GuideEarnings() {
  const [earnings, setEarnings] = useState<Earning[]>([
    { id: '1', tourName: 'Waterfall Trekking Tour', customerName: 'Rahul Sharma', tourDate: '2024-04-20', amount: 6000, commission: 600, netAmount: 5400, status: 'paid', payoutDate: '2024-04-22' },
    { id: '2', tourName: 'Waterfall Trekking Tour', customerName: 'Priya Singh', tourDate: '2024-04-22', amount: 3000, commission: 300, netAmount: 2700, status: 'pending', payoutDate: null },
    { id: '3', tourName: 'Wildlife Safari Tour', customerName: 'Amit Kumar', tourDate: '2024-04-25', amount: 21000, commission: 2100, netAmount: 18900, status: 'processing', payoutDate: null },
    { id: '4', tourName: 'Wildlife Safari Tour', customerName: 'Sneha Gupta', tourDate: '2024-04-18', amount: 10500, commission: 1050, netAmount: 9450, status: 'paid', payoutDate: '2024-04-20' },
  ]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = [2024, 2025];

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">Earnings</h1>
        <p className="text-gray-600 mb-8">Track your tour earnings and payouts</p>

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

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent">
              {months.map((month, idx) => <option key={idx} value={idx}>{month}</option>)}
            </select>
            <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent">
              {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
            <button className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent-dark transition">Filter</button>
          </div>
        </div>

        {/* Earnings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tour</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commission</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Amount</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payout Date</th></tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {earnings.map((earning) => (
                  <tr key={earning.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{earning.tourName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{earning.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(earning.tourDate).toLocaleDateString()}</td>
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

        {/* Withdrawal Request Section */}
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