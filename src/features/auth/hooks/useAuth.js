import { useAuthContext } from '../context/AuthContext';

/**
 * Custom hook to access authentication state
 * @returns {Object} Auth state including user, loading, isAuthenticated
 */
export const useAuth = () => {
  const { user, loading, initialized, isAuthenticated } = useAuthContext();
  
  return {
    user,
    loading,
    initialized,
    isAuthenticated,
  };
};