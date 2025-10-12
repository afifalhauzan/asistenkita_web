"use client";

import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface Phase3FormData {
  password: string;
  confirmPassword: string;
  profilePhoto?: FileList;
  bio: string;
  agreeToTerms: boolean;
}

interface ArtSignupPhase3Props {
  initialData: Phase3FormData;
  onSubmit: (data: Phase3FormData) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export const ArtSignupPhase3: React.FC<ArtSignupPhase3Props> = ({
  initialData,
  onSubmit,
  onBack,
  isLoading = false
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<Phase3FormData>({
    defaultValues: initialData,
    mode: 'onChange'
  });

  const password = watch('password');

  const handleSubmit_ = (data: Phase3FormData) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleSubmit_)} className="space-y-6">
      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            {...register('password', {
              required: 'Password harus diisi',
              minLength: {
                value: 8,
                message: 'Password minimal 8 karakter'
              }
            })}
            className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 pr-12 ${
              errors.password ? 'ring-2 ring-red-500 bg-red-50' : ''
            }`}
            placeholder="Masukkan Password (min 8 karakter)"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
          Konfirmasi Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            {...register('confirmPassword', {
              required: 'Konfirmasi password harus diisi',
              validate: (value: string) => {
                return value === password || 'Password tidak cocok';
              }
            })}
            className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 pr-12 ${
              errors.confirmPassword ? 'ring-2 ring-red-500 bg-red-50' : ''
            }`}
            placeholder="Konfirmasi Password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Bio Field */}
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
          Ceritakan Tentang Diri Anda
        </label>
        <textarea
          id="bio"
          rows={4}
          {...register('bio', {
            required: 'Bio harus diisi',
            minLength: {
              value: 50,
              message: 'Bio minimal 50 karakter'
            }
          })}
          className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 resize-none ${
            errors.bio ? 'ring-2 ring-red-500 bg-red-50' : ''
          }`}
          placeholder="Ceritakan pengalaman, keahlian, dan hal yang membuat Anda unik sebagai ART..."
          disabled={isLoading}
        />
        {errors.bio && (
          <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
        )}
      </div>

      {/* Profile Photo Field */}
      <div>
        <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-2">
          Foto Profil (Opsional)
        </label>
        <input
          id="profilePhoto"
          type="file"
          accept="image/*"
          {...register('profilePhoto')}
          className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          disabled={isLoading}
        />
      </div>

      {/* Terms and Privacy Checkbox */}
      <div className="flex items-start space-x-3">
        <input
          id="agreeToTerms"
          type="checkbox"
          {...register('agreeToTerms', {
            required: 'Anda harus menyetujui Syarat & Ketentuan serta Kebijakan Privasi kami'
          })}
          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          disabled={isLoading}
        />
        <label htmlFor="agreeToTerms" className="text-sm text-gray-600 leading-normal">
          Dengan mendaftar, saya menyetujui{' '}
          <a href="/terms" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
            Syarat & Ketentuan
          </a>{' '}
          dan{' '}
          <a href="/privacy" className="text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
            Kebijakan Privasi
          </a>{' '}
          AsistenKita.
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
      )}

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
        >
          Kembali
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </>
          ) : (
            'Daftar Sekarang'
          )}
        </button>
      </div>
    </form>
  );
};