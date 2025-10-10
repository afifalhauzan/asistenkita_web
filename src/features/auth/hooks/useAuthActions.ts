import { useAuthContext } from '../context/AuthContext';
import type { AuthActions } from '@/types/auth';

/**
 * Custom hook to access authentication actions
 * @returns Auth actions like login, signup, logout
 */
export const useAuthActions = (): AuthActions => {
  const {
    login,
    signup,
    logout,
    logoutAll,
    sendPasswordResetEmail,
    updatePassword,
    updateProfile,
  } = useAuthContext();
  
  return {
    login,
    signup,
    logout,
    logoutAll,
    sendPasswordResetEmail,
    updatePassword,
    updateProfile,
  };
};