"use client";

import React from 'react';
import Img from 'next/image';
import Link from 'next/link';

import { Hero } from './hero';
import { MitraBantuanCard } from './components/MitraBantuanCard';
import { useARTSearch } from './hooks/useARTs';

export const Bantuan = () => {
    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        refetch,
        search,
        searchActions,
    } = useARTSearch();

    const arts = data?.arts ?? [];
    const pagination = data?.pagination ?? null;

    const handleSearch = () => {
        console.log('Search triggered');
    };

    const handleFilterChange = (filterType: string, value: string) => {
        switch (filterType) {
            case 'specialization':
                if (value === '') {
                    searchActions.updateFilters({ skills: undefined });
                } else {
                    searchActions.updateFilters({ skills: [value] });
                }
                break;
            case 'location':
                if (value === '') {
                    searchActions.updateFilters({ location: undefined });
                } else {
                    searchActions.updateFilters({
                        location: { cities: [value] }
                    });
                }
                break;
        }
    };


    return (
        <div className="w-full overflow-x-hidden bg-gray-50">
            <div className="relative md:flex flex-col  items-center justify-start sm:justify-center overflow-hidden">

                <div className="absolute -top-30 -left-40 w-96 h-96 rounded-full bg-blue-500/30 blur-[120px]"></div>
                <div className="absolute top-90 -right-40 w-96 h-96 rounded-full bg-blue-500/30 blur-[120px]"></div>

                <Hero />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 w-full">
                    {/* <div className="rounded-2xl p-6 box-shadow-default border border-gray-100 mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Cari dan Filter</h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Cari nama atau keahlian"
                                    value={search.query}
                                    onChange={(e) => searchActions.updateSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                />
                            </div>

                            <div className="relative">
                                <select
                                    onChange={(e) => handleFilterChange('specialization', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none bg-white"
                                >
                                    <option value="">Semua Keahlian</option>
                                    <option value="pengasuh-anak">Pengasuh Anak</option>
                                    <option value="art-umum">Asisten Rumah Tangga</option>
                                    <option value="nanny">Nanny</option>
                                    <option value="perawat-lansia">Perawat Lansia</option>
                                    <option value="cleaning-service">Cleaning Service</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            <div className="relative">
                                <select
                                    onChange={(e) => handleFilterChange('location', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 appearance-none bg-white"
                                >
                                    <option value="">Semua Lokasi</option>
                                    <option value="Malang">Kota Malang</option>
                                    <option value="Surabaya">Surabaya</option>
                                    <option value="Jakarta">Jakarta</option>
                                    <option value="Bandung">Bandung</option>
                                    <option value="Yogyakarta">Yogyakarta</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            <button
                                onClick={handleSearch}
                                disabled={isLoading}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-blue-400"
                            >
                                {isLoading ? 'Mencari...' : 'Cari'}
                            </button>
                        </div>

                        {(search.query || Object.keys(search.filters).length > 0) && (
                            <div className="mt-4">
                                <button
                                    onClick={searchActions.clearFilters}
                                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                    Hapus semua filter
                                </button>
                            </div>
                        )}
                    </div> */}

                    {/* Loading State */}
                    {isLoading && (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">Memuat data...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {isError && (
                        <div className="flex flex-col items-center text-center py-2 p-2">
                            <div className="text-center py-6">
                                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Tidak ada hasil ditemukan
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Coba ubah filter pencarian atau kata kunci Anda
                                </p>
                                <div className="w-80 items-center bg-red-50 border border-red-100 rounded-lg mb-4">
                                    <p className="text-red-800">
                                        {isError ? error.message : 'Terjadi kesalahan saat memuat data'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <button
                                    onClick={searchActions.clearFilters}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Hapus semua filter
                                </button>
                                <button
                                    onClick={() => refetch()}
                                    className="mt-2 text-red-600 hover:text-red-700 font-medium"
                                >
                                    Coba lagi
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Cards Grid */}
                    {!isLoading && !isError && (
                        <>
                            {arts.length > 0 ? (
                                <>
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="pl-0 sm:pl-12 mb-1 sm:mb-0 sm:mt-2 sm:order-2">
                                            {/* Trust Section */}
                                            <div className="max-w-2xl bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                                                <div className="flex flex-col gap-8">
                                                    <div className="flex flex-row text-left">
                                                        <div className="flex justify-center mb-3 mr-4">
                                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900 mb-2">Jumlah Asisten Terverifikasi</h3>
                                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                                1.500+ asisten profesional telah melewati proses verifikasi identitas di AsistenKita.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-row text-left">
                                                        <div className="flex justify-center mb-3 mr-4">
                                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900 mb-2">Standar Gaji yang Adil</h3>
                                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                                Rp 3,4 jt/bulan adalah rata-rata gaji untuk asisten di kota besar, memastikan penawaran Anda kompetitif.
                                                            </p>
                                                        </div>
                                                    </div>

                                                    
                                                    <div className="flex flex-row text-left">
                                                        <div className="flex justify-center mb-3 mr-4">
                                                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                                                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900 mb-2">Standar Gaji yang Adil</h3>
                                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                               4.8 dari 5 bintang adalah rating rata-rata yang diberikan oleh keluarga untuk para asisten kami.</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 w-full sm:w-4/5 gap-2 sm:order-1 ">
                                            {arts.map((art) => {
                                                // Transform ARTListItem to MitraData format
                                                const cardData = {
                                                    id: art.$id,
                                                    name: art.name,
                                                    specialization: art.skills?.[0] || art.job_types?.[0] || 'Asisten Rumah Tangga',
                                                    rating: art.rating_average || 0,
                                                    city: art.domicile_city || 'Tidak ada informasi',
                                                    description: art.bio || 'Tidak ada deskripsi',
                                                    avatar: art.avatar_id,
                                                    image: art.avatar_id,
                                                    isVerified: art.is_verified || false,
                                                    reviewCount: art.rating_count || 0,
                                                    experience: art.age || 0,
                                                    priceRange: {
                                                        min: art.salary_min || 0,
                                                        max: art.salary_max || 0,
                                                        currency: 'IDR',
                                                        unit: art.salary_unit || 'monthly',
                                                    },
                                                    isAvailable: true, // Assume available for now
                                                };

                                                return (
                                                    <MitraBantuanCard key={art.$id} data={cardData} />
                                                );
                                            })}
                                        </div>
                                    </div>



                                    {/* Load More Button */}
                                    {pagination?.hasNextPage && (
                                        <div className="text-center">
                                            <button
                                                onClick={() => fetchNextPage()}
                                                disabled={isLoading}
                                                className="bg-white hover:bg-gray-50 text-blue-600 font-medium py-3 px-8 rounded-lg border-2 border-blue-600 transition-all duration-300 hover:shadow-md disabled:bg-gray-100">

                                                {isLoading ? 'Memuat...' : 'Lihat lebih banyak'}
                                            </button>
                                        </div>
                                    )}

                                    {/* Results Info */}
                                    {pagination && (
                                        <div className="text-center mt-4 text-gray-600 text-sm">
                                            Halaman {pagination.page} dari {pagination.totalPages} - Total {pagination.total} hasil
                                        </div>
                                    )}

                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Tidak ada hasil ditemukan
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        Coba ubah filter pencarian atau kata kunci Anda
                                    </p>
                                    <button
                                        onClick={searchActions.clearFilters}
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Hapus semua filter
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}