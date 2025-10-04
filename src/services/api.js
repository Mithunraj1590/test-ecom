import axios from 'axios';
import API_CONFIG from '@/config/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: `${API_CONFIG.BASE_URL}/api`,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens or common headers here
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    // Handle common errors
    if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status >= 500) {
      console.error('Server error');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const productAPI = {
  // Get all products
  getProducts: async () => {
    try {
      
      const response = await axios.get('/api/products', {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      
      
      if (response.data.message === 'Products retrieved successfully') {
        return {
          success: true,
          data: response.data.products,
          message: response.data.message
        };
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status
      });
      return {
        success: false,
        data: [],
        message: error.message || 'Failed to fetch products'
      };
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      
      const response = await axios.get(`/api/products/${id}`, {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      
      
      if (response.data.message === 'Product retrieved successfully') {
        return {
          success: true,
          data: response.data.product,
          message: response.data.message
        };
      } else {
        return {
          success: false,
          data: null,
          message: response.data.message || 'Product not found'
        };
      }
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status
      });
      return {
        success: false,
        data: null,
        message: error.message || 'Failed to fetch product details'
      };
    }
  }
};

export default api;
