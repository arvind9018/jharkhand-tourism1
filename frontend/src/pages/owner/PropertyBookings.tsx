// pages/owner/PropertyBookings.tsx
import { useState } from 'react';

interface Booking {
  id: string;
  propertyName: string;
  propertyId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  bookingDate: string;
  specialRequests: string;
}

export default function PropertyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 'BK001', propertyName: 'Mountain View Homestay', propertyId: 'P1', customerName: 'Rahul Sharma', customerEmail: 'rahul@example.com', customerPhone: '9876543210', checkIn: '2024-04-15', checkOut: '2024-04-18', numberOfGuests: 4, totalAmount: 4800, status: 'confirmed', paymentStatus: 'paid', bookingDate: '2024-04-10', specialRequests: 'Need extra blankets' },
    { id: 'BK002', propertyName: 'Mountain View Homestay', propertyId: 'P1', customerName: 'Priya Singh', customerEmail: 'priya@example.com', customerPhone: '9876543211', checkIn: '2024-04-20', checkOut: '2024-04-22', numberOfGuests: 2, totalAmount: 2400, status: 'pending', paymentStatus: 'pending', bookingDate: '2024-04-12', specialRequests: '' },
    { id: 'BK003', propertyName: 'Riverside Cottage', propertyId: 'P2', customerName: 'Amit Kumar', customerEmail: 'amit@example.com', customerPhone: '9876543212', checkIn: '2024-04-10', checkOut: '2024-04-15', numberOfGuests: 3, totalAmount: 7500, status: 'checked_in', paymentStatus: 'paid', bookingDate: '2024-04-05', specialRequests: 'Vegetarian food' },
    { id: 'BK004', propertyName: 'Riverside Cottage', propertyId: 'P2', customerName: 'Sneha Gupta', customerEmail: 'sneha@example.com', customerPhone: '9876543213', checkIn: '2024-04-05', checkOut: '2024-04-08', numberOfGuests: 2, totalAmount: 4500, status: 'checked_out', paymentStatus: 'paid', bookingDate: '2024-03-28', specialRequests: '' },
  ]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [propertyFilter, setPropertyFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const properties = ['all', 'Mountain View Homestay', 'Riverside Cottage'];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'checked_in': return 'bg-blue-100 text-blue-800';
      case 'checked_out': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'refunded': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateBookingStatus = (bookingId: string, newStatus: Booking['status']) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    setSelectedBooking(null);
  };

  const filteredBookings = bookings.filter(b => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (propertyFilter !== 'all' && b.propertyName !== propertyFilter) return false;
    if (dateRange.start && b.checkIn < dateRange.start) return false;
    if (dateRange.end && b.checkOut > dateRange.end) return false;
    return true;
  });

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed' && new Date(b.checkIn) > new Date());
  const activeBookings = bookings.filter(b => b.status === 'checked_in');
  const totalRevenue = bookings.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">Property Bookings</h1>
        <p className="text-gray-600 mb-8">Manage all your homestay bookings</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Bookings</p>
            <p className="text-3xl font-bold">{bookings.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Upcoming</p>
            <p className="text-3xl font-bold">{upcomingBookings.length}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Active Stays</p>
            <p className="text-3xl font-bold">{activeBookings.length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Revenue</p>
            <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="checked_in">Checked In</option>
              <option value="checked_out">Checked Out</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select value={propertyFilter} onChange={(e) => setPropertyFilter(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent">
              {properties.map(p => <option key={p} value={p}>{p === 'all' ? 'All Properties' : p}</option>)}
            </select>
            <input type="date" placeholder="From Date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent" />
            <input type="date" placeholder="To Date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent" />
          </div>
          {(dateRange.start || dateRange.end) && (
            <div className="mt-4 flex justify-end">
              <button onClick={() => setDateRange({ start: '', end: '' })} className="text-accent text-sm hover:underline">Clear Filters</button>
            </div>
          )}
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Property</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guests</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedBooking(booking)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.propertyName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(booking.checkIn).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(booking.checkOut).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.numberOfGuests}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-accent">₹{booking.totalAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>{booking.status.replace('_', ' ')}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"><button className="text-accent hover:underline">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">Booking Details - {selectedBooking.id}</h2>
                <button onClick={() => setSelectedBooking(null)} className="text-gray-500 hover:text-accent text-2xl">✕</button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><p className="text-sm text-gray-500">Property</p><p className="font-medium">{selectedBooking.propertyName}</p></div>
                  <div><p className="text-sm text-gray-500">Guest Name</p><p className="font-medium">{selectedBooking.customerName}</p></div>
                  <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{selectedBooking.customerEmail}</p></div>
                  <div><p className="text-sm text-gray-500">Phone</p><p className="font-medium">{selectedBooking.customerPhone}</p></div>
                  <div><p className="text-sm text-gray-500">Check In</p><p className="font-medium">{new Date(selectedBooking.checkIn).toLocaleDateString()}</p></div>
                  <div><p className="text-sm text-gray-500">Check Out</p><p className="font-medium">{new Date(selectedBooking.checkOut).toLocaleDateString()}</p></div>
                  <div><p className="text-sm text-gray-500">Number of Guests</p><p className="font-medium">{selectedBooking.numberOfGuests}</p></div>
                  <div><p className="text-sm text-gray-500">Total Amount</p><p className="font-bold text-accent text-xl">₹{selectedBooking.totalAmount}</p></div>
                </div>

                {selectedBooking.specialRequests && (
                  <div><p className="text-sm text-gray-500">Special Requests</p><p className="p-3 bg-gray-50 rounded-lg">{selectedBooking.specialRequests}</p></div>
                )}

                <div className="border-t pt-4">
                  <label className="block text-sm font-medium text-primary mb-2">Update Booking Status</label>
                  <div className="flex gap-2 flex-wrap">
                    {['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'].map(status => (
                      <button key={status} onClick={() => updateBookingStatus(selectedBooking.id, status as Booking['status'])} className={`px-4 py-2 rounded-lg capitalize transition ${selectedBooking.status === status ? 'bg-accent text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{status.replace('_', ' ')}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}