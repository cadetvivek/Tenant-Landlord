
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  // ... [keep all the existing state and logic the same] ...
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await login({ email, password });

      if (response?.success) {
        setSuccess(response.message || 'Login successful!');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setError(response?.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Animated Logo */}
        <div className="flex justify-center animate-float">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-xl">
            <Building2 className="w-8 h-8 text-white animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-bold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-white/80">
            Manage your properties seamlessly
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 space-y-6 transform transition-all duration-300 hover:shadow-2xl">
          {/* Status Messages */}
          {error && (
            <div className="flex items-center space-x-2 bg-red-100/20 text-red-100 px-4 py-3 rounded-xl animate-fade-in">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center space-x-2 bg-green-100/20 text-green-100 px-4 py-3 rounded-xl animate-fade-in">
              <CheckCircle className="w-5 h-5" />
              <span>{successMessage}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-white/90 hover:bg-white text-blue-600 rounded-xl font-semibold shadow-md transform transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-current rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-white/60">or</span>
              </div>
            </div>

            {/* Signup Button */}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="w-full py-2.5 px-4 bg-transparent border-2 border-white/20 text-white rounded-xl font-medium shadow-sm transform transition-all duration-200 hover:border-white/40 hover:scale-[1.02]"
            >
              Create New Account
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <a href="#" className="text-sm text-white/60 hover:text-white/80 transition-colors">
                Forgot password?
              </a>
            </div>
          </form>
        </div>

        {/* Social Login */}
        <div className="text-center text-white/60 text-sm">
          Or continue with
          <div className="mt-4 flex justify-center space-x-4">
            <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                {/* Google Icon */}
              </svg>
            </button>
            <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                {/* GitHub Icon */}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;