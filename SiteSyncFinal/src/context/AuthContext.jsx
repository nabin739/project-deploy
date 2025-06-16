import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get user profile
  const getProfile = async () => {
    try {
      const response = await api.get('/is-auth');
      if (response.data.success) {
        return response.data.user;
      }
      throw new Error(response.data.message || 'Failed to get profile');
    } catch (error) {
      console.error('Profile fetch error:', error);
      throw error;
    }
  };

  // Function to handle login
  const apiLogin = async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      if (response.data.success) {
        return response.data;
      }
      throw new Error(response.data.message || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setUser(null);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const { user: userData } = await apiLogin(credentials);
      setUser(userData);
      return userData;
    } catch (error) {
      setUser(null);
      setError(error.response?.data?.message || error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      // Clear the auth cookie by setting it to expire
      document.cookie = 'adminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };




  // logout...



  

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 