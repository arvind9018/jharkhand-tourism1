// pages/PrivacyPolicy.tsx
import { motion } from 'framer-motion';
import { 
  Shield, 
  Eye, 
  Lock, 
  Mail, 
  Globe, 
  Clock, 
  Database,
  UserCheck,
  Fingerprint,
  FileText,
  Bell,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export default function PrivacyPolicy() {
  const lastUpdated = "March 15, 2024";

  const sections = [
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Information We Collect',
      color: 'bg-blue-100 text-blue-600',
      content: 'We collect information to provide better services to all our users. This includes:',
      items: [
        {
          title: 'Personal Information',
          desc: 'Name, email address, phone number, and profile information when you create an account.'
        },
        {
          title: 'Booking Information',
          desc: 'Travel dates, preferences, special requests, and payment details (processed securely).'
        },
        {
          title: 'Usage Data',
          desc: 'How you interact with our platform, pages visited, features used, and time spent.'
        },
        {
          title: 'Device Information',
          desc: 'IP address, browser type, device type, and operating system for optimization.'
        }
      ]
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'How We Use Your Information',
      color: 'bg-green-100 text-green-600',
      content: 'Your information helps us improve and personalize your experience:',
      items: [
        {
          title: 'Service Delivery',
          desc: 'Process bookings, facilitate payments, and provide customer support.'
        },
        {
          title: 'Personalization',
          desc: 'Recommend destinations, homestays, and experiences based on your preferences.'
        },
        {
          title: 'Communication',
          desc: 'Send booking confirmations, updates, and promotional offers (with consent).'
        },
        {
          title: 'Improvement',
          desc: 'Analyze usage patterns to enhance platform features and user experience.'
        }
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Data Security',
      color: 'bg-purple-100 text-purple-600',
      content: 'We implement industry-standard security measures to protect your data:',
      items: [
        {
          title: 'Encryption',
          desc: '256-bit SSL encryption for all data transmission between your device and our servers.'
        },
        {
          title: 'Secure Storage',
          desc: 'Data stored in secure, ISO 27001 certified data centers with multiple redundancies.'
        },
        {
          title: 'Access Control',
          desc: 'Strict employee access controls and regular security audits.'
        },
        {
          title: 'Payment Security',
          desc: 'PCI-DSS compliant payment processing with no storage of sensitive payment data.'
        }
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Information Sharing',
      color: 'bg-orange-100 text-orange-600',
      content: 'We do not sell your personal information. Limited sharing occurs only for:',
      items: [
        {
          title: 'Service Providers',
          desc: 'Homestay owners, guides, and artisans (only necessary booking information).'
        },
        {
          title: 'Payment Processors',
          desc: 'Secure payment gateways for transaction processing.'
        },
        {
          title: 'Legal Compliance',
          desc: 'When required by law or to protect rights and safety.'
        },
        {
          title: 'Business Transfers',
          desc: 'In case of merger, acquisition, or asset sale (with notice).'
        }
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: 'Your Rights',
      color: 'bg-pink-100 text-pink-600',
      content: 'You have control over your personal information:',
      items: [
        {
          title: 'Access',
          desc: 'Request a copy of your personal data we hold.'
        },
        {
          title: 'Correction',
          desc: 'Update or correct inaccurate information.'
        },
        {
          title: 'Deletion',
          desc: 'Request deletion of your account and associated data.'
        },
        {
          title: 'Opt-out',
          desc: 'Unsubscribe from marketing communications anytime.'
        }
      ]
    },
    {
      icon: <Fingerprint className="w-6 h-6" />,
      title: 'Cookies & Tracking',
      color: 'bg-indigo-100 text-indigo-600',
      content: 'We use cookies to enhance your experience:',
      items: [
        {
          title: 'Essential Cookies',
          desc: 'Required for basic platform functionality and security.'
        },
        {
          title: 'Preference Cookies',
          desc: 'Remember your settings and language preferences.'
        },
        {
          title: 'Analytics Cookies',
          desc: 'Help us understand how visitors use our platform.'
        },
        {
          title: 'Marketing Cookies',
          desc: 'Used to deliver relevant advertisements (with consent).'
        }
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
          <div className="inline-block p-4 bg-accent/10 rounded-full mb-4 relative">
            <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping"></div>
            <Shield className="w-8 h-8 text-accent relative z-10" />
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">Privacy Policy</h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <p>Last Updated: {lastUpdated}</p>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-xl p-8 mb-8 text-white"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Data Protection</p>
                <p className="font-semibold">256-bit SSL Encrypted</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Data Access</p>
                <p className="font-semibold">Full Control & Portability</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">Updates</p>
                <p className="font-semibold">Immediate Notification</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
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
              
              <p className="text-gray-600 mb-4">{section.content}</p>
              
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <div key={i} className="border-l-2 border-accent pl-3">
                    <h3 className="font-semibold text-primary text-sm">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">Privacy Questions?</h2>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            Our Data Protection Officer is here to address any privacy concerns or requests.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:privacy@jharkhandtourism.gov.in"
              className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition"
            >
              Email DPO
            </a>
            <a
              href="/contact-support"
              className="border-2 border-accent text-accent px-6 py-3 rounded-lg font-semibold hover:bg-accent hover:text-white transition"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}