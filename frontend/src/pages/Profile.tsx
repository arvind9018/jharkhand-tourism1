// pages/Profile.tsx
import { useEffect, useState } from "react"
import { getCurrentUser, updateProfile, logoutUser, type User } from "../services/authApi"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India'
    }
  })

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    const userData = await getCurrentUser()
    setUser(userData)
    if (userData) {
      setForm({
        name: userData.name || '',
        phone: (userData as any).phone || '',
        address: (userData as any).address || {
          street: '',
          city: '',
          state: '',
          pincode: '',
          country: 'India'
        }
      })
    }
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.startsWith('address.')) {
      const field = name.split('.')[1]
      setForm(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const updatedUser = await updateProfile(form)
      setUser(updatedUser)
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile' })
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">My Profile</h1>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Address</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="address.street"
                  value={form.address.street}
                  onChange={handleChange}
                  placeholder="Street Address"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="address.city"
                    value={form.address.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="address.state"
                    value={form.address.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="address.pincode"
                    value={form.address.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="address.country"
                    value={form.address.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Account Type</p>
                  <p className="font-semibold text-primary capitalize">{user?.role || 'User'}</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}