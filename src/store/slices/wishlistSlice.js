import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    totalItems: 0,
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (!existingItem) {
        state.items.push({
          ...product,
          addedAt: new Date().toISOString(),
        });
        state.totalItems = state.items.length;
      }
    },
    
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.id !== productId);
      state.totalItems = state.items.length;
    },
    
    clearWishlist: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
    
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        // Remove from wishlist
        state.items = state.items.filter(item => item.id !== product.id);
      } else {
        // Add to wishlist
        state.items.push({
          ...product,
          addedAt: new Date().toISOString(),
        });
      }
      
      state.totalItems = state.items.length;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
