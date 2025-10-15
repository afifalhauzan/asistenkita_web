import { Phase1FormData } from './artSignup';
import type { 
  LowonganGender,
  LowonganJobType,
  LowonganSkill,
  LowonganWorkArrangement,
  CreateLowonganRequest
} from './lowongan';

// Majikan Signup related types (for creating Lowongan)
export interface MajikanPhase1FormData {
  name: string;
  email: string;
  phone: string;
  ktpPhoto?: FileList;
}

export interface MajikanPhase2FormData {
  // Core lowongan fields
  title: string; // Job title
  description: string; // Job description
  domicile_city: string; // Location
  education?: string; // Education requirement
  gender?: LowonganGender; // Gender preference
  job_types: LowonganJobType[]; // Required services
  skills?: LowonganSkill[]; // Preferred skills  
  work_arrangement: LowonganWorkArrangement[]; // Work arrangement
  salary_min?: number;
  salary_max?: number;
  
  // Additional context fields (not part of lowongan but helpful for form)
  familySize?: number;
  homeType?: string;
  urgency?: string;
  startDate?: string;
}

export interface MajikanPhase3FormData {
  agreeToTerms: boolean;
}

// Combined form data interface for the complete Majikan signup process
export interface MajikanSignupFormData extends MajikanPhase1FormData, MajikanPhase2FormData, MajikanPhase3FormData {}

// Edit mode states for Phase 3
export interface MajikanEditModeStates {
  personal: boolean;
  lowongan: boolean;
}

// Service method interfaces
export interface MajikanSignupSubmissionData {
  // Personal Information (for user creation)
  phase1: Phase1FormData;
  
  // Lowongan data (exact match with CreateLowonganRequest)
  lowongan: CreateLowonganRequest;
  
  // Agreement
  agreeToTerms: boolean;
}

export interface MajikanSignupResult {
  success: boolean;
  userId?: string;
  lowonganId?: string;
  error?: string;
  message?: string;
}