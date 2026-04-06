// pages/HelpCenter.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, HelpCircle, Book, CreditCard, User, Shield, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');

  const helpTopics = [
    {
      icon: <Book className="w-6 h-6" />,
      title: 'Getting Started',
      description: 'New to Jharkhand Tourism? Learn the basics.',
      color: 'bg-blue-100 text-blue-600',
      link: '/help/getting-started'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Homestay Bookings',
      description: 'How to book, cancel, and manage homestays.',
      color: 'bg-green-100 text-green-600',
      link: '/help/bookings'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Payments & Refunds',
      description: 'Payment methods, billing, and refunds.',
      color: 'bg-purple-100 text-purple-600',
      link: '/help/payments'
    },
    {
      icon: <User className="w-6 h-6" />,
      title: 'Account Management',
      description: 'Managing your profile, password, and settings.',
      color: 'bg-orange-100 text-orange-600',
      link: '/help/account'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Privacy & Security',
      description: 'Keeping your account and data safe.',
      color: 'bg-red-100 text-red-600',
      link: '/help/privacy'
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: 'Troubleshooting',
      description: 'Fix common issues and errors.',
      color: 'bg-pink-100 text-pink-600',
      link: '/help/troubleshooting'
    }
  ];

  const popularArticles = [
    'How to book a homestay',
    'Cancellation policy explained',
    'Payment methods accepted',
    'How to reset your password',
    'Contacting homestay owners',
    'Verifying your account',
    'Understanding refunds',
    'Safety guidelines for travelers'
  ];

  const faqHighlights = [
    { q: 'What documents do I need for booking?', a: 'A valid government ID is required for check-in.' },
    { q: 'Can I modify my booking dates?', a: 'Yes, you can modify dates up to 48 hours before check-in.' },
    { q: 'Are pets allowed in homestays?', a: 'Pet policies vary by property. Check listing details.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 bg-accent/10 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">How Can We Help You?</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search our help center or browse topics below to find answers to your questions.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent shadow-lg"
            />
          </div>
        </motion.div>

        {/* Help Topics Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {helpTopics.map((topic, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link
                to={topic.link}
                className="block bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className={`w-12 h-12 ${topic.color} rounded-xl flex items-center justify-center mb-4`}>
                  {topic.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{topic.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{topic.description}</p>
                <span className="text-accent text-sm font-semibold flex items-center gap-1">
                  Learn more <span>→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Popular Articles & FAQ Highlights */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Popular Articles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-accent rounded-full"></span>
              Popular Articles
            </h2>
            <div className="space-y-3">
              {popularArticles.map((article, index) => (
                <Link
                  key={index}
                  to={`/help/article/${index}`}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition group"
                >
                  <span className="text-accent">📄</span>
                  <span className="text-gray-700 group-hover:text-accent transition">{article}</span>
                  <span className="ml-auto text-gray-400 group-hover:text-accent transition">→</span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* FAQ Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-accent rounded-full"></span>
              Frequently Asked
            </h2>
            <div className="space-y-4">
              {faqHighlights.map((faq, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <p className="font-medium text-primary mb-2">{faq.q}</p>
                  <p className="text-sm text-gray-600">{faq.a}</p>
                </div>
              ))}
              <Link
                to="/faq"
                className="inline-block mt-2 text-accent font-semibold hover:underline"
              >
                View all FAQs →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Still Need Help?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6" />
              </div>
              <p className="font-semibold mb-1">Live Chat</p>
              <p className="text-sm text-white/80">Available 24/7</p>
              <button className="mt-3 bg-white text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition">
                Start Chat
              </button>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6" />
              </div>
              <p className="font-semibold mb-1">Email Support</p>
              <p className="text-sm text-white/80">Response within 24h</p>
              <a href="mailto:support@jharkhandtourism.gov.in" className="mt-3 inline-block bg-white text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition">
                Send Email
              </a>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6" />
              </div>
              <p className="font-semibold mb-1">Phone Support</p>
              <p className="text-sm text-white/80">Mon-Fri, 9am-6pm</p>
              <p className="mt-3 text-lg font-bold">+91 1234 567 890</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}