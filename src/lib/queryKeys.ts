import type { ARTSearchParams } from '@/types/art';

export const artQueryKeys = {
  all: ['arts'] as const,
  lists: () => [...artQueryKeys.all, 'list'] as const,
  list: (params: ARTSearchParams) => [...artQueryKeys.lists(), params] as const,
  details: () => [...artQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...artQueryKeys.details(), id] as const,
  featured: () => [...artQueryKeys.all, 'featured'] as const,
  statistics: () => [...artQueryKeys.all, 'statistics'] as const,
  search: (params: ARTSearchParams) => [...artQueryKeys.lists(), 'search', params] as const,
} as const;

export const authQueryKeys = {
  all: ['auth'] as const,
  user: () => [...authQueryKeys.all, 'user'] as const,
} as const;