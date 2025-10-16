"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useAuthActions } from '@/features/auth/hooks/useAuthActions';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  password?: string;
}

interface ProfileEditProps {
  onCancel: () => void;
  onSuccess?: () => void;
}

export const ProfileEdit = ({ onCancel, onSuccess }: ProfileEditProps) => {
  const { user } = useAuth();
  const { updateProfile } = useAuthActions();
  const [isLoading, setIsLoading] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      password: '',
    },
  });

  // Watch email field to detect changes
  const emailValue = watch('email');
  const isEmailChanged = emailValue !== user?.email;

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // If email is being changed, password is required
      const emailToUpdate = isEmailChanged ? data.email : undefined;
      const passwordToUse = isEmailChanged ? data.password : undefined;

      const result = await updateProfile(data.name, emailToUpdate, passwordToUse);
      if (result.success) {
        onSuccess?.();
        alert('Profile updated successfully!');
      } else {
        alert(result.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            type="text"
            {...register('name', { 
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
              }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
          {isEmailChanged && (
            <p className="text-yellow-600 text-sm mt-1">
              ⚠️ Mengubah email memerlukan password untuk verifikasi
            </p>
          )}
        </div>

        {isEmailChanged && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password (Required for email change) *
            </label>
            <input
              type="password"
              {...register('password', {
                required: isEmailChanged ? 'Password is required when changing email' : false,
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your current password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Masukkan password saat ini untuk mengkonfirmasi perubahan email
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your phone number"
            disabled
          />
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">
            Nomor telepon tidak dapat diubah dari sini
          </p>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Updating...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};