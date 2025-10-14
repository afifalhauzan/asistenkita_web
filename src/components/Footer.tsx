'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
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
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
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
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.743 3.708 12.446s.49-2.449 1.297-3.324c.875-.875 2.026-1.365 3.323-1.365s2.448.49 3.323 1.365c.875.875 1.365 2.027 1.365 3.324s-.49 2.449-1.365 3.324c-.875.807-2.026 1.297-3.323 1.297zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.875-.875-1.365-2.027-1.365-3.324s.49-2.449 1.365-3.324c.875-.875 2.026-1.365 3.323-1.365s2.448.49 3.323 1.365c.875.875 1.365 2.027 1.365 3.324s-.49 2.449-1.365 3.324c-.875.807-2.026 1.297-3.323 1.297z" />
                                </svg>
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