// pages/CookiePolicy.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cookie, 
  Settings, 
  Shield, 
  Globe, 
  BarChart3,
  Target,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react';

export default function CookiePolicy() {
  const [preferences, setPreferences] = useState({
    essential: true,
    functional: false,
    analytics: false,
    marketing: false
  });

  const cookieTypes = [
    {
      id: 'essential',
      icon: <Shield className="w-5 h-5" />,
      title: 'Essential Cookies',
      description: 'Required for the website to function properly. Cannot be disabled.',
      always: true,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'functional',
      icon: <Settings className="w-5 h-5" />,
      title: 'Functional Cookies',
      description: 'Remember your preferences and settings for a better experience.',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'marketing',
      icon: <Target className="w-5 h-5" />,
      title: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track campaign performance.',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const handleToggle = (id: string) => {
    if (id === 'essential') return;
    setPreferences(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev]
    }));
  };

  const handleSavePreferences = () => {
    // Save to localStorage or send to backend
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    alert('Cookie preferences saved!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 bg-accent/10 rounded-full mb-4">
            <Cookie className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how we use cookies to enhance your browsing experience and give you control over your privacy.
          </p>
        </motion.div>

        {/* What are Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-accent/10 rounded-xl">
              <Info className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-primary">What Are Cookies?</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Cookies are small text files that are placed on your device when you visit a website. 
            They help the website remember your actions and preferences (such as login, language, 
            font size, and other display preferences) over a period of time, so you don't have to 
            keep re-entering them whenever you come back to the site or browse from one page to another.
          </p>
        </motion.div>

        {/* Cookie Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">Manage Cookie Preferences</h2>
          
          <div className="space-y-4">
            {cookieTypes.map((cookie) => (
              <div key={cookie.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className={`p-2 ${cookie.color} rounded-lg`}>
                    {cookie.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{cookie.title}</h3>
                    <p className="text-sm text-gray-600">{cookie.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {cookie.always ? (
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-semibold">
                      Always Active
                    </span>
                  ) : (
                    <button
                      onClick={() => handleToggle(cookie.id)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        preferences[cookie.id as keyof typeof preferences] 
                          ? 'bg-accent' 
                          : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          preferences[cookie.id as keyof typeof preferences] 
                            ? 'translate-x-6' 
                            : ''
                        }`}
                      />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSavePreferences}
              className="bg-accent text-white px-6 py-2 rounded-lg font-semibold hover:bg-accent-dark transition"
            >
              Save Preferences
            </button>
            <button
              onClick={() => setPreferences({
                essential: true,
                functional: true,
                analytics: true,
                marketing: true
              })}
              className="border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Accept All
            </button>
          </div>
        </motion.div>

        {/* How We Use Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-6">How We Use Cookies</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary">Authentication & Security</h3>
                <p className="text-gray-600 text-sm">Keep you logged in and protect your account from unauthorized access.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary">Preferences & Settings</h3>
                <p className="text-gray-600 text-sm">Remember your language, currency, and display preferences.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary">Analytics & Performance</h3>
                <p className="text-gray-600 text-sm">Help us understand how visitors use our site to improve functionality.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-primary">Personalized Content</h3>
                <p className="text-gray-600 text-sm">Show you relevant destinations and offers based on your interests.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Third-Party Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">Third-Party Cookies</h2>
          <p className="text-gray-600 mb-4">
            Some cookies are placed by third-party services that appear on our pages:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-primary mb-2">Google Analytics</h3>
              <p className="text-sm text-gray-600">Website traffic analysis and user behavior tracking</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-primary mb-2">Payment Processors</h3>
              <p className="text-sm text-gray-600">Secure transaction processing and fraud prevention</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-primary mb-2">Social Media</h3>
              <p className="text-sm text-gray-600">Sharing features and embedded content</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-primary mb-2">Maps & VR</h3>
              <p className="text-sm text-gray-600">Interactive maps and virtual reality experiences</p>
            </div>
          </div>
        </motion.div>

        {/* Managing Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">How to Manage Cookies</h2>
          <p className="text-gray-600 mb-4">
            Most browsers allow you to control cookies through their settings. You can:
          </p>
          <ul className="space-y-2 text-gray-600 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              Delete all cookies from your browser
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              Block third-party cookies
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              Block all cookies (may affect site functionality)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              Set preferences for specific websites
            </li>
          </ul>
          <p className="text-sm text-gray-500">
            Note: Blocking cookies may affect your experience on our website and limit access to certain features.
          </p>
        </motion.div>
      </div>
    </div>
  );
}