'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, isAuthenticated } from '@/utils/auth';
import { getUserCookie } from '@/utils/cookieUtils';

const AuthDebug = () => {
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const updateDebugInfo = () => {
      const user = getCurrentUser();
      const auth = isAuthenticated();
      const cookie = getUserCookie();
      
      setDebugInfo({
        localStorage: user,
        isAuthenticated: auth,
        cookie: cookie,
        hasToken: user?.token ? 'Yes' : 'No',
        cookieHasToken: cookie?.token ? 'Yes' : 'No',
        allCookies: typeof document !== 'undefined' ? document.cookie : 'N/A'
      });
    };

    updateDebugInfo();
    
    // Update every 2 seconds
    const interval = setInterval(updateDebugInfo, 2000);
    
    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <div className="space-y-1">
        <div>LocalStorage User: {debugInfo.localStorage ? 'Yes' : 'No'}</div>
        <div>Is Authenticated: {debugInfo.isAuthenticated ? 'Yes' : 'No'}</div>
        <div>Cookie User: {debugInfo.cookie ? 'Yes' : 'No'}</div>
        <div>Has Token (LS): {debugInfo.hasToken}</div>
        <div>Has Token (Cookie): {debugInfo.cookieHasToken}</div>
        <div className="text-xs break-all">
          Cookies: {debugInfo.allCookies}
        </div>
      </div>
    </div>
  );
};

export default AuthDebug;
