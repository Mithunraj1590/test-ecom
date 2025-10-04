// Authentication utility functions

export const checkAuthAndRedirect = () => {
  // Check if user is authenticated
  const user = localStorage.getItem('user');
  
  if (!user) {
    // User is not authenticated, redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return false;
  }
  
  try {
    const userData = JSON.parse(user);
    // Check if user has token and is authenticated
    const isAuth = userData.token && (userData.isAuthenticated === true || userData.authenticated === true);
    
    if (!isAuth) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error parsing user data:', error);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return false;
  }
};

export const isAuthenticated = () => {
  try {
    const user = localStorage.getItem('user');
    if (!user) return false;
    
    const userData = JSON.parse(user);
    // Check if user has token and is authenticated
    return userData.token && (userData.isAuthenticated === true || userData.authenticated === true);
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem('user');
    if (!user) return null;
    
    const userData = JSON.parse(user);
    // Return user data if authenticated
    const isAuth = userData.token && (userData.isAuthenticated === true || userData.authenticated === true);
    return isAuth ? userData : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const logout = () => {
  try {
    // Clear localStorage
    localStorage.removeItem('user');
    
    // Clear sessionStorage
    sessionStorage.removeItem('user');
    
    // Clear cookies using cookie utils
    if (typeof document !== 'undefined') {
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure';
    }
    
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
};
