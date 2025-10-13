"use client";

import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';

interface Phase1FormData {
  name: string;
  email: string;
  phone: string;
  ktpPhoto?: FileList;
}

interface Phase1Props {
  initialData: Phase1FormData;
  onNext: (data: Phase1FormData) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export const Phase1: React.FC<Phase1Props> = ({
  initialData,
  onNext,
  onBack,
  isLoading = false
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors
  } = useForm<Phase1FormData>({
    defaultValues: initialData,
    mode: 'onChange'
  });

  // Dropzone configuration
  const onDrop = (acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors.find((e: any) => e.code === 'file-too-large')) {
        setError('ktpPhoto' as any, { 
          type: 'manual', 
          message: 'Ukuran file maksimal 5MB' 
        });
      } else if (rejection.errors.find((e: any) => e.code === 'file-invalid-type')) {
        setError('ktpPhoto' as any, { 
          type: 'manual', 
          message: 'Hanya file gambar yang diperbolehkan (JPG, PNG, JPEG)' 
        });
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      
      // Create FileList-like object for react-hook-form
      const dt = new DataTransfer();
      dt.items.add(file);
      setValue('ktpPhoto', dt.files);
      clearErrors('ktpPhoto' as any);
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
    disabled: isLoading
  });

  const removeFile = () => {
    setUploadedFile(null);
    setValue('ktpPhoto', undefined);
  };

  const onSubmit = (data: Phase1FormData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nama Lengkap (sesuai KTP)
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          {...register('name', {
            required: 'Nama lengkap harus diisi',
            minLength: {
              value: 2,
              message: 'Nama minimal 2 karakter'
            }
          })}
          className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 ${
            errors.name ? 'ring-2 ring-red-500 bg-red-50' : ''
          }`}
          placeholder="Nama"
          disabled={isLoading}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Aktif
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email', {
            required: 'Email harus diisi',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email tidak valid'
            }
          })}
          className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 ${
            errors.email ? 'ring-2 ring-red-500 bg-red-50' : ''
          }`}
          placeholder="email@gmail.com"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* WhatsApp Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Nomor WhatsApp Aktif
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          {...register('phone', {
            required: 'Nomor WhatsApp harus diisi',
            pattern: {
              value: /^(\+62|62|0)[0-9]{8,13}$/,
              message: 'Format nomor WhatsApp tidak valid. Gunakan format Indonesia (+62, 62, atau 0)'
            }
          })}
          className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 ${
            errors.phone ? 'ring-2 ring-red-500 bg-red-50' : ''
          }`}
          placeholder="+62"
          disabled={isLoading}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>


      {/* KTP Photo Upload with Dropzone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Foto KTP
        </label>
        
        {!uploadedFile ? (
          <div
            {...getRootProps()}
            className={`
              flex flex-col items-center justify-center w-full px-6 py-8 
              border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200
              ${isDragActive && !isDragReject 
                ? 'border-blue-400 bg-blue-50' 
                : isDragReject 
                ? 'border-red-400 bg-red-50' 
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              }
              ${isLoading ? 'cursor-not-allowed opacity-50' : ''}
            `}
          >
            <input {...getInputProps()} />
            
            {/* Upload Icon */}
            <svg 
              className={`w-8 h-8 mb-2 ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
            
            {/* Upload Text */}
            <div className="text-center">
              {isDragActive ? (
                <p className="text-blue-600 font-medium">Drop file di sini...</p>
              ) : (
                <>
                  <p className="text-gray-600 font-medium mb-1">
                    Klik untuk upload atau drag & drop
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, JPEG (Max 5MB)
                  </p>
                </>
              )}
            </div>
          </div>
        ) : (
          /* File Preview */
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              {/* Image Preview */}
              <div className="flex-shrink-0">
                <img 
                  src={URL.createObjectURL(uploadedFile)} 
                  alt="KTP Preview" 
                  className="w-12 h-12 object-cover rounded border"
                />
              </div>
              
              {/* File Info */}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            {/* Remove Button */}
            <button
              type="button"
              onClick={removeFile}
              disabled={isLoading}
              className="p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
              title="Hapus file"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Error Message */}
        {errors.ktpPhoto && (
          <p className="mt-1 text-sm text-red-600">{(errors.ktpPhoto as any).message}</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
          >
            Kembali
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          Selanjutnya
        </button>
      </div>
    </form>
  );
};