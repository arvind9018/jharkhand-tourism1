// pages/Bookings.tsx
import { useState } from "react"
import { Link } from "react-router-dom"
import { getStoredUser } from "../services/authApi"

export default function Bookings() {
  const user = getStoredUser()
  const [bookings, setBookings] = useState<any[]>([
    {
      id: 1,
      type: 'Homestay',
      name: 'Mountain View Homestay',
      location: 'Netarhat',
      checkIn: '2024-04-15',
      checkOut: '2024-04-18',
      status: 'confirmed',
      price: 3600
    },
    {
      id: 2,
      type: 'Tour',
      name: 'Waterfall Trekking Tour',
      location: 'Hundru Falls',
      date: '2024-04-20',
      status: 'pending',
      price: 1500
    }
  ])

  return (
    <div className="min-h-screen bg-secondary py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-2">My Bookings</h1>
        <p className="text-gray-600 mb-8">Manage your bookings and reservations</p>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-primary mb-2">No Bookings Yet</h3>
            <p className="text-gray-600 mb-6">Start exploring and book your first stay or tour!</p>
            <Link
              to="/homestays"
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90"
            >
              Browse Homestays
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {booking.type === 'Homestay' ? '🏡' : '🧭'}
                      </span>
                      <h3 className="text-xl font-bold text-primary">{booking.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-2">📍 {booking.location}</p>
                    <div className="flex gap-4 text-sm">
                      {booking.checkIn && (
                        <span>📅 Check-in: {new Date(booking.checkIn).toLocaleDateString()}</span>
                      )}
                      {booking.checkOut && (
                        <span>📅 Check-out: {new Date(booking.checkOut).toLocaleDateString()}</span>
                      )}
                      {booking.date && (
                        <span>📅 Date: {new Date(booking.date).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm mb-2 ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.status}
                    </span>
                    <p className="text-2xl font-bold text-accent">₹{booking.price}</p>
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