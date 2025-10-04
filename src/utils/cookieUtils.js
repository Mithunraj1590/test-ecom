// Cookie utility functions for authentication

export const setCookie = (name, value, days = 7) => {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};

export const getCookie = (name) => {
  if (typeof document === 'undefined') return null;
  
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  
  return null;
};

export const deleteCookie = (name) => {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export const setUserCookie = (userData) => {
  const sessionData = {
    ...userData,
    isAuthenticated: true,
    authenticated: true,
    loginTime: new Date().toISOString()
  };
  
  setCookie('user', JSON.stringify(sessionData), 7);
};

export const getUserCookie = () => {
  const userCookie = getCookie('user');
  if (!userCookie) return null;
  
  try {
    return JSON.parse(userCookie);
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    return null;
  }
};

export const clearUserCookie = () => {
  deleteCookie('user');
  
  // Clear any additional auth-related cookies
  if (typeof document !== 'undefined') {
    // Clear with different path and domain combinations
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + window.location.hostname;
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.' + window.location.hostname;
  }
};
