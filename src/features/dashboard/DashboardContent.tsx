"use client";

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
import { useState } from 'react';
import Link from 'next/link';
import { LogoFull } from '@/components/LogoFull';
import { ProfileEdit } from './components/ProfileEdit';

export const DashboardContent = () => {
  const { user } = useAuth();
  const { logout } = useAuthActions();
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState<boolean>(false);
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);

  const handleLogout = async (): Promise<void> => {
    setIsLoggingOut(true);
    await logout();
    // No need to redirect, the AuthContext will handle this
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleProfileSidebar = () => {
    setIsProfileSidebarOpen(!isProfileSidebarOpen);
    setIsEditingProfile(false); // Reset edit mode when toggling
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
              Dashboard
            </h1>
          </div>

          {/* User Info */}
          <div className="flex-1 p-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">User Information</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-xs font-medium text-gray-500">Name:</dt>
                  <dd className="text-sm text-gray-900">{user?.name || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500">Email:</dt>
                  <dd className="text-sm text-gray-900">{user?.email}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500">Role:</dt>
                  <dd className="text-sm text-green-600 font-medium">{user?.labels || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-gray-500">No Telp:</dt>
                  <dd className="text-sm text-green-600 font-medium">{user?.phone || 'N/A'}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <span className="block text-sm text-gray-700 mb-3">
              Welcome, {user?.name || user?.email}
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

      {/* Main Content */}
      <main className={`flex-1 md:ml-64 pt-16 md:pt-0 transition-all duration-300 ${
        isProfileSidebarOpen ? 'lg:mr-80' : ''
      }`}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome to your Dashboard!
            </h2>
            <button
              onClick={toggleProfileSidebar}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {isProfileSidebarOpen ? 'Hide Profile' : 'Show Profile'}
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Your information is displayed in the sidebar for easy access.
              </p>
              <p className="text-sm text-gray-500">
                Click "Show Profile" to view and edit your profile information.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Profile Sidebar Overlay (Mobile) */}
      {isProfileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleProfileSidebar}
        />
      )}

      {/* Profile Sidebar */}
      <aside className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isProfileSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      } lg:translate-x-0 lg:static lg:z-auto ${!isProfileSidebarOpen ? 'lg:hidden' : ''}`}>
        <div className="flex flex-col h-full">
          {/* Profile Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
            <button
              onClick={toggleProfileSidebar}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Profile Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {isEditingProfile ? (
              <ProfileEdit
                onCancel={handleCancelEdit}
                onSuccess={handleProfileUpdateSuccess}
              />
            ) : (
              <div className="space-y-6">
                {/* User Avatar */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl font-semibold text-blue-600">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {user?.name || 'User'}
                  </h4>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>

                {/* Profile Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-sm font-medium text-gray-700">Profile Information</h5>
                    <button
                      onClick={handleEditProfile}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-xs font-medium text-gray-500">Full Name</dt>
                      <dd className="text-sm text-gray-900 mt-1">{user?.name || 'N/A'}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500">Email Address</dt>
                      <dd className="text-sm text-gray-900 mt-1">{user?.email}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500">Phone Number</dt>
                      <dd className="text-sm text-gray-900 mt-1">{user?.phone || 'Not provided'}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500">Role</dt>
                      <dd className="text-sm text-green-600 font-medium mt-1">
                        {user?.labels?.join(', ') || 'N/A'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500">Account Status</dt>
                      <dd className="text-sm text-green-600 font-medium mt-1">
                        {user?.emailVerification ? 'Verified' : 'Unverified'}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h5>
                  <button
                    onClick={handleEditProfile}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </div>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Change Password
                    </div>
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Account Settings
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}