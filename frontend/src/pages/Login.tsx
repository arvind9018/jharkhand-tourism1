// pages/Login.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';

import { loginUser } from '../services/authApi';


export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showDemo, setShowDemo] = useState(false);
// Replace with your Facebook App ID
  const FACEBOOK_APP_ID = '3014044502129811';

// Demo Users Data
  const demoUsers = [
  { name: "👑 Admin", email: "admin@jharkhandtourism.com", password: "admin123", color: "bg-purple-100 text-purple-800" },
  { name: "🎨 Artisan", email: "birsa@dokraart.com", password: "artisan123", color: "bg-orange-100 text-orange-800" },
  { name: "🏡 Homestay Owner", email: "rajesh@homestay.com", password: "owner123", color: "bg-green-100 text-green-800" },
  { name: "🧭 Tour Guide", email: "guide@santhal.com", password: "guide123", color: "bg-blue-100 text-blue-800" },
  { name: "🛍️ Vendor", email: "vijay@handicrafts.com", password: "vendor123", color: "bg-pink-100 text-pink-800" },
  { name: "👤 Regular User", email: "user@example.com", password: "user123", color: "bg-gray-100 text-gray-800" }
];

// Add this function
const fillDemo = (email: string, password: string) => {
  setForm({ email, password });
  setError('');
};


  // Google Login
  const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      setLoading(true);
      // Send to your backend
      const response = await fetch('https://jharkhand-tourism1-1.onrender.com/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ access_token: tokenResponse.access_token })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        navigate('/');
      }
    } catch (error) {
      setError('Google login failed');
    } finally {
      setLoading(false);
    }
  },
  
});


  // Facebook Login
  const handleFacebookSuccess = async (response: any) => {
    try {
      setLoading(true);
      const apiResponse = await fetch('https://jharkhand-tourism1-1.onrender.com/api/auth/facebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: response.accessToken, userID: response.userID })
      });

      const data = await apiResponse.json();
      if (!apiResponse.ok || !data.success) {
        throw new Error(data.message || 'Facebook authentication failed');
      }

      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));
      navigate('/');
    } catch (error: any) {
      setError(error.message || 'Facebook login failed');
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginUser(form);
      if (response.success) {
        navigate('/');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* Left Side - 3D Animation & Image */}
        <div className="relative bg-gradient-to-br from-primary to-primary-dark p-8 md:p-12 flex flex-col justify-center items-center text-white overflow-hidden order-2 md:order-1">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            {/* Floating Mountains */}
            <div className="absolute top-20 right-10 animate-float">
              <div className="w-24 h-24 bg-gradient-to-br from-accent/30 to-accent/10 rounded-3xl transform rotate-12 backdrop-blur-sm"></div>
            </div>
            <div className="absolute bottom-20 left-10 animate-float-delay">
              <div className="w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm"></div>
            </div>
          </div>

          {/* 3D Illustration */}
          <div className="relative z-10 mb-8 transform hover:scale-105 transition-transform duration-700">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Main 3D Globe */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-dark rounded-full shadow-2xl animate-spin-slow">
                <div className="absolute inset-2 bg-primary/20 rounded-full backdrop-blur-sm"></div>
                <div className="absolute inset-4 bg-white/10 rounded-full"></div>
                
                {/* Map Dots */}
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-white/80 rounded-full"></div>
                <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-accent-light rounded-full animate-pulse"></div>
              </div>
              
              {/* Floating Travel Elements */}
              <div className="absolute -top-4 -right-4 w-14 h-14 bg-accent/90 rounded-2xl shadow-lg animate-float flex items-center justify-center text-2xl">
                ✈️
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-primary-light rounded-2xl shadow-lg animate-float-delay flex items-center justify-center text-2xl">
                🏔️
              </div>
              <div className="absolute top-1/2 -right-8 w-10 h-10 bg-white/90 rounded-full shadow-lg animate-float-slow flex items-center justify-center text-xl">
                🌄
              </div>
            </div>
          </div>

          {/* Welcome Back Text */}
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-white/80 max-w-md">
              Continue your journey through the beautiful landscapes of Jharkhand.
            </p>
            
            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">50+</div>
                <div className="text-xs text-white/70">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">100+</div>
                <div className="text-xs text-white/70">Homestays</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 md:p-12 bg-white order-1 md:order-2">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-accent/10 rounded-full mb-4">
                <span className="text-3xl">🌿</span>
              </div>
              <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
              <p className="text-secondary-text mt-2">Sign in to continue your adventure</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-shake">
                <p className="text-red-600 text-sm flex items-center gap-2">
                  <span className="text-lg">⚠️</span>
                  {error}
                </p>
              </div>
            )}

            <div className="mb-6">
  <button
    onClick={() => setShowDemo(!showDemo)}
    className="w-full text-sm text-accent font-semibold flex items-center justify-center gap-2 mb-3 hover:underline"
  >
    <span>🔐</span> Quick Demo Login <span>{showDemo ? '▲' : '▼'}</span>
  </button>
  
  {showDemo && (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
      <p className="text-xs text-gray-500 mb-3 text-center">Click any role to auto-fill:</p>
      <div className="grid grid-cols-2 gap-2">
        {demoUsers.map((user, idx) => (
          <button
            key={idx}
            onClick={() => fillDemo(user.email, user.password)}
            className={`px-3 py-2 rounded-lg text-xs font-medium text-left ${user.color} border hover:scale-105 transition`}
          >
            <div>{user.name}</div>
            <div className="text-[10px] opacity-75 font-mono truncate">{user.email}</div>
          </button>
        ))}
      </div>
    </div>
  )}
</div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="group">
                <label className="block text-sm font-medium text-primary mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400 group-focus-within:text-accent transition">📧</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="group">
                <label className="block text-sm font-medium text-primary mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400 group-focus-within:text-accent transition">🔒</span>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent-dark text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <span className="group-hover:translate-x-1 transition">→</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent-dark opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              {/* Signup Link */}
              <p className="text-center text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-accent font-semibold hover:underline">
                  Create account
                </Link>
              </p>
            </form>

              

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* OAuth Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => googleLogin()}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition group"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <span className="text-gray-700 font-medium">Continue with Google</span>
              </button>

              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                autoLoad={false}
                fields="name,email,picture"
                onSuccess={handleFacebookSuccess}
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition group"
                  >
                    <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
                    <span className="text-gray-700 font-medium">Continue with Facebook</span>
                  </button>
                )}
              />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
