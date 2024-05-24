import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Functions for login, logout, and checking authentication
//   const login = async (credentials) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials),
//       });
//       if (!response.ok) {
//         throw new Error('Login failed');
//       }
//       const data = await response.json();
//       setToken(data.token);
//       setUser(data.user); // Assuming response includes user data
//       setIsAuthenticated(true);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token')
  };

  const value = {
    token,
    isAuthenticated,
    // isLoading,
    user,
    setUser,
    // login,
    logout,
    setIsAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
