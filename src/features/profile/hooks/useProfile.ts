import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthActions } from '@/features/auth/hooks/useAuthActions';
import type { User, AuthResult } from '@/types/auth';

interface UpdateProfileData {
  name: string;
  email?: string;
}

interface UseProfileReturn {
  updateProfile: {
    mutate: (data: UpdateProfileData) => void;
    mutateAsync: (data: UpdateProfileData) => Promise<AuthResult>;
    isLoading: boolean;
    error: Error | null;
    reset: () => void;
  };
}

export const useProfile = (): UseProfileReturn => {
  const queryClient = useQueryClient();
  const { updateProfile: updateProfileAction } = useAuthActions();

  const updateProfileMutation = useMutation({
    mutationFn: async (data: UpdateProfileData): Promise<AuthResult> => {
      return await updateProfileAction(data.name, data.email);
    },
    onSuccess: (result: AuthResult) => {
      if (result.success && result.user) {
        // Update the auth context and any cached user data
        queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
      }
    },
    onError: (error: Error) => {
      console.error('Profile update error:', error);
    },
  });

  return {
    updateProfile: {
      mutate: updateProfileMutation.mutate,
      mutateAsync: updateProfileMutation.mutateAsync,
      isLoading: updateProfileMutation.isPending,
      error: updateProfileMutation.error,
      reset: updateProfileMutation.reset,
    },
  };
};