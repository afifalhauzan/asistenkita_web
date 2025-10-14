"use client";

import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import LowonganForm from "@/features/lowongan/components/LowonganForm";
import LowonganCard from "@/features/lowongan/components/LowonganCard";
import { useLowongans, useLowonganMutations } from "@/features/lowongan/hooks/useLowongan";
import { CreateLowonganRequest } from "@/types/lowongan";
import type { NextPage } from '@/types/routing';

const LowonganPage: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch lowongans
    const { 
        data: lowongansData, 
        isLoading: isLoadingLowongans,
        error 
    } = useLowongans({
        q: searchQuery,
        filters: {
            status: ['published'],
            is_active: true
        }
    });

    // Mutations
    const { create } = useLowonganMutations();

    const handleCreateLowongan = async (data: CreateLowonganRequest) => {
        if (!user?.$id) return;

        try {
            await create.mutateAsync({
                data,
                userId: user.$id
            });
            setShowForm(false);
            // Show success message
            alert('Lowongan berhasil dibuat! Silakan publikasikan untuk membuatnya terlihat oleh publik.');
        } catch (error) {
            console.error('Error creating lowongan:', error);
            alert('Terjadi kesalahan saat membuat lowongan. Silakan coba lagi.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Pasang Lowongan Kerja
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Temukan asisten rumah tangga terbaik untuk kebutuhan Anda
                    </p>
                    
                    {isAuthenticated && user?.labels?.includes('majikan') && (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            {showForm ? 'Tutup Form' : 'Buat Lowongan Baru'}
                        </button>
                    )}

                    {!isAuthenticated && (
                        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
                            <p className="text-gray-600 mb-4">
                                Silakan login sebagai majikan untuk membuat lowongan
                            </p>
                            <a
                                href="/login"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Login
                            </a>
                        </div>
                    )}
                </div>

                {/* Create Form */}
                {showForm && isAuthenticated && user?.labels?.includes('majikan') && (
                    <div className="mb-12">
                        <LowonganForm
                            onSubmit={handleCreateLowongan}
                            onCancel={() => setShowForm(false)}
                            isLoading={create.isPending}
                            mode="create"
                        />
                    </div>
                )}

                {/* Search Section */}
                <div className="mb-8">
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari lowongan berdasarkan judul atau deskripsi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <svg
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Lowongans List */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Lowongan Tersedia
                        </h2>
                        <div className="text-sm text-gray-600">
                            {lowongansData?.pagination.total || 0} lowongan ditemukan
                        </div>
                    </div>

                    {isLoadingLowongans ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                    <div className="animate-pulse">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                                        <div className="h-20 bg-gray-200 rounded mb-4"></div>
                                        <div className="flex space-x-2 mb-4">
                                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                                            <div className="h-6 bg-gray-200 rounded w-20"></div>
                                        </div>
                                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <div className="text-red-500 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Terjadi Kesalahan
                            </h3>
                            <p className="text-gray-600">
                                Tidak dapat memuat lowongan. Silakan coba lagi.
                            </p>
                        </div>
                    ) : lowongansData?.data.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Belum Ada Lowongan
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {searchQuery 
                                    ? `Tidak ada lowongan yang cocok dengan pencarian "${searchQuery}"`
                                    : 'Belum ada lowongan yang dipublikasikan'
                                }
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Hapus filter pencarian
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {lowongansData?.data.map((lowongan) => (
                                <LowonganCard
                                    key={lowongan.$id}
                                    lowongan={lowongan}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {lowongansData && lowongansData.pagination.totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                        <div className="flex space-x-2">
                            {/* Pagination controls would go here */}
                            <span className="text-sm text-gray-600">
                                Halaman {lowongansData.pagination.page} dari {lowongansData.pagination.totalPages}
                            </span>
                        </div>
                    </div>
                )}
            </main>
            
            <Footer />  
        </div>
    );
};

export default LowonganPage;