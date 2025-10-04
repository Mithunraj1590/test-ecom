import axios from 'axios';

// Create a standardized API client
const apiClient = axios.create({
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        window.dispatchEvent(new CustomEvent('authStateChanged'));
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Standardized API methods
export const apiService = {
  // GET request
  get: async (url, config = {}) => {
    try {
      const response = await apiClient.get(url, config);
      return { data: response.data, success: true };
    } catch (error) {
      return { 
        data: null, 
        success: false, 
        error: error.response?.data?.error || error.message || 'Request failed' 
      };
    }
  },

  // POST request
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.post(url, data, config);
      return { data: response.data, success: true };
    } catch (error) {
      return { 
        data: null, 
        success: false, 
        error: error.response?.data?.error || error.message || 'Request failed' 
      };
    }
  },

  // PUT request
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await apiClient.put(url, data, config);
      return { data: response.data, success: true };
    } catch (error) {
      return { 
        data: null, 
        success: false, 
        error: error.response?.data?.error || error.message || 'Request failed' 
      };
    }
  },

  // DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await apiClient.delete(url, config);
      return { data: response.data, success: true };
    } catch (error) {
      return { 
        data: null, 
        success: false, 
        error: error.response?.data?.error || error.message || 'Request failed' 
      };
    }
  }
};

export default apiClient;
