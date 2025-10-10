"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { LogoFullProps } from '@/types/components';

export const LogoFull: React.FC<LogoFullProps> = ({ 
  className = "",
  width = 40,
  height = 40 
}) => {
  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <Image 
        src="/logo_navbar.svg" 
        alt="AsistenKita Logo" 
        width={width} 
        height={height} 
        className="w-7 h-8" 
      />
      <div className="hidden sm:block">
        <span className="text-xl font-bold text-blue-600">AsistenKita</span>
      </div>
    </div>
  );
};