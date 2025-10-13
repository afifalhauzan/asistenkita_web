"use client";

import React from 'react';
import Link from 'next/link';
import { storageService } from '@/lib/storageService';
import type { MitraCardProps } from '@/types/components';
import { useLoginPrompt } from './LoginPromptModal';

export const MitraBantuanCard: React.FC<MitraCardProps> = ({ data }) => {
  const {
    isModalOpen,
    handleContactART,
    handleLoginRedirect,
    closeModal
  } = useLoginPrompt(data.id);

  const renderStars = (rating: number): React.ReactNode[] => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  console.log('MitraBantuanCard data:', data);

  return (
    <>
      <div className="max-w-3xl bg-gray-50 rounded-2xl p-6 box-shadow-default hover:shadow-md transition-all duration-300 border border-gray-100">
        <div className="block md:hidden rounded-lg pb-6">
          <div className="flex flex-col items-start space-x-4">
            <div className="flex items-center space-x-4">
              {/* Avatar */}
              <img
                src={storageService.getAvatarUrl(data.image)}
                alt={data.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/64'; }}
              />

              {/* Info */}
              <div className="flex-grow">
                <div className="flex items-center space-x-1.5">
                  <h3 className="font-semibold text-xl text-gray-900 truncate">{data.name}</h3>
                  {data.isVerified && (
                    <span className="bg-green-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">✓</span>
                  )}
                </div>
                <p className="text-gray-500 text-sm">{data.specialization}</p>
              </div>
            </div>

            {/* Action/Price */}
            <div className="flex w-full flex-row justify-between mt-4">
              <div className="flex items-center ">
                <div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Umur: {data.experience} tahun
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {data.city}
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex">{renderStars(data.rating)}</div> {/* Assuming renderStars can take a limit */}
                    <span className="ml-2 text-xs text-gray-600">({data.rating})</span>
                  </div>

                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-gray-500 font-bold text-sm">
                  {data.priceRange?.min ? `Rp ${data.priceRange.min}` : 'Nego'}
                </p>
                <p className="text-xs text-gray-400">mulai dari</p>
              </div>
            </div>
          </div>
        </div>


        {/* Profile Header */}
        <div className="hidden md:flex flex-row items-center mb-4">
          <div className="relative">
            <img
              src={storageService.getAvatarUrl(data.image)}
              alt={data.name}
              className="w-28 h-28 rounded-full object-cover"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
              }}
            />

          </div>

          <div className="w-full flex-1 flex-col">
            <div className="flex flex-row justify-between">
              <div className="ml-4 ">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{data.name}</h3>
                  {/* Verification Badge */}
                  {data.isVerified && (
                    <div className="group flex items-center overflow-hidden bg-green-500 text-white rounded-full cursor-pointer">

                      {/* 1. Checkmark Icon (Always Visible) */}
                      <div className="px-1.5 py-0.5">
                        <span>✓</span>
                      </div>

                      {/* 2. Text Container (Expands on Hover) */}
                      <div className="max-w-0 group-hover:max-w-xs transition-all duration-500 ease-in-out">
                        <span className="pr-2 text-xs font-medium whitespace-nowrap">
                          Terverifikasi
                        </span>
                      </div>

                    </div>
                  )}
                </div>

                <p className="text-gray-500 text-sm">{data.specialization}</p>
                {/* Experience and Location */}
                <div className="space-y-2 mb-4 mt-2">
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Umur: {data.experience} tahun
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {data.city}
                  </div>
                  <div className="flex items-center mb-0">
                    <div className="flex">{renderStars(data.rating)}</div>
                    <span className="ml-2 text-sm font-medium text-gray-700">{data.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500 font-semibold text-md">Mulai dari :</p>
                <p className="text-gray-500 font-bold text-md md:text-lg">{data.priceRange?.min ? `Rp ${data.priceRange.min}` : 'Harga Negosiasi'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-left mb-6">
          <div className="text-gray-600 text-sm leading-relaxed">
            {data.description}
          </div>
        </div>

        {/* Lihat Profil Button */}

        <Link href={`/art/${data.id}`}>
          <button
            className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-3 px-4 rounded-lg transition-all duration-300 border border-blue-200 hover:border-blue-300">
            Lihat Profil
          </button>
        </Link>
      </div>

    </>
  );
};