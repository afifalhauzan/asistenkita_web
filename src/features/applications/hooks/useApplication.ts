import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationService } from '@/services/applicationService';
import type { 
  Application, 
  ApplicationListItem, 
  ApplicationWithARTProfile,
  ApplicationSearchParams, 
  CreateApplicationRequest, 
  UpdateApplicationRequest,
  ApplicationStatistics
} from '@/types/application';
import type { PaginatedResponse } from '@/types/services';

// Query keys for react-query
export const applicationKeys = {
  all: ['applications'] as const,
  lists: () => [...applicationKeys.all, 'list'] as const,
  list: (params: ApplicationSearchParams) => [...applicationKeys.lists(), params] as const,
  details: () => [...applicationKeys.all, 'detail'] as const,
  detail: (id: string) => [...applicationKeys.details(), id] as const,
  userApplications: (userId: string) => [...applicationKeys.all, 'user', userId] as const,
  lowonganApplications: (lowonganId: string) => [...applicationKeys.all, 'lowongan', lowonganId] as const,
  check: (lowonganId: string, userId: string) => [...applicationKeys.all, 'check', lowonganId, userId] as const,
  statistics: () => [...applicationKeys.all, 'statistics'] as const,
};

// Hook for fetching paginated applications
export function useApplications(params: ApplicationSearchParams = {}) {
  return useQuery({
    queryKey: applicationKeys.list(params),
    queryFn: () => applicationService.getApplications(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

// Hook for fetching a single application
export function useApplication(id: string) {
  return useQuery({
    queryKey: applicationKeys.detail(id),
    queryFn: () => applicationService.getApplication(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
}

// Hook for fetching user's applications
export function useUserApplications(userId: string, params: ApplicationSearchParams = {}) {
  return useQuery({
    queryKey: applicationKeys.userApplications(userId),
    queryFn: () => applicationService.getUserApplications(userId, params),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
}

// Hook for fetching lowongan applicants with profiles  
export function useLowonganApplicants(lowonganId: string, params: ApplicationSearchParams = {}) {
  return useQuery({
    queryKey: [...applicationKeys.lowonganApplications(lowonganId), 'with-profiles'],
    queryFn: () => applicationService.getLowonganApplicantsWithProfiles(lowonganId, params),
    enabled: !!lowonganId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
}

// Hook for checking if user already applied to a job
export function useApplicationCheck(lowonganId: string, userId: string) {
  return useQuery({
    queryKey: applicationKeys.check(lowonganId, userId),
    queryFn: () => applicationService.checkExistingApplication(lowonganId, userId),
    enabled: !!(lowonganId && userId),
    staleTime: 1 * 60 * 1000, // 1 minute
    retry: 1,
  });
}

// Hook for application statistics
export function useApplicationStatistics() {
  return useQuery({
    queryKey: applicationKeys.statistics(),
    queryFn: () => applicationService.getStatistics(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
}

// Hook for application mutations (create, update, delete)
export function useApplicationMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (data: CreateApplicationRequest) =>
      applicationService.createApplication(data),
    onSuccess: (newApplication) => {
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: applicationKeys.userApplications(newApplication.art_user_id) });
      queryClient.invalidateQueries({ queryKey: applicationKeys.lowonganApplications(newApplication.lowongan_id) });
      queryClient.invalidateQueries({ queryKey: applicationKeys.check(newApplication.lowongan_id, newApplication.art_user_id) });
      queryClient.invalidateQueries({ queryKey: applicationKeys.statistics() });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateApplicationRequest }) =>
      applicationService.updateApplication(id, data),
    onSuccess: (updatedApplication) => {
      // Update the cache for the specific application
      queryClient.setQueryData(
        applicationKeys.detail(updatedApplication.$id),
        updatedApplication
      );
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: applicationKeys.userApplications(updatedApplication.art_user_id) });
      queryClient.invalidateQueries({ queryKey: applicationKeys.statistics() });
    },
  });

  const withdrawMutation = useMutation({
    mutationFn: (id: string) => applicationService.withdrawApplication(id),
    onSuccess: (updatedApplication) => {
      // Update the cache for the specific application
      queryClient.setQueryData(
        applicationKeys.detail(updatedApplication.$id),
        updatedApplication
      );
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: applicationKeys.userApplications(updatedApplication.art_user_id) });
      queryClient.invalidateQueries({ queryKey: applicationKeys.statistics() });
    },
  });

  const acceptMutation = useMutation({
    mutationFn: (id: string) => applicationService.acceptApplication(id),
    onSuccess: (updatedApplication) => {
      // Update the cache for the specific application
      queryClient.setQueryData(
        applicationKeys.detail(updatedApplication.$id),
        updatedApplication
      );
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: applicationKeys.lowonganApplications(updatedApplication.lowongan_id) });
      queryClient.invalidateQueries({ queryKey: applicationKeys.statistics() });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => applicationService.rejectApplication(id),
    onSuccess: (updatedApplication) => {
      // Update the cache for the specific application
      queryClient.setQueryData(
        applicationKeys.detail(updatedApplication.$id),
        updatedApplication
      );
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: applicationKeys.lowonganApplications(updatedApplication.lowongan_id) });
      queryClient.invalidateQueries({ queryKey: applicationKeys.statistics() });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => applicationService.deleteApplication(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: applicationKeys.detail(deletedId) });
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: applicationKeys.lists() });
      queryClient.invalidateQueries({ queryKey: applicationKeys.statistics() });
    },
  });

  return {
    create: createMutation,
    update: updateMutation,
    withdraw: withdrawMutation,
    accept: acceptMutation,
    reject: rejectMutation,
    delete: deleteMutation,
  };
}

// Custom hook for handling job application workflow
export function useJobApplication(lowonganId: string, userId: string) {
  const [isApplying, setIsApplying] = useState(false);
  const [applicationError, setApplicationError] = useState<string | null>(null);

  // Check if user already applied
  const { data: existingApplication, isLoading: isCheckingApplication } = useApplicationCheck(lowonganId, userId);
  
  const { create: createApplication } = useApplicationMutations();

  const handleApply = async (message?: string) => {
    if (!userId || !lowonganId) {
      setApplicationError('Invalid user or job information');
      return false;
    }

    if (existingApplication) {
      setApplicationError('You have already applied to this job');
      return false;
    }

    setIsApplying(true);
    setApplicationError(null);

    try {
      await createApplication.mutateAsync({
        lowongan_id: lowonganId,
        art_user_id: userId,
        message,
      });
      
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to apply for job';
      setApplicationError(errorMessage);
      return false;
    } finally {
      setIsApplying(false);
    }
  };

  return {
    hasApplied: !!existingApplication,
    existingApplication,
    isCheckingApplication,
    isApplying,
    applicationError,
    handleApply,
    clearError: () => setApplicationError(null),
  };
}