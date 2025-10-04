'use client';

import { useState, useEffect } from 'react';
import { checkAuthAndRedirect, isAuthenticated, getCurrentUser, logout as authLogout } from '@/utils/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const isAuth = isAuthenticated();
      const currentUser = getCurrentUser();
      
      setAuthenticated(isAuth);
      setUser(currentUser);
      setLoading(false);
    };

    checkAuth();

    // Listen for auth state changes
    const handleAuthStateChange = () => {
      checkAuth();
    };

    window.addEventListener('authStateChanged', handleAuthStateChange);

    return () => {
      window.removeEventListener('authStateChanged', handleAuthStateChange);
    };
  }, []);

  const logout = () => {
    authLogout();
    setUser(null);
    setAuthenticated(false);
    
    // Dispatch auth state change event
    window.dispatchEvent(new CustomEvent('authStateChanged'));
    
    // Refresh the page to ensure clean logout and clear any cached state
    window.location.reload();
  };

  const requireAuth = (redirectTo = '/login') => {
    if (!authenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = redirectTo;
      }
      return false;
    }
    return true;
  };

  const requireAuthWithAlert = (message = 'Please log in to continue.', redirectTo = '/login') => {
    if (!authenticated) {
      alert(message);
      if (typeof window !== 'undefined') {
        window.location.href = redirectTo;
      }
      return false;
    }
    return true;
  };

  return {
    user,
    authenticated,
    loading,
    logout,
    requireAuth,
    requireAuthWithAlert,
    isAuthenticated: () => authenticated,
    getCurrentUser: () => user
  };
};
