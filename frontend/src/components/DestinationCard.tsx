// components/DestinationCard.tsx
import { Link } from "react-router-dom"
import type { Destination } from "../types/Destination"

interface Props {
  destination: Destination
}

export default function DestinationCard({ destination }: Props) {
  return (
    <Link to={`/destinations/${destination.id}`}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
        <div className="relative h-56 overflow-hidden">
          <img
            src={destination.image || 'https://via.placeholder.com/400x300'}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
            ⭐ {destination.rating || '4.5'}
          </div>
          {destination.category && (
            <div className="absolute bottom-4 left-4 bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
              {destination.category}
            </div>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-accent transition">
            {destination.name}
          </h3>
          <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
            <span>📍</span> {destination.district}
          </p>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {destination.description || `Explore the beauty of ${destination.name} in ${destination.district} district.`}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-accent font-semibold text-sm">Learn more →</span>
            <span className="text-xs text-gray-500">12 km away</span>
          </div>
        </div>
      </div>
    </Link>
  )
}