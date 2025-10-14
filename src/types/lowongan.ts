import type { 
  BaseEntity, 
  PaginationParams,
  SearchParams 
} from './services';

// Enums based on the UI requirements
export type LowonganGender = 'male' | 'female' | 'any';

export type LowonganJobType = 
  | 'asisten_rumah_tangga' 
  | 'baby_sitter' 
  | 'perawat_lansia' 
  | 'supir' 
  | 'tukang_kebun' 
  | 'office_boy_girl'
  | 'cleaning_service';

export type LowonganSkill = 
  | 'memasak' 
  | 'pertolongan_pertama' 
  | 'laundry' 
  | 'house_cleaning' 
  | 'mengemudi_mobil' 
  | 'mengemudi_motor' 
  | 'mengasuh_anak';

export type LowonganWorkArrangement = 
  | 'full_time' 
  | 'part_time' 
  | 'live_in' 
  | 'live_out' 
  | 'weekends_only' 
  | 'holidays_only';

export type LowonganAvailability = 
  | 'full_time' 
  | 'part_time' 
  | 'weekends' 
  | 'holidays';

// Main Lowongan interface
export interface Lowongan extends BaseEntity {
  // Required fields
  title: string; // size 100, required
  description: string; // size 1000, required
  domicile_city: string; // size 50, required
  
  // Optional fields with specific types
  education?: string; // size 200
  gender?: LowonganGender;
  job_types?: LowonganJobType[]; // array
  skills?: LowonganSkill[]; // array
  work_arrangement?: LowonganWorkArrangement[]; // enum array
  
  // Salary fields
  salary_min?: number; // int
  salary_max?: number; // int
  
  // Additional metadata (auto-generated)
  user_id?: string; // The user who posted the job
  is_active?: boolean;
  applications_count?: number;
  views_count?: number;
}

// Interface for creating a new lowongan
export interface CreateLowonganRequest {
  title: string; // max 100 chars, required
  description: string; // max 1000 chars, required
  domicile_city: string; // max 50 chars, required
  education?: string; // max 200 chars
  gender?: LowonganGender;
  job_types?: LowonganJobType[];
  skills?: LowonganSkill[];
  work_arrangement?: LowonganWorkArrangement[];
  salary_min?: number;
  salary_max?: number;
}

// Interface for updating a lowongan
export interface UpdateLowonganRequest extends Partial<CreateLowonganRequest> {
  status?: 'draft' | 'published' | 'closed' | 'expired';
  is_active?: boolean;
}

// Interface for lowongan search filters
export interface LowonganSearchFilters extends SearchParams {
  gender?: LowonganGender[];
  job_types?: LowonganJobType[];
  skills?: LowonganSkill[];
  work_arrangement?: LowonganWorkArrangement[];
  domicile_city?: string[];
  salary_min?: number;
  salary_max?: number;
  education?: string[];
  status?: ('draft' | 'published' | 'closed' | 'expired')[];
  is_active?: boolean;
  user_id?: string; // For filtering by poster
}

// Interface for lowongan search parameters
export interface LowonganSearchParams extends PaginationParams {
  q?: string; // Search query for title/description
  filters?: LowonganSearchFilters;
  sort?: {
    field: 'title' | 'salary_min' | 'salary_max' | 'views_count' | 'applications_count' | '$createdAt' | '$updatedAt';
    direction: 'asc' | 'desc';
  };
}

// Interface for lowongan list item (summary view)
export interface LowonganListItem {
  $id: string;
  title: string;
  description: string;
  domicile_city: string;
  education?: string;
  gender?: LowonganGender;
  job_types?: LowonganJobType[];
  skills?: LowonganSkill[];
  work_arrangement?: LowonganWorkArrangement[];
  salary_min?: number;
  salary_max?: number;
  user_id?: string;
  status?: 'draft' | 'published' | 'closed' | 'expired';
  is_active?: boolean;
  applications_count?: number;
  views_count?: number;
  $createdAt: string;
  $updatedAt: string;
}

// Interface for lowongan statistics
export interface LowonganStatistics {
  total: number;
  published: number;
  draft: number;
  closed: number;
  expired: number;
  active: number;
  totalApplications: number;
  averageSalary: {
    min: number;
    max: number;
  };
  topJobTypes: Array<{
    type: LowonganJobType;
    count: number;
  }>;
  topSkills: Array<{
    skill: LowonganSkill;
    count: number;
  }>;
  cityDistribution: Array<{
    city: string;
    count: number;
  }>;
  workArrangementDistribution: Array<{
    type: LowonganWorkArrangement;
    count: number;
  }>;
}

// Constants for UI labels
export const LOWONGAN_GENDER_LABELS: Record<LowonganGender, string> = {
  male: 'Laki-laki',
  female: 'Perempuan',
  any: 'Tidak ada preferensi'
};

export const LOWONGAN_JOB_TYPE_LABELS: Record<LowonganJobType, string> = {
  asisten_rumah_tangga: 'Asisten Rumah Tangga',
  baby_sitter: 'Baby Sitter',
  perawat_lansia: 'Perawat Lansia',
  supir: 'Supir',
  tukang_kebun: 'Tukang Kebun',
  office_boy_girl: 'Office Boy/Girl',
  cleaning_service: 'Cleaning Service'
};

export const LOWONGAN_SKILL_LABELS: Record<LowonganSkill, string> = {
  memasak: 'Memasak',
  pertolongan_pertama: 'Pertolongan Pertama (P3K)',
  laundry: 'Laundry',
  house_cleaning: 'House Cleaning',
  mengemudi_mobil: 'Mengemudi Mobil (SIM A)',
  mengemudi_motor: 'Mengemudi Motor (SIM B)',
  mengasuh_anak: 'Mengasuh Anak'
};

export const LOWONGAN_WORK_ARRANGEMENT_LABELS: Record<LowonganWorkArrangement, string> = {
  full_time: 'Full Time',
  part_time: 'Part Time',
  live_in: 'Tinggal di Rumah Majikan',
  live_out: 'Pulang Pergi',
  weekends_only: 'Weekend Saja',
  holidays_only: 'Hari Libur Saja'
};

export const LOWONGAN_AVAILABILITY_LABELS: Record<LowonganAvailability, string> = {
  full_time: 'Penuh Waktu',
  part_time: 'Paruh Waktu', 
  weekends: 'Menginap',
  holidays: 'Harian/Lepas'
};