"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import Img from "next/image";

export default function Trusted() {
    const { user, isAuthenticated, loading } = useAuth();

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col md:flex-row gap-5 md:gap-12 lg:gap-8 xl:gap-20 items-center justify-start">
                    <div className="flex-1 w-full relative">
                        <div className="absolute top-20 md:-top-5">
                            <Img src="/orang_hero.png" alt="Trusted Person" width="300" height="450" className="w-140 h-80 md:h-120" />
                        </div>
                        {/* Decorative Circles */}
                        <div className="absolute top-12 right-12 w-12 h-12 bg-blue-300 rounded-full opacity-60 animate-float"></div>
                        <div className="absolute bottom-30 left-15 w-12 h-12 bg-yellow-300 rounded-full opacity-70 animate-float"></div>
                    
                        {/* Background Circle */}
                        <div className="absolute inset-0 opacity-20 transform scale-110"></div>

                        <div className="flex z-10 rounded-3xl p-8 items-center justify-center">

                            <div className="w-full h-96 rounded-2xl flex items-center justify-center relative overflow-hidden">
                                {/* Floating Elements */}
                                <div className="absolute top-5 md:top-30 -right-0 md:right-10 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse">
                                    Temukan bantuan
                                </div>
                                <div className="absolute w-1/3 text-center bottom-12 right-50 md:left-12 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse">
                                    Temukan bantuan
                                </div>
                            </div>
                        </div>

                        </div>

                    {/* Right Side - Content */}
                    <div className="flex-1 space-y-10 md:max-w-2/5">
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                                Platform Terpercaya
                            </h2>

                            <p className="text-md md:text-lg text-gray-600 leading-relaxed text-justify">
                                Kami berdedikasi untuk membangun komunitas yang
                                aman dan terpercaya. Lihat bagaimana kami telah
                                membantu ribuan keluarga menemukan asisten yang
                                tepat untuk menciptakan ketenangan di rumah.
                            </p>
                        </div>

                        {/* Statistics Grid */}
                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                            <div className="text-center space-y-2 border-2 border-gray-200 rounded-4xl py-6">
                                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">
                                    1000+
                                </div>
                                <div className="text-gray-500 font-medium">
                                    Asisten Terverifikasi
                                </div>
                            </div>

                            {/* 500+ Keluarga Terdaftar */}
                            <div className="text-center space-y-2 border-2 border-gray-200 rounded-4xl py-6">
                                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">
                                    500+
                                </div>
                                <div className="text-gray-500 font-medium">
                                    Keluarga Terdaftar
                                </div>
                            </div>

                            {/* 98% Tingkat Kepuasan */}
                            <div className="text-center space-y-2 border-2 border-gray-200 rounded-4xl py-6">
                                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">
                                    98%
                                </div>
                                <div className="text-gray-500 font-medium">
                                    Tingkat Kepuasan
                                </div>
                            </div>

                            {/* 24/7 Dukungan */}
                            <div className="text-center space-y-2 border-2 border-gray-200 rounded-4xl py-6">
                                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-600">
                                    24/7
                                </div>
                                <div className="text-gray-500 font-medium">
                                    Dukungan
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}