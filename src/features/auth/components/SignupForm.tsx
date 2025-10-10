'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthActions } from '../hooks/useAuthActions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoFull } from '../../../components/LogoFull';
import type { SignupFormData, User } from '@/types/auth';

interface SignupFormProps {
  onSuccess?: (user: User) => void;
  redirectTo?: string;
}

export const SignupForm: React.FC<SignupFormProps> = ({ 
  onSuccess, 
  redirectTo = '/dashboard' 
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { signup } = useAuthActions();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch
  } = useForm<SignupFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    },
    mode: 'onChange'
  });

  // Watch fields for error clearing
  const name = watch('name');
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  // Clear auth error when user starts typing
  useEffect(() => {
    if (errors.root) {
      // clearErrors('root');
    }
  }, [name, email, password, confirmPassword, clearErrors]);

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    clearErrors();

    try {
      console.log('SignupForm: Attempting signup with:', { name: data.name, email: data.email });
      const result = await signup(data.email, data.password, data.name);
      console.log('SignupForm: Signup result:', result);

      if (result.success && result.user) {
        if (onSuccess) {
          onSuccess(result.user);
        } else {
          router.push(redirectTo);
        }
      } else {
        console.log('SignupForm: Setting error:', result.error);
        setError('root', {
          type: 'manual',
          message: result.error || 'Pendaftaran gagal'
        });
      }
    } catch (err) {
      console.log('SignupForm: Caught exception:', err);
      const errorMessage = 'Terdapat error tak terduga, silakan coba lagi.';
      setError('root', {
        type: 'manual',
        message: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-4">
        <div className="flex justify-start mb-6">
          <LogoFull />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Selamat Datang!
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Yuk, buat akun Anda di AsistenKita.
          </p>
        </div>

        {/* Image placeholder - will be added by user */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full h-64 rounded-lg flex items-center justify-center text-gray-400">

          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <LogoFull />
          </div>

          {/* Mobile Welcome Text */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Selamat Datang!
            </h1>
            <p className="text-gray-600">
              Yuk, buat akun Anda di AsistenKita.
            </p>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Daftar</h2>
          </div>

          {/* Authentication Error Alert */}
          {errors.root && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">
                  Pendaftaran Gagal
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  {errors.root.message}
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 transition-transform duration-200">
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
                className={`w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? 'border-red-500 ring-2 ring-red-200' : ''
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
                className={`w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? 'border-red-500 ring-2 ring-red-200' : ''
                }`}
                placeholder="email@gmail.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

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
                  className={`w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12 ${
                    errors.password ? 'border-red-500 ring-2 ring-red-200' : ''
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
                      const passwordValue = watch('password');
                      return value === passwordValue || 'Password tidak cocok';
                    }
                  })}
                  className={`w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12 ${
                    errors.confirmPassword ? 'border-red-500 ring-2 ring-red-200' : ''
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

            {/* Terms and Privacy Checkbox */}
            <div className="flex items-start space-x-3">
              <input
                id="terms"
                type="checkbox"
                {...register('agreeToTerms', {
                  required: 'Anda harus menyetujui Syarat & Ketentuan serta Kebijakan Privasi kami'
                })}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-normal">
                Dengan mendaftar, kamu menyetujui{' '}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                  Syarat & Ketentuan
                </Link>{' '}
                dan{' '}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                  Kebijakan Privasi
                </Link>{' '}
                kami.
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
            )}

            <div className="space-y-4 flex-row mt-16 transition-transform duration-200">
              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                {isLoading ? 'Sedang mendaftar...' : 'Daftar'}
              </button>

              {/* Divider */}
              <div className="text-center">
                <span className="text-gray-500">atau</span>
              </div>

              {/* Sign In Link */}
              <div className="text-center">
                <span className="text-gray-600">Sudah punya akun? </span>
                <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Masuk
                </Link>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};