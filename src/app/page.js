"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  const { user, isAuthenticated, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Auth Status Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Authentication Status
              </h2>
              
              {loading ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FD366E]"></div>
                  <p className="text-gray-600">Checking authentication status...</p>
                </div>
              ) : isAuthenticated ? (
                <div className="space-y-6">
                  {/* Authenticated State */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-green-600 mb-2">
                        Successfully Authenticated!
                      </h3>
                      <p className="text-gray-600">
                        Welcome back, {user?.name || user?.email}!
                      </p>
                    </div>
                  </div>
                  
                  {/* User Info */}
                  <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                    <h4 className="font-medium text-gray-900">User Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Name:</span>
                        <p className="font-medium">{user?.name || 'Not provided'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Email:</span>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-gray-500">User ID:</span>
                        <p className="font-mono text-xs bg-white px-2 py-1 rounded border mt-1">
                          {user?.$id}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/dashboard"
                      className="bg-[#FD366E] hover:bg-[#e02d5a] text-white px-6 py-3 rounded-md font-medium transition-colors"
                    >
                      Go to Dashboard
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Not Authenticated State */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-600 mb-2">
                        Not Authenticated
                      </h3>
                      <p className="text-gray-500">
                        Sign in to access your account and dashboard
                      </p>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/login"
                      className="bg-[#FD366E] hover:bg-[#e02d5a] text-white px-6 py-3 rounded-md font-medium transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-md font-medium transition-colors"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}