import { MajikanSignupSubmissionData, MajikanSignupResult } from '@/types/majikanSignup';
import { lowonganService } from './lowonganService';
import { authService } from './authService';

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
      console.log('MajikanSignupService: Submitting data:', data);


            // Validate personal information
      if ( !data.phase1.email) {
        return {
          success: false,
          error: 'Missing required email personal information'
        };
      }

            // Validate personal information
      if (!data.phase1.name) {
        return {
          success: false,
          error: 'Missing required name personal information'
        };
      }

      // Validate lowongan data
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

      // Step 1: Get current authenticated user (account already created before onboarding)
      console.log('MajikanSignupService: Getting current user...');
      const user = await authService.getCurrentUser();
      
      if (!user) {
        return {
          success: false,
          error: 'User not authenticated. Please login first.'
        };
      }
      
      console.log('MajikanSignupService: Current user:', user.$id);

      // // Step 2: Update user labels to 'majikan'
      // console.log('MajikanSignupService: Updating user labels to majikan...');
      // await authService.updateLabels(['majikan']);
      
      // Step 3: Create lowongan using lowonganService
      console.log('MajikanSignupService: Creating lowongan...');
      const lowongan = await lowonganService.createLowongan(data.lowongan, user.$id);
      
      console.log('MajikanSignupService: Lowongan created:', lowongan.$id);

      // Step 4: Publish the lowongan immediately
      console.log('MajikanSignupService: Publishing lowongan...');
      await lowonganService.publishLowongan(lowongan.$id);
      
      console.log('MajikanSignupService: Submission successful');
      
      return {
        success: true,
        userId: user.$id,
        lowonganId: lowongan.$id,
        message: 'Pendaftaran berhasil! Lowongan Anda telah dipublikasikan dan dapat dilihat oleh ART di platform kami.'
      };

    } catch (error: any) {
      console.error('MajikanSignupService: Submission failed:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Terjadi kesalahan tak terduga. Silakan coba lagi.';
      
      if (error.message) {
        errorMessage = error.message;
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}

// Export as singleton instance
export const majikanSignupService = new MajikanSignupService();