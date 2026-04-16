// pages/artisan/ShopProfile.tsx
import { useState, useEffect } from 'react';
import { getStoredUser } from '../../services/authApi';

interface ShopProfile {
  shopName: string;
  shopDescription: string;
  logo: string;
  banner: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  website: string;
  establishedYear: string;
  categories: string[];
  socialMedia: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    ifscCode: string;
    upiId: string;
  };
}

export default function ShopProfile() {
  const [user] = useState(getStoredUser());
  const [profile, setProfile] = useState<ShopProfile>({
    shopName: '',
    shopDescription: '',
    logo: '',
    banner: '',
    address: '',
    city: '',
    state: 'Jharkhand',
    pincode: '',
    phone: user?.phone || '',
    email: user?.email || '',
    website: '',
    establishedYear: '',
    categories: ['Handicrafts', 'Artifacts'],
    socialMedia: {
      instagram: '',
      facebook: '',
      twitter: '',
    },
    bankDetails: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      ifscCode: '',
      upiId: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'social' | 'bank'>('basic');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    // Simulate API call - replace with actual API
    setTimeout(() => {
      setProfile({
        shopName: 'Artisan Handicrafts',
        shopDescription: 'Authentic tribal handicrafts and traditional art from Jharkhand. Each piece tells a story of our rich cultural heritage.',
        logo: 'https://via.placeholder.com/150',
        banner: 'https://via.placeholder.com/1200x300',
        address: 'Village Khunti',
        city: 'Khunti',
        state: 'Jharkhand',
        pincode: '835210',
        phone: user?.phone || '9876543210',
        email: user?.email || 'artisan@example.com',
        website: 'www.artisanhandicrafts.com',
        establishedYear: '2015',
        categories: ['Handicrafts', 'Artifacts', 'Traditional Art'],
        socialMedia: {
          instagram: '@artisan_handicrafts',
          facebook: 'artisanhandicrafts',
          twitter: '@artisan_hc',
        },
        bankDetails: {
          accountName: 'Artisan Handicrafts',
          accountNumber: '123456789012',
          bankName: 'State Bank of India',
          ifscCode: 'SBIN0012345',
          upiId: 'artisan@okhdfcbank',
        },
      });
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof ShopProfile] as Record<string, string>),
          [child]: value
        }
      }));
    } else {
      setProfile(prev => ({ ...prev, [name]: value }));
    }
    setSaved(false);
  };

  const handleCategoryToggle = (category: string) => {
    if (profile.categories.includes(category)) {
      setProfile(prev => ({ ...prev, categories: prev.categories.filter(c => c !== category) }));
    } else {
      setProfile(prev => ({ ...prev, categories: [...prev.categories, category] }));
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

  const availableCategories = ['Handicrafts', 'Artifacts', 'Traditional Art', 'Jewelry', 'Home Decor', 'Paintings', 'Sculptures', 'Textiles'];

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Shop Profile</h1>
            <p className="text-gray-600">Manage your artisan shop profile and settings</p>
          </div>
          {!editMode && (
            <button onClick={() => setEditMode(true)} className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition">
              Edit Profile
            </button>
          )}
        </div>

        {saved && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-slideDown">
            <p className="text-green-600 text-center">✅ Shop profile updated successfully!</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button onClick={() => setActiveTab('basic')} className={`px-6 py-3 font-semibold transition border-b-2 ${activeTab === 'basic' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-accent'}`}>Basic Info</button>
          <button onClick={() => setActiveTab('social')} className={`px-6 py-3 font-semibold transition border-b-2 ${activeTab === 'social' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-accent'}`}>Social Media</button>
          <button onClick={() => setActiveTab('bank')} className={`px-6 py-3 font-semibold transition border-b-2 ${activeTab === 'bank' ? 'border-accent text-accent' : 'border-transparent text-gray-500 hover:text-accent'}`}>Bank Details</button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              {/* Shop Banner */}
              <div className="mb-6">
                <div className="h-40 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                  <img src={profile.banner} alt="Shop Banner" className="w-full h-full object-cover" />
                </div>
                <label className="block text-sm font-medium text-primary mb-2">Banner Image URL</label>
                <input type="text" name="banner" value={profile.banner} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Shop Name</label>
                  <input type="text" name="shopName" value={profile.shopName} onChange={handleChange} disabled={!editMode} required className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Logo URL</label>
                  <input type="text" name="logo" value={profile.logo} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Shop Description</label>
                <textarea name="shopDescription" value={profile.shopDescription} onChange={handleChange} disabled={!editMode} rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Address</label>
                  <input type="text" name="address" value={profile.address} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">City</label>
                  <input type="text" name="city" value={profile.city} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">State</label>
                  <select name="state" value={profile.state} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50">
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Bihar">Bihar</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Pincode</label>
                  <input type="text" name="pincode" value={profile.pincode} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Phone</label>
                  <input type="tel" name="phone" value={profile.phone} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Email</label>
                  <input type="email" name="email" value={profile.email} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Website</label>
                  <input type="text" name="website" value={profile.website} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Established Year</label>
                <input type="text" name="establishedYear" value={profile.establishedYear} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Product Categories</label>
                <div className="flex flex-wrap gap-3">
                  {availableCategories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => editMode && handleCategoryToggle(cat)}
                      className={`px-4 py-2 rounded-full text-sm transition ${profile.categories.includes(cat) ? 'bg-accent text-white' : 'bg-gray-100 text-gray-600'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Instagram</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">@</span>
                  <input type="text" name="socialMedia.instagram" value={profile.socialMedia.instagram} onChange={handleChange} disabled={!editMode} className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" placeholder="username" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Facebook</label>
                <input type="text" name="socialMedia.facebook" value={profile.socialMedia.facebook} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" placeholder="page name or URL" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Twitter</label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">@</span>
                  <input type="text" name="socialMedia.twitter" value={profile.socialMedia.twitter} onChange={handleChange} disabled={!editMode} className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" placeholder="username" />
                </div>
              </div>
            </div>
          )}

          {/* Bank Details Tab */}
          {activeTab === 'bank' && (
            <div className="space-y-6">
              <div className="p-4 bg-yellow-50 rounded-lg mb-4">
                <p className="text-sm text-yellow-800">⚠️ Bank details are required for withdrawals. Please ensure accuracy.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Account Holder Name</label>
                  <input type="text" name="bankDetails.accountName" value={profile.bankDetails.accountName} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Account Number</label>
                  <input type="text" name="bankDetails.accountNumber" value={profile.bankDetails.accountNumber} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Bank Name</label>
                  <input type="text" name="bankDetails.bankName" value={profile.bankDetails.bankName} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">IFSC Code</label>
                  <input type="text" name="bankDetails.ifscCode" value={profile.bankDetails.ifscCode} onChange={handleChange} disabled={!editMode} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">UPI ID</label>
                <input type="text" name="bankDetails.upiId" value={profile.bankDetails.upiId} onChange={handleChange} disabled={!editMode} placeholder="username@okhdfcbank" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent disabled:bg-gray-50" />
              </div>
            </div>
          )}

          {editMode && (
            <div className="flex gap-3 mt-8 pt-6 border-t">
              <button type="submit" disabled={loading} className="flex-1 bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-dark transition disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button type="button" onClick={() => { setEditMode(false); loadProfile(); }} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">Cancel</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}