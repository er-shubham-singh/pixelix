import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredUser, getStoredToken, loginUser as apiLogin, logoutUser as apiLogout, verifySession } from '../services/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());
  const [token, setToken] = useState(() => getStoredToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      try {
        const verifiedUser = await verifySession();
        if (verifiedUser && verifiedUser.role === 'owner') {
          setUser(verifiedUser);
        } else {
          setUser(null);
          setToken(null);
        }
      } catch (e) {
        console.warn('Session verification error:', e);
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await apiLogin(email, password);
    if (res.success) {
      if (res.user.role !== 'owner') {
        apiLogout();
        return {
          success: false,
          message: 'Access Restricted: This portal is exclusively for Company Owners and Directors. Please use the Employee Portal.'
        };
      }
      setUser(res.user);
      setToken(res.token);
      return { success: true, user: res.user };
    }
    return { success: false, message: res.message };
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    setToken(null);
  };

  const isOwner = user?.role === 'owner';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user && isOwner,
        isOwner,
        login,
        logout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

