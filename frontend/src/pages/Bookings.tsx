// pages/Bookings.tsx
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getStoredUser } from "../services/authApi"
import { CreditCard, MapPin, Calendar, Clock, ChevronRight } from 'lucide-react'

export default function Bookings() {
  const navigate = useNavigate()
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
      price: 3600,
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
      guests: 2,
      paymentStatus: 'paid'
    },
    {
      id: 2,
      type: 'Tour',
      name: 'Waterfall Trekking Tour',
      location: 'Hundru Falls',
      date: '2024-04-20',
      status: 'pending',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400',
      guests: 4,
      paymentStatus: 'pending'
    },
    {
      id: 3,
      type: 'Homestay',
      name: 'Riverside Cottage',
      location: 'Dassam Falls',
      checkIn: '2024-05-10',
      checkOut: '2024-05-15',
      status: 'confirmed',
      price: 7500,
      image: 'https://images.unsplash.com/photo-1520277739336-7bf67edfa768?w=400',
      guests: 3,
      paymentStatus: 'paid'
    }
  ])

  const handleViewDetails = (bookingId: number) => {
    navigate(`/bookings/${bookingId}`)
  }

  const handleMakePayment = (booking: any) => {
    navigate('/payment', { state: { booking } })
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary">My Bookings</h1>
            <p className="text-gray-600 mt-2">Manage your bookings and reservations</p>
          </div>
          <Link
            to="/homestays"
            className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent-dark transition flex items-center gap-2"
          >
            <span>+</span> New Booking
          </Link>
        </div>

        {/* Booking Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Total Bookings</p>
            <p className="text-2xl font-bold text-primary">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {bookings.filter(b => b.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="text-2xl font-bold text-accent">
              ₹{bookings.reduce((sum, b) => sum + b.price, 0)}
            </p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
            <div className="text-8xl mb-6 animate-bounce-slow">📅</div>
            <h3 className="text-3xl font-bold text-primary mb-3">No Bookings Yet</h3>
            <p className="text-gray-600 mb-8 text-lg">Start exploring and book your first stay or tour!</p>
            <Link
              to="/homestays"
              className="inline-block bg-accent text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-accent-dark transition shadow-lg"
            >
              Browse Homestays
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-48 h-48 md:h-auto relative">
                    <img 
                      src={booking.image} 
                      alt={booking.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                      {booking.type === 'Homestay' ? '🏡 Homestay' : '🧭 Tour'}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-primary mb-2">{booking.name}</h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{booking.location}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                          {booking.checkIn && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>Check-in: {new Date(booking.checkIn).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>
                          )}
                          {booking.checkOut && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>Check-out: {new Date(booking.checkOut).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>
                          )}
                          {booking.date && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>Date: {new Date(booking.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-2 border ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <p className="text-3xl font-bold text-accent">₹{booking.price}</p>
                        <p className="text-sm text-gray-500">
                          {booking.paymentStatus === 'paid' ? '✅ Paid' : '⏳ Payment Pending'}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-3">
                      <button
                        onClick={() => handleViewDetails(booking.id)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      
                      {booking.paymentStatus === 'pending' && (
                        <button
                          onClick={() => handleMakePayment(booking)}
                          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition flex items-center gap-2"
                        >
                          <CreditCard className="w-4 h-4" />
                          Pay Now
                        </button>
                      )}
                      
                      {booking.status === 'confirmed' && (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                          Download Invoice
                        </button>
                      )}
                    </div>
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