// pages/vendor/MyShop.tsx
import { useState, useEffect } from 'react';
import { getStoredUser } from '../../services/authApi';

interface Shop {
  name: string;
  description: string;
  logo: string;
  banner: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  gstNumber: string;
  openingHours: string;
  categories: string[];
}

export default function MyShop() {
  const [user] = useState(getStoredUser());
  const [shop, setShop] = useState<Shop>({
    name: '',
    description: '',
    logo: '',
    banner: '',
    address: '',
    city: '',
    state: 'Jharkhand',
    pincode: '',
    phone: user?.phone || '',
    email: user?.email || '',
    gstNumber: '',
    openingHours: '10:00 AM - 8:00 PM',
    categories: ['Handicrafts', 'Artifacts']
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadShop();
  }, []);

  const loadShop = async () => {
    // Simulate API call - replace with actual API
    setTimeout(() => {
      setShop({
        name: 'Handicraft Emporium',
        description: 'Authentic tribal handicrafts and artifacts from Jharkhand',
        logo: 'https://via.placeholder.com/150',
        banner: 'https://via.placeholder.com/1200x300',
        address: 'Main Market Road',
        city: 'Ranchi',
        state: 'Jharkhand',
        pincode: '834001',
        phone: user?.phone || '9876543210',
        email: user?.email || 'shop@example.com',
        gstNumber: '22AAAAA0000A1Z',
        openingHours: '10:00 AM - 8:00 PM',
        categories: ['Handicrafts', 'Artifacts', 'Traditional Wear']
      });
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleCategoryToggle = (category: string) => {
    if (shop.categories.includes(category)) {
      setShop({ ...shop, categories: shop.categories.filter(c => c !== category) });
    } else {
      setShop({ ...shop, categories: [...shop.categories, category] });
    }
    setSaved(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSaved(true);
      setLoading(false);
      setEditMode(false);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  const availableCategories = ['Handicrafts', 'Artifacts', 'Traditional Wear', 'Jewelry', 'Home Decor', 'Paintings', 'Sculptures', 'Textiles'];

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">My Shop</h1>
            <p className="text-gray-600">Manage your shop profile and settings</p>
          </div>
          {!editMode && (
            <button onClick={() => setEditMode(true)} className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition">
              Edit Shop
            </button>
          )}
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-slideDown">
            <p className="text-green-600 text-center">✅ Shop profile updated successfully!</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {/* Shop Banner */}
          <div className="mb-6">
            <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
              <img src={shop.banner} alt="Shop Banner" className="w-full h-full object-cover" />
            </div>
            <label className="block text-sm font-medium text-primary mb-2">Banner Image URL</label>
            <input type="text" name="banner" value={shop.banner} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Shop Name</label>
              <input type="text" name="name" value={shop.name} onChange={handleChange} disabled={!editMode} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Logo URL</label>
              <input type="text" name="logo" value={shop.logo} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-primary mb-2">Shop Description</label>
            <textarea name="description" value={shop.description} onChange={handleChange} disabled={!editMode} rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Address</label>
              <input type="text" name="address" value={shop.address} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">City</label>
              <input type="text" name="city" value={shop.city} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">State</label>
              <select name="state" value={shop.state} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50">
                <option value="Jharkhand">Jharkhand</option>
                <option value="Bihar">Bihar</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Pincode</label>
              <input type="text" name="pincode" value={shop.pincode} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Phone Number</label>
              <input type="tel" name="phone" value={shop.phone} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Email</label>
              <input type="email" name="email" value={shop.email} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">GST Number</label>
              <input type="text" name="gstNumber" value={shop.gstNumber} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Opening Hours</label>
              <input type="text" name="openingHours" value={shop.openingHours} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-primary mb-2">Categories</label>
            <div className="flex flex-wrap gap-3">
              {availableCategories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => editMode && handleCategoryToggle(cat)}
                  className={`px-4 py-2 rounded-full text-sm transition ${shop.categories.includes(cat) ? 'bg-accent text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {editMode && (
            <div className="flex gap-3 mt-8">
              <button type="submit" disabled={loading} className="flex-1 bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-dark transition disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => { setEditMode(false); loadShop(); }} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Cancel</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}