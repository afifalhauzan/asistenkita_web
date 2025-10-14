import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { lowonganService } from '@/services/lowonganService';
import type { 
  Lowongan, 
  LowonganListItem, 
  LowonganSearchParams, 
  CreateLowonganRequest, 
  UpdateLowonganRequest,
  LowonganStatistics
} from '@/types/lowongan';
import type { PaginatedResponse } from '@/types/services';

// Query keys for react-query
export const lowonganKeys = {
  all: ['lowongans'] as const,
  lists: () => [...lowonganKeys.all, 'list'] as const,
  list: (params: LowonganSearchParams) => [...lowonganKeys.lists(), params] as const,
  details: () => [...lowonganKeys.all, 'detail'] as const,
  detail: (id: string) => [...lowonganKeys.details(), id] as const,
  featured: () => [...lowonganKeys.all, 'featured'] as const,
  statistics: () => [...lowonganKeys.all, 'statistics'] as const,
  userLowongans: (userId: string) => [...lowonganKeys.all, 'user', userId] as const,
};

// Hook for fetching paginated lowongans
export function useLowongans(params: LowonganSearchParams = {}) {
  return useQuery({
    queryKey: lowonganKeys.list(params),
    queryFn: () => lowonganService.getLowongans(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

// Hook for fetching a single lowongan
export function useLowongan(id: string) {
  return useQuery({
    queryKey: lowonganKeys.detail(id),
    queryFn: () => lowonganService.getLowongan(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
}

// Hook for fetching featured lowongans
export function useFeaturedLowongans(limit: number = 4) {
  return useQuery({
    queryKey: lowonganKeys.featured(),
    queryFn: () => lowonganService.getFeaturedLowongans(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
}

// Hook for fetching user's lowongans
export function useUserLowongans(userId: string, params: LowonganSearchParams = {}) {
  return useQuery({
    queryKey: lowonganKeys.userLowongans(userId),
    queryFn: () => lowonganService.getUserLowongans(userId, params),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

// Hook for lowongan statistics
export function useLowonganStatistics() {
  return useQuery({
    queryKey: lowonganKeys.statistics(),
    queryFn: () => lowonganService.getStatistics(),
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: 1,
  });
}

// Hook for lowongan mutations (create, update, delete)
export function useLowonganMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: ({ data, userId }: { data: CreateLowonganRequest; userId: string }) =>
      lowonganService.createLowongan(data, userId),
    onSuccess: (newLowongan) => {
      // Invalidate and refetch lowongans list
      queryClient.invalidateQueries({ queryKey: lowonganKeys.lists() });
      queryClient.invalidateQueries({ queryKey: lowonganKeys.userLowongans(newLowongan.user_id!) });
      queryClient.invalidateQueries({ queryKey: lowonganKeys.statistics() });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLowonganRequest }) =>
      lowonganService.updateLowongan(id, data),
    onSuccess: (updatedLowongan) => {
      // Update the cache for the specific lowongan
      queryClient.setQueryData(
        lowonganKeys.detail(updatedLowongan.$id),
        updatedLowongan
      );
      // Invalidate lists to reflect changes
      queryClient.invalidateQueries({ queryKey: lowonganKeys.lists() });
      queryClient.invalidateQueries({ queryKey: lowonganKeys.userLowongans(updatedLowongan.user_id!) });
      queryClient.invalidateQueries({ queryKey: lowonganKeys.featured() });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => lowonganService.deleteLowongan(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: lowonganKeys.detail(deletedId) });
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: lowonganKeys.lists() });
      queryClient.invalidateQueries({ queryKey: lowonganKeys.all });
    },
  });

  const publishMutation = useMutation({
    mutationFn: (id: string) => lowonganService.publishLowongan(id),
    onSuccess: (updatedLowongan) => {
      queryClient.setQueryData(
        lowonganKeys.detail(updatedLowongan.$id),
        updatedLowongan
      );
      queryClient.invalidateQueries({ queryKey: lowonganKeys.lists() });
      queryClient.invalidateQueries({ queryKey: lowonganKeys.featured() });
    },
  });

  const closeMutation = useMutation({
    mutationFn: (id: string) => lowonganService.closeLowongan(id),
    onSuccess: (updatedLowongan) => {
      queryClient.setQueryData(
        lowonganKeys.detail(updatedLowongan.$id),
        updatedLowongan
      );
      queryClient.invalidateQueries({ queryKey: lowonganKeys.lists() });
      queryClient.invalidateQueries({ queryKey: lowonganKeys.featured() });
    },
  });

  return {
    create: createMutation,
    update: updateMutation,
    delete: deleteMutation,
    publish: publishMutation,
    close: closeMutation,
  };
}

// Hook for search functionality with debouncing
export function useLowonganSearch(initialParams: LowonganSearchParams = {}) {
  const [searchParams, setSearchParams] = useState<LowonganSearchParams>(initialParams);
  const [debouncedParams, setDebouncedParams] = useState<LowonganSearchParams>(initialParams);

  // Debounce search params
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedParams(searchParams);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const query = useLowongans(debouncedParams);

  return {
    ...query,
    searchParams,
    setSearchParams,
    updateSearch: (newParams: Partial<LowonganSearchParams>) => {
      setSearchParams(prev => ({ ...prev, ...newParams }));
    },
    clearSearch: () => {
      setSearchParams({});
    },
  };
}

// Hook for pagination
export function useLowonganPagination(baseParams: LowonganSearchParams = {}) {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = baseParams.limit || 12;

  const params: LowonganSearchParams = {
    ...baseParams,
    limit,
    offset: (currentPage - 1) * limit,
  };

  const query = useLowongans(params);

  const nextPage = () => {
    if (query.data?.pagination.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (query.data?.pagination.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && query.data && page <= query.data.pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    ...query,
    currentPage,
    nextPage,
    prevPage,
    goToPage,
    setCurrentPage,
  };
}