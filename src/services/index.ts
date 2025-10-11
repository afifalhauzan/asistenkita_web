export { authService, AuthService } from './authService';
export { artService, ARTService } from './artService';

export type {
  ARTProfile,
  ARTListItem,
  ARTSearchParams,
  CreateARTRequest,
  UpdateARTRequest,
  ARTStatistics,
} from '@/types/art';

export type {
  PaginatedResponse,
} from '@/types/services';

export type {
  User,
  AppwriteError,
} from '@/types/auth';