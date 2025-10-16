"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { lowonganService } from "@/services/lowonganService";
import LowonganCardAdmin from "@/features/lowongan/components/LowonganCardAdmin";
import Link from "next/link";
import type { NextPage } from '@/types/routing';
import type { LowonganListItem } from "@/types/lowongan";

const MajikanDashboardLowongan: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const [lowongans, setLowongans] = useState<LowonganListItem[]>([]);
    const [isLoadingLowongans, setIsLoadingLowongans] = useState(true);
    const [activeTab, setActiveTab] = useState<'semua' | 'buka' | 'tutup'>('semua');

    useEffect(() => {
        const fetchUserLowongans = async () => {
            if (!user?.$id) return;

            try {
                setIsLoadingLowongans(true);
                const response = await lowonganService.getUserLowongans(user.$id, {
                    limit: 50,
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

    const handleEdit = (id: string) => {
        // TODO: Implement edit functionality
        console.log('Edit lowongan:', id);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Apakah Anda yakin ingin menghapus lowongan ini?')) {
            try {
                await lowonganService.deleteLowongan(id);
                setLowongans(prev => prev.filter(l => l.$id !== id));
            } catch (error) {
                console.error('Error deleting lowongan:', error);
                alert('Gagal menghapus lowongan');
            }
        }
    };

    const handleClose = async (id: string) => {
        if (confirm('Apakah Anda yakin ingin menutup lowongan ini?')) {
            try {
                await lowonganService.closeLowongan(id);
                setLowongans(prev => prev.map(l =>
                    l.$id === id ? { ...l, status: 'closed', is_active: false } : l
                ));
            } catch (error) {
                console.error('Error closing lowongan:', error);
                alert('Gagal menutup lowongan');
            }
        }
    };

    // Filter lowongans based on active tab
    const filteredLowongans = lowongans.filter(lowongan => {
        if (activeTab === 'buka') return lowongan.is_active === true;
        if (activeTab === 'tutup') return lowongan.is_active === false;
        return true; // 'semua' shows all
    });

    if (loading || isLoadingLowongans) {
        return (
            <div className="min-h-screen bg-gray-50 mt-20 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat lowongan...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header with Create Button */}
                <div className="mb-8">
                    <Link
                        href="/onboarding/keluarga-signup?skipPhase1=true"
                        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Buat Lowongan Baru
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex space-x-6 mb-8 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('semua')}
                        className={`pb-3 px-1 font-medium text-sm transition-colors ${activeTab === 'semua'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Semua Lowongan
                    </button>
                    <button
                        onClick={() => setActiveTab('buka')}
                        className={`pb-3 px-1 font-medium text-sm transition-colors ${activeTab === 'buka'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Buka
                    </button>
                    <button
                        onClick={() => setActiveTab('tutup')}
                        className={`pb-3 px-1 font-medium text-sm transition-colors ${activeTab === 'tutup'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Tutup
                    </button>
                </div>

                {/* Lowongan Cards */}
                {filteredLowongans.length > 0 ? (
                    <div className="space-y-6">
                        {filteredLowongans.map((lowongan) => (
                            <div key={lowongan.$id}>
                                {/* Lowongan Card with Actions */}
                                <div className="mb-4">
                                    <LowonganCardAdmin
                                        lowongan={lowongan}
                                        showActions={true}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onClose={handleClose}
                                    />
                                </div>

                                
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
                            {activeTab === 'semua' && 'Belum ada lowongan'}
                            {activeTab === 'buka' && 'Tidak ada lowongan yang buka'}
                            {activeTab === 'tutup' && 'Tidak ada lowongan yang tutup'}
                        </h3>
                        <p className="text-gray-600 mb-4">
                            {activeTab === 'semua'
                                ? 'Mulai buat lowongan pertama Anda untuk menemukan asisten yang tepat!'
                                : `Tidak ada lowongan dengan status ${activeTab}`
                            }
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default MajikanDashboardLowongan;
