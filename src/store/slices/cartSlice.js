import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '@/services/cartService';

// Async thunks for API integration
export const addToCartAPI = createAsyncThunk(
  'cart/addToCartAPI',
  async ({ product, quantity = 1 }, { rejectWithValue, dispatch }) => {
    try {
      const result = await cartService.addToCart(product.id, quantity);
      
      if (result.success) {
        // Fetch updated cart items after adding
        dispatch(fetchCartItemsAPI());
        return { product, quantity, message: result.message };
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add product to cart');
    }
  }
);

export const fetchCartItemsAPI = createAsyncThunk(
  'cart/fetchCartItemsAPI',
  async (_, { rejectWithValue }) => {
    try {
      const result = await cartService.getCartItems();
      
      if (result.success) {
        return result.items;
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch cart items');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    // Local actions for UI state management
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      
      // Update totals
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
    
    // Clear messages
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to Cart API
      .addCase(addToCartAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Product added to cart successfully";
        const { product, quantity } = action.payload;
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.items.push({
            ...product,
            quantity: quantity,
            addedAt: new Date().toISOString(),
          });
        }
        
        // Update totals
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
      })
      .addCase(addToCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
        // If the error requires login, redirect to login page
        if (action.payload?.requiresLogin) {
          // Show user-friendly message and redirect
          alert('Your session has expired. Please log in again to continue.');
          setTimeout(() => {
            window.location.href = '/login';
          }, 100);
        }
      })
      
      // Fetch Cart Items API
      .addCase(fetchCartItemsAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItemsAPI.fulfilled, (state, action) => {
        state.loading = false;
        // Transform API cart items to match our local structure
        const apiItems = action.payload || [];
        state.items = apiItems.map(item => ({
          id: item.product_id, // Use product_id as the main id
          product_id: item.product_id,
          name: item.product_name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
          addedAt: item.created_at,
          // Keep original API data for reference
          apiData: item
        }));
        
        // Update totals
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalPrice = state.items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
      })
      .addCase(fetchCartItemsAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
        // If the error requires login, redirect to login page
        if (action.payload?.requiresLogin) {
          alert('Your session has expired. Please log in again to view your cart.');
          setTimeout(() => {
            window.location.href = '/login';
          }, 100);
        }
      });
  },
});

export const {
  removeFromCart,
  clearCart,
  clearError,
  clearSuccessMessage,
} = cartSlice.actions;

export default cartSlice.reducer;