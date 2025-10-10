'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User, AuthResult, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        setLoading(true);
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setLoading(true);
      console.log('AuthContext: Attempting login for:', email);
      const user = await authService.login(email, password);
      console.log('AuthContext: Login successful, user:', user);
      setUser(user);
      return { success: true, user };
    } catch (error) {
      console.log('AuthContext: Login failed with error:', error);
      console.log('AuthContext: Error message:', (error as Error).message);
      return { success: false, error: (error as Error).message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<AuthResult> => {
    try {
      setLoading(true);
      const user = await authService.signup(email, password, name);
      setUser(user);
      return { success: true, user };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: (error as Error).message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<AuthResult> => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, error: (error as Error).message };
    } finally {
      setLoading(false);
    }
  };

  const logoutAll = async (): Promise<AuthResult> => {
    try {
      setLoading(true);
      await authService.logoutAll();
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Logout all error:', error);
      return { success: false, error: (error as Error).message };
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    try {
      await authService.sendPasswordResetEmail(email);
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: (error as Error).message };
    }
  };

  const updatePassword = async (newPassword: string, oldPassword: string): Promise<AuthResult> => {
    try {
      await authService.updatePassword(newPassword, oldPassword);
      return { success: true };
    } catch (error) {
      console.error('Update password error:', error);
      return { success: false, error: (error as Error).message };
    }
  };

  const updateProfile = async (name: string, email?: string): Promise<AuthResult> => {
    try {
      const updatedUser = await authService.updateProfile(name, email);
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: (error as Error).message };
    }
  };

  const value: AuthContextType = {
    // State
    user,
    loading,
    initialized,
    
    // Actions
    login,
    signup,
    logout,
    logoutAll,
    sendPasswordResetEmail,
    updatePassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};