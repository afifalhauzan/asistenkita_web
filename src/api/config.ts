export const APPWRITE_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
  apiKey: process.env.NEXT_PUBLIC_APPWRITE_API_KEY as string,
} as const;

export const DATABASE_CONFIG = {
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
  collections: {
    arts: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ARTS as string,
    users: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USERS as string,
    reviews: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_REVIEWS as string,
    skills: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SKILLS as string,
    bookings: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS as string,
  },
} as const;

export const API_ENDPOINTS = {
  arts: {
    list: '/arts',
    create: '/arts',
    update: (id: string) => `/arts/${id}`,
    delete: (id: string) => `/arts/${id}`,
    get: (id: string) => `/arts/${id}`,
    search: '/arts/search',
    filter: '/arts/filter',
  },

  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    profile: '/auth/profile',
    refresh: '/auth/refresh',
  },

  users: {
    profile: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    preferences: (id: string) => `/users/${id}/preferences`,
  },
 
  reviews: {
    list: (artId: string) => `/arts/${artId}/reviews`,
    create: (artId: string) => `/arts/${artId}/reviews`,
    update: (artId: string, reviewId: string) => `/arts/${artId}/reviews/${reviewId}`,
    delete: (artId: string, reviewId: string) => `/arts/${artId}/reviews/${reviewId}`,
  },
} as const;

export const REQUEST_CONFIG = {
  timeout: 30000,
  retries: 3,
  retryDelay: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
} as const;

export const PAGINATION_CONFIG = {
  defaultLimit: 12,
  maxLimit: 100,
  defaultOffset: 0,
} as const;

export const ERROR_MESSAGES = {
  network: 'Koneksi jaringan bermasalah. Silakan coba lagi.',
  timeout: 'Permintaan timeout. Silakan coba lagi.',
  unauthorized: 'Anda tidak memiliki akses. Silakan login kembali.',
  forbidden: 'Akses ditolak. Anda tidak memiliki izin.',
  notFound: 'Data tidak ditemukan.',
  serverError: 'Terjadi kesalahan server. Silakan coba lagi.',
  validation: 'Data yang dimasukkan tidak valid.',
  unknown: 'Terjadi kesalahan yang tidak diketahui.',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;