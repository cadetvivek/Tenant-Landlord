import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  // Load stored user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (credentials) => {
    setMessage(''); // Reset message before a new login attempt

    try {
      const response = await axios.post("https://landlordbackend.onrender.com/login", {
        email: credentials.email,
        password: credentials.password
      });

      const { status, message, name, email, data } = response.data;

      setMessage(message);

      

      if (status) {
        const userData = {
          name:response.data.data.name,
          email:response.data.data.email,
          role: response.data.data.userType === 1 ? "Tenant" : "LandLord",
          avatar: response.data.data[0]
        };

        setIsAuthenticated(true);
        setUser(userData);

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        return { success: true, message };
      } else {
        setIsAuthenticated(false);
        setUser(null);
        return { success: false, message };
      }
    } catch (error) {
      console.error("Login Failed", error);
      setIsAuthenticated(false);
      setUser(null);
      const errorMessage = "An error occurred while logging in. Please try again.";
      setMessage(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const register = async (credentials) => {
    try {
      const { name, email, password, role, mobileNo, confirmPassword } = credentials;

      const response = await axios.post("https://landlordbackend.onrender.com/signup", {
        name,
        email,
        password,
        userType: role,
        mobileNo,
        confirmPassword
      });

      const { status, message } = response.data;

      if (status) {
        return { success: true, message: message || "Signup successful!" };
      } else {
        return { success: false, message: message || "Signup failed. Please try again." };
      }
    } catch (error) {
      if (error.response) {
        return { success: false, message: error.response.data.message || "An error occurred during signup. Please try again." };
      } else if (error.request) {
        return { success: false, message: "No response received from the server. Please try again later." };
      } else {
        return { success: false, message: "An unexpected error occurred. Please try again." };
      }
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setMessage('');
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register, message }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
