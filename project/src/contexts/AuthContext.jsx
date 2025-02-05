import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (credentials) => {
    // Mock login - in a real app, this would make an API call
    if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
      setIsAuthenticated(true);
      setUser({
        name: 'Vivek Kushwah',
        email: credentials.email,
        role: 'Property Manager',
        avatar: 'VK'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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