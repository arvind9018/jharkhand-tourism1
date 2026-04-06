// pages/Home.tsx
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import HomeSearch from "../components/HomeSearch"
import FeatureCard from "../components/FeatureCard"
import DestinationSlider from "../components/DestinationSlider"
import TestimonialSlider from "../components/TestimonialSlider"
import ErrorBoundary from "../components/ErrorBoundary"
import { fetchStats } from "../services/api"

export default function Home() {
  const [stats, setStats] = useState({
    destinations: 50,
    homestays: 128,
    artisans: 200,
    tourists: 12450
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Load real stats from API
    const loadStats = async () => {
      try {
        const data = await fetchStats()
        setStats(data)
      } catch (error) {
        console.log('Using default stats')
      }
    }
    loadStats()

    // Trigger animations after mount
    setIsVisible(true)
  }, [])

  return (
    <div className="bg-secondary min-h-screen overflow-hidden">

      {/* HERO SECTION - Enhanced with parallax effect */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-dark text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/50 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-16 md:py-24">
          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Left Content */}
            <div>
              <div className="inline-block bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
                🌿 Welcome to Smart Tourism
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                Explore Jharkhand{' '}
                <span className="text-accent relative inline-block">
                  Digitally
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 5" preserveAspectRatio="none">
                    <path d="M0,5 L100,5" stroke="#FF6B35" strokeWidth="2" strokeDasharray="5 5" />
                  </svg>
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl">
                Experience the first-ever smart tourism platform powered by{' '}
                <span className="font-semibold text-accent">GIS, AI, and immersive AR/VR</span>{' '}
                technologies. Discover tribal culture, stunning waterfalls, and hidden gems.
              </p>

              <HomeSearch />

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/destinations"
                  className="group bg-accent px-8 py-4 rounded-lg font-semibold hover:bg-accent-dark transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center gap-2">
                    Explore Destinations
                    <span className="group-hover:translate-x-1 transition">→</span>
                  </span>
                </Link>
                <Link
                  to="/map"
                  className="group border-2 border-white/30 backdrop-blur-sm px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all"
                >
                  <span className="flex items-center gap-2">
                    <span>🗺️</span>
                    Interactive Map
                  </span>
                </Link>
              </div>

              {/* Stats Counter */}
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <StatCard number={stats.destinations} label="Destinations" icon="🏞️" />
                <StatCard number={stats.homestays} label="Homestays" icon="🏡" />
                <StatCard number={stats.artisans} label="Artisans" icon="🎨" />
                <StatCard number={stats.tourists} label="Happy Travelers" icon="👥" />
              </div>
            </div>

            {/* Right Content - 3D floating cards */}
            <div className="hidden lg:block relative">
              <div className="relative h-96">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-accent to-accent-dark rounded-2xl rotate-12 transform hover:rotate-6 transition-all duration-500 shadow-2xl overflow-hidden group">
                  <img
                    src="https://s7ap1.scene7.com/is/image/incredibleindia/netarhat-dam-ranchi-jharkhand-2-attr-hero?qlt=82&ts=1727010840630"
                    alt="Netarhat"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-semibold">Netarhat</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-br from-primary-light to-primary rounded-2xl -rotate-6 transform hover:rotate-0 transition-all duration-500 shadow-2xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400"
                    alt="Hundru Falls"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-semibold">Hundru Falls</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,120 C480,120 960,0 1440,0 L1440,120 L0,120 Z" fill="#F5F5F5" />
          </svg>
        </div>
      </section>

      {/* FEATURES SECTION - Enhanced with icons and animations */}
      <section className="relative px-6 sm:px-10 py-20 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-4xl font-bold text-primary mt-2 mb-4">
              Smart Tourism Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience Jharkhand like never before with our cutting-edge technology features
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="🗺️"
              title="GIS Navigation"
              desc="Real-time route planning with eco-sensitive zone alerts and smart navigation"
              delay={100}
            />
            <FeatureCard
              icon="🤖"
              title="AI Recommendation"
              desc="Personalized trip suggestions based on your interests and preferences"
              delay={200}
            />
            <FeatureCard
              icon="🕶️"
              title="AR / VR"
              desc="Virtual exploration of waterfalls, forests, and tribal villages from home"
              delay={300}
            />
            <FeatureCard
              icon="🏡"
              title="Community Tourism"
              desc="Book authentic homestays and buy directly from local artisans"
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* DESTINATION SLIDER SECTION - Enhanced */}
      <section className="relative px-6 sm:px-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Explore</span>
              <h2 className="text-4xl font-bold text-primary mt-2">
                Popular Destinations
              </h2>
            </div>
            <Link
              to="/destinations"
              className="group flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
            >
              View All Destinations
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
          </div>

          <ErrorBoundary
            fallback={
              <div className="text-center p-16 bg-gray-50 rounded-2xl">
                <div className="text-5xl mb-4">😕</div>
                <p className="text-gray-600 text-lg">Unable to load destinations</p>
                <p className="text-sm text-gray-500 mt-2">Please refresh the page to try again</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 bg-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
                >
                  Refresh Page
                </button>
              </div>
            }
          >
            <DestinationSlider />
          </ErrorBoundary>
        </div>
      </section>

      {/* EXPERIENCE SECTION - New section */}
      <section className="relative px-6 sm:px-10 py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Immersive Experience</span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Experience Jharkhand in Virtual Reality
              </h2>
              <p className="text-gray-200 mb-8">
                Can't travel physically? Explore our 360° VR tours of waterfalls, forests, and tribal villages.
                Experience the culture, sounds, and beauty from anywhere in the world.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/vr-experience"
                  className="bg-accent px-8 py-4 rounded-lg font-semibold hover:bg-accent-dark transition"
                >
                  Try VR Experience
                </Link>
                <Link
                  to="/ar-experience"
                  className="border-2 border-white/30 backdrop-blur-sm px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
                >
                  AR Guides
                </Link>
              </div>
            </div>
            <div className="relative">
  <div className="aspect-video bg-black/20 rounded-2xl overflow-hidden shadow-2xl">

    <iframe
      className="w-full h-full"
      src="https://www.youtube.com/embed/aAYUoBpaXT0?autoplay=1&mute=1&loop=1&playlist=aAYUoBpaXT0"
      frameBorder="0"
      allow="autoplay; fullscreen"
      allowFullScreen
    ></iframe>

    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🕶️</div>
        <p className="text-white text-lg font-semibold">360° Virtual Tour</p>
      </div>
    </div>

  </div>
</div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION - New section */}
      <section className="px-6 sm:px-10 py-20 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl font-bold text-primary mt-2 mb-4">
              What Travelers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real experiences from travelers who explored Jharkhand through our platform
            </p>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* BLOG/PREVIEW SECTION - New section */}
      <section className="px-6 sm:px-10 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Stories</span>
              <h2 className="text-4xl font-bold text-primary mt-2">
                Travel Stories & Guides
              </h2>
            </div>
            <Link
              to="/blog"
              className="group flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all"
            >
              Read All Stories
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <BlogCard
              image="https://www.google.com/imgres?q=hidden%20waterfall%20in%20jharkhand&imgurl=https%3A%2F%2Ftripxl.com%2Fblog%2Fwp-content%2Fuploads%2F2024%2F09%2FNetarhat-waterfalls-OG-Image.jpg&imgrefurl=https%3A%2F%2Ftripxl.com%2Fblog%2Fnetarhat-waterfalls%2F&docid=RzD3McWrLqJaCM&tbnid=TyrIA_NQisL_uM&vet=12ahUKEwia4b3h3q2TAxXV-TgGHcKgBjoQnPAOegQIGBAB..i&w=850&h=425&hcb=2&ved=2ahUKEwia4b3h3q2TAxXV-TgGHcKgBjoQnPAOegQIGBAB"
              title="Hidden Waterfalls of Jharkhand"
              excerpt="Discover 5 lesser-known waterfalls perfect for monsoon trekking..."
              date="Mar 15, 2024"
            />
            <BlogCard
              image="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400"
              title="A Guide to Tribal Festivals"
              excerpt="Experience the vibrant Sarhul, Karma, and Sohrai festivals..."
              date="Mar 10, 2024"
            />
            <BlogCard
              image="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400"
              title="Wildlife Safari at Betla"
              excerpt="Complete guide to spotting tigers, elephants, and bisons..."
              date="Mar 5, 2024"
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION - Enhanced */}
      <section className="relative px-6 sm:px-10 py-24 bg-gradient-to-r from-accent to-accent-dark text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for a Smart Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of travelers exploring Jharkhand's hidden gems with our smart tourism platform
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/homestays"
              className="bg-white text-accent px-10 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition transform hover:scale-105 shadow-xl"
            >
              Book a Homestay
            </Link>
            <Link
              to="/signup"
              className="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white hover:text-accent transition transform hover:scale-105"
            >
              Create Account
            </Link>
          </div>
          <p className="mt-8 text-sm text-white/80">
            🌟 Over 12,000+ happy travelers | 100+ verified homestays | Free cancellation
          </p>
        </div>
      </section>

    </div>
  )
}

/* ---------------- Helper Components ---------------- */

function StatCard({ number, label, icon }: { number: number; label: string; icon: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 50
    const increment = number / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= number) {
        setCount(number)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [number])

  return (
    <div className="text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-accent">{count.toLocaleString()}+</div>
      <div className="text-sm text-white/80">{label}</div>
    </div>
  )
}

function BlogCard({ image, title, excerpt, date }: { image: string; title: string; excerpt: string; date: string }) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
        />
      </div>
      <div className="p-6">
        <p className="text-sm text-accent mb-2">{date}</p>
        <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{excerpt}</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-accent font-semibold text-sm hover:gap-2 transition-all"
        >
          Read More <span>→</span>
        </Link>
      </div>
    </div>
  )
}