// src/pages/Wishlist.tsx
import { Link } from "react-router-dom"

export default function Wishlist() {
  // Mock data - replace with actual data from API
  const wishlistItems = [
    {
      id: 1,
      name: "Netarhat",
      location: "Latehar",
      image: "https://images.unsplash.com/photo-1625505826533-5c80aca7d656?w=400",
      type: "destination"
    },
    {
      id: 2,
      name: "Mountain View Homestay",
      location: "Netarhat",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
      type: "homestay"
    }
  ]

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">My Wishlist</h1>
        <p className="text-gray-600 mb-8">Your saved destinations and homestays</p>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-2xl font-bold text-primary mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start exploring and save your favorite places!</p>
            <Link
              to="/destinations"
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90"
            >
              Explore Destinations
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img src={item.image} alt={item.name} className="h-48 w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-primary">{item.name}</h3>
                  <p className="text-gray-600">📍 {item.location}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm capitalize bg-accent/10 text-accent px-3 py-1 rounded-full">
                      {item.type}
                    </span>
                    <button className="text-red-500 hover:text-red-700">
                      <span className="text-2xl">❤️</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}