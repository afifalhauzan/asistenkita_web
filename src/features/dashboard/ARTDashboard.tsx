"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Link from "next/link";
import type { NextPage } from '@/types/routing';

const ARTDashboard: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const [applications, setApplications] = useState<any[]>([]);
    const [isLoadingApplications, setIsLoadingApplications] = useState(true);

    useEffect(() => {
        const fetchUserApplications = async () => {
            if (!user?.$id) return;
            
            try {
                setIsLoadingApplications(true);
                // TODO: Implement application fetching service
                // const response = await applicationService.getUserApplications(user.$id);
                // setApplications(response.data);
                
                // For now, set empty array
                setApplications([]);
            } catch (error) {
                console.error('Error fetching applications:', error);
            } finally {
                setIsLoadingApplications(false);
            }
        };

        if (isAuthenticated && user) {
            fetchUserApplications();
        }
    }, [user, isAuthenticated]);

    if (loading || isLoadingApplications) {
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
                {applications.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {applications.map((application) => (
                            <div key={application.$id} className="bg-white rounded-lg shadow p-6">
                                {/* TODO: Create ApplicationCard component */}
                                <p>Application Card</p>
                            </div>
                        ))}
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
                    </div>
                )}
            </main>
        </div>
    );
};

export default ARTDashboard;

