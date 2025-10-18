"use client";

import Img from 'next/image';
import Link from 'next/link';
import { LogoFull } from '../../components/LogoFull';
import { useAuth } from '../auth/hooks/useAuth';
import { Hero } from './components/hero';
import { VisiMisi } from './components/visimisi';
import { Komitmen } from './components/komitmen';

export const AboutUs = () => {
    const { user } = useAuth();
    return (
        <div className="overflow-hidden bg-gray-50 relative z-10 flex flex-col items-center md:justify-center">
            <div className="flex flex-col items-center justify-center w-full py-8 mt-6 md:mt-2">
                {/* Hero Section */}
                <div className="px-6 md:px-8 my-6 w-full">
                    <Hero  />
                </div>

                {/* Visi Misi Section */}
                <div className="w-full my-6">
                    <VisiMisi />
                </div>

                {/* Komitmen Section */}
                <div className="flex flex-col items-center justify-center max-w-6xl px-6 md:px-8 my-6">
                    <Komitmen />
                </div>

                {/* Team Section */}
                <div className="flex flex-col items-center justify-center max-w-6xl px-6 md:px-8 my-6 w-full bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                        Tim Kami
                    </h2>
                    <div className="grid md:grid-cols-3 gap-2 md:gap-8">
                        <div className="bg-white rounded-2xl p-6 text-center box-shadow-default">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Img src="/afiif.jpg" alt="Afiif Al Hauzaan Alfian" width={80} height={80} className="rounded-full" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Afiif Al Hauzaan Alfian</h3>
                            <p className="text-blue-600 font-medium">Developer</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-center    box-shadow-default">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Img src="/zara.jpg" alt="zara" width={80} height={80} className="rounded-full" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Atha Azzahra Khairun Nisa</h3>
                            <p className="text-green-600 font-medium">Product Manager & UX Strategist</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 text-center box-shadow-default">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <Img src="/elvira.jpg" alt="Elvira Rosa Khoirunnisa" width={80} height={80} className="rounded-full" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Elvira Rosa Khoirunnisa</h3>
                            <p className="text-purple-600 font-medium">UI/UX Designer</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                        Siap Memulai Perjalanan Anda?
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {user ? (
                            <Link
                                href="/bantuan"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Jelajahi ART Sekarang
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/signup"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Daftar Sebagai ART
                                </Link>
                                <Link
                                    href="/bantuan"
                                    className="bg-white hover:bg-gray-50 text-blue-600 font-semibold py-4 px-8 rounded-xl border-2 border-blue-600 transition-all duration-300"
                                >
                                    Cari Asisten
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="absolute -top-20 -left-40 w-100 h-100 bg-radial from-blue-600 to-gray-50/0 to-60% rounded-full blur-[180px]"></div>
            <div className="absolute bottom-60 -right-40 w-100 h-100 bg-radial from-blue-600 to-gray-50/0 to-60% rounded-full blur-[180px]"></div>

        </div>
    );
}