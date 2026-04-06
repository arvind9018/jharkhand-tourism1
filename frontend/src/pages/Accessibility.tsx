// pages/Accessibility.tsx
import { motion } from 'framer-motion';
import { 
  Accessibility, 
  Eye, 
  Ear, 
  Keyboard, 
  ZoomIn,
  Contrast,
  Volume2,
  Mic,
  Globe,
  CheckCircle,
  Heart
} from 'lucide-react';

export default function AccessibilityPage() {
  const features = [
    {
      icon: <Keyboard className="w-6 h-6" />,
      title: 'Keyboard Navigation',
      desc: 'Full keyboard support with visible focus indicators',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: <ZoomIn className="w-6 h-6" />,
      title: 'Text Resizing',
      desc: 'Resize text up to 200% without loss of functionality',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: <Contrast className="w-6 h-6" />,
      title: 'High Contrast',
      desc: 'High contrast mode for better visibility',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: 'Screen Reader',
      desc: 'Compatible with major screen readers (JAWS, NVDA, VoiceOver)',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Visual Adaptations',
      desc: 'Color combinations meet WCAG contrast requirements',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      icon: <Ear className="w-6 h-6" />,
      title: 'Captions & Transcripts',
      desc: 'Video content includes captions and transcripts',
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  const guidelines = [
    {
      level: 'A',
      title: 'Perceivable',
      items: [
        'Text alternatives for non-text content',
        'Captions for multimedia',
        'Content adaptable and distinguishable'
      ]
    },
    {
      level: 'AA',
      title: 'Operable',
      items: [
        'Full keyboard accessibility',
        'Sufficient time to read and use content',
        'No seizure-inducing content'
      ]
    },
    {
      level: 'AA',
      title: 'Understandable',
      items: [
        'Readable and predictable content',
        'Input assistance for forms',
        'Consistent navigation'
      ]
    },
    {
      level: 'AA',
      title: 'Robust',
      items: [
        'Compatible with assistive technologies',
        'Valid HTML and ARIA attributes',
        'Future-proof implementation'
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
            <Accessibility className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">Accessibility Statement</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Jharkhand Tourism is committed to ensuring digital accessibility for all users, 
            regardless of ability or technology.
          </p>
        </motion.div>

        {/* Commitment Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl shadow-xl p-8 mb-8 text-white"
        >
          <div className="flex items-center gap-4 mb-6">
            <Heart className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Our Commitment</h2>
          </div>
          <p className="text-white/90 mb-4">
            We strive to make our website and mobile applications accessible to everyone, 
            including people with disabilities. We are continuously improving the user experience 
            and applying relevant accessibility standards.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-semibold">WCAG 2.1</p>
              <p className="text-sm text-white/80">Level AA compliant</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-semibold">Screen Readers</p>
              <p className="text-sm text-white/80">Fully compatible</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-semibold">Keyboard Support</p>
              <p className="text-sm text-white/80">Complete navigation</p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Accessibility Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* WCAG Guidelines */}
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">WCAG 2.1 Compliance</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {guidelines.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-primary">{guide.title}</h3>
                <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
                  Level {guide.level}
                </span>
              </div>
              <ul className="space-y-2">
                {guide.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Known Limitations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-primary mb-4">Known Limitations</h2>
          <p className="text-gray-600 mb-4">
            While we strive for full accessibility, some third-party content or older content 
            may not fully meet WCAG standards. We are actively working to address these issues:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              Some historical images may lack detailed alt text
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              Third-party maps may have limited keyboard navigation
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent">•</span>
              Older PDF documents may not be fully accessible
            </li>
          </ul>
        </motion.div>

        {/* Feedback Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <Globe className="w-12 h-12 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">Accessibility Feedback</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We welcome your feedback on the accessibility of our platform. If you encounter 
            accessibility barriers, please contact us:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:accessibility@jharkhandtourism.gov.in"
              className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition"
            >
              Report Issue
            </a>
            <a
              href="/contact"
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