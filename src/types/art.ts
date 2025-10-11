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

export type ARTSpecialization = any;

export type ARTSkill = any;

export type WorkType = any;

export type ExperienceLevel = any;

// ART Profile Interface
export interface ARTProfile extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  dateOfBirth?: string;
  gender: 'male' | 'female';
  
  specializations: ARTSpecialization[];
  skills: ARTSkill[];
  experience: {
    years: number;
    level: ExperienceLevel;
    description?: string;
  };
  
  workTypes: WorkType[];
  priceRange: PriceRange;
  availability: Availability;
  
  location: LocationData;
  serviceAreas: string[]; // Cities/areas they can serve
  
  bio: string;
  description: string;
  languages: string[];

  status: EntityStatus;
  verification: VerificationStatus;
  
  rating: RatingData;
  
  contact: ContactInfo;
  
  certifications?: string[];
  education?: string;
  previousJobs?: PreviousJob[];
  
  profileCompleteness: number;
  lastActive?: string;
  joinedAt: string;
}

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

export interface ARTSearchParams extends PaginationParams {
  q?: string; // Search query
  filters?: ARTSearchFilters;
  sort?: {
    field: 'name' | 'rating' | 'experience' | 'price' | 'distance' | 'joinedAt' | 'lastActive';
    direction: 'asc' | 'desc';
  };
}

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

export interface UpdateARTProfileData extends Partial<CreateARTProfileData> {
  availability?: Availability;
  contact?: ContactInfo;
  certifications?: string[];
  education?: string;
}

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

export interface ARTCardData {
  id: string;
  name: string;
  avatar?: string;
  specialization: string;
  city: string;
  rating: number;
  reviewCount: number;
  experience: number;
  priceRange: PriceRange;
  isVerified: boolean;
  isAvailable: boolean;
  description: string;
}

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

export interface ARTBooking extends BaseEntity {
  artId: string;
  clientId: string;
  serviceType: ARTSpecialization;
  workType: WorkType;
  startDate: string;
  endDate?: string;
  price: {
    amount: number;
    unit: string;
  };
  status: string;
  description: string;
  location: LocationData;
  contact: ContactInfo;
}

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