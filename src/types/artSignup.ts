// ART Signup related types
export interface Phase1FormData {
  name: string;
  email: string;
  phone: string;
  ktpPhoto?: FileList;
}

export interface Phase2FormData {
  services: string[];
  specialSkills: string[];
  salaryMin: number;
  salaryMax: number;
  salaryUnit: string;
  availability: string[];
  profileTitle: string;
  bio: string;
  education: string;
  university: string;
  graduationYear: string;
}

export interface Phase3FormData {
  agreeToTerms: boolean;
}

// Combined form data interface for the complete ART signup process
export interface ArtSignupFormData extends Phase1FormData, Phase2FormData, Phase3FormData {}

// Preview section types
export interface PreviewSectionProps {
  title: string;
  isEditing: boolean;
  onEditToggle: () => void;
  children: React.ReactNode;
}

// Edit mode states
export interface EditModeStates {
  personal: boolean;
  professional: boolean;
}

// Service method interfaces
export interface ArtSignupSubmissionData {
  // Personal Information
  name: string;
  email: string;
  phone: string;
  ktpPhoto?: File;
  
  // Professional Details
  services: string[];
  specialSkills: string[];
  salaryRange: {
    min: number;
    max: number;
    unit: string;
  };
  availability: string[];
  
  // Profile Information
  profileTitle: string;
  bio: string;
  education: string;
  university: string;
  graduationYear: string;
  
  // Agreement
  agreeToTerms: boolean;
}

export interface ArtSignupResult {
  success: boolean;
  artId?: string;
  error?: string;
  message?: string;
}