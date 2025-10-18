'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLowonganApplicants, useApplicationMutations } from '@/features/applications/hooks/useApplication';
import { useLowongan } from '@/features/lowongan/hooks/useLowongan';
import ApplicantCard from '@/features/applications/components/ApplicantCard';
import type { ApplicationWithARTProfile } from '@/types/application';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const LowonganDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const lowonganId = params?.id as string;

  // Fetch job posting details
  const { data: lowongan, isLoading: isLoadingLowongan, error: lowonganError } = useLowongan(lowonganId);

  // Fetch applicants for this job
  const { data: applicantsResponse, isLoading: isLoadingApplicants, error: applicantsError } = useLowonganApplicants(lowonganId);

  // Mutations for accept/reject
  const { accept: acceptMutation, reject: rejectMutation } = useApplicationMutations();

  // Extract applicants array from response
  const applicants = applicantsResponse?.data || [];

  const handleAccept = async (applicationId: string) => {
    try {
      await acceptMutation.mutateAsync(applicationId);
    } catch (error) {
      console.error('Error accepting application:', error);
    }
  };

  const handleReject = async (applicationId: string) => {
    try {
      await rejectMutation.mutateAsync(applicationId);
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  // Loading states
  if (isLoadingLowongan || isLoadingApplicants) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error states
  if (lowonganError || applicantsError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Terjadi Kesalahan</h1>
            <p className="text-gray-600 mb-4">
              {lowonganError ? 'Gagal memuat detail lowongan' : 'Gagal memuat data pelamar'}
            </p>
            <button
              onClick={() => router.back()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Kembali
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!lowongan) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Lowongan Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-4">Lowongan yang Anda cari tidak ditemukan atau telah dihapus.</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali
            </button>
            <div className="text-sm text-gray-600">
              {applicants.length} Pelamar
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Pelamar</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details - Left Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Detail Lowongan</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{lowongan.title}</h3>
                  <p className="text-gray-600 text-sm">{lowongan.description}</p>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jenis Pekerjaan:</span>
                      <span className="font-medium">{lowongan.job_types?.join(', ') || 'Tidak disebutkan'}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Lokasi:</span>
                      <span className="font-medium">{lowongan.domicile_city}</span>
                    </div>

                    {lowongan.work_arrangement && lowongan.work_arrangement.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pengaturan Kerja:</span>
                        <span className="font-medium">
                          {lowongan.work_arrangement.join(', ')}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">Gaji:</span>
                      <span className="font-medium text-green-600">
                        Rp {lowongan.salary_min?.toLocaleString('id-ID')} - Rp {lowongan.salary_max?.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Diposting:</span>
                      <span className="font-medium">
                        {new Date(lowongan.$createdAt).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                {lowongan.skills && lowongan.skills.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Keahlian yang Dibutuhkan:</h4>
                    <div className="flex flex-wrap gap-2">
                      {lowongan.skills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {lowongan.education && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Pendidikan:</h4>
                    <p className="text-sm text-gray-600">{lowongan.education}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Applicants List - Right Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Daftar Pelamar</h2>
              <p className="text-gray-600">
                Kelola lamaran yang masuk untuk lowongan ini. Anda dapat menerima atau menolak setiap pelamar.
              </p>
            </div>

            {applicants.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM9 9a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Pelamar</h3>
                <p className="text-gray-600">
                  Lowongan ini belum menerima lamaran. Pelamar akan muncul di sini ketika mereka melamar.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {applicants.map((application: ApplicationWithARTProfile) => (
                  <ApplicantCard
                    key={application.$id}
                    application={application}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    isLoading={acceptMutation.isPending || rejectMutation.isPending}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default LowonganDetailPage;