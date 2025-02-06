import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  const login = async (credentials) => {
    setMessage(''); // Reset message before a new login attempt

    try {
      const response = await axios.post("https://landlordbackend.onrender.com/login", {
        email: credentials.email,
        password: credentials.password
      });

      const { status, message, name, email } = response.data; // Extract response data

      setMessage(message);

      if (status) {
        setIsAuthenticated(true);
        setUser({
          name,
          email,
          role: 'Property Manager', 
          avatar: 'VK', 
        });
        
        return { success: true, message }; // Return structured response
      } else {
        setIsAuthenticated(false);
        setUser(null);
        return { success: false, message }; // Return structured response
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

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setMessage('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, message }}>
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
