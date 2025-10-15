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

const Lowongan: NextPage = () => {
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
            // status: ['published'],
            // is_active: true
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
        <div className="min-h-screen bg-gray-50 mt-20">
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
                                Silakan login sebagai Keluarga untuk membuat lowongan
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

            
            </main>
        </div>
    );
};

export default Lowongan;

