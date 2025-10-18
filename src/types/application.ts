// Application Types for AsistenKita Job Application System

import type { ARTProfile } from './art';
import type { Lowongan } from './lowongan';

export interface Application {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  lowongan_id: string;
  art_user_id: string;
  status: ApplicationStatus;
  applied_at: string;
  message?: string;
}

export interface ApplicationListItem {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  lowongan_id: string;
  art_user_id: string;
  status: ApplicationStatus;
  applied_at: string;
  message?: string;
  // Optional populated fields
  lowongan?: {
    title: string;
    description: string;
    domicile_city: string;
    salary_min?: number;
    salary_max?: number;
  };
}

// New type for applications with populated ART profile data
export interface ApplicationWithARTProfile extends ApplicationListItem {
  art_profile?: ARTProfile;
}

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn';

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  pending: 'Menunggu',
  accepted: 'Diterima',
  rejected: 'Ditolak',
  withdrawn: 'Dibatalkan',
};

export const APPLICATION_STATUS_COLORS: Record<ApplicationStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  withdrawn: 'bg-gray-100 text-gray-800',
};

export interface CreateApplicationRequest {
  lowongan_id: string;
  art_user_id: string;
  message?: string;
}

export interface UpdateApplicationRequest {
  status?: ApplicationStatus;
  message?: string;
}

export interface ApplicationSearchParams {
  limit?: number;
  offset?: number;
  filters?: {
    art_user_id?: string;
    lowongan_id?: string;
    status?: ApplicationStatus[];
  };
  sort?: {
    field: 'applied_at' | '$createdAt' | '$updatedAt';
    direction: 'asc' | 'desc';
  };
}

export interface ApplicationStatistics {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  withdrawn: number;
}

// Component Props Types
export interface ApplicationCardProps {
  application: ApplicationListItem;
  onWithdraw?: (id: string) => void;
  isLoading?: boolean;
}

export interface ApplicantCardProps {
  application: ApplicationWithARTProfile;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  isLoading?: boolean;
}

export interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}