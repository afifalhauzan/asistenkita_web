"use client";

import React from 'react';
import type { MitraCardProps } from '@/types/components';

export const MitraBantuanCard: React.FC<MitraCardProps> = ({ data }) => {
  const renderStars = (rating: number): React.ReactNode[] => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-6 box-shadow-default hover:shadow-md transition-all duration-300 border border-gray-100">
      {/* Profile Header */}
      <div className="flex flex-row  items-center mb-4">
        <div className="relative">
          <img
            src={data.image || "/api/placeholder/60/60"}
            alt={data.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          {/* Verification Badge */}
          {data.isVerified && (
            <div className=" bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              ✓ Terverifikasi
            </div>
          )}
        </div>
        <div className="ml-4 flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{data.name}</h3>
          <p className="text-gray-500 text-sm">{data.specialization}</p>
        </div>
      </div>

      {/* Experience and Location */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600 text-sm">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Pengalaman: 5 Tahun
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {data.city}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center mb-6">
        <div className="flex">{renderStars(data.rating)}</div>
        <span className="ml-2 text-sm font-medium text-gray-700">{data.rating}</span>
      </div>

      {/* Lihat Profil Button */}
      <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-blue-200 hover:border-blue-300">
        Lihat Profil
      </button>
    </div>
  );
};