export { authService, AuthService } from './authService';
export { artService, ARTService } from './artService';

export type {
  ARTProfile,
  ARTListItem,
  ARTSearchParams,
  CreateARTProfileData,
  UpdateARTProfileData,
  ARTCardData,
} from '@/types/art';

export type {
  PaginatedResponse,
} from '@/types/api';

export type {
  User,
  AppwriteError,
} from '@/types/auth';