// pages/vendor/Inventory.tsx
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  category: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Dokra Horse', sku: 'DK001', price: 2500, quantity: 15, category: 'Dokra', status: 'in_stock' },
    { id: '2', name: 'Paitkar Painting', sku: 'PT001', price: 1800, quantity: 5, category: 'Paitkar', status: 'in_stock' },
    { id: '3', name: 'Bamboo Basket', sku: 'BB001', price: 900, quantity: 2, category: 'Bamboo', status: 'low_stock' },
    { id: '4', name: 'Wooden Mask', sku: 'WM001', price: 1200, quantity: 0, category: 'Wood', status: 'out_of_stock' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const updateQuantity = (id: string, newQuantity: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, quantity: newQuantity, status: newQuantity === 0 ? 'out_of_stock' : newQuantity < 5 ? 'low_stock' : 'in_stock' } : p));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) && (categoryFilter === 'all' || p.category === categoryFilter));

  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">Inventory Management</h1>
        <p className="text-gray-600 mb-8">Manage your product stock</p>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent" />
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent w-48">
              {categories.map(cat => <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.sku}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-accent">₹{product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <input type="number" value={product.quantity} onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))} min="0" className="w-20 px-2 py-1 border rounded text-center" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}>{product.status.replace('_', ' ')}</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm"><button className="text-accent hover:underline">Update</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}