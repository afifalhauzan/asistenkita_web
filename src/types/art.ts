import type { 
  BaseEntity, 
  PaginationParams,
  SearchParams 
} from './services';

export type ARTGender = 'male' | 'female' | 'other';
export type WorkArrangement = 'remote' | 'onsite' | 'hybrid';
export type SalaryUnit = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface DetailARTProps {
  data?: ARTProfile | null;
}

export interface ARTProfile extends BaseEntity {
  // Core identity
  name: string;
  avatar_id?: string;
  bio?: string;
  
  // Personal info
  age?: number;
  gender?: ARTGender;
  education?: string;
  
  // Professional info
  skills?: string[];
  job_types?: string[];
  work_arrangement?: WorkArrangement;
  work_experience?: string;
  
  // Location
  domicile_city?: string;
  domicile_district?: string;
  
  // Compensation
  salary_min?: number;
  salary_max?: number;
  salary_unit?: SalaryUnit;
  
  // Verification & files
  is_verified?: boolean;
  ektp_file_id?: string;
  
  // Ratings
  rating_average?: number;
  rating_count?: number;
}

export interface ARTSearchFilters extends SearchParams {
  skills?: string[];
  job_types?: string[];
  work_arrangement?: WorkArrangement[];
  gender?: ARTGender[];
  age_range?: {
    min?: number;
    max?: number;
  };
  education?: string;
  salary_range?: {
    min?: number;
    max?: number;
    unit?: SalaryUnit;
  };
  location?: {
    cities?: string[];
    districts?: string[];
  };
  rating?: {
    min?: number;
    min_count?: number;
  };
  verification?: {
    is_verified?: boolean;
  };
}

export interface CreateARTRequest {
  name: string;
  avatar_id?: string;
  bio?: string;
  age?: number;
  gender?: ARTGender;
  education?: string;
  skills?: string[];
  job_types?: string[];
  work_arrangement?: WorkArrangement;
  work_experience?: string;
  domicile_city?: string;
  domicile_district?: string;
  salary_min?: number;
  salary_max?: number;
  salary_unit?: SalaryUnit;
  ektp_file_id?: string;
}

export interface UpdateARTRequest extends Partial<CreateARTRequest> {
  is_verified?: boolean;
  rating_average?: number;
  rating_count?: number;
}

export interface ARTSearchParams extends PaginationParams {
  q?: string; // Search query
  filters?: ARTSearchFilters;
  sort?: {
    field: 'name' | 'rating_average' | 'age' | 'salary_min' | '$createdAt' | '$updatedAt';
    direction: 'asc' | 'desc';
  };
}

export interface ARTListItem {
  $id: string;
  name: string;
  avatar_id?: string;
  bio?: string;
  age?: number;
  gender?: ARTGender;
  skills?: string[];
  job_types?: string[];
  work_arrangement?: WorkArrangement;
  domicile_city?: string;
  domicile_district?: string;
  salary_min?: number;
  salary_max?: number;
  salary_unit?: SalaryUnit;
  rating_average?: number;
  rating_count?: number;
  is_verified?: boolean;
  $createdAt: string;
  $updatedAt: string;
}

export interface ARTStatistics {
  total: number;
  verified: number;
  unverified: number;
  averageRating: number;
  topSkills: Array<{
    skill: string;
    count: number;
  }>;
  locationDistribution: Array<{
    city: string;
    count: number;
  }>;
  workArrangementDistribution: Array<{
    type: WorkArrangement;
    count: number;
  }>;
}