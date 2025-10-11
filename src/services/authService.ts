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
      // Input validation
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

      // Create session using Appwrite
      await account.createEmailPasswordSession(email.trim(), password);
      
      // Get user data
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


  async signup(email: string, password: string, name: string, phone: string): Promise<User> {
    try {
      // Input validation
      if (!name || !name.trim()) {
        throw new Error('Nama harus diisi.');
      }
      
      if (!email || !email.trim()) {
        throw new Error('Email harus diisi.');
      }
      
      if (!password || !password.trim()) {
        throw new Error('Password harus diisi.');
      }

      if (password.length < 8) {
        throw new Error('Password minimal 8 karakter.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        throw new Error('Format email tidak valid.');
      }

      console.log('Signup: Creating account for:', email);
      // Create account using Appwrite
      await account.create(ID.unique(), email.trim(), password, name.trim());
      
      await account.updatePhone(phone.trim(), password);
      // Automatically log in after signup
      return await this.login(email, password);


    } catch (error) {
      console.error('Signup error:', error);
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }


  async logout(): Promise<void> {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }

  /**
   * Logout all sessions
   */
  async logoutAll(): Promise<void> {
    try {
      await account.deleteSessions();
    } catch (error) {
      console.error('Logout all error:', error);
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }


  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      if (!email || !email.trim()) {
        throw new Error('Email harus diisi.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        throw new Error('Format email tidak valid.');
      }

      await account.createRecovery(
        email.trim(),
        `${window.location.origin}/reset-password`
      );
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }


  async updatePassword(newPassword: string, oldPassword: string): Promise<void> {
    try {
      if (!newPassword || !newPassword.trim()) {
        throw new Error('Password baru harus diisi.');
      }
      
      if (!oldPassword || !oldPassword.trim()) {
        throw new Error('Password lama harus diisi.');
      }

      if (newPassword.length < 8) {
        throw new Error('Password baru minimal 8 karakter.');
      }

      await account.updatePassword(newPassword, oldPassword);
    } catch (error) {
      console.error('Update password error:', error);
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }


  async updateProfile(name: string, email?: string): Promise<User> {
    try {
      if (!name || !name.trim()) {
        throw new Error('Nama harus diisi.');
      }

      // Update name
      await account.updateName(name.trim());
      
      // Update email if provided
      if (email && email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
          throw new Error('Format email tidak valid.');
        }
        
        await account.updateEmail(email.trim(), '');
      }
      
      // Get updated user data
      const user = await this.getCurrentUser();
      if (!user) {
        throw new Error('Gagal mendapatkan data user setelah update profil.');
      }
      
      return user;
    } catch (error) {
      console.error('Update profile error:', error);
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }


  async verifyEmail(userId: string, secret: string): Promise<void> {
    try {
      await account.updateVerification(userId, secret);
    } catch (error) {
      console.error('Email verification error:', error);
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }


  async sendEmailVerification(): Promise<void> {
    try {
      await account.createVerification(`${window.location.origin}/verify-email`);
    } catch (error) {
      console.error('Send email verification error:', error);
      throw new Error(this.getErrorMessage(error as AppwriteError));
    }
  }


  async isAuthenticated(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return !!user;
    } catch (error) {
      return false;
    }
  }

  async getSession(): Promise<any> {
    try {
      return await account.getSession('current');
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  }

  /**
   * Handle Appwrite errors and convert to user-friendly messages
   */
  private getErrorMessage(error: AppwriteError): string {
    // Handle network errors
    if (!navigator.onLine) {
      return 'Tidak ada koneksi internet. Periksa koneksi Anda dan coba lagi.';
    }

    // Handle Appwrite specific errors by code
    if (error?.code) {
      switch (error.code) {
        case 400:
          return 'Data yang dikirim tidak valid. Periksa kembali input Anda.';
        case 401:
          return 'Email atau password salah. Silakan periksa kembali.';
        case 409:
          return 'Email sudah terdaftar. Gunakan email lain atau login.';
        case 429:
          return 'Terlalu banyak percobaan. Tunggu beberapa menit dan coba lagi.';
        case 500:
          return 'Server sedang bermasalah. Coba lagi dalam beberapa saat.';
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
        case 'user_invalid_token':
          return 'Token tidak valid atau sudah kedaluwarsa.';
        case 'rate_limit_exceeded':
          return 'Terlalu banyak percobaan. Tunggu sebentar dan coba lagi.';
        case 'password_recently_used':
          return 'Password baru tidak boleh sama dengan password sebelumnya.';
        default:
          break;
      }
    }

    // Handle generic error messages
    if (error?.message) {
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

// Export singleton instance
export const authService = new AuthService();

// Export the class for testing
export { AuthService };