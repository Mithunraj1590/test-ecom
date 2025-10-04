// API Configuration
// This file centralizes all API endpoint configurations

const API_CONFIG = {
  // Base URL for external API
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://globosoft.co.uk/ecommerce-api',
  
  // External API Endpoints
  EXTERNAL: {
    PRODUCTS: {
      LIST: process.env.NEXT_PUBLIC_API_PRODUCTS_LIST || '/api/products/list.php',
      DETAILS: process.env.NEXT_PUBLIC_API_PRODUCTS_DETAILS || '/api/products/details.php',
    },
    AUTH: {
      LOGIN: process.env.NEXT_PUBLIC_API_AUTH_LOGIN || '/api/auth/login.php',
      REGISTER: process.env.NEXT_PUBLIC_API_AUTH_REGISTER || '/api/auth/register.php',
    },
    CART: {
      ADD: process.env.NEXT_PUBLIC_API_CART_ADD || '/api/cart/add.php',
      VIEW: process.env.NEXT_PUBLIC_API_CART_VIEW || '/api/cart/view.php',
    },
    CHECKOUT: {
      CHECKOUT: process.env.NEXT_PUBLIC_API_CHECKOUT || '/api/checkout/checkout.php',
    },
    ORDERS: {
      LIST: process.env.NEXT_PUBLIC_API_ORDERS_LIST || '/api/orders/list.php',
    },
  },
  
  // Internal API Routes (Next.js API routes)
  INTERNAL: {
    PRODUCTS: '/api/products',
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
    },
    CART: {
      ADD: '/api/cart/add',
      VIEW: '/api/cart/view',
    },
    CHECKOUT: '/api/checkout/checkout',
    ORDERS: '/api/orders/list',
  }
};

// Helper function to get full external API URL
export const getExternalApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to get internal API URL
export const getInternalApiUrl = (endpoint) => {
  return endpoint; // Internal routes are relative
};

export default API_CONFIG;
