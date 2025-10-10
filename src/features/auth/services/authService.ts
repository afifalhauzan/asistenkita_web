import { account } from '@/lib/appwrite';
import { ID } from 'appwrite';
import type { User, AppwriteError } from '@/types/auth';

class AuthService {
  async getCurrentUser(): Promise<User | null> {
    try {
      return await account.get() as User;
    } catch (error) {
      return null;
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      if (!email || !email.trim()) {
        throw new Error('Email harus diisi.');
      }
      
      if (!password || !password.trim()) {
        throw new Error('Password harus diisi.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        throw new Error('Format email tidak valid.');
      }

      await account.createEmailPasswordSession(email.trim(), password);
      const user = await this.getCurrentUser();
      if (!user) {
        throw new Error('Gagal mendapatkan data user setelah login.');
      }
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }

  async signup(email: string, password: string, name: string): Promise<User> {
    try {
      await account.create(ID.unique(), email, password, name);
      // Automatically log in after signup
      return await this.login(email, password);
    } catch (error) {
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }

  async logout(): Promise<void> {
    try {
      await account.deleteSession('current');
    } catch (error) {
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }

  async logoutAll(): Promise<void> {
    try {
      await account.deleteSessions();
    } catch (error) {
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
    } catch (error) {
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }

  async updatePassword(password: string, oldPassword: string): Promise<void> {
    try {
      await account.updatePassword(password, oldPassword);
    } catch (error) {
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }

  async updateProfile(name: string, email?: string): Promise<User> {
    try {
      await account.updateName(name);
      if (email) {
        await account.updateEmail(email, ''); // Note: Appwrite might require password for email update
      }
      const user = await this.getCurrentUser();
      if (!user) {
        throw new Error('Gagal mendapatkan data user setelah update profil.');
      }
      return user;
    } catch (error) {
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }

  private getErrorMessage(error: AppwriteError): string {
    // Handle network errors
    if (!navigator.onLine) {
      return 'Tidak ada koneksi internet. Periksa koneksi Anda dan coba lagi.';
    }

    // Handle Appwrite specific errors
    if (error?.code) {
      switch (error.code) {
        case 401:
          return 'Email atau password salah. Silakan periksa kembali.';
        case 429:
          return 'Terlalu banyak percobaan login. Tunggu beberapa menit dan coba lagi.';
        case 500:
          return 'Server sedang bermasalah. Coba lagi dalam beberapa saat.';
        case 503:
          return 'Layanan sedang tidak tersedia. Coba lagi nanti.';
        default:
          break;
      }
    }

    // Handle Appwrite error types
    if (error?.type) {
      switch (error.type) {
        case 'user_invalid_credentials':
          return 'Email atau password yang Anda masukkan salah.';
        case 'user_already_exists':
          return 'Pengguna dengan email ini sudah terdaftar.';
        case 'user_not_found':
          return 'Pengguna tidak ditemukan.';
        case 'user_session_not_found':
          return 'Sesi tidak ditemukan. Silakan login kembali.';
        case 'user_password_mismatch':
          return 'Password saat ini salah.';
        case 'user_email_not_whitelisted':
          return 'Email ini tidak diizinkan untuk mendaftar.';
        case 'user_invalid_token':
          return 'Token tidak valid atau sudah kedaluwarsa.';
        case 'user_blocked':
          return 'Akun Anda telah diblokir. Hubungi admin.';
        case 'rate_limit_exceeded':
          return 'Terlalu banyak percobaan. Tunggu sebentar dan coba lagi.';
        default:
          break;
      }
    }

    // Handle generic error messages
    if (error?.message) {
      // Convert common English error messages to Indonesian
      const message = error.message.toLowerCase();
      
      if (message.includes('invalid credentials') || 
          message.includes('invalid email or password') ||
          message.includes('wrong email or password')) {
        return 'Email atau password yang Anda masukkan salah.';
      }
      
      if (message.includes('network') || message.includes('fetch')) {
        return 'Masalah koneksi jaringan. Periksa internet Anda.';
      }
      
      if (message.includes('timeout')) {
        return 'Koneksi timeout. Coba lagi dalam beberapa saat.';
      }
      
      if (message.includes('already exists')) {
        return 'Email sudah terdaftar. Gunakan email lain atau login.';
      }
      
      // Return original message if no translation available
      return error.message;
    }
    
    // Default fallback message
    return 'Terjadi kesalahan yang tidak terduga. Silakan coba lagi.';
  }
}

export const authService = new AuthService();