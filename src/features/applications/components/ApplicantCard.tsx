'use client';

import React from 'react';
import { APPLICATION_STATUS_LABELS, APPLICATION_STATUS_COLORS } from '@/types/application';
import type { ApplicantCardProps } from '@/types/application';

const ApplicantCard: React.FC<ApplicantCardProps> = ({ 
  application, 
  onAccept, 
  onReject, 
  isLoading = false 
}) => {
  const { art_profile } = application;

  if (!art_profile) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <p>Data profil ART tidak tersedia</p>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* Header with photo and basic info */}
      <div className="flex items-start space-x-4 mb-4">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {art_profile.avatar_id ? (
              <img 
                src={`/api/storage/avatar/${art_profile.avatar_id}`} 
                alt={art_profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>
          {/* Verification badge */}
          {art_profile.is_verified && (
            <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{art_profile.name}</h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${APPLICATION_STATUS_COLORS[application.status]}`}>
              {APPLICATION_STATUS_LABELS[application.status]}
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mb-2">
            {art_profile.job_types?.[0] || 'Pengasuh Anak'}
          </div>
          
          {/* Rating and Experience */}
          <div className="flex items-center space-x-4 mb-2">
            <div className="flex items-center space-x-1">
              {renderStars(Math.round(art_profile.rating_average || 0))}
              <span className="text-sm text-gray-600">
                ({art_profile.rating_count || 0})
              </span>
            </div>
            <div className="text-sm text-gray-600">
              📍 Usia: {art_profile.age || 'Tidak diketahui'} Tahun
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{art_profile.domicile_city || 'Kota Malang'}</span>
          </div>
        </div>
      </div>

      {/* Skills */}
      {art_profile.skills && art_profile.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {art_profile.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
            {art_profile.skills.length > 4 && (
              <span className="text-xs text-gray-500">
                +{art_profile.skills.length - 4} lainnya
              </span>
            )}
          </div>
        </div>
      )}

      {/* Application Message */}
      {application.message && (
        <div className="mb-4">
          <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
            <span className="font-medium">Pesan: </span>
            {application.message}
          </p>
        </div>
      )}

      {/* Application Date */}
      <div className="text-xs text-gray-500 mb-4">
        Melamar pada: {new Date(application.applied_at).toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <button
          disabled
          className="text-gray-400 text-sm font-medium cursor-not-allowed"
        >
          Lihat Profil
        </button>
        
        {application.status === 'pending' && (
          <div className="flex space-x-2">
            <button
              onClick={() => onReject?.(application.$id)}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {isLoading ? 'Menolak...' : 'Tolak'}
            </button>
            <button
              onClick={() => onAccept?.(application.$id)}
              disabled={isLoading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {isLoading ? 'Menerima...' : 'Terima'}
            </button>
          </div>
        )}
        
        {application.status === 'accepted' && (
          <span className="text-green-600 text-sm font-medium">
            ✓ Diterima
          </span>
        )}
        
        {application.status === 'rejected' && (
          <span className="text-red-600 text-sm font-medium">
            ✗ Ditolak
          </span>
        )}
      </div>
    </div>
  );
};

export default ApplicantCard;