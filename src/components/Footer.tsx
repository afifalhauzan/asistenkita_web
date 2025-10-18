'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Facebook, Instagram } from 'lucide-react';
import { LogoFull } from './LogoFull';
import type { NavbarProps } from '@/types/components';

export const Footer: React.FC<NavbarProps> = ({ className = "" }) => {
    const pathname = usePathname();

    return (
        <nav className="w-full bg-gray-50 shadow-[0px_0px_0px_rgba(0,0,0,0.1)]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Social Media Section */}
                    <div className="md:col-span-2 mb-4">
                        <div className="mb-6">
                            <div className={`flex items-center space-x-1`}>
                                <Image
                                    src="/logo_navbar.svg"
                                    alt="AsistenKita Logo"
                                    width={35}
                                    height={35}
                                    className="w-10 h-9"
                                />
                                <span className="text-xl font-bold text-blue-600">AsistenKita</span>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Temukan kami di sosial media:
                        </p>
                        <div className="flex space-x-4">
                            {/* Facebook */}
                            <Link
                                href="#"
                                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                            >
                                <Facebook className="w-5 h-5 text-white" />
                            </Link>

                            {/* TikTok */}
                            <Link
                                href="#"
                                className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                            >
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </Link>

                            {/* Instagram */}
                            <Link
                                href="#"
                                className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-700 hover:to-pink-600 transition-colors"
                            >
                                <Instagram className="w-5 h-5 text-white" />
                            </Link>
                        </div>
                    </div>

                    {/* Tentang AsistenKita Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Tentang AsistenKita
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/aboutus"
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    Tentang Kami
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/aboutus"
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    Keamanan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/aboutus"
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    Pusat Bantuan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Layanan Section */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Layanan
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/pekerjaan"
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    Cari Pekerjaan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/bantuan"
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    Cari Asisten
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/lowongan"
                                    className="text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                    Buat Lowongan
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
};