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

export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
}

export interface RequestOptions {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export type CreateData<T> = Omit<T, 'id' | '$id' | '$createdAt' | '$updatedAt'>;
export type UpdateData<T> = Partial<CreateData<T>>;

export interface BaseEntity {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
}

export type EntityStatus = 'active' | 'inactive' | 'pending' | 'suspended';

export interface LocationData {
  city: string;
  state?: string;
  country?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

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

export interface ContactInfo {
  phone?: string;
  email?: string;
  whatsapp?: string;
  telegram?: string;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
  unit?: 'hourly' | 'daily' | 'weekly' | 'monthly';
}

export interface Availability {
  isAvailable: boolean;
  availableDays?: string[];
  availableHours?: {
    start: string;
    end: string;
  };
  timezone?: string;
}

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