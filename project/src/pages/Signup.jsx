import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("tenant"); // Default to Tenant
  const [mobileNo, setMobileNo] = useState(""); // State for mobile number
  const [error, setError] = useState("");
  const [successMessage, setSuccess] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth(); // Use register function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate mobile number (example: basic 10-digit validation)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(mobileNo)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      const response = await register({
        name,
        email,
        password,
        role,
        mobileNo,
        confirmPassword,
      });

      if (response?.success) {
        setSuccess(response.message || "Signup successful! Redirecting...");
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after successful signup
        }, 1000);
      } else {
        setError(response?.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center py-12 sm:px-6 lg">
     
<div className="sm:mx-auto sm:w-full sm:max-w-md w-full px-4">
  <div className="space-y-4 mb-8 text-center">
    {/* Logo Container */}
    <div className="flex justify-center animate-float">
      <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center shadow-lg border border-white/10 transition-all duration-300 hover:scale-105">
        <Building2 className="w-10 h-10 text-white animate-pulse" />
      </div>
    </div>

    {/* Text Content */}
    <div className="space-y-2">
      <h2 className="text-3xl font-semibold text-white tracking-tight drop-shadow-md">
        Create an Account
      </h2>
      <p className="text-sm text-white/80 font-light tracking-wide">
        Join PropertyConnect to manage your portfolio
      </p>
    </div>
  </div>
</div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 space-y-6 transform transition-all duration-300 hover:shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center space-x-2 bg-red-100/20 text-red-100 px-4 py-3 rounded-xl animate-fade-in">
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm animate-fade-in">
                {successMessage}
              </div>
            )}

            <div className="animate-fade-in-up">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="animate-fade-in-up delay-100">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="animate-fade-in-up delay-200">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="animate-fade-in-up delay-300">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Mobile Number Input */}
            <div className="animate-fade-in-up delay-400">
              <label
                htmlFor="mobileNo"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile Number
              </label>
              <div className="mt-1">
                <input
                  id="mobileNo"
                  name="mobileNo"
                  type="text"
                  required
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Dropdown for Role Selection */}
            <div className="animate-fade-in-up delay-500">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Select Role
              </label>
              <div className="mt-1">
                <select
                  id="role"
                  name="role"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-3 pr-10 py-3.5 bg-blue-500/5 border-2 border-white/10 rounded-xl text-black placeholder-white/40 focus:border-white/30 focus:ring-4 focus:ring-white/10 transition-all duration-300"
                >
                  <option value={1}>Tenant</option>
                  <option value={2}>Landlord</option>
                </select>
                
              </div>
            </div>

            <div className="animate-fade-in-up delay-600">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
