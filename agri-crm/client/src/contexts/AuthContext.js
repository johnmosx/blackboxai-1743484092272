import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login, changePassword, getCurrentUser } from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  const signOut = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    setTokenValid(false);
  }, []);

  const checkTokenValidity = useCallback(async () => {
    try {
      await getCurrentUser();
      setTokenValid(true);
      return true;
    } catch (error) {
      setTokenValid(false);
      if (error.message.includes('401')) {
        signOut();
      }
      return false;
    }
  }, [signOut]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
      checkTokenValidity().finally(() => setLoading(false));
      
      // Verify token every 5 minutes
      const interval = setInterval(checkTokenValidity, 5 * 60 * 1000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, [checkTokenValidity]);

  const signIn = async (credentials) => {
    const response = await login(credentials);
    if (response.token) {
      localStorage.setItem('token', response.token);
      const user = {
        username: credentials.username,
        token: response.token
      };
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      setTokenValid(true);
      return user;
    }
    throw new Error(response.message || 'Login failed');
  };


  const updatePassword = async (currentPassword, newPassword) => {
    await changePassword(currentPassword, newPassword);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      tokenValid,
      loading,
      signIn,
      signOut,
      updatePassword,
      checkTokenValidity
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
