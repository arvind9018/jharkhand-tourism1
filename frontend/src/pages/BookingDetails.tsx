// pages/BookingDetails.tsx
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Phone, Mail, MessageCircle, ChevronLeft } from 'lucide-react';

export default function BookingDetails() {
  const { id } = useParams();
  
  // Mock data - replace with actual API call
  const booking = {
    id: 1,
    type: 'Homestay',
    name: 'Mountain View Homestay',
    location: 'Netarhat',
    address: 'Village Road, Near Sunset Point, Netarhat, Latehar',
    checkIn: '2024-04-15',
    checkOut: '2024-04-18',
    status: 'confirmed',
    price: 3600,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
    guests: 2,
    amenities: ['WiFi', 'Parking', 'Meals', 'Hot Water'],
    host: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh@example.com',
      responseTime: '< 1 hour'
    },
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in. After that, 50% of the total amount will be charged.'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/bookings"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-accent mb-6 transition"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Bookings
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">{booking.name}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{booking.location}</span>
              </div>
            </div>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              {booking.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <img src={booking.image} alt={booking.name} className="w-full h-64 object-cover" />
            </div>

            {/* Booking Details */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Booking Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-accent mb-2" />
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="font-semibold">{new Date(booking.checkIn).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}</p>
                  <p className="text-xs text-gray-500">2:00 PM</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-accent mb-2" />
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="font-semibold">{new Date(booking.checkOut).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}</p>
                  <p className="text-xs text-gray-500">11:00 AM</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <Users className="w-5 h-5 text-accent mb-2" />
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="font-semibold">{booking.guests} Guests</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Total Nights</p>
                  <p className="font-semibold">
                    {Math.ceil((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-3">
                {booking.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                    <span className="text-accent">✓</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Cancellation Policy</h2>
              <p className="text-gray-600">{booking.cancellationPolicy}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* Price Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Price Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Price</span>
                  <span>₹{booking.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span>₹{Math.round(booking.price * 0.12)}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-accent">₹{booking.price + Math.round(booking.price * 0.12)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Host Information */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-primary mb-4">Host Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-xl">
                    👤
                  </div>
                  <div>
                    <p className="font-semibold">{booking.host.name}</p>
                    <p className="text-xs text-gray-500">Response: {booking.host.responseTime}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <a href={`tel:${booking.host.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-accent transition">
                    <Phone className="w-4 h-4" />
                    {booking.host.phone}
                  </a>
                  <a href={`mailto:${booking.host.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-accent transition">
                    <Mail className="w-4 h-4" />
                    {booking.host.email}
                  </a>
                </div>

                <button className="w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent-dark transition flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Message Host
                </button>
              </div>
            </div>

            {/* Download Invoice */}
            <button className="w-full border-2 border-accent text-accent py-3 rounded-xl font-semibold hover:bg-accent hover:text-white transition">
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}