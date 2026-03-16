// components/Footer.tsx
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send this to your API
      console.log("Subscribed:", email)
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-gradient-to-b from-primary to-primary-dark text-white mt-16 relative">
      {/* Wave Decoration at Top */}
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-r from-accent/20 to-accent/10 transform -translate-y-full"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* TOP GRID - Enhanced with more sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* BRAND - Expanded */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-4xl bg-accent/20 p-3 rounded-2xl">🌿</div>
              <div>
                <h2 className="text-2xl font-bold">Jharkhand Tourism</h2>
                <p className="text-xs text-accent">Government of Jharkhand Initiative</p>
              </div>
            </div>
            <p className="text-sm text-secondary leading-relaxed">
              India's first Smart Digital Tourism platform promoting sustainable travel, 
              tribal culture, and community-based tourism across Jharkhand's 24 districts.
            </p>
            
            {/* Contact Info */}
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center gap-3 text-secondary">
                <span className="text-accent">📞</span>
                <span>+91 1234 567 890</span>
              </div>
              <div className="flex items-center gap-3 text-secondary">
                <span className="text-accent">✉️</span>
                <span>info@jharkhandtourism.gov.in</span>
              </div>
              <div className="flex items-center gap-3 text-secondary">
                <span className="text-accent">📍</span>
                <span>Tourism Office, Ranchi, Jharkhand 834001</span>
              </div>
            </div>
          </div>

          {/* QUICK LINKS - Enhanced */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/destinations">Destinations</FooterLink>
              <FooterLink to="/map">GIS Map</FooterLink>
              <FooterLink to="/homestays">Homestays</FooterLink>
              <FooterLink to="/marketplace">Marketplace</FooterLink>
              <FooterLink to="/vr-experience">VR Experience</FooterLink>
            </ul>
          </div>

          {/* SUPPORT - Enhanced */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/help">Help Center</FooterLink>
              <FooterLink to="/guidelines">Travel Guidelines</FooterLink>
              <FooterLink to="/safety">Safety & Alerts</FooterLink>
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/feedback">Feedback</FooterLink>
              <FooterLink to="/faq">FAQ</FooterLink>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-accent rounded-full"></span>
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/accessibility">Accessibility</FooterLink>
              <FooterLink to="/cookies">Cookie Policy</FooterLink>
              <FooterLink to="/disclaimer">Disclaimer</FooterLink>
            </ul>
          </div>
        </div>

        {/* NEWSLETTER SECTION */}
        <div className="mt-12 p-6 bg-white/5 rounded-2xl backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">📬</div>
              <div>
                <h4 className="font-bold text-lg">Subscribe to Our Newsletter</h4>
                <p className="text-sm text-secondary">Get travel updates, festival alerts, and exclusive offers</p>
              </div>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 lg:w-64 px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent-dark px-6 py-3 rounded-r-lg font-semibold transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
          {subscribed && (
            <div className="mt-4 text-center text-green-400 text-sm animate-fadeIn">
              ✅ Thank you for subscribing! Check your email for confirmation.
            </div>
          )}
        </div>

        {/* SOCIAL MEDIA & APP DOWNLOAD */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Media */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">Follow us:</span>
            <SocialLink href="#" icon="📘" label="Facebook" />
            <SocialLink href="#" icon="📸" label="Instagram" />
            <SocialLink href="#" icon="🐦" label="Twitter" />
            <SocialLink href="#" icon="▶️" label="YouTube" />
            <SocialLink href="#" icon="💼" label="LinkedIn" />
          </div>

          {/* App Download */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">Download App:</span>
            <AppStoreBadge platform="ios" />
            <AppStoreBadge platform="android" />
          </div>
        </div>

        {/* DIVIDER */}
        <hr className="border-white/10 my-8" />

        {/* BOTTOM BAR - Enhanced */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs gap-4">
          <p className="text-secondary">
            © {currentYear} Jharkhand Smart Tourism. All rights reserved. 
            <span className="hidden sm:inline"> | A Government of Jharkhand Initiative</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-secondary">
            <span>🌿 50+ Destinations</span>
            <span>🏡 100+ Homestays</span>
            <span>🎨 200+ Artisans</span>
            <span>👥 12k+ Travelers</span>
          </div>
          
          <div className="flex gap-4 text-secondary">
            <Link to="/sitemap" className="hover:text-accent transition">Sitemap</Link>
            <Link to="/admin" className="hover:text-accent transition">Admin</Link>
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-6 opacity-60">
          <img src="/api/placeholder/100/40" alt="Government of Jharkhand" className="h-10" />
          <img src="/api/placeholder/100/40" alt="Ministry of Tourism" className="h-10" />
          <img src="/api/placeholder/100/40" alt="ISO Certified" className="h-10" />
          <img src="/api/placeholder/100/40" alt="Safe Travel" className="h-10" />
        </div>
      </div>
    </footer>
  )
}

/* ---------------- Helper Components ---------------- */

function FooterLink({ to, children }: { to: string; children: string }) {
  return (
    <li>
      <Link 
        to={to} 
        className="text-secondary hover:text-accent transition flex items-center gap-2 group"
      >
        <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition"></span>
        {children}
      </Link>
    </li>
  )
}

function SocialLink({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="w-10 h-10 bg-white/10 hover:bg-accent rounded-full flex items-center justify-center text-xl transition transform hover:scale-110"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  )
}

function AppStoreBadge({ platform }: { platform: 'ios' | 'android' }) {
  return (
    <a
      href="#"
      className="flex items-center gap-2 bg-black/30 hover:bg-black/50 px-3 py-2 rounded-lg transition"
    >
      {platform === 'ios' ? (
        <>
          <span className="text-2xl">🍎</span>
          <div className="text-left">
            <div className="text-[10px]">Download on the</div>
            <div className="text-sm font-semibold">App Store</div>
          </div>
        </>
      ) : (
        <>
          <span className="text-2xl">📱</span>
          <div className="text-left">
            <div className="text-[10px]">GET IT ON</div>
            <div className="text-sm font-semibold">Google Play</div>
          </div>
        </>
      )}
    </a>
  )
}