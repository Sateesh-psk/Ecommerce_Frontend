import React, { createContext, useState, useContext } from 'react';

// Create a Context for login state
const LoginContext = createContext();

// Custom hook to use the LoginContext
export const useLogin = () => useContext(LoginContext);

// Provider component to wrap the app and manage login state
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const login = (uname) => {
    setIsLoggedIn(true);
    setUsername(uname);
    window.sessionStorage.setItem('uname', uname);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    window.sessionStorage.removeItem('uname');
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
