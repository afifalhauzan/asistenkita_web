"use client";

import Img from 'next/image';
import Link from 'next/link';

export const LogoFull = () => {
    return (
        <div className="flex items-center space-x-1">
            <Img src="/logo_navbar.svg" alt="AsistenKita Logo" width="40" height="40" className="w-7 h-8" />
            <div className="hidden sm:block">
                <span className="text-xl font-bold text-blue-600">AsistenKita</span>
            </div>
        </div>
    );
}