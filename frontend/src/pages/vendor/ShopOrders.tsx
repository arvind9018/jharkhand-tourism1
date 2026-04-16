// pages/vendor/ShopOrders.tsx
import { useState } from 'react';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed';
  orderDate: string;
  shippingAddress: string;
}

export default function ShopOrders() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 'ORD001', customerName: 'Rahul Sharma', customerEmail: 'rahul@example.com', items: [{ name: 'Dokra Horse', quantity: 2, price: 2500 }], totalAmount: 5000, status: 'pending', paymentStatus: 'paid', orderDate: '2024-04-10', shippingAddress: 'Ranchi, Jharkhand' },
    { id: 'ORD002', customerName: 'Priya Singh', customerEmail: 'priya@example.com', items: [{ name: 'Paitkar Painting', quantity: 1, price: 1800 }], totalAmount: 1800, status: 'processing', paymentStatus: 'paid', orderDate: '2024-04-12', shippingAddress: 'Jamshedpur, Jharkhand' },
    { id: 'ORD003', customerName: 'Amit Kumar', customerEmail: 'amit@example.com', items: [{ name: 'Bamboo Basket', quantity: 3, price: 900 }], totalAmount: 2700, status: 'delivered', paymentStatus: 'paid', orderDate: '2024-04-08', shippingAddress: 'Dhanbad, Jharkhand' },
  ]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentColor = (status: string) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    setSelectedOrder(null);
  };

  const filteredOrders = statusFilter === 'all' ? orders : orders.filter(o => o.status === statusFilter);

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">Orders</h1>
        <p className="text-gray-600 mb-8">Manage customer orders</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
            <button key={status} onClick={() => setStatusFilter(status)} className={`px-4 py-2 rounded-full capitalize transition ${statusFilter === status ? 'bg-accent text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>{status}</button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.customerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.items.length} item(s)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-accent">₹{order.totalAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>{order.status}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentColor(order.paymentStatus)}`}>{order.paymentStatus}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"><button className="text-accent hover:underline">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">Order Details - {selectedOrder.id}</h2>
                <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-accent text-2xl">✕</button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div><p className="text-sm text-gray-500">Customer Name</p><p className="font-medium">{selectedOrder.customerName}</p></div>
                  <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{selectedOrder.customerEmail}</p></div>
                  <div><p className="text-sm text-gray-500">Order Date</p><p className="font-medium">{new Date(selectedOrder.orderDate).toLocaleDateString()}</p></div>
                  <div><p className="text-sm text-gray-500">Shipping Address</p><p className="font-medium">{selectedOrder.shippingAddress}</p></div>
                </div>

                <div><h3 className="font-semibold text-primary mb-3">Items</h3><div className="space-y-2">{selectedOrder.items.map((item, idx) => (<div key={idx} className="flex justify-between p-3 bg-gray-50 rounded-lg"><span>{item.name} x {item.quantity}</span><span className="font-semibold">₹{item.price * item.quantity}</span></div>))}</div></div>

                <div className="flex justify-between items-center pt-4 border-t"><span className="font-bold text-lg">Total Amount</span><span className="text-2xl font-bold text-accent">₹{selectedOrder.totalAmount}</span></div>

                <div><label className="block text-sm font-medium text-primary mb-2">Update Status</label><div className="flex gap-2 flex-wrap">{['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (<button key={status} onClick={() => updateOrderStatus(selectedOrder.id, status as Order['status'])} className={`px-4 py-2 rounded-lg capitalize transition ${selectedOrder.status === status ? 'bg-accent text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{status}</button>))}</div></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}