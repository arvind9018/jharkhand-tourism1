// pages/owner/OwnerAlerts.tsx
import { useState } from 'react';

interface Alert {
  id: string;
  type: 'booking' | 'payment' | 'review' | 'maintenance' | 'system';
  title: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  status: 'unread' | 'read' | 'resolved';
  createdAt: string;
  actionUrl?: string;
  actionText?: string;
}

export default function OwnerAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: '1', type: 'booking', title: 'New Booking Received', message: 'Rahul Sharma has booked Mountain View Homestay for 3 nights.', severity: 'high', status: 'unread', createdAt: '2024-04-14T10:30:00', actionUrl: '/owner/bookings', actionText: 'View Booking' },
    { id: '2', type: 'payment', title: 'Payment Confirmed', message: 'Payment of ₹4,800 received for booking #BK001.', severity: 'medium', status: 'unread', createdAt: '2024-04-14T09:15:00', actionUrl: '/owner/earnings', actionText: 'View Details' },
    { id: '3', type: 'review', title: 'New Review Posted', message: 'Priya Singh left a 5-star review for Riverside Cottage.', severity: 'medium', status: 'unread', createdAt: '2024-04-13T18:45:00', actionUrl: '/owner/reviews', actionText: 'Respond to Review' },
    { id: '4', type: 'booking', title: 'Booking Cancellation', message: 'Booking #BK002 for Mountain View Homestay has been cancelled.', severity: 'high', status: 'read', createdAt: '2024-04-13T14:20:00', actionUrl: '/owner/bookings', actionText: 'View Details' },
    { id: '5', type: 'system', title: 'Profile Update Reminder', message: 'Please update your property photos for better visibility.', severity: 'low', status: 'read', createdAt: '2024-04-12T08:00:00', actionUrl: '/owner/properties', actionText: 'Update Now' },
    { id: '6', type: 'maintenance', title: 'Maintenance Request', message: 'Guest reported AC issue in Riverside Cottage. Please address.', severity: 'high', status: 'unread', createdAt: '2024-04-14T07:30:00', actionUrl: '/owner/properties', actionText: 'View Issue' },
  ]);

  const [filterType, setFilterType] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'booking': return '📅';
      case 'payment': return '💰';
      case 'review': return '⭐';
      case 'maintenance': return '🔧';
      case 'system': return '⚙️';
      default: return '🔔';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'unread': return <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>;
      case 'read': return <span className="w-2 h-2 bg-gray-400 rounded-full"></span>;
      case 'resolved': return <span className="text-xs text-green-600">✓ Resolved</span>;
      default: return null;
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId && alert.status === 'unread' 
        ? { ...alert, status: 'read' } 
        : alert
    ));
  };

  const markAsResolved = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' } 
        : alert
    ));
    setSelectedAlert(null);
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
    setSelectedAlert(null);
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => 
      alert.status === 'unread' ? { ...alert, status: 'read' } : alert
    ));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filterType !== 'all' && alert.type !== filterType) return false;
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false;
    if (filterStatus !== 'all' && alert.status !== filterStatus) return false;
    return true;
  });

  const unreadCount = alerts.filter(a => a.status === 'unread').length;
  const highSeverityCount = alerts.filter(a => a.severity === 'high' && a.status === 'unread').length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Alerts & Notifications</h1>
            <p className="text-gray-600">Stay updated with your property activities</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition">
              Mark All as Read ({unreadCount})
            </button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Total Alerts</p>
            <p className="text-3xl font-bold">{alerts.length}</p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Unread</p>
            <p className="text-3xl font-bold">{unreadCount}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">High Priority</p>
            <p className="text-3xl font-bold">{highSeverityCount}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
            <p className="text-sm opacity-90">Resolved</p>
            <p className="text-3xl font-bold">{alerts.filter(a => a.status === 'resolved').length}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent">
              <option value="all">All Types</option>
              <option value="booking">Bookings</option>
              <option value="payment">Payments</option>
              <option value="review">Reviews</option>
              <option value="maintenance">Maintenance</option>
              <option value="system">System</option>
            </select>
            <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent">
              <option value="all">All Severity</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-accent">
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="resolved">Resolved</option>
            </select>
            {(filterType !== 'all' || filterSeverity !== 'all' || filterStatus !== 'all') && (
              <button onClick={() => { setFilterType('all'); setFilterSeverity('all'); setFilterStatus('all'); }} className="text-accent text-sm hover:underline">Clear Filters</button>
            )}
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => { setSelectedAlert(alert); markAsRead(alert.id); }}
              className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer border-l-4 ${alert.severity === 'high' ? 'border-l-red-500' : alert.severity === 'medium' ? 'border-l-yellow-500' : 'border-l-green-500'} ${alert.status === 'unread' ? 'bg-white' : 'bg-gray-50'}`}
            >
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-3xl">{getTypeIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-primary text-lg">{alert.title}</h3>
                      {getStatusBadge(alert.status)}
                    </div>
                    <p className="text-gray-600 mb-2">{alert.message}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-gray-400">{formatDate(alert.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {alert.actionUrl && (
                    <button
                      onClick={(e) => { e.stopPropagation(); window.location.href = alert.actionUrl!; }}
                      className="px-4 py-2 bg-accent text-white rounded-lg text-sm hover:bg-accent-dark transition"
                    >
                      {alert.actionText || 'View'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredAlerts.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="text-2xl font-bold text-primary mb-2">No Alerts</h3>
              <p className="text-gray-600">You're all caught up! No alerts to display.</p>
            </div>
          )}
        </div>
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getTypeIcon(selectedAlert.type)}</span>
                <h2 className="text-2xl font-bold text-primary">Alert Details</h2>
              </div>
              <button onClick={() => setSelectedAlert(null)} className="text-gray-500 hover:text-accent text-2xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div><p className="text-sm text-gray-500">Title</p><p className="font-semibold text-lg">{selectedAlert.title}</p></div>
              <div><p className="text-sm text-gray-500">Message</p><p className="text-gray-700">{selectedAlert.message}</p></div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-gray-500">Type</p><p className="font-medium capitalize">{selectedAlert.type}</p></div>
                <div><p className="text-sm text-gray-500">Severity</p><p className={`font-medium capitalize ${selectedAlert.severity === 'high' ? 'text-red-600' : selectedAlert.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'}`}>{selectedAlert.severity}</p></div>
                <div><p className="text-sm text-gray-500">Status</p><p className="font-medium capitalize">{selectedAlert.status}</p></div>
                <div><p className="text-sm text-gray-500">Received</p><p className="font-medium">{new Date(selectedAlert.createdAt).toLocaleString()}</p></div>
              </div>
              <div className="border-t pt-4 flex gap-3">
                {selectedAlert.status !== 'resolved' && (
                  <button onClick={() => markAsResolved(selectedAlert.id)} className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">Mark as Resolved</button>
                )}
                <button onClick={() => deleteAlert(selectedAlert.id)} className="px-4 py-2 border border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition">Delete Alert</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}