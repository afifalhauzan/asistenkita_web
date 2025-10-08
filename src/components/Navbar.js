'use client';

import Link from 'next/link';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
import { useState } from 'react';

export const Navbar = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const { logout } = useAuthActions();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#FD366E] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Appwrite App</span>
            </Link>
          </div>

          {/* Auth Status */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#FD366E]"></div>
                <span className="text-sm">Loading...</span>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs font-medium">
                      {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Link
                    href="/dashboard"
                    className="text-sm text-[#FD366E] hover:text-[#e02d5a] font-medium"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium disabled:opacity-50"
                  >
                    {isLoggingOut ? 'Signing out...' : 'Sign out'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">Not signed in</span>
                <div className="flex items-center space-x-2">
                  <Link
                    href="/login"
                    className="text-sm text-[#FD366E] hover:text-[#e02d5a] font-medium"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-[#FD366E] hover:bg-[#e02d5a] text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};