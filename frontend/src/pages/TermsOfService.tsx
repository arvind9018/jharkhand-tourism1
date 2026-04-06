// pages/TermsOfService.tsx
import { motion } from 'framer-motion';
import { 
  FileText, 
  Scale, 
  CreditCard, 
  Users, 
  AlertCircle,
  Shield,
  Calendar,
  Ban,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function TermsOfService() {
  const lastUpdated = "March 15, 2024";

  const sections = [
    {
      icon: <Users className="w-6 h-6" />,
      title: '1. Account Terms',
      color: 'bg-blue-100 text-blue-600',
      rules: [
        'You must be at least 18 years old to create an account',
        'Provide accurate and complete information',
        'Maintain the security of your account credentials',
        'Notify us immediately of any unauthorized access',
        'One person per account (no shared accounts)'
      ]
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: '2. Bookings & Payments',
      color: 'bg-green-100 text-green-600',
      rules: [
        'All prices are in Indian Rupees (INR)',
        'Payment required at time of booking',
        'Cancellation policies vary by homestay owner',
        'Refunds processed within 7-10 business days',
        'Secure payment through authorized gateways only'
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: '3. User Responsibilities',
      color: 'bg-purple-100 text-purple-600',
      rules: [
        'Respect local laws and customs',
        'Treat homestay properties with care',
        'Communicate respectfully with hosts and guides',
        'Provide accurate information for bookings',
        'Report any issues promptly'
      ]
    },
    {
      icon: <Ban className="w-6 h-6" />,
      title: '4. Prohibited Activities',
      color: 'bg-red-100 text-red-600',
      rules: [
        'No fraudulent or illegal activities',
        'No harassment of other users or hosts',
        'No unauthorized commercial use',
        'No interference with platform operations',
        'No sharing of account credentials'
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: '5. Intellectual Property',
      color: 'bg-orange-100 text-orange-600',
      rules: [
        'Content on platform is protected by copyright',
        'User reviews may be used for promotional purposes',
        'Do not copy or reproduce platform content',
        'Respect trademarks and brand assets',
        'Report any copyright violations'
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: '6. Limitation of Liability',
      color: 'bg-yellow-100 text-yellow-600',
      rules: [
        'Platform acts as intermediary only',
        'Not liable for host or guest actions',
        'Service provided "as is" without warranties',
        'Maximum liability limited to booking amount',
        'Force majeure events exempt from liability'
      ]
    }
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
            <FileText className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">Terms of Service</h1>
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
            <Calendar className="w-4 h-4" />
            <p>Last Updated: {lastUpdated}</p>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our platform.
          </p>
        </motion.div>

        {/* Quick Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-xl p-8 mb-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Quick Summary
          </h2>
          <p className="text-white/90 mb-4">
            By using Jharkhand Tourism, you agree to these terms. Key points:
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-semibold">✅ Account Security</p>
              <p className="text-sm text-white/80">Keep credentials safe</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-semibold">💰 Payments</p>
              <p className="text-sm text-white/80">Secure transactions</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-semibold">⚖️ Fair Use</p>
              <p className="text-sm text-white/80">Respect platform rules</p>
            </div>
          </div>
        </motion.div>

        {/* Terms Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 ${section.color} rounded-xl`}>
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-primary">{section.title}</h2>
              </div>
              
              <ul className="space-y-3">
                {section.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-gray-600 text-sm">{rule}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Terms */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid md:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-accent" />
              Modification of Terms
            </h2>
            <p className="text-gray-600 text-sm">
              We reserve the right to modify these terms at any time. Continued use of the platform 
              after changes constitutes acceptance of the new terms. We will notify users of material 
              changes via email or platform notification.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent" />
              Governing Law
            </h2>
            <p className="text-gray-600 text-sm">
              These terms shall be governed by the laws of India. Any disputes arising from these 
              terms shall be subject to the exclusive jurisdiction of the courts in Ranchi, Jharkhand.
            </p>
          </div>
        </motion.div>

        {/* Acceptance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            By using our platform, you acknowledge that you have read and understood these Terms of Service.
          </p>
        </motion.div>
      </div>
    </div>
  );
}