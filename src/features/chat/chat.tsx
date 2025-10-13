"use client";

import Img from 'next/image';
import Link from 'next/link';
import { LogoFull } from '../../components/LogoFull';
import { useAuth } from '../auth/hooks/useAuth';

export const Chat = () => {
    const { user } = useAuth();
    return (
        <div className="relative z-10 flex flex-col items-center md:justify-start px-6 py-8 mt-10 md:mt-25">
            <div className="max-w-6xl max-h-screen w-full">
                {/* Chat Coming Soon Layout */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Mock Chat Interface */}
                    <div className="bg-gray-100 rounded-2xl p-6 shadow-lg relative overflow-hidden">
                        {/* Mock Chat Header */}
                        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200">
                            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            <div className="flex-1">
                                <div className="w-24 h-3 bg-gray-300 rounded mb-1"></div>
                                <div className="w-16 h-2 bg-gray-250 rounded"></div>
                            </div>
                        </div>

                        {/* Mock Chat Messages */}
                        <div className="space-y-4">
                            {/* Message 1 */}
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-gray-400 rounded-full flex-shrink-0"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="w-32 h-3 bg-gray-400 rounded"></div>
                                    <div className="w-48 h-3 bg-gray-400 rounded"></div>
                                </div>
                            </div>

                            {/* Message 2 */}
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-gray-400 rounded-full flex-shrink-0"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="w-28 h-3 bg-gray-400 rounded"></div>
                                    <div className="w-40 h-3 bg-gray-400 rounded"></div>
                                </div>
                            </div>

                            {/* Message 3 */}
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-gray-400 rounded-full flex-shrink-0"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="w-36 h-3 bg-gray-400 rounded"></div>
                                    <div className="w-44 h-3 bg-gray-400 rounded"></div>
                                </div>
                            </div>

                            {/* Message 4 */}
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-gray-400 rounded-full flex-shrink-0"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="w-24 h-3 bg-gray-400 rounded"></div>
                                    <div className="w-52 h-3 bg-gray-400 rounded"></div>
                                </div>
                            </div>
                        </div>

                        {/* Mock Input Area */}
                        <div className="mt-8 pt-4 border-t border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="flex-1 h-10 bg-gray-200 rounded-full"></div>
                                <div className="w-10 h-10 bg-blue-300 rounded-full"></div>
                            </div>
                        </div>

                        {/* Overlay to indicate it's coming soon */}
                        <div className="absolute inset-0 bg-gray-200/50 backdrop-blur-[3px] rounded-2xl"></div>
                    </div>

                    {/* Right Side - Coming Soon Message */}
                    <div className="text-center space-y-6">
                        <div className="space-y-4">
                            <h1 className="text-6xl md:text-7xl font-black text-blue-600 text-shadow-lg text-shadow-blue-200 tracking-tight">
                                COMING
                            </h1>
                            <h1 className="text-6xl md:text-7xl font-black text-blue-600 text-shadow-lg text-shadow-blue-200 tracking-tight">
                                SOON
                            </h1>
                        </div>

                        <div className="space-y-4 max-w-md mx-auto">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Fitur chat sedang dalam pengembangan
                            </p>
                        </div>

                        {user?.labels?.includes('majikan') ? (
                            // IF TRUE (user is 'majikan')
                            <div className="pt-4">
                                <Link
                                    href="/bantuan"
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Jelajahi ART Sekarang
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        ) : (
                            // IF FALSE (user is not 'majikan')
                            <div className="pt-4">
                                <Link
                                    href="/lowongan"
                                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Cari Pekerjaan Sekarang
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="absolute -top-20 -left-40 w-100 h-100 bg-radial from-blue-600 to-gray-50/0 to-60% rounded-full blur-[180px]"></div>
            <div className="absolute bottom-60 -right-40 w-100 h-100 bg-radial from-blue-600 to-gray-50/0 to-60% rounded-full blur-[180px]"></div>

        </div>
    );
}