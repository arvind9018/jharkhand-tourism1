// components/DestinationSlider.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import type { Destination } from "../types/Destination"
import { fetchFeaturedDestinations } from "../services/api"

export default function DestinationSlider() {
  const [data, setData] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        setLoading(true)
        const destinations = await fetchFeaturedDestinations()
        
        if (Array.isArray(destinations) && destinations.length > 0) {
          setData(destinations)
          setError(null)
        } else {
          setError('No destinations found')
        }
      } catch (err) {
        console.error('Error loading destinations:', err)
        setError('Failed to load destinations')
      } finally {
        setLoading(false)
      }
    }

    loadDestinations()
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <p className="text-red-600 mb-3">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition"
        >
          Try Again
        </button>
      </div>
    )
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500 p-12 bg-gray-50 rounded-lg">
        <p className="text-lg">No destinations available</p>
        <p className="text-sm mt-2">Check back later for updates</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className="destination-slider pb-12"
      >
        {data.map((destination) => (
          <SwiperSlide key={destination.id}>
            <Link to={`/destinations/${destination.id}`}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={destination.image || destination.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'} 
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image'
                    }}
                  />
                  {/* Rating Badge */}
                  {destination.rating && (
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold shadow">
                      ⭐ {destination.rating?.toFixed(1) || '4.5'}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary mb-1 line-clamp-1">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    📍 {destination.district}
                  </p>
                  {destination.category && (
                    <span className="inline-block px-2 py-1 bg-secondary text-xs rounded-full text-accent">
                      {destination.category}
                    </span>
                  )}
                  {destination.description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                      {destination.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS for Swiper */}
      <style>{`
        .destination-slider .swiper-pagination-bullet {
          background: #FF6B35;
        }
        .destination-slider .swiper-button-prev,
        .destination-slider .swiper-button-next {
          color: #FF6B35;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .destination-slider .swiper-button-prev:after,
        .destination-slider .swiper-button-next:after {
          font-size: 18px;
        }
        .destination-slider .swiper-button-prev:hover,
        .destination-slider .swiper-button-next:hover {
          background: #FF6B35;
          color: white;
        }
        @media (max-width: 640px) {
          .destination-slider .swiper-button-prev,
          .destination-slider .swiper-button-next {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}