"use client";

import Img from 'next/image';
import Link from 'next/link';
import { LogoFull } from '../../components/LogoFull';
import { MapPin } from 'lucide-react';
import { Filter } from 'lucide-react';

export const Hero = () => {
    return (
        <div className="max-w-6xl relative z-10 flex flex-col items-center md:justify-start min-h-130 px-6 py-8 mt-25 md:mt-30">
            {/* Hero Content */}
            <div className="text-center space-y-8 max-w-2xl">
                {/* Main Title */}
                <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight">
                    Temukan Asisten Rumah Tangga & Nanny
                </h1>

                {/* Blue Underline */}
                <div className="flex justify-center">
                    <Img src="/line_onboarding.svg" alt="Decoration Line" width="128" height="16" className="w-40 md:w-50 lg:w-60" />
                </div>

                {/* Subtitle */}
                <p className="text-md md:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
                    Setiap keluarga memiliki ritme dan kebutuhan yang berbeda. Di sini, Anda dapat
                    mencari calon pekerja yang sesuai dengan kebutuhan unik keluarga Anda.
                </p>

                <div className="flex flex-col items-center justify-center md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                    {/* Search Bar */}
                    <div className="mt-2">
                        <div className="relative max-w-2xl mx-auto">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MapPin className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Semua lokasi"
                                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                            />
                        </div>
                    </div>
                    <div className="mt-2">
                        <button className="relative max-w-lg mx-auto flex items-center px-6 py-4 text-lg border-2 border-gray-200 rounded-full hover:border-blue-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300">
                            <Filter className="h-5 w-5 text-gray-400 mr-3" />
                            <span className="text-gray-600">Filter</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}