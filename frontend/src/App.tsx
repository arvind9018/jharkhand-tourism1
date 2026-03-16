// frontend/src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Destinations from "./pages/Destinations"
import DestinationDetails from "./pages/DestinationDetails"
import MapView from "./pages/MapView"
import Homestays from "./pages/Homestays"
import Marketplace from "./pages/Marketplace"
import AdminDashboard from "./pages/AdminDashboard"
import UserDashboard from "./pages/UserDashboard"
import GuideDashboard from "./pages/GuideDashboard"
import ArtisanDashboard from "./pages/ArtisanDashboard"
import OwnerDashboard from "./pages/OwnerDashboard"
import VendorDashboard from "./pages/VendorDashboard"
import Profile from "./pages/Profile"
import Bookings from "./pages/Bookings"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import VerifyEmail from "./pages/VerifyEmail"
import Unauthorized from "./pages/Unauthorized"

import { checkApiHealth } from "./services/api"
import { isAuthenticated, getUserRole, initAuth } from "./services/authApi"

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }: { 
  children: React.ReactNode; 
  allowedRoles?: string[] 
}) => {
  const isLoggedIn = isAuthenticated();
  const userRole = getUserRole();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole || '')) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

// Public Route (redirects to home if already logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = isAuthenticated();
  
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default function App() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')

  useEffect(() => {
    // Initialize auth
    initAuth()
    
    // Check API connection
    const testConnection = async () => {
      const health = await checkApiHealth()
      setApiStatus(health.database === 'connected' ? 'connected' : 'disconnected')
      console.log('Backend connection:', health)
    }
    testConnection()
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      
      {/* API Status Banner */}
      {process.env.NODE_ENV === 'development' && (
        <div className={`text-center text-sm py-1 ${
          apiStatus === 'connected' ? 'bg-green-100 text-green-800' : 
          apiStatus === 'disconnected' ? 'bg-red-100 text-red-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          {apiStatus === 'connected' ? '✅ Connected to backend' : 
           apiStatus === 'disconnected' ? '⚠️ Backend not connected - Using mock data' : 
           '🔄 Checking backend connection...'}
        </div>
      )}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/homestays" element={<Homestays />} />
        <Route path="/marketplace" element={<Marketplace />} />
        
        {/* Auth Routes (Public but redirect if logged in) */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        
        {/* Protected Routes - User Level */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/bookings" element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        } />
        
        {/* Role-Specific Dashboards */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/guide-dashboard" element={
          <ProtectedRoute allowedRoles={['guide', 'admin']}>
            <GuideDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/artisan-dashboard" element={
          <ProtectedRoute allowedRoles={['artisan', 'admin']}>
            <ArtisanDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/owner-dashboard" element={
          <ProtectedRoute allowedRoles={['homestay_owner', 'admin']}>
            <OwnerDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/vendor-dashboard" element={
          <ProtectedRoute allowedRoles={['vendor', 'admin']}>
            <VendorDashboard />
          </ProtectedRoute>
        } />
        
        {/* Role-Specific Management Pages */}
        <Route path="/my-products" element={
          <ProtectedRoute allowedRoles={['artisan', 'admin']}>
            <div>My Products Page</div>
          </ProtectedRoute>
        } />
        
        <Route path="/my-properties" element={
          <ProtectedRoute allowedRoles={['homestay_owner', 'admin']}>
            <div>My Properties Page</div>
          </ProtectedRoute>
        } />
        
        <Route path="/my-tours" element={
          <ProtectedRoute allowedRoles={['guide', 'admin']}>
            <div>My Tours Page</div>
          </ProtectedRoute>
        } />
        
        <Route path="/my-shop" element={
          <ProtectedRoute allowedRoles={['vendor', 'admin']}>
            <div>My Shop Page</div>
          </ProtectedRoute>
        } />
        
        <Route path="/orders" element={
          <ProtectedRoute allowedRoles={['artisan', 'vendor', 'admin']}>
            <div>Orders Page</div>
          </ProtectedRoute>
        } />
        
        <Route path="/earnings" element={
          <ProtectedRoute allowedRoles={['guide', 'artisan', 'homestay_owner', 'vendor', 'admin']}>
            <div>Earnings Page</div>
          </ProtectedRoute>
        } />
        
        {/* Utility Pages */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* 404 - Not Found */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-secondary">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
              <p className="text-xl text-gray-600 mb-8">Page not found</p>
              <a href="/" className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
                Go Home
              </a>
            </div>
          </div>
        } />
      </Routes>
      
      <Footer />
    </BrowserRouter>
  )
}