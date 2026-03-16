// pages/Sitemap.tsx
import { Link } from "react-router-dom"

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-secondary py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Sitemap</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="font-bold text-accent mb-4">Main Pages</h2>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-accent">Home</Link></li>
              <li><Link to="/destinations" className="text-gray-600 hover:text-accent">Destinations</Link></li>
              <li><Link to="/map" className="text-gray-600 hover:text-accent">GIS Map</Link></li>
              <li><Link to="/homestays" className="text-gray-600 hover:text-accent">Homestays</Link></li>
            </ul>
          </div>
          
          <div>
            <h2 className="font-bold text-accent mb-4">Support</h2>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-600 hover:text-accent">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-accent">FAQ</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-accent">Privacy</Link></li>
            </ul>
          </div>
          
          <div>
            <h2 className="font-bold text-accent mb-4">Legal</h2>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-600 hover:text-accent">Terms</Link></li>
              <li><Link to="/accessibility" className="text-gray-600 hover:text-accent">Accessibility</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}