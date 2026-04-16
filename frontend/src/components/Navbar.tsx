// frontend/src/components/Navbar.tsx
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { isAuthenticated, getUserRole, logoutUser, getStoredUser, type User } from "../services/authApi"
import { useCart } from "../context/CartContext"
import { ShoppingCart } from 'lucide-react'


export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)

  const { cartCount } = useCart()
  // Check auth status on mount and when localStorage changes
  useEffect(() => {
    checkAuthStatus()
    
    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = () => {
      checkAuthStatus()
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Close menus when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const checkAuthStatus = () => {
    const loggedIn = isAuthenticated()
    setIsLoggedIn(loggedIn)
    if (loggedIn) {
      setUserRole(getUserRole())
      setUser(getStoredUser())
    } else {
      setUserRole(null)
      setUser(null)
    }
  }

  const handleLogout = () => {
    logoutUser()
    setIsLoggedIn(false)
    setUserRole(null)
    setUser(null)
    setUserMenuOpen(false)
    navigate('/')
  }

  // Get dashboard link based on user role
  const getDashboardLink = () => {
    switch(userRole) {
      case 'admin':
        return '/admin'
      case 'guide':
        return '/guide-dashboard'
      case 'artisan':
        return '/artisan-dashboard'
      case 'homestay_owner':
        return '/owner-dashboard'
      case 'vendor':
        return '/vendor-dashboard'
      default:
        return '/dashboard'
    }
  }

  // Get dashboard display name based on role
  const getDashboardName = () => {
    switch(userRole) {
      case 'admin':
        return 'Admin Dashboard'
      case 'guide':
        return 'Guide Dashboard'
      case 'artisan':
        return 'Artisan Dashboard'
      case 'homestay_owner':
        return 'Owner Dashboard'
      case 'vendor':
        return 'Vendor Dashboard'
      default:
        return 'My Dashboard'
    }
  }

  // Get role icon
  const getRoleIcon = () => {
    switch(userRole) {
      case 'admin':
        return '👑'
      case 'guide':
        return '🧭'
      case 'artisan':
        return '🎨'
      case 'homestay_owner':
        return '🏡'
      case 'vendor':
        return '🛍️'
      default:
        return '👤'
    }
  }
  // For Artisan - Show "My Products"
{userRole === 'artisan' && (
  <Link to="/my-products">My Products</Link>
)}

// For Homestay Owner - Show "My Properties"
{userRole === 'homestay_owner' && (
  <Link to="/owner/properties">My Properties</Link>
)}

// For Guide - Show "My Tours"
{userRole === 'guide' && (
  <Link to="/guide/tours">My Tours</Link>
)}

// For Vendor - Show "My Shop"
{userRole === 'vendor' && (
  <Link to="/my-shop">My Shop</Link>
)}

  return (
    <nav className="bg-primary text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl transform group-hover:scale-110 transition">🌿</span>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold leading-tight">
              Jharkhand Tourism
            </h1>
            <p className="text-xs text-gray-300 hidden sm:block">
              Smart Digital Tourism
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 font-medium">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/destinations">Destinations</NavItem>
          <NavItem to="/map">GIS Map</NavItem>
          <NavItem to="/homestays">Homestays</NavItem>
          <NavItem to="/marketplace">Marketplace</NavItem>
          <Link to="/cart" className="relative">
    <ShoppingCart className="w-6 h-6 text-white hover:text-accent transition" />
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
        {cartCount}
      </span>
    )}
  </Link>

          {/* Auth Section */}
          <div className="relative" ref={menuRef}>
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-accent/20 hover:bg-accent/30 px-3 py-2 rounded-lg transition"
                >
                  <span className="text-xl">{getRoleIcon()}</span>
                  <span className="hidden lg:inline">
                    {user?.name?.split(' ')[0] || 'Account'}
                  </span>
                  <span className="text-xs">▼</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 text-gray-800 z-50">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold text-primary">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <p className="text-xs mt-1">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs capitalize ${
                          userRole === 'admin' ? 'bg-purple-100 text-purple-800' :
                          userRole === 'guide' ? 'bg-green-100 text-green-800' :
                          userRole === 'artisan' ? 'bg-orange-100 text-orange-800' :
                          userRole === 'homestay_owner' ? 'bg-yellow-100 text-yellow-800' :
                          userRole === 'vendor' ? 'bg-pink-100 text-pink-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {userRole}
                        </span>
                      </p>
                    </div>

                    {/* Dashboard Link - Highlighted */}
                    <Link
                      to={getDashboardLink()}
                      className="block px-4 py-2 hover:bg-gray-100 transition font-medium text-accent"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <span className="flex items-center gap-2">
                        <span>{getRoleIcon()}</span>
                        <span>{getDashboardName()}</span>
                      </span>
                    </Link>

                    <hr className="my-2" />

                    {/* Other Links */}
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      👤 Profile Settings
                    </Link>
                    <Link
                      to="/bookings"
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      📅 My Bookings
                    </Link>
                    
                    {/* Role-specific links */}
                    {userRole === 'artisan' && (
                      <Link
                        to="/my-products"
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        🛍️ My Products
                      </Link>
                    )}
                    
                    {userRole === 'homestay_owner' && (
                      <Link
                        to="/owner/properties"
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        🏡 My Properties
                      </Link>
                    )}
                    
                    {userRole === 'guide' && (
                      <Link
                        to="/guide/tours"
                        className="block px-4 py-2 hover:bg-gray-100 transition"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        🧭 My Tours
                      </Link>
                    )}

                    <hr className="my-2" />
                    
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="border border-accent hover:bg-accent px-4 py-2 rounded-lg transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-accent hover:bg-accent/90 px-4 py-2 rounded-lg transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl hover:text-accent transition"
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-primary px-6 pb-4 space-y-3">
          <MobileNavItem to="/" setOpen={setOpen}>Home</MobileNavItem>
          <MobileNavItem to="/destinations" setOpen={setOpen}>Destinations</MobileNavItem>
          <MobileNavItem to="/map" setOpen={setOpen}>GIS Map</MobileNavItem>
          <MobileNavItem to="/homestays" setOpen={setOpen}>Homestays</MobileNavItem>
          <MobileNavItem to="/marketplace" setOpen={setOpen}>Marketplace</MobileNavItem>
          
          {/* Mobile Auth Options */}
          <div className="pt-3 border-t border-white/20">
          <Link
    to="/cart"
    onClick={() => setOpen(false)}
    className="flex items-center justify-between border-b border-white/10 pb-2"
  >
    <span className="flex items-center gap-2">
      <ShoppingCart className="w-5 h-5" />
      Cart
    </span>
    {cartCount > 0 && (
      <span className="bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        {cartCount}
      </span>
    )}
  </Link>
            {isLoggedIn ? (
              <>
                {/* User Info */}
                <div className="mb-3 pb-3 border-b border-white/10">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-xs text-gray-300">{user?.email}</p>
                  <p className="text-xs mt-1">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs capitalize ${
                      userRole === 'admin' ? 'bg-purple-100 text-purple-800' :
                      userRole === 'guide' ? 'bg-green-100 text-green-800' :
                      userRole === 'artisan' ? 'bg-orange-100 text-orange-800' :
                      userRole === 'homestay_owner' ? 'bg-yellow-100 text-yellow-800' :
                      userRole === 'vendor' ? 'bg-pink-100 text-pink-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {userRole}
                    </span>
                  </p>
                </div>

                {/* Dashboard Link - Highlighted */}
                <MobileNavItem to={getDashboardLink()} setOpen={setOpen}>
                  <span className="flex items-center gap-2">
                    <span>{getRoleIcon()}</span>
                    <span className="font-medium text-accent">{getDashboardName()}</span>
                  </span>
                </MobileNavItem>

                <MobileNavItem to="/profile" setOpen={setOpen}>
                  👤 Profile Settings
                </MobileNavItem>
                <MobileNavItem to="/bookings" setOpen={setOpen}>
                  📅 My Bookings
                </MobileNavItem>
                
                {/* Role-specific mobile links */}
                {userRole === 'artisan' && (
                  <MobileNavItem to="/my-products" setOpen={setOpen}>
                    🛍️ My Products
                  </MobileNavItem>
                )}
                
                {userRole === 'homestay_owner' && (
                  <MobileNavItem to="/my-properties" setOpen={setOpen}>
                    🏡 My Properties
                  </MobileNavItem>
                )}
                
                {userRole === 'guide' && (
                  <MobileNavItem to="/my-tours" setOpen={setOpen}>
                    🧭 My Tours
                  </MobileNavItem>
                )}

                <button
                  onClick={() => {
                    handleLogout()
                    setOpen(false)
                  }}
                  className="block w-full text-left text-red-300 py-2 hover:text-white transition mt-2"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="border border-accent text-center hover:bg-accent px-4 py-2 rounded-lg transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="bg-accent text-center hover:bg-accent/90 px-4 py-2 rounded-lg transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

/* ---------------- Helper Components ---------------- */

function NavItem({ to, children }: { to: string; children: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `transition px-2 py-1 rounded-lg ${
          isActive
            ? "text-accent bg-accent/10"
            : "hover:text-accent hover:bg-accent/5"
        }`
      }
    >
      {children}
    </NavLink>
  )
}

function MobileNavItem({
  to,
  children,
  setOpen,
}: {
  to: string
  children: React.ReactNode
  setOpen: (v: boolean) => void
}) {
  return (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className="block border-b border-white/10 pb-2 hover:text-accent transition"
    >
      {children}
    </Link>
  )
}