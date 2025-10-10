'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;      // Proper React children typing
  redirectTo?: string;      // Optional string for redirect URL
  fallback?: ReactNode;     // Optional React component for loading state
  requireAuth?: boolean;    // Optional boolean for auth requirement
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login',
  fallback = null,
  requireAuth = true 
}) => {
  const { user, loading, initialized, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initialized || loading) return;
    
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
    } else if (!requireAuth && isAuthenticated) {
      // Redirect authenticated users away from auth pages
      router.push('/dashboard');
    }
  }, [isAuthenticated, initialized, loading, router, redirectTo, requireAuth]);

  // Show loading state while checking authentication
  if (!initialized || loading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )
    );
  }

  // If require auth and not authenticated, don't render children
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // If don't require auth and is authenticated, don't render children
  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};