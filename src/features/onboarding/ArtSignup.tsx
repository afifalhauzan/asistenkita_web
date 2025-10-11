"use client";

import Img from 'next/image';
import Link from 'next/link';
import { LogoFull } from '../../components/LogoFull';

export const ArtSignup = () => {
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
                    </div>

                    {/* Cards Container */}
                    <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl mt-6">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 box-shadow-default hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}