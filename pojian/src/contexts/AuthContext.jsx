import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

const TOKEN_KEY = 'authToken';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const navigate = useNavigate();
  const location = useLocation();

  const login = useCallback((email, password) => {
    if (email === 'john@example.com' && password === '123456') {
      const newToken = 'mock-jwt-token';
      localStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    navigate('/login', { replace: true });
  }, [navigate]);

  // Check token on mount and when token changes
  useEffect(() => {
    const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password'];
    if (!token && !publicPaths.includes(location.pathname)) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate, location]);

  const value = {
    token,
    isAuthenticated: !!token,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};