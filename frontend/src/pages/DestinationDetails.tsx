// pages/DestinationDetails.tsx
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import type { Destination } from "../types/Destination"
import { fetchDestinationById } from "../services/api"

export default function DestinationDetails() {
  const { id } = useParams()
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'reviews' | 'nearby'>('overview')
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    loadDestination()
  }, [id])

  const loadDestination = async () => {
    setLoading(true)
    try {
      const data = await fetchDestinationById(id!)
      setDestination(data)
    } catch (error) {
      console.error('Error loading destination:', error)
    } finally {
      setLoading(false)
    }
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

  // Mock data for demonstration
  const images = [
    destination.image || 'https://via.placeholder.com/1200x600',
    'https://images.unsplash.com/photo-1625505826533-5c80aca7d656?w=1200',
    'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200'
  ]

  const nearbyAttractions = [
    { name: 'Upper Ghaghri Falls', distance: '12 km', type: 'Waterfall' },
    { name: 'Sunset Point', distance: '3 km', type: 'Viewpoint' },
    { name: 'Koel River', distance: '5 km', type: 'River' },
    { name: 'Betla National Park', distance: '25 km', type: 'Wildlife' }
  ]

  const reviews = [
    { user: 'Priya S.', rating: 5, comment: 'Breathtaking views! Must visit.', date: '2 days ago' },
    { user: 'Rahul V.', rating: 4, comment: 'Beautiful place, well maintained.', date: '1 week ago' },
    { user: 'Anita M.', rating: 5, comment: 'Amazing experience with family.', date: '2 weeks ago' }
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
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <img
                  src={img}
                  alt={`${destination.name} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Back Button */}
        <Link
          to="/destinations"
          className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg hover:bg-white transition flex items-center gap-2"
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
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        
        {/* Quick Info Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="font-bold text-primary">4.5</div>
            <div className="text-sm text-gray-500">Rating (128 reviews)</div>
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
            <div className="font-bold text-primary">#1 Attraction</div>
            <div className="text-sm text-gray-500">In {destination.district}</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b mb-8">
          <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            Overview
          </TabButton>
          <TabButton active={activeTab === 'map'} onClick={() => setActiveTab('map')}>
            Map & Route
          </TabButton>
          <TabButton active={activeTab === 'nearby'} onClick={() => setActiveTab('nearby')}>
            Nearby Attractions
          </TabButton>
          <TabButton active={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>
            Reviews
          </TabButton>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
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
                  <h3 className="font-bold text-primary mb-3">Activities</h3>
                  <ul className="list-disc ml-6 text-gray-700">
                    <li>Sightseeing</li>
                    <li>Photography</li>
                    <li>Trekking</li>
                    <li>Picnic</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-primary mb-3">Facilities</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">Parking</span>
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">Restrooms</span>
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">Cafeteria</span>
                  <span className="px-4 py-2 bg-gray-100 rounded-full text-sm">Guide Service</span>
                </div>
              </div>

              {/* VR Experience CTA */}
              <div className="mt-8 p-6 bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">🕶️</div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Experience in VR</h3>
                    <p className="text-gray-600 mb-4">Take a virtual tour of {destination.name} from anywhere</p>
                    <button className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition">
                      Launch VR Experience
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'map' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Location & Route</h2>
              <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-gray-600">Interactive GIS Map Loading...</p>
                  <p className="text-sm text-gray-500 mt-2">Coordinates: 23.45° N, 85.32° E</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-bold text-primary mb-2">By Road</h3>
                  <p className="text-gray-600">Well-connected by local buses and taxis from Ranchi. Regular bus service available.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-bold text-primary mb-2">Nearest Railway Station</h3>
                  <p className="text-gray-600">Ranchi Junction (25 km) - Well connected to major cities</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nearby' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Nearby Attractions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-lg transition">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-primary">{attraction.name}</h3>
                      <span className="text-accent text-sm">{attraction.distance}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{attraction.type}</p>
                    <button className="mt-3 text-accent text-sm hover:underline">View Details →</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">Visitor Reviews</h2>
                <button className="bg-accent text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90">
                  Write a Review
                </button>
              </div>

              {/* Rating Summary */}
              <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary">4.5</div>
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
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-primary">{review.user}</span>
                        <span className="text-accent ml-2">{'★'.repeat(review.rating)}</span>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking CTA */}
        <div className="mt-8 bg-accent text-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Visit</h2>
          <p className="mb-6">Book homestays, hire guides, or create your itinerary</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/homestays"
              className="bg-white text-accent px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Find Homestays
            </Link>
            <Link
              to="/map"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-accent transition"
            >
              View on Map
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Helper Component ---------------- */

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-semibold transition border-b-2 ${
        active
          ? 'border-accent text-accent'
          : 'border-transparent text-gray-500 hover:text-accent'
      }`}
    >
      {children}
    </button>
  )
}