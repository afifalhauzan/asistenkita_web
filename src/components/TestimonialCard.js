"use client";

import React from 'react';

export const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-6 h-6 ${
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
    <div className={`bg-gray-50 rounded-3xl p-8 mx-4 shadow-[0_0px_60px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 min-h-[400px] flex flex-col justify-between`}>
      {/* User Info */}
      <div className="text-center mb-6">
        <div className={`w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden ${testimonial.bgColor.replace('100', '200')}`}>
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{testimonial.name}</h3>
        <p className="text-gray-600 text-sm">{testimonial.role}</p>
      </div>

      {/* Testimonial Text */}
      <div className="">
        <div className="flex justify-center mb-2 mt-2">
          {renderStars(testimonial.rating)}
        </div>
        <p className="text-gray-500 text-sm leading-relaxed text-center italic">
          "{testimonial.testimonial}"
        </p>
      </div>
    </div>
  );
};