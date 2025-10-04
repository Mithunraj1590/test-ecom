import axios from 'axios';

// Create axios instance for cart API calls - using Next.js API routes
const cartAPI = axios.create({
  baseURL: '', // Use relative URLs to automatically match frontend port
  timeout: 10000,
});

// Add request interceptor to include auth token
cartAPI.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (user.token && (user.isAuthenticated === true || user.authenticated === true)) {
      config.headers.Authorization = `Bearer ${user.token}`;
    } else {
      return Promise.reject(new Error('No valid authentication token found'));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
cartAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const cartService = {
  // Add product to cart
  addToCart: async (productId, quantity = 1) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const headers = {
        'Content-Type': 'application/json'
      };
      if (user.token && (user.isAuthenticated === true || user.authenticated === true)) {
        headers.Authorization = `Bearer ${user.token}`;
      }
      
      const response = await cartAPI.post('/api/cart/add', {
        product_id: productId,
        quantity: quantity
      }, { headers });

      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Product added to cart successfully'
      };
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 401) {
        return {
          success: false,
          error: 'Your session has expired. Please log in again.',
          requiresLogin: true
        };
      }
      
      if (error.response?.status === 400) {
        return {
          success: false,
          error: error.response?.data?.error || 'Bad request - please check your data',
          requiresLogin: false
        };
      }
      
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to add product to cart'
      };
    }
  },

  // Get user's cart items
  getCartItems: async () => {
    try {
      const response = await cartAPI.get('/api/cart/view');
      
      return {
        success: true,
        data: response.data,
        items: response.data.cart || []
      };
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 401) {
        return {
          success: false,
          error: 'Your session has expired. Please log in again.',
          requiresLogin: true,
          items: []
        };
      }
      
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to fetch cart items',
        items: []
      };
    }
  }
};

export default cartService;