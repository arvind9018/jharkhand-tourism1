// pages/DestinationDetails.tsx
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import type { Destination } from "../types/Destination"
import { fetchDestinationById } from "../services/api"
import { isAuthenticated } from "../services/authApi"

export default function DestinationDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'reviews' | 'nearby' | 'booking'>('overview')
  const [selectedImage, setSelectedImage] = useState(0)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: ''
  })

  // Booking modal state
  const [showBookingForm, setShowBookingForm] = useState(false)

  useEffect(() => {
    if (id) {
      loadDestination()
    } else {
      console.error('No ID provided in URL')
      setError('No destination ID provided')
      setLoading(false)
    }
  }, [id])

  const loadDestination = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log('Fetching destination with ID:', id)
      const data = await fetchDestinationById(id!)
      console.log('Fetched destination data:', data)
      
      if (data) {
        setDestination(data)
      } else {
        setError('Destination not found')
      }
    } catch (error) {
      console.error('Error loading destination:', error)
      setError('Failed to load destination details')
    } finally {
      setLoading(false)
    }
  }

  const handleBookNow = () => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/destinations/${id}` } })
      return
    }
    setShowBookingForm(true)
    setActiveTab('booking')
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingDetails.checkIn || !bookingDetails.checkOut) {
      alert('Please select check-in and check-out dates')
      return
    }
    
    // Calculate nights
    const checkInDate = new Date(bookingDetails.checkIn)
    const checkOutDate = new Date(bookingDetails.checkOut)
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (nights <= 0) {
      alert('Check-out date must be after check-in date')
      return
    }
    
    // Create booking object
    const booking = {
      id: Date.now(),
      destinationId: destination?.id,
      destinationName: destination?.name,
      location: destination?.district,
      image: destination?.image,
      checkIn: bookingDetails.checkIn,
      checkOut: bookingDetails.checkOut,
      guests: bookingDetails.guests,
      nights: nights,
      pricePerNight: 1200, // Example price - would come from backend
      totalAmount: nights * 1200,
      status: 'pending',
      specialRequests: bookingDetails.specialRequests
    }
    
    // Navigate to payment page
    navigate('/payment', { state: { booking, type: 'destination' } })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading destination details...</p>
        </div>
      </div>
    )
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-primary mb-2">Destination not found</h2>
          <p className="text-gray-600 mb-6">The destination you're looking for doesn't exist.</p>
          <p className="text-sm text-gray-500 mb-4">ID received: {id}</p>
          <Link
            to="/destinations"
            className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Browse Destinations
          </Link>
        </div>
      </div>
    )
  }

  // Create images array from destination data
  const images = [
    destination.image,
    ...(destination.images || [])
  ].filter(Boolean)

  const nearbyAttractions = [
    { name: 'Upper Ghaghri Falls', distance: '12 km', type: 'Waterfall', rating: 4.5 },
    { name: 'Sunset Point', distance: '3 km', type: 'Viewpoint', rating: 4.8 },
    { name: 'Koel River', distance: '5 km', type: 'River', rating: 4.3 },
    { name: 'Betla National Park', distance: '25 km', type: 'Wildlife', rating: 4.6 }
  ]

  const reviews = [
    { user: 'Priya S.', rating: 5, comment: 'Breathtaking views! Must visit. The sunset point is magical.', date: '2 days ago', avatar: '👩' },
    { user: 'Rahul V.', rating: 4, comment: 'Beautiful place, well maintained. Good for family trips.', date: '1 week ago', avatar: '👨' },
    { user: 'Anita M.', rating: 5, comment: 'Amazing experience with family. The locals are very welcoming.', date: '2 weeks ago', avatar: '👩' }
  ]

  const tourPackages = [
    { name: 'Day Trip', duration: '1 Day', price: 1500, includes: ['Transport', 'Guide', 'Lunch'] },
    { name: 'Weekend Getaway', duration: '2 Days', price: 3500, includes: ['Accommodation', 'All Meals', 'Guide', 'Sightseeing'] },
    { name: 'Adventure Package', duration: '3 Days', price: 5500, includes: ['Trekking', 'Camping', 'Equipment', 'Guide', 'Meals'] }
  ]

  return (
    <div className="min-h-screen bg-secondary">
      
      {/* Image Gallery */}
      <section className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="h-[60vh]"
        >
          {images.length > 0 ? images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <img
                  src={img}
                  alt={`${destination.name} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x600?text=No+Image'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>
            </SwiperSlide>
          )) : (
            <SwiperSlide>
              <div className="relative h-full">
                <img
                  src="https://via.placeholder.com/1200x600?text=No+Image"
                  alt="No image available"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>

        {/* Back Button */}
        <Link
          to="/destinations"
          className="absolute top-6 left-6 z-10 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-black/70 transition flex items-center gap-2"
        >
          <span>←</span> Back to Destinations
        </Link>

        {/* Destination Name Overlay */}
        <div className="absolute bottom-12 left-12 z-10 text-white">
          <h1 className="text-5xl font-bold mb-2">{destination.name}</h1>
          <p className="text-xl flex items-center gap-2">
            <span>📍</span> {destination.district}, Jharkhand
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="absolute bottom-12 right-12 z-10 flex gap-3">
          <button 
            onClick={handleBookNow}
            className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2 shadow-lg"
          >
            <span>📅</span> Book Now
          </button>
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
            <span>❤️</span> Save
          </button>
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2">
            <span>📤</span> Share
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        
        {/* Quick Info Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 grid grid-cols-2 md:grid-cols-5 gap-6">
  <div className="text-center">
    <div className="text-3xl mb-2">⭐</div>
    <div className="font-bold text-primary">{destination.rating?.toFixed(1) || '4.5'}</div>
    <div className="text-sm text-gray-500">Rating</div>
  </div>
  <div className="text-center">
    <div className="text-3xl mb-2">🕒</div>
    <div className="font-bold text-primary">6 AM - 6 PM</div>
    <div className="text-sm text-gray-500">Opening Hours</div>
  </div>
  <div className="text-center">
    <div className="text-3xl mb-2">💰</div>
    <div className="font-bold text-primary">₹20</div>
    <div className="text-sm text-gray-500">Entry Fee</div>
  </div>
  <div className="text-center">
    <div className="text-3xl mb-2">🏆</div>
    <div className="font-bold text-primary">Top Rated</div>
    <div className="text-sm text-gray-500">Attraction</div>
  </div>
  <div className="text-center">
    <div className="text-3xl mb-2">👥</div>
    <div className="font-bold text-primary">50k+</div>
    <div className="text-sm text-gray-500">Annual Visitors</div>
  </div>
</div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap border-b mb-8">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            📖 Overview
          </TabButton>
          <TabButton active={activeTab === 'booking'} onClick={() => setActiveTab('booking')}>
            📅 Book & Packages
          </TabButton>
          <TabButton active={activeTab === 'map'} onClick={() => setActiveTab('map')}>
            🗺️ Map & Route
          </TabButton>
          <TabButton active={activeTab === 'nearby'} onClick={() => setActiveTab('nearby')}>
            📍 Nearby Attractions
          </TabButton>
          <TabButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>
            ⭐ Reviews
          </TabButton>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4">About {destination.name}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {destination.description || `Experience the beauty of ${destination.name}, 
                  one of Jharkhand's most beloved destinations. Located in the ${destination.district} 
                  district, this place offers breathtaking views and unforgettable experiences for 
                  nature lovers and adventure seekers alike.`}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
  <h3 className="font-bold text-primary mb-3">Best Time to Visit</h3>
  <p className="text-gray-700">October to March (Pleasant weather)</p>
</div>
                <div>
                  <h3 className="font-bold text-primary mb-3">Ideal Duration</h3>
                  <p className="text-gray-700">2-3 days to explore fully</p>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-3">Activities</h3>
                  <ul className="list-disc ml-6 text-gray-700">
                    <li>Sightseeing</li>
                    <li>Photography</li>
                    <li>Trekking</li>
                    <li>Picnic</li>
                    <li>Bird Watching</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-3">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.facilities?.map((facility, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{facility}</span>
                    )) || (
                      <>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Parking</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Restrooms</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Cafeteria</span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Guide Service</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* VR Experience CTA */}
              <div className="mt-8 p-6 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl">
                <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                  <div className="text-5xl">🕶️</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary mb-2">Experience in VR</h3>
                    <p className="text-gray-600">Take a virtual tour of {destination.name} from anywhere</p>
                  </div>
                  <button className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">
                    Launch VR Experience
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Booking & Packages Tab */}
          {activeTab === 'booking' && (
            <div className="space-y-8">
              {/* Booking Form */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span>📅</span> Book Your Visit
                </h2>
                <form onSubmit={handleBookingSubmit} className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Check-in Date</label>
                    <input
                      type="date"
                      value={bookingDetails.checkIn}
                      onChange={(e) => setBookingDetails({...bookingDetails, checkIn: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Check-out Date</label>
                    <input
                      type="date"
                      value={bookingDetails.checkOut}
                      onChange={(e) => setBookingDetails({...bookingDetails, checkOut: e.target.value})}
                      min={bookingDetails.checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Number of Guests</label>
                    <select
                      value={bookingDetails.guests}
                      onChange={(e) => setBookingDetails({...bookingDetails, guests: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent"
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Special Requests</label>
                    <textarea
                      value={bookingDetails.specialRequests}
                      onChange={(e) => setBookingDetails({...bookingDetails, specialRequests: e.target.value})}
                      placeholder="Dietary preferences, accessibility needs, etc."
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent"
                      rows={2}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-dark transition"
                    >
                      Proceed to Booking
                    </button>
                  </div>
                </form>
              </div>

              {/* Tour Packages */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span>🎒</span> Tour Packages
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {tourPackages.map((pkg, index) => (
                    <div key={index} className="border rounded-xl p-6 hover:shadow-lg transition">
                      <h3 className="text-xl font-bold text-primary mb-2">{pkg.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">Duration: {pkg.duration}</p>
                      <div className="text-2xl font-bold text-accent mb-3">₹{pkg.price}</div>
                      <ul className="space-y-2 text-sm text-gray-600 mb-4">
                        {pkg.includes.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-accent">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                      <button 
                        onClick={handleBookNow}
                        className="w-full border-2 border-accent text-accent py-2 rounded-lg font-semibold hover:bg-accent hover:text-white transition"
                      >
                        Book Package
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nearby Homestays */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span>🏡</span> Recommended Homestays
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex gap-4 p-4 border rounded-xl hover:shadow-lg transition">
                    <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=100" className="w-20 h-20 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-bold text-primary">Mountain View Homestay</h3>
                      <p className="text-sm text-gray-500">2 km from {destination.name}</p>
                      <p className="text-accent font-semibold mt-1">₹1,200/night</p>
                      <button className="mt-2 text-accent text-sm hover:underline">View Details →</button>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 border rounded-xl hover:shadow-lg transition">
                    <img src="https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=100" className="w-20 h-20 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-bold text-primary">Riverside Cottage</h3>
                      <p className="text-sm text-gray-500">3.5 km from {destination.name}</p>
                      <p className="text-accent font-semibold mt-1">₹1,500/night</p>
                      <button className="mt-2 text-accent text-sm hover:underline">View Details →</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Map Tab */}
          {activeTab === 'map' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Location & Route</h2>
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                {destination.coordinates ? (
                  <iframe
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${destination.coordinates.lng-0.1},${destination.coordinates.lat-0.1},${destination.coordinates.lng+0.1},${destination.coordinates.lat+0.1}&layer=mapnik&marker=${destination.coordinates.lat},${destination.coordinates.lng}`}
                    className="w-full h-full"
                    title="Location Map"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🗺️</div>
                      <p className="text-gray-600">Map location coming soon</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-bold text-primary mb-2">🚗 By Road</h3>
                  <p className="text-gray-600">Well-connected by local buses and taxis from nearby cities.</p>
                  <button 
                    onClick={() => window.open(`https://www.google.com/maps/search/${destination.name}+${destination.district}`, '_blank')}
                    className="mt-2 text-accent text-sm hover:underline flex items-center gap-1"
                  >
                    Get Directions <span>→</span>
                  </button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-bold text-primary mb-2">🚂 Nearest Railway Station</h3>
                  <p className="text-gray-600">Ranchi Junction - Well connected to major cities</p>
                </div>
              </div>
            </div>
          )}

          {/* Nearby Attractions Tab */}
          {activeTab === 'nearby' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Nearby Attractions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-lg transition group cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-primary group-hover:text-accent transition">{attraction.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{attraction.type}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm">{attraction.rating}</span>
                        </div>
                      </div>
                      <span className="text-accent text-sm font-medium">{attraction.distance}</span>
                    </div>
                    <button className="mt-3 text-accent text-sm hover:underline">View Details →</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">Visitor Reviews</h2>
                <button className="bg-accent text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90 transition">
                  Write a Review
                </button>
              </div>

              {/* Rating Summary */}
              <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-xl flex-wrap">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary">{destination.rating?.toFixed(1) || '4.5'}</div>
                  <div className="text-accent text-xl">★★★★☆</div>
                  <div className="text-sm text-gray-500 mt-1">128 reviews</div>
                </div>
                <div className="flex-1">
                  {[5,4,3,2,1].map(star => (
                    <div key={star} className="flex items-center gap-2 mb-1">
                      <span className="text-sm w-12">{star} star</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: `${star === 5 ? 60 : star === 4 ? 25 : 10}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-500 w-12">{star === 5 ? '60%' : star === 4 ? '25%' : '10%'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-xl">
                          {review.avatar}
                        </div>
                        <div>
                          <span className="font-bold text-primary">{review.user}</span>
                          <div className="text-accent text-sm">{'★'.repeat(review.rating)}</div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700 ml-12">{review.comment}</p>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 border border-gray-300 rounded-lg text-center hover:bg-gray-50 transition">
                Load More Reviews
              </button>
            </div>
          )}
        </div>

        {/* Booking CTA */}
        <div className="mt-8 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="mb-6">Book homestays, hire guides, or create your custom itinerary</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleBookNow}
              className="bg-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Book Now
            </button>
            <Link
              to="/homestays"
              className="bg-white/20 backdrop-blur-sm border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
            >
              Find Homestays
            </Link>
            <Link
              to="/map"
              className="bg-white/20 backdrop-blur-sm border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition"
            >
              View on Map
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Helper Components ---------------- */

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-semibold transition border-b-2 ${
        active
          ? 'border-accent text-accent'
          : 'border-transparent text-gray-500 hover:text-accent hover:border-gray-300'
      }`}
    >
      {children}
    </button>
  )
}