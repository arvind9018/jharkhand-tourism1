// pages/FAQ.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
const faqs = [
  {
    category: 'General',
    icon: '🌐',
    questions: [
      { q: 'What is Jharkhand Tourism?', a: 'Jharkhand Tourism is India\'s first Smart Digital Tourism platform promoting sustainable travel, tribal culture, and community-based tourism across Jharkhand\'s 24 districts.' },
      { q: 'Is the platform free to use?', a: 'Yes, browsing destinations, maps, and information is completely free. Only bookings and marketplace purchases require payment.' },
      { q: 'Do I need to create an account?', a: 'You can browse without an account, but you\'ll need to sign up to book homestays, purchase products, or save favorites.' },
      { q: 'Is the platform available in multiple languages?', a: 'Currently available in English and Hindi. More languages coming soon.' },
    ]
  },
  {
    category: 'Bookings',
    icon: '🏡',
    questions: [
      { q: 'How do I book a homestay?', a: 'Browse homestays, select your dates, and click "Book Now". You\'ll receive a confirmation email once booked.' },
      { q: 'Can I cancel my booking?', a: 'Yes, cancellations are allowed up to 48 hours before check-in for a full refund. Cancellations within 48 hours may incur charges.' },
      { q: 'How do I pay?', a: 'We accept all major credit/debit cards, UPI (Google Pay, PhonePe, Paytm), and net banking.' },
      { q: 'Are the homestays verified?', a: 'Yes, all homestays are verified by our team for authenticity, safety, and quality.' },
    ]
  },
  {
    category: 'Marketplace',
    icon: '🛍️',
    questions: [
      { q: 'How do I buy handicrafts?', a: 'Browse products, add to cart, and checkout. Items are shipped within 5-7 business days.' },
      { q: 'Are products authentic?', a: 'All products are verified and sourced directly from local artisans.' },
      { q: 'What is the return policy?', a: 'Returns accepted within 7 days of delivery for damaged or defective items.' },
      { q: 'Do you ship internationally?', a: 'Currently shipping within India only. International shipping coming soon.' },
    ]
  },
  {
    category: 'Payments',
    icon: '💰',
    questions: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, net banking, and popular wallets.' },
      { q: 'Is it safe to pay online?', a: 'Yes, all payments are processed through secure, PCI-DSS compliant gateways.' },
      { q: 'When will I get my refund?', a: 'Refunds are processed within 5-7 business days after approval.' },
    ]
  },
  {
    category: 'Account',
    icon: '👤',
    questions: [
      { q: 'How do I reset my password?', a: 'Click "Forgot Password" on the login page and follow the instructions sent to your email.' },
      { q: 'Can I delete my account?', a: 'Yes, go to Profile Settings and select "Delete Account". This action is irreversible.' },
      { q: 'How do I update my profile?', a: 'Log in and navigate to Profile where you can edit your information.' },
    ]
  },
  {
    category: 'Technical',
    icon: '🔧',
    questions: [
      { q: 'The website is slow. What should I do?', a: 'Clear your browser cache, check your internet connection, or try a different browser.' },
      { q: 'I\'m having trouble with the map. Why?', a: 'Make sure you have JavaScript enabled and try refreshing the page.' },
      { q: 'Is there a mobile app?', a: 'Yes, our mobile app is available on Google Play Store and Apple App Store.' },
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...faqs.map(f => f.category)];

  const filteredFaqs = faqs.filter(faq => 
    selectedCategory === 'All' || faq.category === selectedCategory
  ).map(faq => ({
    ...faq,
    questions: faq.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(faq => faq.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 bg-accent/10 rounded-full mb-4 relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping"></div>
            <span className="text-5xl relative z-10">❓</span>
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our platform, bookings, payments, and more.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent shadow-lg"
            />
          </div>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === category
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {filteredFaqs.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: catIndex * 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="text-xl font-bold text-white">{category.category}</h2>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {category.questions.map((faq, qIndex) => {
                  const index = catIndex * 100 + qIndex;
                  return (
                    <div key={qIndex} className="px-6 py-4">
                      <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="w-full flex justify-between items-center text-left group"
                      >
                        <span className="font-medium text-gray-900 group-hover:text-accent transition">
                          {faq.q}
                        </span>
                        <motion.span
                          animate={{ rotate: openIndex === index ? 45 : 0 }}
                          className="text-accent text-xl ml-4"
                        >
                          {openIndex === index ? '✕' : '+'}
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 text-gray-600 leading-relaxed"
                          >
                            {faq.a}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-primary mb-3">Still have questions?</h3>
            <p className="text-gray-600 mb-6">Can't find what you're looking for? Our support team is here to help.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition shadow-lg"
              >
                Contact Support
              </Link>
              <Link
                to="/help"
                className="border-2 border-accent text-accent px-6 py-3 rounded-lg font-semibold hover:bg-accent hover:text-white transition"
              >
                Visit Help Center
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}