/**
 * Common API Types
 * Shared interfaces for API responses, errors, and utilities
 */

// Base API Response Structure
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

// Error Response Structure
export interface ApiError {
  success: false;
  message: string;
  code?: string | number;
  details?: Record<string, any>;
  timestamp?: string;
}

// Pagination Interface
export interface PaginationParams {
  limit?: number;
  offset?: number;
  page?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Search and Filter Base Types
export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
}

// Request Options
export interface RequestOptions {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

// Loading State
export interface LoadingState {
  isLoading: boolean;
  isError: boolean;
  error?: ApiError | null;
}

// CRUD Operation Types
export type CreateData<T> = Omit<T, 'id' | '$id' | '$createdAt' | '$updatedAt'>;
export type UpdateData<T> = Partial<CreateData<T>>;

// Query State for React Query / SWR
export interface QueryState<T> extends LoadingState {
  data: T | null;
  refetch: () => void;
  mutate: (data?: T) => void;
}

// Mutation State
export interface MutationState<T> extends LoadingState {
  mutate: (data: T) => Promise<void>;
  reset: () => void;
}

// Upload Progress
export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

// File Upload Response
export interface FileUploadResponse {
  id: string;
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

// Common Entity Fields (Appwrite standard)
export interface BaseEntity {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
}

// Status Types
export type EntityStatus = 'active' | 'inactive' | 'pending' | 'suspended';

// Location Types
export interface LocationData {
  city: string;
  state?: string;
  country?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Rating Types
export interface RatingData {
  average: number;
  count: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

// Contact Information
export interface ContactInfo {
  phone?: string;
  email?: string;
  whatsapp?: string;
  telegram?: string;
}

// Price Range
export interface PriceRange {
  min: number;
  max: number;
  currency: string;
  unit?: 'hourly' | 'daily' | 'weekly' | 'monthly';
}

// Availability
export interface Availability {
  isAvailable: boolean;
  availableDays?: string[];
  availableHours?: {
    start: string;
    end: string;
  };
  timezone?: string;
}

// Verification Status
export interface VerificationStatus {
  isVerified: boolean;
  verifiedAt?: string;
  verificationLevel?: 'basic' | 'enhanced' | 'premium';
  documents?: {
    identity: boolean;
    background: boolean;
    skills: boolean;
    references: boolean;
  };
}