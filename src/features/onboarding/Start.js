"use client";

import Img from 'next/image';
import Link from 'next/link';
import { LogoFull } from '../../components/LogoFull';

export const Start = () => {
    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
            <div className="relative min-h-screen w-full overflow-hidden">
                {/* Background blur effects */}
                <div className="absolute -bottom-30 -left-40 w-96 h-96 rounded-full bg-blue-500/30 blur-[120px]"></div>
                <div className="absolute top-0 -right-40 w-96 h-96 rounded-full bg-blue-500/30 blur-[120px]"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8 mt-6 md:mt-0">
                    {/* Logo */}
                    <div className="scale-120 mb-12 flex items-center justify-center">
                        <LogoFull />
                    </div>

                    {/* Heading */}
                    <div className="text-center mb-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            Daftar <span className="text-blue-600">AsistenKita</span>
                        </h1>
                        <div className="w-45 h-4 mx-auto mb-4">
                            <Img src="/line_onboarding.svg" alt="Decoration Line" width="128" height="16" className="w-full h-full" />
                        </div>
                        <p className="text-gray-600 text-md md:text-lg max-w-2xl mx-auto leading-relaxed">
                            Mau mencari bantuan, atau justru ingin menawarkan keahlian? Pilih salah satu untuk memulai.
                        </p>
                    </div>

                    {/* Cards Container */}
                    <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl mt-6">
                        {/* Client Card */}
                        <div className="bg-white rounded-2xl p-6 sm:p-8 box-shadow-default hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                            <div className="flex flex-col items-start text-left ">
                                <div>
                                    <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                                        <div className="bg-white rounded-xl w-12 h-12 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-600 mb-1">
                                    Aku Membutuhkan Jasa
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Cari dan pekerjakan asisten terpercaya.
                                </p>

                                <Link href="/register/client">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                        Sebagai Klien
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Worker Card */}
                        <div className="bg-white rounded-2xl p-6 sm:p-8 box-shadow-default hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                            <div className="flex flex-col items-start text-left">
                                {/* Icon */}
                                <div>
                                    <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                                        <div className="bg-white rounded-xl w-12 h-12 flex items-center justify-center relative">
                                            <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            
                                        </div>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-gray-600 mb-1">
                                    Aku Mencari Kerja
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Buat profil dan temukan pekerjaan
                                </p>

                                <Link href="/register/worker">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                        Pencari Kerja
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}