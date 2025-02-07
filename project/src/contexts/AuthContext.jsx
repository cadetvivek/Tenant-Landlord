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

      const { status, message, name, email } = response.data; 

     console.log(name)

      setMessage(message);

      if (status) {
        setIsAuthenticated(true);
        setUser({
          name,
          email,
          role: response.data.data.userType === 1 ? "Tenant" : "LandLord",
          avatar: response.data.data.name[0]
        });
        
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
      const { name, email, password, role, mobileNo,confirmPassword } = credentials;  // Extract mobileNo along with other data
    
      // Send the data to the server
      const response = await axios.post("https://landlordbackend.onrender.com/signup", {
        name,
        email,
        password,
        userType:role,
        mobileNo ,
        confirmPassword // Include mobileNo in the API request
      });
    
      const { status, message } = response.data;
    
      if (status) {
        return { success: true, message: message || "Signup successful!" };
      } else {
        return { success: false, message: message || "Signup failed. Please try again." };
      }
    } catch (error) {
      // Enhanced error handling for various types of errors
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
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout,register,message }}>
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
