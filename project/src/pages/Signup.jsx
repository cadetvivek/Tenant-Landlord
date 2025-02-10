import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(1);
  const [mobileNo, setMobileNo] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccess] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

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
          navigate("/login");
        }, 1000);
      } else {
        setError(response?.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const inputClassName = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="space-y-6 mb-8 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center shadow-lg border border-white/10 transition-all duration-300 hover:scale-105">
              <Building2 className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight drop-shadow-md">
              Create an Account
            </h2>
            <p className="text-sm text-white/80 font-light tracking-wide px-4">
              Join PropertyConnect to manage your portfolio
            </p>
          </div>
        </div>

        <div className="bg-purple-400/30 backdrop-blur-lg rounded-3xl shadow-xl p-4 sm:p-8 space-y-6 transform transition-all duration-300 hover:shadow-2xl">
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center space-x-2 bg-red-100/20 text-red-100 px-4 py-3 rounded-xl animate-fade-in text-sm">
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="bg-green-50/20 border border-green-200/20 text-green-100 px-4 py-3 rounded-lg text-sm animate-fade-in">
                {successMessage}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClassName}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="mobileNo" className="block text-sm font-medium text-white mb-1">
                    Mobile Number
                  </label>
                  <input
                    id="mobileNo"
                    name="mobileNo"
                    type="text"
                    required
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-white mb-1">
                    Select Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={role}
                    onChange={(e) => setRole(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-white/30 focus:ring-4 focus:ring-white/10 transition-all duration-300"
                  >
                    <option value={1}>Tenant</option>
                    <option value={2}>Landlord</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-white/10 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
              >
                Sign up
              </button>

              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full flex justify-center py-3 px-4 border border-white/10 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500/50 to-purple-600/50 hover:from-blue-600/50 hover:to-purple-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;