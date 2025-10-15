import { MajikanSignupSubmissionData, MajikanSignupResult } from '@/types/majikanSignup';
import { lowonganService } from './lowonganService';

/**
 * Majikan Signup Service
 * Handles Majikan signup which creates a user account and posts a lowongan
 */
class MajikanSignupService {
  
  /**
   * Submit Majikan signup data (creates user + lowongan)
   * @param data Complete Majikan signup form data
   * @returns Promise with submission result
   */
  async submitMajikanSignup(data: MajikanSignupSubmissionData): Promise<MajikanSignupResult> {
    try {
      // TODO: Implement actual user creation + lowongan posting
      // This is a placeholder implementation
      
      console.log('MajikanSignupService: Submitting data:', data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock validation for personal information
      if (!data.phase1.name || !data.phase1.email || !data.phase1.phone) {
        return {
          success: false,
          error: 'Missing required personal information'
        };
      }

      // Mock validation for lowongan data
      if (!data.lowongan.title || !data.lowongan.description || !data.lowongan.domicile_city) {
        return {
          success: false,
          error: 'Missing required lowongan information'
        };
      }

      if (!data.lowongan.job_types || data.lowongan.job_types.length === 0) {
        return {
          success: false,
          error: 'At least one job type must be selected'
        };
      }

      if (!data.agreeToTerms) {
        return {
          success: false,
          error: 'Terms and conditions must be accepted'
        };
      }

      // TODO: In real implementation:
      // 1. Create user account (if not exists)
      // 2. Upload KTP photo to storage (if provided)
      // 3. Create lowongan using lowonganService.createLowongan(data.lowongan)
      // 4. Link user to lowongan
      
      // Simulate successful submission
      const mockUserId = `user_${Date.now()}`;
      const mockLowonganId = `lowongan_${Date.now()}`;
      
      console.log('MajikanSignupService: Mock submission successful');
      console.log('MajikanSignupService: Generated User ID:', mockUserId);
      console.log('MajikanSignupService: Generated Lowongan ID:', mockLowonganId);
      
      return {
        success: true,
        userId: mockUserId,
        lowonganId: mockLowonganId,
        message: 'Pendaftaran berhasil! Lowongan Anda telah dipublikasikan dan dapat dilihat oleh ART di platform kami.'
      };

    } catch (error: any) {
      console.error('MajikanSignupService: Submission failed:', error);
      
      return {
        success: false,
        error: 'Terjadi kesalahan tak terduga. Silakan coba lagi.'
      };
    }
  }
}

// Export as singleton instance
export const majikanSignupService = new MajikanSignupService();