"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUserApplications } from "@/features/applications/hooks/useApplication";
import { APPLICATION_STATUS_LABELS, APPLICATION_STATUS_COLORS } from "@/types/application";
import Link from "next/link";
import type { NextPage } from '@/types/routing';

const ARTDashboard: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();
    
    // Fetch user applications using the new hook
    const { 
        data: applicationsData, 
        isLoading: isLoadingApplications, 
        error: applicationsError 
    } = useUserApplications(user?.$id || '', {
        limit: 50,
        sort: { field: 'applied_at', direction: 'desc' }
    });

    const applications = applicationsData?.data || [];

    if (loading || (isLoadingApplications && isAuthenticated)) {
        return (
            <div className="min-h-screen bg-gray-50 mt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Welcome Header */}
                <div className="mb-12">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2">
                        Halo {user?.name || 'User'} 👋
                    </h1>
                    <p className="text-gray-600 text-md md:text-lg mt-5">
                        Cek status lamaran pekerjaan kamu dan temukan lowongan baru!
                    </p>
                    <Link 
                        href="/pekerjaan" 
                        className="underline text-md md:text-lg text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block"
                    >
                        Lihat Lowongan Pekerjaan
                    </Link>
                </div>

                {/* Applications Section */}
                {applicationsError ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <div className="text-red-500 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Gagal memuat data lamaran</h3>
                        <p className="text-gray-600">Silakan muat ulang halaman atau coba lagi nanti.</p>
                    </div>
                ) : applications.length > 0 ? (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Lamaran Pekerjaan Anda</h2>
                            <p className="text-gray-600">Total {applications.length} lamaran</p>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                            {applications.map((application) => (
                                <div key={application.$id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                ID Lowongan: {application.lowongan_id}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Dilamar pada: {new Date(application.applied_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long', 
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${APPLICATION_STATUS_COLORS[application.status]}`}>
                                            {APPLICATION_STATUS_LABELS[application.status]}
                                        </div>
                                    </div>
                                    
                                    {application.message && (
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                                <span className="font-medium">Pesan: </span>
                                                {application.message}
                                            </p>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <Link 
                                            href={`/pekerjaan/${application.lowongan_id}`}
                                            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                                        >
                                            Lihat Detail Lowongan →
                                        </Link>
                                        
                                        {application.status === 'accepted' && (
                                            <Link 
                                                href="/chat"
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                            >
                                                Mulai Chat
                                            </Link>
                                        )}
                                        
                                        {application.status === 'pending' && (
                                            <span className="text-yellow-600 text-sm">
                                                Menunggu respons
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <svg 
                            className="w-16 h-16 mx-auto text-gray-400 mb-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                            />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Anda belum melamar pekerjaan
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Mulai cari lowongan yang sesuai dengan keahlian Anda dan lamar sekarang!
                        </p>
                        <Link 
                            href="/pekerjaan"
                            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Cari Lowongan
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ARTDashboard;

