// pages/Homestays.tsx
import { useEffect, useState, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom" // Added useNavigate
import { fetchHomestays, searchHomestays, type Homestay } from "../services/api"
import { isAuthenticated } from "../services/authApi" // Added to check login

// Types
interface FilterState {
  search: string
  priceRange: string
  guestCount: string
  amenities: string[]
  rating: number | null
  sortBy: 'price-low' | 'price-high' | 'rating' | 'popularity'
}

export default function Homestays() {
  const navigate = useNavigate() // Added for navigation
  const [data, setData] = useState<Homestay[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedHomestay, setSelectedHomestay] = useState<Homestay | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    priceRange: "Any Price",
    guestCount: "Guests",
    amenities: [],
    rating: null,
    sortBy: 'popularity'
  })

  // Available amenities
  const availableAmenities = ["WiFi", "Meals", "Parking", "Guide Service", "Pickup", "Kitchen", "AC", "Hot Water"]

  useEffect(() => {
    loadHomestays()
  }, [])

  const loadHomestays = async () => {
    setLoading(true)
    try {
      const homestays = await fetchHomestays()
      setData(homestays)
    } catch (error) {
      console.error('Error loading homestays:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort data (your existing code)
  const filteredData = useMemo(() => {
    let filtered = [...data]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(h => 
        h.name.toLowerCase().includes(searchLower) ||
        h.village.toLowerCase().includes(searchLower) ||
        h.district.toLowerCase().includes(searchLower) ||
        h.description?.toLowerCase().includes(searchLower)
      )
    }

    if (filters.priceRange !== "Any Price") {
      filtered = filtered.filter(h => {
        if (filters.priceRange === "Below ₹1000") return h.price < 1000
        if (filters.priceRange === "₹1000 - ₹2000") return h.price >= 1000 && h.price <= 2000
        if (filters.priceRange === "₹2000 - ₹3000") return h.price > 2000 && h.price <= 3000
        if (filters.priceRange === "Above ₹3000") return h.price > 3000
        return true
      })
    }

    if (filters.guestCount !== "Guests") {
      const minGuests = parseInt(filters.guestCount.split('-')[0].trim())
      filtered = filtered.filter(h => h.capacity >= minGuests)
    }

    if (filters.amenities.length > 0) {
      filtered = filtered.filter(h => 
        filters.amenities.every(a => h.amenities?.includes(a))
      )
    }

    if (filters.rating) {
      filtered = filtered.filter(h => h.rating >= filters.rating!)
    }

    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        filtered.sort((a, b) => b.rating - a.rating)
    }

    return filtered
  }, [data, filters])

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      priceRange: "Any Price",
      guestCount: "Guests",
      amenities: [],
      rating: null,
      sortBy: 'popularity'
    })
  }

  // ✅ UPDATED: Handle Book Now with login check and navigation to payment
  const handleBookNow = (homestay: Homestay) => {
    // Check if user is logged in
    if (!isAuthenticated()) {
      // Redirect to login with return URL
      navigate('/login', { state: { from: '/homestays' } })
      return
    }
    
    // Store selected homestay in state
    setSelectedHomestay(homestay)
    setShowBookingModal(true)
  }

  // ✅ NEW: Handle booking confirmation - navigate to payment
  const handleBookingConfirm = (bookingDetails: any) => {
    // Calculate total nights
    const checkIn = new Date(bookingDetails.checkIn)
    const checkOut = new Date(bookingDetails.checkOut)
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    
    // Create booking object
    const booking = {
      id: Date.now(), // Temporary ID - backend would generate
      type: 'Homestay',
      name: selectedHomestay?.name,
      location: `${selectedHomestay?.village}, ${selectedHomestay?.district}`,
      image: selectedHomestay?.image,
      checkIn: bookingDetails.checkIn,
      checkOut: bookingDetails.checkOut,
      guests: bookingDetails.guests,
      price: selectedHomestay?.price || 0,
      totalNights: nights,
      totalAmount: (selectedHomestay?.price || 0) * nights + 800, // + fees
      status: 'pending',
      paymentStatus: 'pending'
    }
    
    // Navigate to payment page with booking data
    navigate('/payment', { state: { booking } })
    
    // Close modal
    setShowBookingModal(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing homestays...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-secondary">
      
      {/* HERO SECTION (your existing code) */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/50 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-16">
          <div className="max-w-3xl">
            <div className="inline-block bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              🏡 Authentic Tribal Homestays
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Experience Village Life in Jharkhand
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Stay with local tribal communities, savor traditional cuisine, 
              and immerse yourself in centuries-old cultural traditions.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-accent">128+</div>
                <div className="text-sm text-gray-300">Verified Homestays</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">15+</div>
                <div className="text-sm text-gray-300">Tribal Communities</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">4.8</div>
                <div className="text-sm text-gray-300">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">12k+</div>
                <div className="text-sm text-gray-300">Happy Guests</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT (your existing code - no changes) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        
        {/* SEARCH AND FILTER BAR */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                <input
                  placeholder="Search by name, village, or district..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>

            <select 
              value={filters.priceRange}
              onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent"
            >
              <option>Any Price</option>
              <option>Below ₹1000</option>
              <option>₹1000 - ₹2000</option>
              <option>₹2000 - ₹3000</option>
              <option>Above ₹3000</option>
            </select>

            <select 
              value={filters.guestCount}
              onChange={(e) => setFilters(prev => ({ ...prev, guestCount: e.target.value }))}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent"
            >
              <option>Guests</option>
              <option>1 - 2</option>
              <option>3 - 4</option>
              <option>5 - 6</option>
              <option>7+</option>
            </select>

            <select 
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent"
            >
              <option value="popularity">Sort by: Popularity</option>
              <option value="rating">Sort by: Rating</option>
              <option value="price-low">Sort by: Price (Low to High)</option>
              <option value="price-high">Sort by: Price (High to Low)</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition"
            >
              {showFilters ? 'Hide Filters ↑' : 'Show Filters ↓'}
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 pt-6 border-t">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-primary mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-3">
                    {availableAmenities.map(amenity => (
                      <label key={amenity} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="rounded border-gray-300 text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-3">Minimum Rating</h3>
                  <div className="flex gap-3">
                    {[4, 4.5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => setFilters(prev => ({ 
                          ...prev, 
                          rating: prev.rating === rating ? null : rating 
                        }))}
                        className={`px-4 py-2 rounded-lg border transition ${
                          filters.rating === rating
                            ? 'bg-accent text-white border-accent'
                            : 'hover:border-accent'
                        }`}
                      >
                        {rating}+ ⭐
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-gray-500 hover:text-accent text-sm flex items-center gap-1"
                >
                  <span>🗑️</span> Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-accent">{filteredData.length}</span> homestays found
          </p>
          <p className="text-sm text-gray-500">
            Showing {Math.min(filteredData.length, 9)} of {filteredData.length}
          </p>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏡</div>
            <h3 className="text-2xl font-bold text-primary mb-2">No homestays found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
            <button
              onClick={clearFilters}
              className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredData.map(homestay => (
              <HomestayCard 
                key={homestay.id} 
                homestay={homestay} 
                onBookNow={() => handleBookNow(homestay)}
              />
            ))}
          </div>
        )}

        {filteredData.length > 9 && (
          <div className="mt-12 flex justify-center gap-2">
            <button className="w-10 h-10 rounded-lg border hover:bg-accent hover:text-white transition">1</button>
            <button className="w-10 h-10 rounded-lg border hover:bg-accent hover:text-white transition">2</button>
            <button className="w-10 h-10 rounded-lg border hover:bg-accent hover:text-white transition">3</button>
            <span className="w-10 h-10 flex items-center justify-center">...</span>
            <button className="w-10 h-10 rounded-lg border hover:bg-accent hover:text-white transition">8</button>
          </div>
        )}
      </div>

      {/* ✅ UPDATED: Booking Modal with connection to payment */}
      {showBookingModal && selectedHomestay && (
        <BookingModal
          homestay={selectedHomestay}
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleBookingConfirm} // Updated to use new handler
        />
      )}
    </div>
  )
}

/* ---------------- Homestay Card Component (your existing code) ---------------- */
function HomestayCard({ homestay, onBookNow }: { homestay: Homestay; onBookNow: () => void }) {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={imageError ? 'https://via.placeholder.com/400x300?text=Homestay' : homestay.image}
          alt={homestay.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          onError={() => setImageError(true)}
        />
        
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          ⭐ {homestay.rating?.toFixed(1) || '4.5'}
        </div>

        <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent hover:text-white transition">
            Quick View
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-primary group-hover:text-accent transition">
            {homestay.name}
          </h3>
          <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-semibold">
            {homestay.amenities?.length || 0} amenities
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
          <span>📍</span> {homestay.village}, {homestay.district}
        </p>

        {homestay.amenities && (
          <div className="flex flex-wrap gap-2 mb-4">
            {homestay.amenities.slice(0, 3).map((amenity, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600"
              >
                {amenity}
              </span>
            ))}
            {homestay.amenities.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                +{homestay.amenities.length - 3}
              </span>
            )}
          </div>
        )}

        {homestay.description && (
          <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {homestay.description}
          </p>
        )}

        <div className="flex items-center gap-4 mb-4 text-sm">
          <span className="flex items-center gap-1">
            <span>👥</span> Up to {homestay.capacity} guests
          </span>
          {homestay.amenities?.includes('Meals') && (
            <span className="flex items-center gap-1 text-accent">
              <span>🍽️</span> Meals included
            </span>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="text-2xl font-bold text-accent">
              ₹{homestay.price}
              <span className="text-sm font-normal text-gray-500">/night</span>
            </p>
          </div>
          <button
            onClick={onBookNow}
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition transform hover:scale-105"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Updated Booking Modal Component ---------------- */
function BookingModal({ homestay, onClose, onConfirm }: { 
  homestay: Homestay; 
  onClose: () => void;
  onConfirm: (details: any) => void;
}) {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [specialRequests, setSpecialRequests] = useState('')

  // Calculate number of nights
  const getNights = () => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const nights = getNights()
  const subtotal = homestay.price * nights
  const cleaningFee = 500
  const serviceFee = 300
  const total = subtotal + cleaningFee + serviceFee

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm({ 
      checkIn, 
      checkOut, 
      guests, 
      specialRequests,
      nights,
      subtotal,
      total 
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-primary">Book Your Stay</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-accent text-2xl">✕</button>
          </div>

          <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <img 
              src={homestay.image} 
              alt={homestay.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-bold text-primary">{homestay.name}</h4>
              <p className="text-sm text-gray-600">{homestay.village}, {homestay.district}</p>
              <p className="text-accent font-semibold mt-1">₹{homestay.price}/night</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent"
              >
                {[...Array(homestay.capacity)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} guest{i !== 0 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={3}
                placeholder="Dietary preferences, arrival time, etc."
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Price Breakdown - Updated with dynamic calculation */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-semibold text-primary mb-3">Price Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>₹{homestay.price} x {nights} {nights === 1 ? 'night' : 'nights'}</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>₹{cleaningFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>₹{serviceFee}</span>
                </div>
                <div className="border-t pt-2 font-semibold flex justify-between">
                  <span>Total</span>
                  <span className="text-accent">₹{total}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-white py-4 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Confirm & Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}