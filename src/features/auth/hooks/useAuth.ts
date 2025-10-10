import { useAuthContext } from '../context/AuthContext';
import type { User } from '@/types/auth';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  isAuthenticated: boolean;
}

/**
 * Custom hook to access authentication state
 * @returns Auth state including user, loading, initialized, isAuthenticated
 */
export const useAuth = (): UseAuthReturn => {
  const { user, loading, initialized, isAuthenticated } = useAuthContext();
  
  return {
    user,
    loading,
    initialized,
    isAuthenticated,
  };
};