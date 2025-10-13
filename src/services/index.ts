export { authService, AuthService } from './authService';
export { artService, ARTService } from './artService';
export { artSignupService } from './artSignupService';

export type {
  ARTProfile,
  ARTListItem,
  ARTSearchParams,
  CreateARTRequest,
  UpdateARTRequest,
  ARTStatistics,
} from '@/types/art';

export type {
  ArtSignupFormData,
  ArtSignupSubmissionData,
  ArtSignupResult,
  Phase1FormData,
  Phase2FormData,
  Phase3FormData,
} from '@/types/artSignup';

export type {
  PaginatedResponse,
} from '@/types/services';

export type {
  User,
  AppwriteError,
} from '@/types/auth';