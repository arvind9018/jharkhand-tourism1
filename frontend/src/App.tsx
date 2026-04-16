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

import Profile from "./pages/Profile"
import Bookings from "./pages/Bookings"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import VerifyEmail from "./pages/VerifyEmail"
import Unauthorized from "./pages/Unauthorized"
import Contact from "./pages/Contact"
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import BookingDetails from './pages/BookingDetails';

import VendorReviews from './pages/vendor/VendorReviews';
import VendorAnalytics from './pages/vendor/VendorAnalytics';
import VendorEarnings from './pages/vendor/VendorEarnings';


import { AuthProvider } from "./context/AuthContext"

import ScrollToTop from "./components/ScrollToTop"
import { checkApiHealth } from "./services/api"
import { isAuthenticated, getUserRole, initAuth } from "./services/authApi"
import { GoogleOAuthProvider } from '@react-oauth/google';


//chatbot
import ChatBot from "../chatbot/frontend/components/ChatBot"
import ChatBotLauncher from "./components/ChatBotLauncher"

import Feedback from './pages/Feedback';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Accessibility from './pages/Accessibility';
import CookiePolicy from './pages/CookiePolicy';
import Disclaimer from './pages/Disclaimer';
import HelpCenter from './pages/HelpCenter';
import TravelGuidelines from './pages/TravelGuidelines';
import SafetyAlerts from './pages/SafetyAlerts';
import VRExperience from './pages/VRExperience';
import ArtisanDashboard from './pages/artisan/ArtisanDashboard';
import MyProducts from './pages/artisan/MyProducts';
import ArtisanOrders from './pages/artisan/Orders';
import VendorDashboard from './pages/vendor/VendorDashboard';
import OwnerDashboard from './pages/owner/OwnerDashboard';
import GuideDashboard from './pages/guide/GuideDashboard';

import MyShop from './pages/vendor/MyShop';
import ShopOrders from './pages/vendor/ShopOrders';
import Inventory from './pages/vendor/Inventory';
import MyProperties from './pages/owner/MyProperties';
import MyTours from './pages/guide/MyTours';

import TourBookings from './pages/guide/TourBookings';
import GuideEarnings from './pages/guide/GuideEarnings';
import GuideReviews from './pages/guide/GuideReviews';
import GuideAnalytics from './pages/guide/GuideAnalytics';
import GuideSchedule from './pages/guide/GuideSchedule';

import PropertyBookings from './pages/owner/PropertyBookings';
import OwnerEarnings from './pages/owner/OwnerEarnings';
import PropertyReviews from './pages/owner/PropertyReviews';
import OwnerAnalytics from './pages/owner/OwnerAnalytics';
import OwnerAlerts from "./pages/owner/OwnerAlerts";

import ArtisanEarnings from './pages/artisan/ArtisanEarnings';
import ProductReviews from './pages/artisan/ProductReviews';
import ArtisanAnalytics from './pages/artisan/ArtisanAnalytics';
import ShopProfile from './pages/artisan/ShopProfile';



import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
const GOOGLE_CLIENT_ID = '1067197050357-a7jddp1e1dkv1u7l7jm4almn9gclu5o4.apps.googleusercontent.com';
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
    <CartProvider>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    
    <ScrollToTop />
      <Navbar />
      
      {/* API Status Banner
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
      )} */}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/map" element={<MapView />} />
        <Route path="/homestays" element={<Homestays />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/contact" element={<Contact />} /><Route path="/feedback" element={<Feedback />} />
<Route path="/faq" element={<FAQ />} />
<Route path="/privacy" element={<PrivacyPolicy />} />
<Route path="/terms" element={<TermsOfService />} />
<Route path="/accessibility" element={<Accessibility />} />
<Route path="/cookies" element={<CookiePolicy />} />
<Route path="/disclaimer" element={<Disclaimer />} />
<Route path="/help" element={<HelpCenter />} />
<Route path="/guidelines" element={<TravelGuidelines />} />
<Route path="/safety" element={<SafetyAlerts />} />
<Route path="/vr-experience" element={<VRExperience />} />
<Route path="/payment" element={<Payment />} />
<Route path="/payment-success" element={<PaymentSuccess />} />
<Route path="/bookings/:id" element={<BookingDetails />} />
<Route path="/cart" element={<Cart />} />
<Route path="/vendor/shop" element={<MyShop />} />
<Route path="/vendor/orders" element={<ShopOrders />} />
<Route path="/vendor/inventory" element={<Inventory />} />
<Route path="/owner/properties" element={<MyProperties />} />
<Route path="/guide/tours" element={<MyTours />} />
<Route path="/guide/bookings" element={<TourBookings />} />
<Route path="/guide/earnings" element={<GuideEarnings />} />
<Route path="/guide/reviews" element={<GuideReviews />} />
<Route path="/guide/analytics" element={<GuideAnalytics />} />
<Route path="/guide/schedule" element={<GuideSchedule />} />

<Route path="/owner/bookings" element={<PropertyBookings />} />
<Route path="/owner/earnings" element={<OwnerEarnings />} />
<Route path="/owner/reviews" element={<PropertyReviews />} />
<Route path="/owner/analytics" element={<OwnerAnalytics />} />
<Route path="/owner/alerts" element={<OwnerAlerts />} />


<Route path="/vendor/reviews" element={<VendorReviews />} />
<Route path="/vendor/analytics" element={<VendorAnalytics />} />
<Route path="/vendor/earnings" element={<VendorEarnings />} />

<Route path="/artisan/earnings" element={<ArtisanEarnings />} />
<Route path="/artisan/reviews" element={<ProductReviews />} />
<Route path="/artisan/analytics" element={<ArtisanAnalytics />} />
<Route path="/artisan/shop-profile" element={<ShopProfile />} />

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
            <MyProducts />
          </ProtectedRoute>
        } />
        
        <Route path="/my-properties" element={
          <ProtectedRoute allowedRoles={['homestay_owner', 'admin']}>
            <OwnerDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/my-tours" element={
          <ProtectedRoute allowedRoles={['guide', 'admin']}>
            <GuideDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/my-shop" element={
          <ProtectedRoute allowedRoles={['vendor', 'admin']}>
            <VendorDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/artisan/orders" element={
          <ProtectedRoute allowedRoles={['artisan', 'admin']}>
            <ArtisanOrders />
          </ProtectedRoute>
        } />
        
        <Route path="/orders" element={
          <ProtectedRoute allowedRoles={['artisan', 'vendor', 'admin']}>
            <ArtisanOrders />
          </ProtectedRoute>
        } />
        
        <Route path="/earnings" element={
          <ProtectedRoute allowedRoles={['guide', 'artisan', 'homestay_owner', 'vendor', 'admin']}>
            <div>Earnings Page</div>
          </ProtectedRoute>
        } />
          {/* Chatbot Page */}
        <Route path="/chatbot" element={<ChatBot />} />
        
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
       {/* Floating Chatbot Icon */}
      <ChatBot />
      
      <Footer />

      
      </GoogleOAuthProvider>
        </CartProvider>
    </BrowserRouter>
  )
}