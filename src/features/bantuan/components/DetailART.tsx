"use client";

import React, { useState } from 'react';
import type { ARTProfile } from '@/types/art';
import type { DetailARTProps } from '@/types/art.ts';
import type { Review } from '@/types/review';
import { useParams, useRouter } from 'next/navigation';
import { useART } from '@/features/bantuan/hooks/useARTs';
import { storageService } from '@/lib/storageService';
import { LoginPromptModal, useLoginPrompt } from './LoginPromptModal';
import Link from 'next/link';
import { useAuth } from '@/features/auth/hooks/useAuth';
import {
  mockReviewsData,
  mockEducation,
  mockServices,
  mockSkills,
  mockTarif
} from '@/data/mockReviews';
import { useLowongan } from '@/features/lowongan/hooks/useLowongan';
import { useAuthContext } from '@/features/auth/context/AuthContext';


export const DetailART: React.FC<DetailARTProps> = ({ data }) => {
  if (!data) {
    return <div className="p-4 bg-white rounded-lg shadow-md">Data ART tidak tersedia.</div>;
  }

  const { isAuthenticated, user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  const params = useParams();
  const router = useRouter();
  const artId = params.id as string;

  const { data: art, isLoading, error } = useART(artId);

  const handleContactART = (id: string) => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }
    router.push(`/chat`);
  };

  console.log('DetailART data:', art);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat profil ART...</p>
        </div>
      </div>
    );
  }

  if (error || !art) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-red-800">Profil Tidak Ditemukan</h3>
            <p className="mt-1 text-sm text-red-600">ART yang Anda cari tidak ditemukan atau telah dihapus.</p>
            <Link href="/bantuan" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700">
              Kembali ke Daftar ART
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getSalaryUnitText = (unit: string) => {
    const units = {
      hourly: 'per jam',
      daily: 'per hari',
      weekly: 'per minggu',
      monthly: 'per bulan',
      yearly: 'per tahun'
    };
    return units[unit as keyof typeof units] || unit;
  };

  const getWorkArrangementText = (arrangement: string) => {
    const arrangements = {
      remote: 'Remote',
      onsite: 'Datang ke Lokasi',
      hybrid: 'Hybrid'
    };
    return arrangements[arrangement as keyof typeof arrangements] || arrangement;
  };

  const getGenderText = (gender: string) => {
    const genders = {
      male: 'Laki-laki',
      female: 'Perempuan',
      other: 'Lainnya'
    };
    return genders[gender as keyof typeof genders] || gender;
  };

  return (
    <div className="bg-gray-50 shadow-sm">
      {/* Login Prompt Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Login Diperlukan</h3>
            <p className="text-gray-600 mb-6">
              Anda harus login terlebih dahulu untuk melihat detail ART ini.
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
          <h1 className="ml-4 text-xl font-semibold text-gray-900">Profil ART</h1>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">

          {/* Left Column - Profile Card */}
          <div className="">
            <div className="flex flex-col items-center box-shadow-default mb-4 p-6 rounded-2xl">

              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <img
                    src={storageService.getAvatarUrl(art.avatar_id)}
                    alt={art.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                    }}
                  />
                  {art.is_verified && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{art.name} ✓</h1>
                <p className="text-gray-600 mb-2">Pengasuh Anak</p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Kota Malang
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center mt-3">
                  {renderStars(Math.floor(mockReviewsData.summary.averageRating))}
                  <span className="ml-1 text-sm font-medium text-gray-600">
                    ({mockReviewsData.summary.totalReviews})
                  </span>
                </div>
              </div>

              {/* Experience Badge */}
              <div className="grid grid-cols-2 gap-4 md:gap-8 mb-6">
                <div className="text-center">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-blue-600">2 Tahun</p>
                    <p className="text-sm text-gray-600">Pengalaman Kerja</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-600">1jt/Bulan</p>
                    <p className="text-sm text-gray-600">Tarif mulai dari</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleContactART(artId)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 mb-0"
              >
                Kirim Pesan
              </button>
            </div>

            {/* Security Section */}
            <div className="bg-gray-50 rounded-lg p-6 box-shadow-default">
              <h3 className="font-semibold text-2xl text-gray-900 mb-2">Keamanan</h3>
              <p className="text-sm text-gray-600 mb-5">Ibu Siti telah terverifikasi oleh AsistenKita.</p>
              <div className="space-y-2 border-2 border-gray-200 rounded-2xl p-4">
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">AsistenKita.com Background Check</span>
                </div>
                <div className="text-xs text-gray-500 ml-5 pb-2">Diverifikasi pada 20 Januari 2023</div>
                <div className="flex items-center text-sm">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Foto diambil menggunakan ID Januari 2024</span>
                </div>
              </div>
            </div>
          </div>


          <div className="lg:col-span-2">
            {isAuthenticated ? (
              <>
                <div className="lg:col-span-2 gap-4 md:gap-8 space-y-3 md:space-x-4">
                  <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang {art.name}</h2>
                    <p className="text-gray-700 leading-relaxed">
                      {art.bio || "Tidak ada deskripsi tersedia."}
                    </p>
                  </div>

                  {/* Education Section */}
                  <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Pendidikan</h2>
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-semibold text-gray-900">{data.education}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Reviews Section */}
                  <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">Ulasan Terbaru</h2>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-gray-900">
                          {data.rating_average?.toFixed(1)}
                        </div>
                        <div className="flex items-center justify-end">
                          {renderStars(Math.floor(data.rating_average ?? 0))}
                        </div>
                        <p className="text-sm text-gray-500">
                          berdasarkan {data.rating_count} ulasan
                        </p>
                      </div>
                    </div>

                    {/* Latest Review */}
                    {mockReviewsData.reviews[0] && (
                      <div className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center mb-2">
                          {renderStars(mockReviewsData.reviews[0].rating)}
                        </div>
                        <p className="text-gray-700 mb-3">"{mockReviewsData.reviews[0].comment}"</p>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                          <div>
                            <p className="font-medium text-gray-900">{mockReviewsData.reviews[0].reviewerName}</p>
                            <p className="text-sm text-gray-500">{mockReviewsData.reviews[0].createdAt}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Lihat Semua
                    </button>
                  </div>

                  {/* Services Section */}
                  <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Layanan</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {data.job_types?.map((service, index) => (
                        <span className="font-medium" key={index}>
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {data.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Section */}
                  <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Tarif</h2>
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {data.salary_min?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })} - {data.salary_max?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })}
                      </div>
                      <p className="text-sm text-gray-600">{data.salary_unit}</p>
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
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Tentang Kandidat</h2>
                      <p className="text-gray-700 leading-relaxed space-y-2">
                        <span className="block h-4 bg-gray-200 rounded w-full"></span>
                        <span className="block h-4 bg-gray-200 rounded w-5/6"></span>
                        <span className="block h-4 bg-gray-200 rounded w-3/4"></span>
                      </p>
                    </div>

                    {/* Education Placeholder */}
                    <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Pendidikan & Ulasan</h2>
                      <p className="text-gray-700 leading-relaxed space-y-2">
                        <span className="block h-4 bg-gray-200 rounded w-1/2"></span>
                        <span className="block h-4 bg-gray-200 rounded w-2/3"></span>
                      </p>
                    </div>

                    {/* Skills Placeholder */}
                    <div className="bg-gray-50 rounded-2xl box-shadow-default p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Skills & Layanan</h2>
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
                        Masuk atau daftar untuk melihat detail lengkap profil, ulasan, dan tarif kandidat.
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

      </div>
    </div>
  );
};