"use client";

import { useState, createContext, useEffect, useContext, useMemo, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { usersApi, authApi } from '@/lib/api'; // Import authApi

const AuthContext = createContext();

const publicRoutes = ['/login', '/signup'];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('auth_token');

      if (!token) {
        if (!publicRoutes.includes(pathname)) {
          localStorage.setItem('callbackUrl', pathname);
        }
        setLoading(false);
        setUser(null);
        router.push('/login');
        return;
      }

      try {
        const response = await usersApi.getMe();
        setUser(response.data);
        localStorage.setItem('user_data', JSON.stringify(response.data));
      } catch (err) {
        console.error('Authentication error:', err);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        setUser(null);
        if (!publicRoutes.includes(pathname)) {
          localStorage.setItem('callbackUrl', pathname);
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []); // Empty dependency array ensures this runs only once on mount

  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const data = await authApi.login(credentials);
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('user_data', JSON.stringify(data.data.user));
      setUser(data.data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await authApi.signup(userData);
      localStorage.setItem('auth_token', data.data.token);
      localStorage.setItem('user_data', JSON.stringify(data.data.user));
      setUser(data.data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
    router.push('/login');
  }, [router]);

  const isAuthenticated = !!user;

  const value = useMemo(() => ({
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated,
  }), [user, loading, error, login, register, logout, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
