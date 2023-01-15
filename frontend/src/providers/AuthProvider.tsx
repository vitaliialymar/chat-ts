import React, { useState, useMemo } from 'react';
import AuthContext from '../contexts/AuthContext';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(!!localStorage.getItem('token'));
    
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
  };
    
  const getUsername = () => {
      const { username } = JSON.parse(localStorage.getItem('token') || '{}');
      return username;
  };

  const value = useMemo(() => ({
    loggedIn, setLoggedIn, logIn, logOut, getUsername,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
