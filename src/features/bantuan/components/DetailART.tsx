"use client";

import React from 'react';
import type { ARTProfile } from '@/types/art';
import type { DetailARTProps } from '@/types/art.ts';
import { useParams, useRouter } from 'next/navigation';
import { useART } from '@/features/bantuan/hooks/useARTs';
import { storageService } from '@/lib/storageService';
import { LoginPromptModal, useLoginPrompt } from './LoginPromptModal';
import Link from 'next/link';

export const DetailART: React.FC<DetailARTProps> = ({ data }) => {
  if (!data) {
    return <div className="p-4 bg-white rounded-lg shadow-md">Data ART tidak tersedia.</div>;
  }

  const params = useParams();
  const router = useRouter();
  const artId = params.id as string;
  
  const { data: art, isLoading, error } = useART(artId);
  const { 
    isModalOpen, 
    handleContactART, 
    handleLoginRedirect, 
    closeModal 
  } = useLoginPrompt(artId);

  console.log('DetailART data:', data);

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
    <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-20 ">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={storageService.getAvatarUrl(art.avatar_id)}
                  alt={art.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                  }}
                />
                {art.is_verified && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    ✓ Terverifikasi
                  </div>
                )}
              </div>
              <div className="ml-6 text-white">
                <h2 className="text-3xl font-bold">{art.name}</h2>
                <p className="text-blue-100 text-lg mt-1">
                  {art.job_types?.[0] ? art.job_types[0].replace('-', ' ').toUpperCase() : 'Asisten Rumah Tangga'}
                </p>
                <div className="flex items-center mt-3">
                  <div className="flex items-center">
                    {renderStars(Math.floor(art.rating_average || 0))}
                    <span className="ml-2 text-blue-100 font-medium">
                      {art.rating_average?.toFixed(1) || '0.0'} ({art.rating_count || 0} ulasan)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Bio */}
                {art.bio && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Tentang Saya</h3>
                    <p className="text-gray-700 leading-relaxed">{art.bio}</p>
                  </div>
                )}

                {/* Work Experience */}
                {art.work_experience && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Pengalaman Kerja</h3>
                    <p className="text-gray-700 leading-relaxed">{art.work_experience}</p>
                  </div>
                )}

                {/* Skills */}
                {art.skills && art.skills.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Keahlian</h3>
                    <div className="flex flex-wrap gap-2">
                      {art.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium"
                        >
                          {skill.charAt(0).toUpperCase() + skill.slice(1).replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Job Types */}
                {art.job_types && art.job_types.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Jenis Pekerjaan</h3>
                    <div className="flex flex-wrap gap-2">
                      {art.job_types.map((jobType, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium"
                        >
                          {jobType.charAt(0).toUpperCase() + jobType.slice(1).replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Details */}
              <div className="space-y-6">
                {/* Personal Info */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Personal</h3>
                  <div className="space-y-3">
                    {art.age && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Usia:</span>
                        <span className="font-medium">{art.age} tahun</span>
                      </div>
                    )}
                    {art.gender && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Jenis Kelamin:</span>
                        <span className="font-medium">{getGenderText(art.gender)}</span>
                      </div>
                    )}
                    {art.education && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pendidikan:</span>
                        <span className="font-medium">{art.education}</span>
                      </div>
                    )}
                    {art.work_arrangement && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sistem Kerja:</span>
                        <span className="font-medium">{getWorkArrangementText(art.work_arrangement)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Lokasi</h3>
                  <div className="space-y-3">
                    {art.domicile_city && (
                      <div className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-medium">{art.domicile_city}</p>
                          {art.domicile_district && (
                            <p className="text-sm text-gray-500">{art.domicile_district}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Salary Range */}
                {(art.salary_min || art.salary_max) && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Range Gaji</h3>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {art.salary_min && art.salary_max ? (
                          `${formatCurrency(art.salary_min)} - ${formatCurrency(art.salary_max)}`
                        ) : art.salary_min ? (
                          `Mulai ${formatCurrency(art.salary_min)}`
                        ) : art.salary_max ? (
                          `Hingga ${formatCurrency(art.salary_max)}`
                        ) : (
                          'Nego'
                        )}
                      </p>
                      {art.salary_unit && (
                        <p className="text-sm text-gray-500 mt-1">
                          {getSalaryUnitText(art.salary_unit)}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact Actions */}
                <div className="space-y-3">
                  <button 
                    onClick={() => handleContactART(artId)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Hubungi ART
                  </button>
                  <button className="w-full bg-white hover:bg-gray-50 text-blue-600 font-semibold py-4 px-6 rounded-xl border-2 border-blue-600 transition-all duration-300">
                    Simpan Profil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Prompt Modal */}
      <LoginPromptModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onLoginRedirect={handleLoginRedirect}
      />
    </div>
  );
};