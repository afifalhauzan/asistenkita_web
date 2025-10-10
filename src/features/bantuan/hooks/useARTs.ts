/**
 * ART Hooks for Bantuan Feature
 * Custom hooks for managing ART data in bantuan feature
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { artService } from '@/api/services/artService';
import type { 
  ARTListItem, 
  ARTSearchParams, 
  ARTCardData,
  ARTSearchFilters 
} from '@/types/art';
import type { 
  PaginatedResponse, 
  LoadingState, 
  ApiError 
} from '@/types/api';

// Hook for fetching ARTs with pagination
export function useARTs(initialParams: ARTSearchParams = {}) {
  const [data, setData] = useState<ARTListItem[]>([]);
  const [pagination, setPagination] = useState<PaginatedResponse<ARTListItem>['pagination'] | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    isError: false,
    error: null,
  });
  const [params, setParams] = useState<ARTSearchParams>(initialParams);

  const fetchARTs = useCallback(async (searchParams: ARTSearchParams = params, append: boolean = false) => {
    try {
      setLoading({ isLoading: true, isError: false, error: null });
      
      const response = await artService.getARTs(searchParams);
      
      if (append) {
        setData(prev => [...prev, ...response.data]);
      } else {
        setData(response.data);
      }
      
      setPagination(response.pagination);
      setLoading({ isLoading: false, isError: false, error: null });
      
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      setLoading({ 
        isLoading: false, 
        isError: true, 
        error: apiError 
      });
      throw error;
    }
  }, [params]);

  // Load more data (pagination)
  const loadMore = useCallback(async () => {
    if (!pagination?.hasNextPage || loading.isLoading) return;
    
    const nextParams = {
      ...params,
      offset: pagination.offset + pagination.limit,
    };
    
    await fetchARTs(nextParams, true);
  }, [params, pagination, loading.isLoading, fetchARTs]);

  // Refresh data
  const refresh = useCallback(async () => {
    await fetchARTs({ ...params, offset: 0 }, false);
  }, [params, fetchARTs]);

  // Update search parameters
  const updateParams = useCallback((newParams: ARTSearchParams) => {
    setParams(newParams);
  }, []);

  // Search with new parameters
  const search = useCallback(async (searchParams: ARTSearchParams) => {
    const finalParams = { ...params, ...searchParams, offset: 0 };
    setParams(finalParams);
    await fetchARTs(finalParams, false);
  }, [params, fetchARTs]);

  // Initial load
  useEffect(() => {
    fetchARTs();
  }, []);

  return {
    data,
    pagination,
    loading,
    params,
    actions: {
      fetchARTs,
      loadMore,
      refresh,
      updateParams,
      search,
    },
  };
}

// Hook for ART search with filters
export function useARTSearch() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<ARTSearchFilters>({});
  const [sortBy, setSortBy] = useState<{
    field: 'name' | 'rating' | 'experience' | 'price' | 'distance' | 'joinedAt' | 'lastActive';
    direction: 'asc' | 'desc';
  }>({ field: 'rating', direction: 'desc' });

  // Debounced search query
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Memoized search params
  const searchParams = useMemo((): ARTSearchParams => ({
    q: debouncedQuery,
    filters,
    sort: sortBy,
    limit: 12,
    offset: 0,
  }), [debouncedQuery, filters, sortBy]);

  // Use the main useARTs hook with search params
  const artsResult = useARTs(searchParams);

  // Re-search when params change
  useEffect(() => {
    if (debouncedQuery || Object.keys(filters).length > 0) {
      artsResult.actions.search(searchParams);
    }
  }, [searchParams]);

  // Update search query
  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<ARTSearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchQuery('');
  }, []);

  // Update sorting
  const updateSort = useCallback((field: typeof sortBy.field, direction?: typeof sortBy.direction) => {
    setSortBy(prev => ({
      field,
      direction: direction || (prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'),
    }));
  }, []);

  return {
    ...artsResult,
    search: {
      query: searchQuery,
      debouncedQuery,
      filters,
      sortBy,
    },
    searchActions: {
      updateSearchQuery,
      updateFilters,
      clearFilters,
      updateSort,
    },
  };
}

// Hook for single ART profile
export function useART(id: string) {
  const [data, setData] = useState<ARTListItem | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    isError: false,
    error: null,
  });

  const fetchART = useCallback(async () => {
    if (!id) return;

    try {
      setLoading({ isLoading: true, isError: false, error: null });
      
      const art = await artService.getART(id);
      setData(art as ARTListItem);
      
      setLoading({ isLoading: false, isError: false, error: null });
    } catch (error) {
      const apiError = error as ApiError;
      setLoading({ 
        isLoading: false, 
        isError: true, 
        error: apiError 
      });
    }
  }, [id]);

  useEffect(() => {
    fetchART();
  }, [fetchART]);

  return {
    data,
    loading,
    actions: {
      fetchART,
    },
  };
}

// Hook for featured ARTs
export function useFeaturedARTs(limit: number = 6) {
  const [data, setData] = useState<ARTListItem[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    isError: false,
    error: null,
  });

  const fetchFeaturedARTs = useCallback(async () => {
    try {
      setLoading({ isLoading: true, isError: false, error: null });
      
      const arts = await artService.getFeaturedARTs(limit);
      setData(arts);
      
      setLoading({ isLoading: false, isError: false, error: null });
    } catch (error) {
      const apiError = error as ApiError;
      setLoading({ 
        isLoading: false, 
        isError: true, 
        error: apiError 
      });
    }
  }, [limit]);

  useEffect(() => {
    fetchFeaturedARTs();
  }, [fetchFeaturedARTs]);

  return {
    data,
    loading,
    actions: {
      fetchFeaturedARTs,
    },
  };
}

// Utility hook to transform ARTListItem to ARTCardData
export function useARTCardData(arts: ARTListItem[]): ARTCardData[] {
  return useMemo(() => {
    return arts.map(art => ({
      id: art.$id,
      name: art.name,
      avatar: art.avatar,
      specialization: art.specializations[0] || 'Asisten Rumah Tangga',
      city: art.location.city,
      rating: art.rating.average,
      reviewCount: art.rating.count,
      experience: art.experience.years,
      priceRange: art.priceRange,
      isVerified: art.verification.isVerified,
      isAvailable: art.availability.isAvailable,
      description: `${art.experience.level} dengan ${art.experience.years} tahun pengalaman`,
    }));
  }, [arts]);
}