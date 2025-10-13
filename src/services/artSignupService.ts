import { ArtSignupSubmissionData, ArtSignupResult } from '../types/artSignup';

/**
 * ART Signup Service
 * Handles all ART-related signup operations
 */
class ArtSignupService {
  
  /**
   * Submit ART signup data to backend
   * @param data Complete ART signup form data
   * @returns Promise with submission result
   */
  async submitArtSignup(data: ArtSignupSubmissionData): Promise<ArtSignupResult> {
    try {
      // TODO: Implement actual Appwrite backend integration
      // This is a placeholder implementation
      
      console.log('ArtSignupService: Submitting data:', data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation
      if (!data.name || !data.email || !data.phone) {
        return {
          success: false,
          error: 'Missing required personal information'
        };
      }
      
      if (!data.services.length) {
        return {
          success: false,
          error: 'At least one service must be selected'
        };
      }
      
      if (!data.agreeToTerms) {
        return {
          success: false,
          error: 'Terms and conditions must be accepted'
        };
      }
      
      // Mock successful response
      const mockArtId = `art_${Date.now()}`;
      
      return {
        success: true,
        artId: mockArtId,
        message: 'ART profile created successfully. Verification will be completed within 24 hours.'
      };
      
    } catch (error) {
      console.error('ArtSignupService: Submission error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      };
    }
  }
  
  /**
   * Upload KTP photo to storage
   * @param file KTP photo file
   * @returns Promise with upload result
   */
  async uploadKtpPhoto(file: File): Promise<{ success: boolean; fileId?: string; error?: string }> {
    try {
      // TODO: Implement Appwrite storage upload
      console.log('ArtSignupService: Uploading KTP photo:', file.name);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock file validation
      if (!file.type.startsWith('image/')) {
        return {
          success: false,
          error: 'File must be an image'
        };
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        return {
          success: false,
          error: 'File size must be less than 5MB'
        };
      }
      
      // Mock successful upload
      const mockFileId = `file_${Date.now()}`;
      
      return {
        success: true,
        fileId: mockFileId
      };
      
    } catch (error) {
      console.error('ArtSignupService: Upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  }
  
  /**
   * Check if email is already registered
   * @param email Email to check
   * @returns Promise with availability status
   */
  async checkEmailAvailability(email: string): Promise<{ available: boolean; error?: string }> {
    try {
      // TODO: Implement actual email check with Appwrite
      console.log('ArtSignupService: Checking email availability:', email);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return {
          available: false,
          error: 'Invalid email format'
        };
      }
      
      // Mock check (simulate some emails as taken)
      const takenEmails = ['test@example.com', 'admin@asistenkita.com'];
      const available = !takenEmails.includes(email.toLowerCase());
      
      return {
        available,
        error: available ? undefined : 'Email is already registered'
      };
      
    } catch (error) {
      console.error('ArtSignupService: Email check error:', error);
      return {
        available: false,
        error: error instanceof Error ? error.message : 'Email check failed'
      };
    }
  }
}

// Export singleton instance
export const artSignupService = new ArtSignupService();