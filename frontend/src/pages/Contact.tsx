// pages/Contact.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError('');
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess(false);

  try {
    const response = await fetch('https://jharkhand-tourism1-1.onrender.com/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form)
    });
    
    const data = await response.json();
    
    if (data.success) {
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } else {
      setError(data.message || 'Failed to send message');
    }
  } catch (error) {
    console.error('Contact error:', error);
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary">
      {/* Hero Section with 3D Elements */}
      <div className="relative bg-gradient-to-r from-primary to-primary-dark text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-1/4 animate-float">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl rotate-12 backdrop-blur-sm"></div>
          </div>
          <div className="absolute bottom-20 right-1/4 animate-float-delay">
            <div className="w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            {/* 3D Icon */}
            <div className="inline-block mb-6 transform hover:scale-110 transition-transform duration-500">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 bg-accent rounded-2xl rotate-6 animate-float-slow"></div>
                <div className="absolute inset-0 bg-accent-light rounded-2xl -rotate-3 animate-float"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">📞</span>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,120 C480,120 960,0 1440,0 L1440,120 L0,120 Z" fill="#F5F5F5"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left Column - Contact Info & 3D Cards */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Address Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition">
                  <span className="text-3xl">📍</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Visit Us</h3>
                <p className="text-gray-600 text-sm">
                  Tourism Office<br />
                  Ranchi, Jharkhand<br />
                  PIN: 834001
                </p>
              </div>

              {/* Call Us Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition">
                  <span className="text-3xl">📞</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm">
                  +91 1234 567 890<br />
                  +91 9876 543 210<br />
                  Mon-Fri, 9am-6pm
                </p>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition">
                  <span className="text-3xl">✉️</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm">
                  info@jharkhandtourism.gov.in<br />
                  support@jharkhandtourism.gov.in
                </p>
              </div>

              {/* Social Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition">
                  <span className="text-3xl">🌐</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition">📘</a>
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition">📸</a>
                  <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition">🐦</a>
                </div>
              </div>
            </div>

            {/* 3D Map Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-accent rounded-full"></span>
                Find Us on Map
              </h3>
              
              <div className="relative h-48 bg-gray-100 rounded-xl overflow-hidden">
                {/* Placeholder for actual map - replace with Google Maps iframe */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl mb-2 block">🗺️</span>
                    <p className="text-sm text-gray-600">Interactive Map Loading...</p>
                    <p className="text-xs text-gray-500 mt-1">Tourism Office, Ranchi</p>
                  </div>
                </div>
                
                {/* Map Overlay with 3D effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                  📍 Tourism Office
                </div>
              </div>
            </div>

            {/* 3D Stats Card */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-accent rounded-full"></span>
                Quick Support
              </h3>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div>
                  <div className="text-3xl font-bold text-accent">24/7</div>
                  <p className="text-xs text-white/80">Emergency Support</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">&lt; 2hr</div>
                  <p className="text-xs text-white/80">Avg. Response Time</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">98%</div>
                  <p className="text-xs text-white/80">Satisfaction Rate</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">5k+</div>
                  <p className="text-xs text-white/80">Queries Resolved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-primary mb-2">Send us a Message</h2>
              <p className="text-gray-600 mb-6">We'll get back to you within 24 hours</p>

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-slideDown">
                  <p className="text-green-600 text-sm flex items-center gap-2">
                    <span className="text-lg">✅</span>
                    Thank you for your message! We'll contact you soon.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-shake">
                  <p className="text-red-600 text-sm flex items-center gap-2">
                    <span className="text-lg">⚠️</span>
                    {error}
                  </p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <div className="group">
                  <label className="block text-sm font-medium text-primary mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400 group-focus-within:text-accent transition">👤</span>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="group">
                  <label className="block text-sm font-medium text-primary mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400 group-focus-within:text-accent transition">📧</span>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                    />
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div className="group">
                  <label className="block text-sm font-medium text-primary mb-2">
                    Subject *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400 group-focus-within:text-accent transition">📋</span>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition appearance-none bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Support</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="complaint">Complaint</option>
                      <option value="partnership">Partnership Opportunity</option>
                    </select>
                    <span className="absolute right-3 top-3 text-gray-400">▼</span>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="group">
                  <label className="block text-sm font-medium text-primary mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400 group-focus-within:text-accent transition">💬</span>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Type your message here..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent-dark text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="group-hover:translate-x-1 transition">✈️</span>
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent-dark opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>

                {/* Privacy Note */}
                <p className="text-xs text-center text-gray-500 mt-4">
                  By submitting this form, you agree to our{' '}
                  <Link to="/privacy" className="text-accent hover:underline">Privacy Policy</Link>
                  {' '}and{' '}
                  <Link to="/terms" className="text-accent hover:underline">Terms of Service</Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition">
                  <span className="text-xl">⏰</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-2">What are your support hours?</h3>
                  <p className="text-gray-600 text-sm">Our support team is available Monday to Friday, 9:00 AM to 6:00 PM IST. For emergency queries, email us anytime.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition">
                  <span className="text-xl">⏱️</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-2">How quickly do you respond?</h3>
                  <p className="text-gray-600 text-sm">We aim to respond to all queries within 24 hours on weekdays and within 48 hours on weekends.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition">
                  <span className="text-xl">🏢</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-2">Can I visit your office?</h3>
                  <p className="text-gray-600 text-sm">Yes, our office is open for visitors from 10:00 AM to 4:00 PM on weekdays. Please schedule an appointment first.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition group">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition">
                  <span className="text-xl">📱</span>
                </div>
                <div>
                  <h3 className="font-bold text-primary mb-2">Do you have a mobile app?</h3>
                  <p className="text-gray-600 text-sm">Yes! Download our app from Google Play Store or Apple App Store for a better mobile experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
