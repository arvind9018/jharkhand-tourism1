// pages/PaymentSuccess.tsx
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Download, Home, Printer } from 'lucide-react';

export default function PaymentSuccess() {
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <Link to="/" className="text-accent hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Your booking has been confirmed</p>
        </div>

        {/* Booking Confirmation Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary">Booking Confirmation</h2>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
              CONFIRMED
            </span>
          </div>

          {/* Booking Details */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <img 
                src={booking.image} 
                alt={booking.name}
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-primary">{booking.name}</h3>
                <p className="text-gray-600">{booking.location}</p>
                <p className="text-sm text-gray-500 mt-1">Booking ID: #{booking.id}23456</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
              {booking.checkIn && (
                <div>
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="font-semibold">{new Date(booking.checkIn).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}</p>
                </div>
              )}
              {booking.checkOut && (
                <div>
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="font-semibold">{new Date(booking.checkOut).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    day: 'numeric', 
                    month: 'short', 
                    year: 'numeric' 
                  })}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Guests</p>
                <p className="font-semibold">{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment</p>
                <p className="font-semibold text-green-600">Paid ✓</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-bold text-accent text-2xl">₹{booking.price + Math.round(booking.price * 0.12)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="flex-1 bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-dark transition flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download Invoice
            </button>
            <button className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <Printer className="w-5 h-5" />
              Print
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
          <ul className="space-y-2 text-sm text-white/90">
            <li className="flex items-start gap-2">
              <span className="text-accent">1.</span>
              You'll receive a confirmation email with all details
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">2.</span>
              Contact the host 48 hours before check-in
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">3.</span>
              Carry valid ID proof at check-in
            </li>
          </ul>
          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}