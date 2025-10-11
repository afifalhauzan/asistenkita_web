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
                    searchActions.updateFilters({ specializations: undefined });
                } else {
                    searchActions.updateFilters({ specializations: [value as any] });
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
        <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
            <div className="relative md:flex flex-col  items-center justify-start sm:justify-center min-h-screen overflow-hidden">

                <div className="absolute -top-30 -left-40 w-96 h-96 rounded-full bg-blue-500/30 blur-[120px]"></div>
                <div className="absolute top-90 -right-40 w-96 h-96 rounded-full bg-blue-500/30 blur-[120px]"></div>

                <Hero />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 w-full">
                    <div className="bg-gray-50 rounded-2xl p-6 box-shadow-default border border-gray-100 mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Cari dan Filter</h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search Input */}
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

                            {/* Skills Filter */}
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

                            {/* Location Filter */}
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

                            {/* Search Button */}
                            <button
                                onClick={handleSearch}
                                disabled={isLoading}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-blue-400"
                            >
                                {isLoading ? 'Mencari...' : 'Cari'}
                            </button>
                        </div>

                        {/* Clear Filters */}
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
                    </div>

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
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                        {arts.map((art) => {
                                            // Transform ARTListItem to MitraData format
                                            const cardData = {
                                                id: art.$id,
                                                name: art.name,
                                                specialization: art.specializations[0] || 'Asisten Rumah Tangga',
                                                rating: art.rating.average,
                                                city: art.location.city,
                                                description: `${art.experience.level} dengan ${art.experience.years} tahun pengalaman`,
                                                avatar: art.avatar,
                                                image: art.avatar,
                                                isVerified: art.verification.isVerified,
                                                reviewCount: art.rating.count,
                                                experience: art.experience.years,
                                                priceRange: art.priceRange,
                                                isAvailable: art.availability.isAvailable,
                                            };

                                            return (
                                                <MitraBantuanCard key={art.$id} data={cardData} />
                                            );
                                        })}
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