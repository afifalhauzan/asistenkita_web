"use client";

import { useForm } from 'react-hook-form';

interface Phase1FormData {
  name: string;
  email: string;
  phone: string;
}

interface ArtSignupPhase1Props {
  initialData: Phase1FormData;
  onNext: (data: Phase1FormData) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

export const ArtSignupPhase1: React.FC<ArtSignupPhase1Props> = ({
  initialData,
  onNext,
  onBack,
  isLoading = false
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Phase1FormData>({
    defaultValues: initialData,
    mode: 'onChange'
  });

  const onSubmit = (data: Phase1FormData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nama Lengkap
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
          placeholder="Masukkan nama lengkap"
          disabled={isLoading}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
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

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          Nomor Telepon
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          {...register('phone', {
            required: 'Nomor telepon harus diisi',
            pattern: {
              value: /^(\+62|62|0)[0-9]{8,13}$/,
              message: 'Format nomor telepon tidak valid. Gunakan format Indonesia (+62, 62, atau 0)'
            }
          })}
          className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 ${
            errors.phone ? 'ring-2 ring-red-500 bg-red-50' : ''
          }`}
          placeholder="+62812xxxxxxxx atau 0812xxxxxxxx"
          disabled={isLoading}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
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