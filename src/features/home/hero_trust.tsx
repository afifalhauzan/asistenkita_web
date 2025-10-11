"use client";

import React from 'react';
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import Img from "next/image";

const AboutUsHero: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">

            <main className="max-w-6xl z-10 mx-auto px-6 sm:px-6 lg:px-8 py-12 pt-30 md:pt-20">
                <div className="grid lg:grid-cols-2 gap-16 sm:gap-12 items-center min-h-[80vh]">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold leading-tight">
                                <span className="text-gray-900">Temukan Bantuan</span>
                                <br />
                                <span className="text-gray-900">Terpercaya,</span>
                                <br />
                                <span className="text-blue-600">Ciptakan</span>
                                <br />
                                <span className="text-blue-600">Ketenangan.</span>
                            </h1>

                            <p className="text-md md:text-md lg:text-md xl:text-lg text-gray-600 leading-relaxed max-w-lg">
                                Platform aman yang menghubungkan keluarga dengan Asisten Rumah Tangga &
                                Nanny terverifikasi di seluruh Indonesia.
                            </p>
                        </div>

                        <div>
                            <Link
                                href="/bantuan"
                                className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span>Cari Bantuan Sekarang</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Image Grid */}
                    <div className="relative max-h-xl">
                        <div className="sm:grid grid-cols-2 gap-4">
                            {/* Top Left - Child with fork */}
                            <div className="flex items-center justify-center rounded-2xl">
                                <div className="mr-30 sm:mr-0 rotate-3 hover:rotate-6 transition-all duration-300">
                                    <Img src="/foto_hero1.png" alt="Anak Bahagia" width="200" height="200" className="w-45 h-45 rounded-2xl" />
                                    <div className="absolute top-40 -left-5 w-16 h-16 bg-orange-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                                        <span className="text-2xl">🏠</span>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden sm:flex items-center justify-center">
                                <div className="h-full -rotate-2 hover:-rotate-4 transition-all duration-300">
                                    <Img src="/foto_hero1.png" alt="Anak Bahagia" width="200" height="200" className="w-45 h-55 rounded-2xl" />
                                    <div className="absolute top-0 -right-5 w-16 h-16 bg-orange-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                                        <span className="text-2xl">👨‍👩‍👧</span>
                                    </div>
                                </div>
                            </div>


                            <div className="hidden sm:flex items-center justify-center">
                                <div className="h-full  -rotate-4 hover:-rotate-2 transition-all duration-300">
                                    <Img src="/foto_hero1.png" alt="Anak Bahagia" width="200" height="200" className="w-50 h-55 rounded-2xl" />
                                    <div className="absolute top-10 -right-5 w-16 h-16 bg-orange-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                                        <span className="text-2xl">💑</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center rounded-2xl">
                                <div className=" ml-30 sm:mr-0 rotate-2 hover:rotate-5 transition-all duration-300">
                                    <Img src="/foto_hero1.png" alt="Anak Bahagia" width="200" height="200" className="w-45 h-50 rounded-2xl" />
                                    <div className="absolute top-40 -right-5 w-16 h-16 bg-orange-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                                        <span className="text-2xl">💑</span>
                                    </div>
                                </div>
                            </div>


                            {/* Bottom Right - Family with boxes
                            <div className="relative">
                                <div className="bg-white rounded-2xl p-6 shadow-lg transform -rotate-1 hover:-rotate-2 transition-transform duration-300">
                                    <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-purple-300 rounded-full mx-auto mb-3 flex items-center justify-center">
                                                <span className="text-2xl">🏠</span>
                                            </div>
                                            <p className="text-sm font-semibold text-purple-700">Rumah Nyaman</p>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        {/* Floating decorative elements */}
                        <div className="absolute top-4 left-60 w-8 h-8 bg-yellow-300 rounded-full opacity-70 animate-bounce"></div>
                        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-pink-300 rounded-full opacity-60 animate-pulse"></div>
                    </div>
                </div>
            </main>

            {/* Trust Section */}
            <section className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="text-left mb-12">
                    <h3 className="text-2xl font-semibold text-blue-600 mb-2 tracking-wider">Mengapa Memilih Kami?</h3>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                        Keamanan dan Kepercayaan Adalah Prioritas
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-4 lg:gap-12">
                    {/* Verifikasi Identitas */}
                    <div className="bg-gray-50 rounded-3xl p-8 box-shadow-default hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                        <div className="text-center">
                            {/* Icon */}
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                                Verifikasi Identitas
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                Setiap calon pekerja kami dorong untuk melewati
                                proses verifikasi identitas untuk keamanan Anda.
                            </p>
                        </div>
                    </div>

                    {/* Kontrak Jelas */}
                    <div className="bg-gray-50 rounded-3xl p-8 box-shadow-default hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                        <div className="text-center">
                            {/* Icon */}
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                </svg>
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                                Kontrak Jelas
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                Sediakan ekspektasi yang jelas dari awal dengan fitur
                                kontrak digital kami untuk menghindari kesalahpahaman.
                            </p>
                        </div>
                    </div>

                    {/* Komunitas Aman */}
                    <div className="bg-gray-50 rounded-3xl p-8 box-shadow-default hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                        <div className="text-center">
                            {/* Icon */}
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16,4C18.11,4 20.11,4.89 21.39,6.39C22.67,7.89 23,9.67 23,12C23,14.33 22.67,16.11 21.39,17.61C20.11,19.11 18.11,20 16,20H7C4.24,20 2,17.76 2,15C2,12.36 4.24,10.22 7,10.22C7,6.27 10.13,3 14,3C14.65,3 15.25,3.11 15.84,3.28C16.2,3.11 16.59,3 17,3C18.1,3 19,3.9 19,5C19,5.34 18.91,5.67 18.74,5.95C17.86,4.75 16.5,4 15,4C13.36,4 12,5.36 12,7C12,8.64 13.36,10 15,10C15.36,10 15.69,9.93 16,9.81C16.65,9.93 17.32,10 18,10C19.1,10 20,10.9 20,12C20,13.1 19.1,14 18,14H16C14.89,14 14,13.1 14,12C14,10.9 14.89,10 16,10C16,8.89 15.1,8 14,8C12.89,8 12,8.89 12,10C12,11.1 12.89,12 14,12H16Z" />
                                </svg>
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                                Komunitas Aman
                            </h3>

                            <p className="text-gray-600 leading-relaxed">
                                Sistem ulasan dua arah membantu membangun
                                komunitas yang akuntabel dan saling menghormati.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="absolute -top-20 -left-40 w-100 h-100 bg-radial from-blue-600 to-gray-50/0 to-60% rounded-full blur-[180px]"></div>
            <div className="absolute bottom-60 -right-40 w-100 h-100 bg-radial from-blue-600 to-gray-50/0 to-60% rounded-full blur-[180px]"></div>

        </div>
    );
};

export default AboutUsHero;