import { account } from '@/lib/appwrite';
import { ID } from 'appwrite';

class AuthService {
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      return null;
    }
  }

  async login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password);
      return await this.getCurrentUser();
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  async signup(email, password, name) {
    try {
      await account.create(ID.unique(), email, password, name);
      // Automatically log in after signup
      return await this.login(email, password);
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  async logoutAll() {
    try {
      await account.deleteSessions();
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  async sendPasswordResetEmail(email) {
    try {
      await account.createRecovery(
        email,
        `${window.location.origin}/reset-password`
      );
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  async updatePassword(password, oldPassword) {
    try {
      await account.updatePassword(password, oldPassword);
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  async updateProfile(name, email) {
    try {
      await account.updateName(name);
      if (email) {
        await account.updateEmail(email, password);
      }
      return await this.getCurrentUser();
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  getErrorMessage(error) {
    if (error?.message) {
      return error.message;
    }
    
    switch (error?.type) {
      case 'user_invalid_credentials':
        return 'Invalid email or password';
      case 'user_already_exists':
        return 'User with this email already exists';
      case 'user_not_found':
        return 'User not found';
      case 'user_session_not_found':
        return 'No active session found';
      case 'user_password_mismatch':
        return 'Current password is incorrect';
      default:
        return error?.message || 'An unexpected error occurred';
    }
  }
}

export const authService = new AuthService();