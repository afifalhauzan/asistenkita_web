'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lowongan, LowonganJobType, LowonganSkill } from '@/types/lowongan';
import { useAuthContext } from '@/features/auth/context/AuthContext';
import { LOWONGAN_GENDER_LABELS, LOWONGAN_JOB_TYPE_LABELS, LOWONGAN_SKILL_LABELS, LOWONGAN_WORK_ARRANGEMENT_LABELS } from '@/types/lowongan';
import { useLowongan } from '@/features/lowongan/hooks/useLowongan';
import { useJobApplication } from '@/features/applications/hooks/useApplication';

interface PekerjaanDetailsProps {
    lowonganId: string;
}

const PekerjaanDetails: React.FC<PekerjaanDetailsProps> = ({ lowonganId }) => {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [applicationMessage, setApplicationMessage] = useState('');

    // Fetch lowongan data using the hook
    const { data, isLoading, error } = useLowongan(lowonganId);

    // Application management
    const {
        hasApplied,
        existingApplication,
        isCheckingApplication,
        isApplying,
        applicationError,
        handleApply: applyToJob,
        clearError
    } = useJobApplication(lowonganId, user?.$id || '');

    const closeModal = () => {
        setIsModalOpen(false);
        clearError();
    };

    const handleLoginRedirect = () => {
        router.push('/login');
    };

    const handleApply = async (id: string) => {
        if (!isAuthenticated) {
            setIsModalOpen(true);
            return;
        }

        // Check if user is ART (has 'art' label)
        const userLabels = user?.labels || [];
        if (!userLabels.includes('art')) {
            alert('Hanya pengguna dengan role ART yang dapat melamar pekerjaan ini.');
            return;
        }

        // Apply to job with optional message
        const success = await applyToJob(applicationMessage);
        if (success) {
            alert('Lamaran berhasil dikirim!');
            router.push('/dashboard');
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex">
                {[...Array(5)].map((_, index) => (
                    <svg
                        key={index}
                        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    const formatCurrency = (amount?: number) => {
        if (!amount) return 'Nego';
        return amount.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
    };

    if (isLoading || isCheckingApplication) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat detail lowongan...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Lowongan Tidak Ditemukan</h2>
                    <p className="text-gray-600 mb-4">{error?.message || 'Lowongan yang Anda cari tidak tersedia.'}</p>
                    <Link
                        href="/pekerjaan"
                        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Kembali ke Daftar Lowongan
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-20 ">
                <div className="flex items-center">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-md text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali
                    </button>
                    <h1 className="ml-4 text-xl font-semibold text-gray-900">Profil Lowongan</h1>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-gray-50 rounded-2xl box-shadow-default p-6 text-center">
                            {/* Job Icon */}
                            <div className="relative inline-block mb-4">
                                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                {data.is_active && (
                                    <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{data.title}</h1>

                            {/* Location */}
                            <div className="flex items-center justify-center text-gray-600 mb-4">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm">{data.domicile_city}</span>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white rounded-lg p-3">
                                <div className="text-2xl font-bold text-blue-600">{data.applications_count || 0}</div>
                                <div className="text-sm text-gray-600">Pelamar</div>
                            </div>
                            <div className="flex flex-col items-center justify-center bg-white rounded-lg p-3">
                                <div className="text-lg font-bold text-blue-600">{formatCurrency(data.salary_min)}</div>
                                <div className="text-sm text-gray-600">Gaji Minimal</div>
                            </div>
                        </div>

                            {/* Action Button */}
                            {isAuthenticated && user?.labels?.includes('art') ? (
                                <div className="space-y-3">
                                    {applicationError && (
                                        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                                            {applicationError}
                                        </div>
                                    )}
                                    
                                    {hasApplied ? (
                                        <div className="w-full">
                                            <div className="bg-green-100 text-green-800 text-center py-3 px-6 rounded-lg mb-2">
                                                ✓ Anda sudah melamar pekerjaan ini
                                            </div>
                                            <div className="text-xs text-gray-600 text-center">
                                                Status: {existingApplication?.status === 'pending' ? 'Menunggu' : 
                                                        existingApplication?.status === 'accepted' ? 'Diterima' :
                                                        existingApplication?.status === 'rejected' ? 'Ditolak' : 'Dibatalkan'}
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                               {/* `             <textarea
                                                value={applicationMessage}
                                                onChange={(e) => setApplicationMessage(e.target.value)}
                                                placeholder="Pesan lamaran (opsional)..."
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none text-sm"
                                                rows={3}
                                            />` */}
                                            <button
                                                onClick={() => handleApply(lowonganId)}
                                                disabled={isApplying}
                                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                                            >
                                                {isApplying ? 'Mengirim Lamaran...' : 'Lamar Pekerjaan'}
                                            </button>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleApply(lowonganId)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                                >
                                    Lamar Pekerjaan
                                </button>
                            )}
                        </div>

                        {/* Security Section */}
                        <div className="bg-gray-50 rounded-lg p-6 box-shadow-default">
                            <h3 className="font-semibold text-2xl text-gray-900 mb-2">Keamanan</h3>
                            <p className="text-sm text-gray-600 mb-5">Lowongan ini telah terverifikasi oleh AsistenKita.</p>
                            <div className="space-y-2 border-2 border-gray-200 rounded-2xl p-4">
                                <div className="flex items-center text-sm">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                    <span className="text-gray-700">AsistenKita.com Background Check</span>
                                </div>
                                <div className="text-xs text-gray-500 ml-5 pb-2">Diverifikasi pada {new Date("2023-01-20").toLocaleDateString("id-ID")}</div>
                                <div className="flex items-center text-sm">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                    <span className="text-gray-700">Pemberi kerja terverifikasi</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        {isAuthenticated ? (
                            <>
                                <div className="lg:col-span-2 gap-4 md:gap-8 space-y-3 md:space-x-4">
                                    <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4">Deskripsi Pekerjaan</h2>
                                        <p className="text-gray-700 leading-relaxed">
                                            {data.description || "Tidak ada deskripsi tersedia."}
                                        </p>
                                    </div>

                                    {/* Requirements Section */}
                                    <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4">Persyaratan</h2>
                                        <div className="space-y-4">
                                            {data.education && (
                                                <div className="border-l-4 border-blue-500 pl-4">
                                                    <h3 className="font-semibold text-gray-900">Pendidikan: {data.education.toUpperCase()}</h3>
                                                </div>
                                            )}
                                            {data.gender && (
                                                <div className="border-l-4 border-blue-500 pl-4">
                                                    <h3 className="font-semibold text-gray-900">Jenis Kelamin: {LOWONGAN_GENDER_LABELS[data.gender]}</h3>
                                                </div>
                                            )}
                                            {data.work_arrangement && data.work_arrangement.length > 0 && (
                                                <div className="border-l-4 border-blue-500 pl-4">
                                                    <h3 className="font-semibold text-gray-900">
                                                        Pengaturan Kerja: {data.work_arrangement.map(wa => LOWONGAN_WORK_ARRANGEMENT_LABELS[wa]).join(', ')}
                                                    </h3>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Job Types Section */}
                                    <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4">Jenis Pekerjaan</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            {data.job_types?.map((jobType, index) => (
                                                <span className="font-medium" key={index}>
                                                    {LOWONGAN_JOB_TYPE_LABELS[jobType]}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Skills Section */}
                                    <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4">Skills yang Dibutuhkan</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {data.skills?.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium"
                                                >
                                                    {LOWONGAN_SKILL_LABELS[skill]}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Pricing Section */}
                                    <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-4">Rentang Gaji</h2>
                                        <div className="bg-blue-50 rounded-lg p-4 text-center">
                                            <div className="text-2xl font-bold text-blue-600 mb-2">
                                                {formatCurrency(data.salary_min)} - {formatCurrency(data.salary_max)}
                                            </div>
                                            <p className="text-sm text-gray-600">per bulan</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="relative">
                                    {/* 1. Blurred Background Content */}
                                    <div className="space-y-6 blur-md select-none pointer-events-none">
                                        <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                                            <h2 className="text-xl font-bold text-gray-900 mb-4">Deskripsi Pekerjaan</h2>
                                            <p className="text-gray-700 leading-relaxed space-y-2">
                                                <span className="block h-4 bg-gray-200 rounded w-full"></span>
                                                <span className="block h-4 bg-gray-200 rounded w-5/6"></span>
                                                <span className="block h-4 bg-gray-200 rounded w-3/4"></span>
                                            </p>
                                        </div>

                                        {/* Requirements Placeholder */}
                                        <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                                            <h2 className="text-xl font-bold text-gray-900 mb-4">Persyaratan & Ulasan</h2>
                                            <p className="text-gray-700 leading-relaxed space-y-2">
                                                <span className="block h-4 bg-gray-200 rounded w-1/2"></span>
                                                <span className="block h-4 bg-gray-200 rounded w-2/3"></span>
                                            </p>
                                        </div>

                                        {/* Skills Placeholder */}
                                        <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                                            <h2 className="text-xl font-bold text-gray-900 mb-4">Skills & Jenis Pekerjaan</h2>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="block h-8 bg-gray-200 rounded-full w-20"></span>
                                                <span className="block h-8 bg-gray-200 rounded-full w-24"></span>
                                                <span className="block h-8 bg-gray-200 rounded-full w-16"></span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. Login Call-to-Action Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-2xl">
                                        <div className="text-center bg-white p-8 rounded-xl shadow-2xl max-w-sm">
                                            <h3 className="text-2xl font-bold text-gray-900">Akses Informasi Lengkap</h3>
                                            <p className="text-gray-600 mt-2 mb-6">
                                                Masuk atau daftar untuk melihat detail lengkap lowongan, persyaratan, dan informasi gaji.
                                            </p>
                                            <Link href="/login" className="inline-block w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                                                Lanjutkan
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Login Prompt Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Login Diperlukan</h3>
                            <p className="text-gray-600 mb-6">
                                Anda harus login terlebih dahulu untuk melamar pekerjaan ini.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={handleLoginRedirect}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PekerjaanDetails;
