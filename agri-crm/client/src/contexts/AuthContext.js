import { createContext, useContext, useState, useEffect } from 'react';
import { login, changePassword } from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setCurrentUser(user);
    setLoading(false);
  }, []);

  const signIn = async (credentials) => {
    const user = await login(credentials);
    localStorage.setItem('user', JSON.stringify(user));
    setCurrentUser(user);
    return user;
  };

  const signOut = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const updatePassword = async (currentPassword, newPassword) => {
    await changePassword(currentPassword, newPassword);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      signIn,
      signOut,
      updatePassword,
      loading
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