"use client";

import React from 'react';

export const MitraCard = ({ data }) => {
  const renderStars = (rating) => {
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
    <div className="w-65 h-full w-max-1/2 bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative">
      {/* Profile Image */}
      <div className="relative w-full h-90 bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
        <img
          src={data.image || "/api/placeholder/300/400"}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        
        {/* Verification Badge */}
        {data.isVerified && (
          <div className="absolute top-4 left-4 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Terverifikasi
          </div>
        )}

        {/* Overlay for text visibility */}
        <div className="absolute h-full inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Content positioned over overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-0">{data.name}</h3>
          <p className="text-gray-200 text-sm mb-4">{data.specialization}</p>
          
          {/* Rating */}
          <div className="flex items-center mb-1">
            <div className="flex">{renderStars(data.rating)}</div>
            <span className="ml-2 text-sm text-gray-300">({data.rating})</span>
          </div>
          
          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed">{data.description}</p>
        </div>
      </div>
    </div>
  );
};