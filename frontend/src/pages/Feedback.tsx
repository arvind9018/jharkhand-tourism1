// pages/Feedback.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Feedback() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: 'suggestion',
    rating: 5,
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const feedbackTypes = [
    { value: 'suggestion', label: '💡 Suggestion', icon: '💡' },
    { value: 'compliment', label: '🌟 Compliment', icon: '🌟' },
    { value: 'complaint', label: '⚠️ Complaint', icon: '⚠️' },
    { value: 'bug', label: '🐛 Bug Report', icon: '🐛' },
    { value: 'other', label: '📝 Other', icon: '📝' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setForm({ name: '', email: '', type: 'suggestion', rating: 5, message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 bg-accent/10 rounded-full mb-4 relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping"></div>
            <span className="text-5xl relative z-10 animate-bounce-slow">💬</span>
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">We Value Your Feedback</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your insights help us create better experiences for travelers exploring the beauty of Jharkhand.
          </p>
        </motion.div>

        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
            >
              <span className="text-2xl">✅</span>
              <p className="text-green-700">Thank you for your valuable feedback! We'll review it shortly.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full -ml-24 -mb-24"></div>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            {/* Name and Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="group">
                <label className="block text-sm font-medium text-primary mb-2">Your Name</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400 group-focus-within:text-accent transition">👤</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              <div className="group">
                <label className="block text-sm font-medium text-primary mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400 group-focus-within:text-accent transition">📧</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            {/* Feedback Type with Icons */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Feedback Type</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {feedbackTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setForm({ ...form, type: type.value })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      form.type === type.value
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-gray-200 hover:border-accent/50 text-gray-600'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{type.icon}</span>
                    <span className="text-xs font-medium">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Rating with Interactive Stars */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Rating</label>
              <div className="flex gap-2 items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setForm({ ...form, rating: star })}
                    className="text-4xl focus:outline-none transition"
                  >
                    <span className={
                      star <= (hoveredStar || form.rating)
                        ? 'text-accent drop-shadow-lg'
                        : 'text-gray-300'
                    }>★</span>
                  </motion.button>
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  {form.rating === 5 ? 'Excellent!' :
                   form.rating === 4 ? 'Good' :
                   form.rating === 3 ? 'Average' :
                   form.rating === 2 ? 'Poor' : 'Very Poor'}
                </span>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-primary mb-2">Your Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition resize-none"
                placeholder="Please share your thoughts, suggestions, or concerns..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-accent to-accent-dark text-white py-4 rounded-xl font-semibold transition disabled:opacity-50 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Feedback
                    <span className="group-hover:translate-x-1 transition">✈️</span>
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent-dark opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>
          </form>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>Your feedback is anonymous and will be used to improve our services.</p>
          <p className="mt-2">For urgent matters, please <Link to="/contact" className="text-accent hover:underline">contact support</Link> directly.</p>
        </motion.div>
      </div>
    </div>
  );
}