/**
 * ART (Asisten Rumah Tangga) Types
 * Specific interfaces for ART profiles, services, and operations
 */

import type { 
  BaseEntity, 
  EntityStatus, 
  LocationData, 
  RatingData, 
  ContactInfo, 
  PriceRange, 
  Availability, 
  VerificationStatus,
  PaginationParams,
  SearchParams 
} from './api';

// ART Specializations
export type ARTSpecialization = 
  | 'pengasuh-anak' 
  | 'nanny' 
  | 'art-umum' 
  | 'perawat-lansia' 
  | 'tukang-kebun' 
  | 'supir' 
  | 'satpam' 
  | 'cleaning-service';

// ART Skills
export type ARTSkill = 
  | 'memasak' 
  | 'menyetrika' 
  | 'membersihkan' 
  | 'merawat-bayi' 
  | 'merawat-anak' 
  | 'merawat-lansia' 
  | 'berkebun' 
  | 'menyupir' 
  | 'pijat' 
  | 'first-aid';

// Work Type
export type WorkType = 'live-in' | 'live-out' | 'part-time' | 'contract';

// Experience Level
export type ExperienceLevel = 'beginner' | 'intermediate' | 'experienced' | 'expert';

// ART Profile Interface
export interface ARTProfile extends BaseEntity {
  // Personal Information
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth?: string;
  gender: 'male' | 'female';
  
  // Professional Information
  specializations: ARTSpecialization[];
  skills: ARTSkill[];
  experience: {
    years: number;
    level: ExperienceLevel;
    description?: string;
  };
  
  // Service Details
  workTypes: WorkType[];
  priceRange: PriceRange;
  availability: Availability;
  
  // Location
  location: LocationData;
  serviceAreas: string[]; // Cities/areas they can serve
  
  // Profile Details
  bio: string;
  description: string;
  languages: string[];
  
  // Status and Verification
  status: EntityStatus;
  verification: VerificationStatus;
  
  // Ratings and Reviews
  rating: RatingData;
  
  // Contact
  contact: ContactInfo;
  
  // Additional Info
  certifications?: string[];
  education?: string;
  previousJobs?: PreviousJob[];
  
  // Metadata
  profileCompleteness: number; // Percentage
  lastActive?: string;
  joinedAt: string;
}

// Previous Job Experience
export interface PreviousJob {
  id: string;
  employer: string;
  position: string;
  duration: {
    start: string;
    end: string;
  };
  description?: string;
  reference?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

// ART Search Filters
export interface ARTSearchFilters extends SearchParams {
  specializations?: ARTSpecialization[];
  skills?: ARTSkill[];
  workTypes?: WorkType[];
  experienceLevel?: ExperienceLevel[];
  minExperience?: number;
  maxExperience?: number;
  priceRange?: {
    min?: number;
    max?: number;
  };
  location?: {
    cities?: string[];
    radius?: number; // In kilometers
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  rating?: {
    min?: number;
    max?: number;
  };
  availability?: {
    isAvailable?: boolean;
    workDays?: string[];
  };
  verification?: {
    isVerified?: boolean;
    level?: string[];
  };
  ageRange?: {
    min?: number;
    max?: number;
  };
  gender?: 'male' | 'female';
  languages?: string[];
}

// ART Search Params (for API)
export interface ARTSearchParams extends PaginationParams {
  q?: string; // Search query
  filters?: ARTSearchFilters;
  sort?: {
    field: 'name' | 'rating' | 'experience' | 'price' | 'distance' | 'joinedAt' | 'lastActive';
    direction: 'asc' | 'desc';
  };
}

// Create ART Profile Data
export interface CreateARTProfileData {
  name: string;
  email: string;
  phone: string;
  specializations: ARTSpecialization[];
  bio: string;
  description: string;
  experience: {
    years: number;
    level: ExperienceLevel;
    description?: string;
  };
  location: LocationData;
  priceRange: PriceRange;
  workTypes: WorkType[];
  skills?: ARTSkill[];
  languages?: string[];
  avatar?: string;
  dateOfBirth?: string;
  gender: 'male' | 'female';
}

// Update ART Profile Data
export interface UpdateARTProfileData extends Partial<CreateARTProfileData> {
  availability?: Availability;
  contact?: ContactInfo;
  certifications?: string[];
  education?: string;
}

// ART List Item (simplified for lists)
export interface ARTListItem {
  $id: string;
  name: string;
  avatar?: string;
  specializations: ARTSpecialization[];
  experience: {
    years: number;
    level: ExperienceLevel;
  };
  location: {
    city: string;
  };
  rating: {
    average: number;
    count: number;
  };
  priceRange: PriceRange;
  verification: {
    isVerified: boolean;
  };
  availability: {
    isAvailable: boolean;
  };
  status: EntityStatus;
}

// ART Card Props (for components)
export interface ARTCardData {
  id: string;
  name: string;
  avatar?: string;
  specialization: string; // Primary specialization
  city: string;
  rating: number;
  reviewCount: number;
  experience: number;
  priceRange: PriceRange;
  isVerified: boolean;
  isAvailable: boolean;
  description: string;
}

// Review Interface
export interface ARTReview extends BaseEntity {
  artId: string;
  userId: string;
  rating: number;
  comment: string;
  reviewerName: string;
  reviewerAvatar?: string;
  serviceType: ARTSpecialization;
  workDuration?: {
    start: string;
    end: string;
  };
  isRecommended: boolean;
  helpfulCount: number;
}

// Booking Interface
export interface ARTBooking extends BaseEntity {
  artId: string;
  clientId: string;
  serviceType: ARTSpecialization;
  workType: WorkType;
  startDate: string;
  endDate?: string;
  price: {
    amount: number;
    currency: string;
    unit: 'hourly' | 'daily' | 'weekly' | 'monthly';
  };
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  description: string;
  location: LocationData;
  contact: ContactInfo;
}

// Statistics Interface
export interface ARTStatistics {
  totalARTs: number;
  verifiedARTs: number;
  activeARTs: number;
  averageRating: number;
  totalReviews: number;
  specializations: Record<ARTSpecialization, number>;
  cities: Record<string, number>;
  experienceLevels: Record<ExperienceLevel, number>;
}