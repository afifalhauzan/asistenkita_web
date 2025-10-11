import { useState, useMemo } from 'react';
import { useQuery, useInfiniteQuery, } from '@tanstack/react-query';
import { artService } from '@/api/services/artService';
import { artQueryKeys } from '@/lib/queryKeys';
import type { ARTListItem, ARTSearchParams, ARTCardData, ARTSearchFilters, ARTProfile} from '@/types/art';


export function useARTs(params: ARTSearchParams) {
  return useInfiniteQuery({
    queryKey: artQueryKeys.list(params),
    queryFn: ({ pageParam = 0 }) => artService.getARTs({ ...params, offset: pageParam }),
    getNextPageParam: (lastPage) => lastPage.pagination.hasNextPage
      ? lastPage.pagination.offset + lastPage.pagination.limit
      : undefined,
    initialPageParam: 0,

    select: (data) => {
      return {
        arts: data.pages.flatMap(page => page.data),
        pagination: data.pages[data.pages.length - 1]?.pagination ?? null,
      };
    },
  });
}

export function useARTSearch() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<ARTSearchFilters>({});
  const [sortBy, setSortBy] = useState<{
    field: 'name' | 'rating' | 'experience' | 'price' | 'distance' | 'joinedAt' | 'lastActive';
    direction: 'asc' | 'desc';
  }>({ field: 'rating', direction: 'desc' });

  const searchParams = useMemo((): ARTSearchParams => ({
    q: searchQuery,
    filters,
    sort: sortBy,
    limit: 12,
  }), [searchQuery, filters, sortBy]);

  // useARTs akan otomatis re-fetch saat searchParams berubah
  const artsResult = useARTs(searchParams);

  const searchActions = useMemo(() => ({
    updateSearchQuery: setSearchQuery,
    updateFilters: (newFilters: Partial<ARTSearchFilters>) => {
      setFilters(prev => ({ ...prev, ...newFilters }));
    },
    clearFilters: () => {
      setFilters({});
      setSearchQuery('');
    },
    updateSort: (field: typeof sortBy.field, direction?: typeof sortBy.direction) => {
      setSortBy(prev => ({
        field,
        direction: direction || (prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'),
      }));
    },
  }), []);

  console.log('useARTSearch - artsResult:', artsResult);

  return {
    ...artsResult,
    search: {
      query: searchQuery,
      filters,
      sortBy,
    },
    searchActions,
  };
}

export function useART(id: string) {
  return useQuery({
    queryKey: artQueryKeys.detail(id),
    queryFn: () => artService.getART(id),
    enabled: !!id,
  });
}

export function useFeaturedARTs(limit: number = 4) {
  return useQuery({
    queryKey: artQueryKeys.featured(),
    queryFn: () => artService.getFeaturedARTs(limit),
    staleTime: 10 * 60 * 1000,
  });
}

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