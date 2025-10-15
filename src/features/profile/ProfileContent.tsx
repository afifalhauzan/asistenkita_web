"use client";

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
import { useState } from 'react';
import Link from 'next/link';
import { LogoFull } from '@/components/LogoFull';
import { ProfileEdit } from './components/ProfileEdit';

export const ProfileContent = () => {
  const { user } = useAuth();
  const { logout } = useAuthActions();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    setIsLoggingOut(true);
    await logout();
    // No need to redirect, the AuthContext will handle this
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const handleProfileUpdateSuccess = () => {
    setIsEditingProfile(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-30 md:hidden">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="flex items-center">
              <LogoFull className="w-6 h-auto" />
            </Link>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="p-2 rounded-md text-red-600 hover:text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <nav className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:z-auto`}>
        <div className="flex flex-col h-screen">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link href="/" className="flex items-center space-x-3">
              <LogoFull className="w-24 h-auto" />
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 md:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Dashboard Title */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl text-blue-600 font-semibold">
              Profil
            </h1>
          </div>
        

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <span className="block text-sm text-gray-700 mb-3">
              Selamat Datang, {user?.name || user?.email}
            </span>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {isLoggingOut ? 'Signing out...' : 'Sign out'}
            </button>
          </div>  
        </div>
      </nav>

      {/* Main Content - Profile Component in Center */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Selamat Datang, {user?.name || user?.email}!
            </h2>
            <p className="text-gray-600">
              Kelola profil dan informasi akun Anda di sini
            </p>
          </div>

          {isEditingProfile ? (
            <div className="bg-white rounded-xl box-shadow-default p-6">
              <ProfileEdit
                onCancel={handleCancelEdit}
                onSuccess={handleProfileUpdateSuccess}
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* User Avatar Card */}
              <div className="bg-white rounded-xl box-shadow-default p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl font-semibold text-blue-600">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {user?.name || 'User'}
                    </h3>
                    <p className="text-gray-600 mb-2">{user?.email}</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {user?.labels?.includes('majikan') ? 'Keluarga' : user?.labels?.join(', ') || 'User'}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        user?.emailVerification ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user?.emailVerification ? '✓ Verified' : 'Unverified'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleEditProfile}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Profile Information Card */}
              <div className="bg-white rounded-xl box-shadow-default p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Informasi Profil</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Nama Lengkap</dt>
                    <dd className="text-base text-gray-900">{user?.name || 'N/A'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Email</dt>
                    <dd className="text-base text-gray-900">{user?.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Nomor Telepon</dt>
                    <dd className="text-base text-gray-900">{user?.phone || 'Tidak tersedia'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Peran Akun</dt>
                    <dd className="text-base text-green-600 font-medium">
                      {user?.labels?.includes('majikan') ? 'Keluarga' : user?.labels?.join(', ') || 'N/A'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-1">Status Akun</dt>
                    <dd className="text-base text-green-600 font-medium">
                      {user?.emailVerification ? 'Email Terverifikasi ✓' : 'Email Belum Terverifikasi'}
                    </dd>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}