"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { lowonganService } from "@/services/lowonganService";
import LowonganCard from "@/features/lowongan/components/LowonganCard";
import Link from "next/link";
import type { NextPage } from '@/types/routing';
import type { LowonganListItem } from "@/types/lowongan";

const MajikanDashboard: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const [lowongans, setLowongans] = useState<LowonganListItem[]>([]);
    const [isLoadingLowongans, setIsLoadingLowongans] = useState(true);

    useEffect(() => {
        const fetchUserLowongans = async () => {
            if (!user?.$id) return;
            
            try {
                setIsLoadingLowongans(true);
                const response = await lowonganService.getUserLowongans(user.$id, {
                    limit: 10,
                    offset: 0
                });
                setLowongans(response.data);
            } catch (error) {
                console.error('Error fetching lowongans:', error);
            } finally {
                setIsLoadingLowongans(false);
            }
        };

        if (isAuthenticated && user) {
            fetchUserLowongans();
        }
    }, [user, isAuthenticated]);

    if (loading || isLoadingLowongans) {
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
                        Halo {user?.name || 'Elvira'} 👋
                    </h1>
                    <p className="text-gray-600 text-md md:text-lg mt-5">
                        Cek Lowongan yang sudah kamu buat dan ulas Asisten yang melamar!
                    </p>
                    <Link 
                        href="/dashboard/lowongan" 
                        className="underline text-md md:text-lg text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block"
                    >
                        Lihat Lowongan
                    </Link>
                </div>

                {/* Lowongan Cards Grid */}
                {lowongans.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lowongans.map((lowongan) => (
                            <LowonganCard
                                key={lowongan.$id}
                                lowongan={lowongan}
                                showActions={false}
                                showApplicantsLink={true}
                            />
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
                            Belum ada lowongan
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Mulai buat lowongan pertama Anda untuk menemukan asisten yang tepat!
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default MajikanDashboard;

