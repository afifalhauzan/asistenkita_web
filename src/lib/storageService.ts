import { storage, DATABASE_CONFIG } from './appwrite';

export class StorageService {
  private readonly bucketId = DATABASE_CONFIG.buckets.artphoto;

  /**
   * Check if storage bucket is properly configured
   * @returns boolean indicating if bucket is accessible
   */
  async isStorageConfigured(): Promise<boolean> {
    try {
      if (!this.bucketId) {
        console.warn('Storage bucket ID not configured');
        return false;
      }
      // Try to list files to test connectivity
      await storage.listFiles(this.bucketId);
      return true;
    } catch (error) {
      console.warn('Storage bucket not accessible:', error);
      return false;
    }
  }

  /**
   * Get direct file URL from Appwrite storage
   * @param fileId - The file ID in Appwrite storage
   * @returns URL string for the file
   */
  getFileUrl(fileId: string): string {
    try {
      return storage.getFileView(this.bucketId, fileId).toString();
    } catch (error) {
      console.error('Error getting file URL:', error);
      return '/api/placeholder/60/60'; // Fallback to placeholder
    }
  }

  /**
   * Get avatar URL with specific size for profile pictures
   * @param avatarId - The avatar file ID
   * @param size - Size of the avatar (width and height will be the same)
   * @returns URL string for the avatar
   */
  getAvatarUrl(avatarId: string | null | undefined): string {
    if (!avatarId) {
      return `/api/placeholder/`;
    }

    return this.getFileUrl(avatarId);
  }

  /**
   * Get multiple avatar URLs for different sizes
   * @param avatarId - The avatar file ID
   * @returns Object with different sized URLs
   */
  getAvatarUrls(avatarId: string | null | undefined) {
    return {
        getAvatarUrl: () => this.getAvatarUrl(avatarId || undefined)
    };
  }
}

export const storageService = new StorageService();