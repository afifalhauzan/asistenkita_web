import { useAuthContext } from '../context/AuthContext';

/**
 * Custom hook to access authentication actions
 * @returns {Object} Auth actions like login, signup, logout
 */
export const useAuthActions = () => {
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