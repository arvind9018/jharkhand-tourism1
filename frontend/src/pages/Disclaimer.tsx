// pages/Disclaimer.tsx
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Info, 
  Shield, 
  Globe, 
  BookOpen,
  Scale,
  HelpCircle,
  FileWarning
} from 'lucide-react';

export default function Disclaimer() {
  const sections = [
    {
      icon: <Info className="w-6 h-6" />,
      title: 'General Information',
      color: 'bg-blue-100 text-blue-600',
      content: 'The information provided on the Jharkhand Tourism platform is for general informational purposes only. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information.'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Third-Party Content',
      color: 'bg-green-100 text-green-600',
      content: 'Our platform may contain links to third-party websites or services that are not owned or controlled by Jharkhand Tourism. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Booking Disclaimer',
      color: 'bg-purple-100 text-purple-600',
      content: 'Jharkhand Tourism acts as an intermediary platform connecting travelers with homestay owners, guides, and artisans. We do not guarantee the quality, safety, or legality of any listed properties, services, or products. Any disputes arising from bookings or purchases should be resolved directly between the parties involved.'
    },
    {
      icon: <FileWarning className="w-6 h-6" />,
      title: 'Travel Advisory',
      color: 'bg-orange-100 text-orange-600',
      content: 'Travelers are responsible for their own safety and should exercise due diligence when traveling. Check local travel advisories, weather conditions, and ensure you have appropriate travel insurance before booking.'
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: 'Limitation of Liability',
      color: 'bg-red-100 text-red-600',
      content: 'In no event shall Jharkhand Tourism be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our platform or with the delay or inability to use the platform.'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Content Accuracy',
      color: 'bg-indigo-100 text-indigo-600',
      content: 'While we make every effort to ensure the accuracy of information on our platform, details about destinations, homestays, and services may change without notice. Always verify important information directly with service providers.'
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
            <AlertTriangle className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-5xl font-bold text-primary mb-4">Disclaimer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read this disclaimer carefully before using our platform.
          </p>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl shadow-xl p-8 mb-8 text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileWarning className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Important Notice</h2>
          </div>
          <p className="text-white/90 mb-4">
            By using Jharkhand Tourism, you acknowledge and agree to the following terms and limitations. 
            This platform is provided "as is" without any warranties, and your use is at your own risk.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-semibold">📅 Updated</p>
              <p className="text-sm text-white/80">March 2024</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-semibold">⚖️ Legal</p>
              <p className="text-sm text-white/80">Binding Terms</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-semibold">🔍 Review</p>
              <p className="text-sm text-white/80">Read Carefully</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
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
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Clauses */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-accent" />
              Indemnification
            </h2>
            <p className="text-gray-600 text-sm">
              You agree to indemnify and hold harmless Jharkhand Tourism, its officers, directors, 
              employees, and agents from any claims, damages, losses, liabilities, costs, and expenses 
              arising out of or related to your use of the platform, violation of these terms, or 
              infringement of any third-party rights.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-accent" />
              Governing Law
            </h2>
            <p className="text-gray-600 text-sm">
              This disclaimer shall be governed by and construed in accordance with the laws of India. 
              Any disputes relating to this disclaimer shall be subject to the exclusive jurisdiction 
              of the courts in Ranchi, Jharkhand.
            </p>
          </motion.div>
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            If you have any questions about this disclaimer, please{' '}
            <a href="/contact" className="text-accent font-semibold hover:underline">
              contact us
            </a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}