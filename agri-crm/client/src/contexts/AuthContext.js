import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);

  const verifyToken = async () => {
    try {
      await api.get('/verify');
      setTokenValid(true);
      return true;
    } catch (error) {
      setTokenValid(false);
      if (error.response?.status === 401) {
        signOut();
      }
      return false;
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
      verifyToken().finally(() => setLoading(false));
      
      // Verify token every 5 minutes
      const interval = setInterval(verifyToken, 5 * 60 * 1000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, []);

  const signIn = async (credentials) => {
    const response = await api.post('/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      const user = {
        ...response.data.user,
        token: response.data.token
      };
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      setTokenValid(true);
      return user;
    }
    throw new Error(response.data.message || 'Login failed');
  };

  const signOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    setTokenValid(false);
  };

  const updatePassword = async (currentPassword, newPassword) => {
    await api.post('/change-password', { currentPassword, newPassword });
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      tokenValid,
      loading,
      signIn,
      signOut,
      updatePassword,
      verifyToken
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
