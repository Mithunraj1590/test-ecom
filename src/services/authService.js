import axios from 'axios';
import { setUserCookie, clearUserCookie } from '@/utils/cookieUtils';

// Authentication API service
export const authService = {
  // Register new user
  register: async (userData) => {
    try {
      
      const response = await axios.post('/api/auth/register', userData, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      
      
      if (response.data.message === 'User registered successfully' || response.data.token) {
        return {
          success: true,
          data: response.data,
          message: response.data.message || 'Registration successful',
          token: response.data.token
        };
      } else {
        return {
          success: false,
          data: null,
          message: response.data.message || 'Registration failed'
        };
      }
    } catch (error) {
      console.error('Error registering user:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status
      });
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message || 'Registration failed'
      };
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      
      const response = await axios.post('/api/auth/login', credentials, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      
      
      if (response.data.message === 'Login successful' || response.data.token) {
        return {
          success: true,
          data: response.data,
          message: response.data.message || 'Login successful',
          token: response.data.token
        };
      } else {
        return {
          success: false,
          data: null,
          message: response.data.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status
      });
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || error.message || 'Login failed'
      };
    }
  },

  // Logout user (clear local storage and cookies)
  logout: () => {
    try {
      localStorage.removeItem('user');
      clearUserCookie();
      
      // Clear any other auth-related data
      sessionStorage.removeItem('user');
      
      // Dispatch auth state change event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('authStateChanged'));
      }
      
      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      console.error('Error logging out:', error);
      return {
        success: false,
        message: 'Logout failed'
      };
    }
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        return {
          success: true,
          data: JSON.parse(user)
        };
      } else {
        return {
          success: false,
          data: null,
          message: 'No user found'
        };
      }
    } catch (error) {
      console.error('Error getting current user:', error);
      return {
        success: false,
        data: null,
        message: 'Failed to get user data'
      };
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        return userData.isAuthenticated === true;
      }
      return false;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },

  // Store user session
  setUserSession: (userData, token = null) => {
    try {
      const sessionData = {
        ...userData,
        isAuthenticated: true,
        authenticated: true,
        loginTime: new Date().toISOString(),
        token: token
      };
      
      // Set in localStorage
      localStorage.setItem('user', JSON.stringify(sessionData));
      
      // Set in cookies for middleware
      setUserCookie(sessionData);
      return {
        success: true,
        message: 'Session stored successfully'
      };
    } catch (error) {
      console.error('Error storing user session:', error);
      return {
        success: false,
        message: 'Failed to store session'
      };
    }
  }
};

export default authService;
