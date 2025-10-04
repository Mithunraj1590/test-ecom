'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  addToCartAPI, 
  removeFromCart, 
  fetchCartItemsAPI, 
  clearCart,
  clearSuccessMessage 
} from '@/store/slices/cartSlice';
import { useAuth } from './useAuth';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { user, requireAuthWithAlert } = useAuth();
  
  // Cart state from Redux
  const items = useAppSelector((state) => state.cart.items);
  const totalItems = useAppSelector((state) => state.cart.totalItems);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const loading = useAppSelector((state) => state.cart.loading);
  const error = useAppSelector((state) => state.cart.error);
  const successMessage = useAppSelector((state) => state.cart.successMessage);

  // Auto-clear success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  // Fetch cart items when user is authenticated
  useEffect(() => {
    if (user && user.token && (user.isAuthenticated === true || user.authenticated === true)) {
      dispatch(fetchCartItemsAPI());
    }
  }, [user?.token, user?.isAuthenticated, user?.authenticated, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const addToCart = (product, quantity = 1) => {
    if (!requireAuthWithAlert('Please log in to add items to your cart.')) {
      return false;
    }

    // Check if product is already in cart
    const existingItem = items.find(item => item.id === product.id);
    if (existingItem) {
      alert(`"${product.name}" is already in your cart!`);
      return false;
    }

    dispatch(addToCartAPI({ product, quantity }));
    return true;
  };

  const updateQuantity = (productId, newQuantity) => {
    if (!requireAuthWithAlert('Please log in to update your cart.')) {
      return false;
    }

    const currentItem = items.find(item => item.id === productId);
    if (!currentItem) {
      console.error('Item not found in cart');
      return false;
    }

    // Since we only have addToCart API, we'll use it with the difference
    const quantityDifference = newQuantity - currentItem.quantity;
    if (quantityDifference !== 0) {
      // Create a minimal product object for the API
      const product = {
        id: productId,
        name: currentItem.name || 'Product',
        price: currentItem.price || 0
      };
      dispatch(addToCartAPI({ product, quantity: quantityDifference }));
    }
    return true;
  };

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
    return true;
  };

  const clearCartItems = () => {
    dispatch(clearCart());
    return true;
  };

  const refreshCart = () => {
    if (user && user.token) {
      dispatch(fetchCartItemsAPI());
    }
  };

  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };

  const getCartItem = (productId) => {
    return items.find(item => item.id === productId);
  };

  return {
    // State
    items,
    totalItems,
    totalPrice,
    loading,
    error,
    successMessage,
    
    // Actions
    addToCart,
    updateQuantity,
    removeItem,
    clearCartItems,
    refreshCart,
    
    // Helpers
    isInCart,
    getCartItem
  };
};
