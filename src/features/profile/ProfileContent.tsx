"use client";

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
import { useState } from 'react';
import { ProfileEdit } from './components/ProfileEdit';

export const ProfileContent = () => {
  const { user } = useAuth();
  const { logout } = useAuthActions();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    setIsLoggingOut(true);
    await logout();
    // No need to redirect, the AuthContext will handle this
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
    <div className="min-h-100 bg-gray-50">
      {/* Main Content - Profile Component in Center */}
      <main className="pt-20">
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

              {/* Logout Section */}
              <div className="bg-white rounded-xl box-shadow-default p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Keluar dari Akun</h4>
                <p className="text-gray-600 mb-6">
                  Anda akan keluar dari akun dan dialihkan ke halaman login.
                </p>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}