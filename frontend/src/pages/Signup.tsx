// pages/Signup.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';

<FacebookLogin
  appId="YOUR_APP_ID"
  onSuccess={(res) => console.log(res)}
  onFail={(err) => console.log(err)}
/>


import { signupUser } from '../services/authApi';

const FACEBOOK_APP_ID = '3014044502129811';


export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await signupUser(form);
      if (response.success) {
        navigate('/');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
// Google Signup
  const googleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        setError('');
        
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
        } else {
          setError(data.message || 'Google signup failed');
        }
      } catch (error) {
        setError('Google signup failed');
      } finally {
        setLoading(false);
      }
    },
    
  });

  // Facebook Signup
  const handleFacebookSuccess = async (response: any) => {
    try {
      setLoading(true);
      setError('');
      
      const fbResponse = await fetch('https://jharkhand-tourism1-1.onrender.com/api/auth/facebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          accessToken: response.accessToken, 
          userID: response.userID 
        })
      });
      
      const data = await fbResponse.json();
      
      if (data.success) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        navigate('/');
      } else {
        setError(data.message || 'Facebook signup failed');
      }
    } catch (error) {
      setError('Facebook signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary flex items-center justify-center p-4">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* Left Side - 3D Animation & Image */}
        <div className="relative bg-gradient-to-br from-primary to-primary-dark p-8 md:p-12 flex flex-col justify-center items-center text-white overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-20 left-10 animate-float">
              <div className="w-20 h-20 bg-accent/30 rounded-2xl rotate-12 backdrop-blur-sm"></div>
            </div>
            <div className="absolute bottom-20 right-10 animate-float-delay">
              <div className="w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm"></div>
            </div>
          </div>

          {/* 3D Illustration */}
          <div className="relative z-10 mb-8 transform hover:scale-105 transition-transform duration-700">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Main 3D Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent-dark rounded-3xl shadow-2xl transform rotate-6 hover:rotate-12 transition-transform duration-500 animate-float-slow">
                <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
                <div className="absolute top-4 left-4 right-4 bottom-4 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                  <span className="text-7xl animate-bounce-slow">🌿</span>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-accent/80 rounded-2xl shadow-lg animate-float flex items-center justify-center text-2xl">
                🏞️
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary-light rounded-2xl shadow-lg animate-float-delay flex items-center justify-center text-2xl">
                🏡
              </div>
              <div className="absolute top-1/2 -left-8 w-12 h-12 bg-white/90 rounded-full shadow-lg animate-float-slow flex items-center justify-center text-xl">
                ⭐
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Journey</h2>
            <p className="text-white/80 max-w-md">
              Discover the hidden gems of Jharkhand with our smart tourism platform.
            </p>
            
            {/* Feature List */}
            <div className="mt-6 space-y-3 text-left">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-sm">✓</span>
                <span className="text-white/90">Access to 50+ destinations</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-sm">✓</span>
                <span className="text-white/90">Book authentic homestays</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-sm">✓</span>
                <span className="text-white/90">AR/VR experiences</span>
              </div>
            </div>
          </div>

          {/* Decorative Dots */}
          <div className="absolute bottom-8 left-8 flex gap-2">
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="w-2 h-2 bg-white/80 rounded-full"></div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="p-8 md:p-12 bg-white">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary">Create Account</h2>
              <p className="text-secondary-text mt-2">Join our community of explorers</p>
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div className="group">
                <label className="block text-sm font-medium text-primary mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400 group-focus-within:text-accent transition">👤</span>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <span>ℹ️</span> Must be at least 6 characters
                </p>
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <span className="group-hover:translate-x-1 transition">→</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent-dark opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              {/* Login Link */}
              <p className="text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-accent font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </form>

            {/* Social Signup */}
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
                onClick={() => googleSignup()}
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
