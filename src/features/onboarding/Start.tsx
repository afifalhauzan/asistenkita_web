"use client";

import Img from 'next/image';
import Link from 'next/link';
import { LogoFull } from '../../components/LogoFull';

export const Start = () => {
    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
            <div className="relative min-h-screen w-full overflow-hidden">
                <div className="absolute -bottom-30 -left-40 w-96 h-96 rounded-full bg-blue-500/30 blur-[120px]"></div>
                <div className="absolute top-0 -right-40 w-96 h-96 rounded-full bg-blue-500/30 blur-[120px]"></div>

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
                        <div className="bg-white rounded-2xl p-6 sm:p-8 box-shadow-default hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                            <div className="flex flex-col items-start text-left ">
                                <div>
                                    <Img src="/photo_onboarding.png" alt="Needs Service Icon" width="100" height="80" className="mx-auto mb-6" />
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
                                    <Img src="/notes_onboarding.png" alt="Needs Service Icon" width="100" height="80" className="mx-auto mb-6" />
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