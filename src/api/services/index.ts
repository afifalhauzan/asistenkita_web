/**
 * API Services Index
 * Central export for all API services
 */

// Export services
export { authService, AuthService } from './authService';
export { artService, ARTService } from './artService';

// Re-export core API client
export { apiClient } from '../core';

// Export types for convenience
export type {
  ARTProfile,
  ARTListItem,
  ARTSearchParams,
  CreateARTProfileData,
  UpdateARTProfileData,
  ARTCardData,
} from '@/types/art';

export type {
  ApiResponse,
  ApiError,
  PaginatedResponse,
  RequestOptions,
} from '@/types/api';

export type {
  User,
  AppwriteError,
} from '@/types/auth';