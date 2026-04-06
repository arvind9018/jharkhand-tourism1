// pages/Payment.tsx
import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CreditCard, Lock, Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [form, setForm] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  if (!booking) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">No Booking Selected</h2>
          <Link to="/bookings" className="text-accent hover:underline">
            Return to Bookings
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      
      // Navigate to success page after 2 seconds
      setTimeout(() => {
        navigate('/payment-success', { 
          state: { 
            booking: { ...booking, paymentStatus: 'paid', status: 'confirmed' }
          } 
        });
      }, 2000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>
          <div className="animate-pulse text-sm text-gray-500">Redirecting to confirmation...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Complete Payment</h1>
          <p className="text-gray-600">Secure your booking by completing the payment</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {/* Security Badge */}
              <div className="flex items-center gap-2 bg-green-50 text-green-700 p-3 rounded-xl mb-6">
                <Lock className="w-5 h-5" />
                <span className="text-sm font-medium">256-bit SSL Secure Payment</span>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="font-semibold text-primary mb-3">Payment Method</h3>
                <div className="grid grid-cols-3 gap-3">
                  {['card', 'upi', 'netbanking'].map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`p-3 border rounded-xl transition ${
                        paymentMethod === method
                          ? 'border-accent bg-accent/5'
                          : 'border-gray-200 hover:border-accent/50'
                      }`}
                    >
                      <span className="text-2xl block mb-1">
                        {method === 'card' ? '💳' : method === 'upi' ? '📱' : '🏦'}
                      </span>
                      <span className="text-xs capitalize">{method}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Details Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                      maxLength={19}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={form.cardName}
                      onChange={handleInputChange}
                      placeholder="As shown on card"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={form.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        CVV
                      </label>
                      <input
                        type="password"
                        name="cvv"
                        value={form.cvv}
                        onChange={handleInputChange}
                        placeholder="***"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                        maxLength={3}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent hover:bg-accent-dark text-white py-4 rounded-xl font-semibold transition disabled:opacity-50 relative"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Pay ₹{booking.price}
                      </span>
                    )}
                  </button>
                </form>
              )}

              {/* UPI Form */}
              {paymentMethod === 'upi' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      placeholder="username@okhdfcbank"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {['Google Pay', 'PhonePe', 'Paytm'].map((app) => (
                      <button
                        key={app}
                        type="button"
                        className="p-3 border border-gray-200 rounded-xl hover:border-accent transition"
                      >
                        <span className="text-2xl block mb-1">
                          {app === 'Google Pay' ? '📱' : app === 'PhonePe' ? '📲' : '🪙'}
                        </span>
                        <span className="text-xs">{app}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent hover:bg-accent-dark text-white py-4 rounded-xl font-semibold transition disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : `Pay ₹${booking.price}`}
                  </button>
                </form>
              )}

              {/* Netbanking Form */}
              {paymentMethod === 'netbanking' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <select
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  >
                    <option value="">Select your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                  </select>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent hover:bg-accent-dark text-white py-4 rounded-xl font-semibold transition disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : `Pay ₹${booking.price}`}
                  </button>
                </form>
              )}

              <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1">
                <Shield className="w-4 h-4" />
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 className="font-bold text-primary text-lg mb-4">Booking Summary</h3>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img src={booking.image} alt={booking.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{booking.name}</p>
                    <p className="text-sm text-gray-600">{booking.location}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                  {booking.checkIn && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Check-in</span>
                      <span className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</span>
                    </div>
                  )}
                  {booking.checkOut && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Check-out</span>
                      <span className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Guests</span>
                    <span className="font-medium">{booking.guests}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{booking.price}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span>₹{Math.round(booking.price * 0.12)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-primary text-lg">
                    <span>Total</span>
                    <span className="text-accent">₹{booking.price + Math.round(booking.price * 0.12)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}