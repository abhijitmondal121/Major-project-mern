import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Correct named import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser({ name: decodedToken.name, email: decodedToken.email });
      } catch (error) {
        console.error('Failed to decode token', error);
        logout(); // Handle token decode error by logging out the user
      }
    }
  }, [token]);

  const login = (newToken) => {
    try {
      const decodedToken = jwtDecode(newToken);
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser({ name: decodedToken.name, email: decodedToken.email });
    } catch (error) {
      console.error('Failed to decode token', error);
      // Handle token decode error, possibly showing an error message
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
