export interface User {
  $id: string;
  email: string;
  name: string;
  phone?: string;
  emailVerification?: boolean;
  phoneVerification?: boolean;
  prefs?: Record<string, any>;
  registration?: string;
  status?: boolean;
  labels?: string[];
  passwordUpdate?: string;
  accessedAt?: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  agreeToTerms: boolean;
}

export interface SignupFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (email: string, password: string, name: string, phone: string) => Promise<AuthResult>;
  logout: () => Promise<AuthResult>;
  logoutAll: () => Promise<AuthResult>;
  sendPasswordResetEmail: (email: string) => Promise<AuthResult>;
  updatePassword: (password: string, oldPassword: string) => Promise<AuthResult>;
  updateProfile: (name: string, email?: string) => Promise<AuthResult>;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (email: string, password: string, name: string, phone: string) => Promise<AuthResult>;
  logout: () => Promise<AuthResult>;
  logoutAll: () => Promise<AuthResult>;
  sendPasswordResetEmail: (email: string) => Promise<AuthResult>;
  updatePassword: (password: string, oldPassword: string) => Promise<AuthResult>;
  updateProfile: (name: string, email?: string) => Promise<AuthResult>;
}

export interface FormComponentProps {
  onSuccess?: (user: User) => void;
  redirectTo?: string;
}

// Appwrite error types
export interface AppwriteError {
  message: string;
  code?: number;
  type?: string;
  response?: {
    message?: string;
    code?: number;
    type?: string;
  };
}