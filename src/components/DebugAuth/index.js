'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser, isAuthenticated, logout } from '@/utils/auth';

const DebugAuth = () => {
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    const checkUserState = () => {
      const user = getCurrentUser();
      const authenticated = isAuthenticated();
      
      setUserState({
        user,
        authenticated,
        hasToken: user?.token ? 'Yes' : 'No',
        tokenLength: user?.token?.length || 0,
        tokenPreview: user?.token ? `${user.token.substring(0, 10)}...` : 'None'
      });
    };

    checkUserState();
    
    // Check every 2 seconds
    const interval = setInterval(checkUserState, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const handleForceLogout = () => {
    logout();
    window.location.href = '/login';
  };

  if (!userState) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'white',
      border: '2px solid #ccc',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4>🔍 Auth Debug</h4>
      <div>Authenticated: <strong>{userState.authenticated ? '✅ Yes' : '❌ No'}</strong></div>
      <div>Has Token: <strong>{userState.hasToken}</strong></div>
      <div>Token Length: <strong>{userState.tokenLength}</strong></div>
      <div>Token Preview: <strong>{userState.tokenPreview}</strong></div>
      <div>Email: <strong>{userState.user?.email || 'None'}</strong></div>
      <div>Username: <strong>{userState.user?.username || 'None'}</strong></div>
      <button 
        onClick={handleForceLogout}
        style={{
          marginTop: '10px',
          padding: '5px 10px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          fontSize: '10px'
        }}
      >
        🔄 Force Logout
      </button>
    </div>
  );
};

export default DebugAuth;
