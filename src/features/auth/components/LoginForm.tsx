'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthActions } from '../hooks/useAuthActions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoFull } from '../../../components/LogoFull';
import type { LoginFormData, User } from '@/types/auth';

interface LoginFormProps {
  onSuccess?: (user: User) => void;
  redirectTo?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  redirectTo = '/dashboard' 
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login } = useAuthActions();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch
  } = useForm<LoginFormData & { agreeToTerms: boolean }>({
    defaultValues: {
      email: '',
      password: '',
      agreeToTerms: false
    },
    mode: 'onChange'
  });

  // ADD THIS EFFECT TO PROVE IT'S RE-MOUNTING
  useEffect(() => {
    console.log('%c LoginForm MOUNTED ', 'background: #222; color: #bada55');
  }, []); // Empty array means this runs ONLY ONCE when the component mounts.

  // FIX: Watch fields individually to get stable string values
  const email = watch('email');
  const password = watch('password');

  // Clear auth error when user starts typing
  useEffect(() => {
    // If a root error exists and the user starts typing, clear it.
    if (errors.root) {
      clearErrors('root');
    }
  }, [email, password, clearErrors]);

  const onSubmit = async (data: LoginFormData & { agreeToTerms: boolean }) => {
    setIsLoading(true);
    clearErrors();

    try {
      console.log('LoginForm: Attempting login with:', { email: data.email });
      const result = await login(data.email, data.password);
      console.log('LoginForm: Login result:', result);

      if (result.success && result.user) {
        if (onSuccess) {
          onSuccess(result.user);
        } else {
          router.push(redirectTo);
        }
        return;
      }

      // This is the failure case
      setError('root', {
        type: 'manual',
        message: result.error,
      });
      // FIX: Set loading to false here, in the same logic block as setError
      setIsLoading(false);

    } catch (err) {
      console.log('LoginForm: Caught exception:', err);
      const errorMessage = 'Terdapat error tak terduga, silakan coba lagi.';
      setError('root', {
        type: 'manual',
        message: errorMessage
      });
      setIsLoading(false);
    }
  };

  console.log('Component rendered with errors:', errors);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-4">
        <div className="flex justify-start mb-6">
          <LogoFull />
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Selamat Datang Kembali!
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Kami senang Anda kembali! Masukkan detail akun Anda.
          </p>
        </div>

        {/* Image placeholder - will be added by user */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full h-64 rounded-lg flex items-center justify-center text-gray-400">

          </div>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <LogoFull />
          </div>

          {/* Mobile Welcome Text */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Selamat Datang Kembali!
            </h1>
            <p className="text-gray-600">
              Kami senang Anda kembali! Masukkan detail akun Anda.
            </p>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Masuk</h2>
          </div>

          {/* Authentication Error Alert */}
          {(errors.root) && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">
                  Login Gagal
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  {errors.root?.message}
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 transition-transform duration-200">
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
                  required: 'Email harus ada',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email tidak valid'
                  }
                })}
                className={`w-full px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-500 ring-2 ring-red-200' : ''
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
                  autoComplete="current-password"
                  {...register('password', {
                    required: 'Password harus ada',
                    minLength: {
                      value: 6,
                      message: 'Password harus terdiri dari minimal 6 karakter'
                    }
                  })}
                  className={`w-full flex justify-between px-4 py-3 bg-gray-100 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-4 ${errors.password ? 'border-red-500 ring-2 ring-red-200' : ''
                    }`}
                  placeholder="Masukkan Password"
                  disabled={isLoading}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-start space-x-3 ">
              <input
                id="terms"
                type="checkbox"
                {...register('agreeToTerms', {
                  required: 'Anda harus menyetujui Syarat & Ketentuan serta Kebijakan Privasi kami',
                })}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-normal">
                Dengan masuk, kamu menyetujui{' '}
                <a className="text-blue-600 hover:text-blue-700">
                  Syarat & Ketentuan
                </a>{' '}
                dan{' '}
                <a className="text-blue-600 hover:text-blue-700">
                  Kebijakan Privasi
                </a>{' '}
                kami.
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
            )}

            <div className="space-y-4 flex-row mt-16 transition-transform duration-200">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                {isLoading ? 'Sedang masuk...' : 'Masuk'}
              </button>

              <div className="text-center">
                <span className="text-gray-500">atau</span>
              </div>

              <div className="text-center">
                <span className="text-gray-600">Belum punya akun? </span>
                <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Daftar
                </Link>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};