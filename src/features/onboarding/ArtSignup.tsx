"use client";

import { useForm } from 'react-hook-form';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoFull } from '../../components/LogoFull';
import { Phase1 } from './components/Phase1';
import { ArtSignupPhase2 } from './components/art/ArtSignupPhase2';
import { ArtSignupPhase3 } from './components/art/ArtSignupPhase3';
import { artSignupService } from '../../services/artSignupService';

// Combined form data interface
interface ArtSignupFormData {
  // Phase 1 data - General User Data (reusable for any role)
  name: string;
  email: string;
  phone: string;
  ktpPhoto?: FileList;
  // Phase 2 data - Professional Details (ART specific)
  services: string[];
  specialSkills: string[];
  salaryMin: number;
  salaryMax: number;
  salaryUnit: string;
  availability: string[];
  // Phase 3 data - Profile Completion (ART specific)
  profileTitle: string;
  bio: string;
  education: string;
  university: string;
  graduationYear: string;
  agreeToTerms: boolean;
}

interface ArtSignupProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export const ArtSignup: React.FC<ArtSignupProps> = ({ 
  onSuccess, 
  redirectTo = '/pekerjaan' 
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ArtSignupFormData>({
    // Phase 1 defaults - General User Data
    name: '',
    email: '',
    phone: '',
    // Phase 2 defaults - Professional Details
    services: [],
    specialSkills: [],
    salaryMin: 0,
    salaryMax: 0,
    salaryUnit: '/Bulan',
    availability: [],
    // Phase 3 defaults - Profile Completion
    profileTitle: '',
    bio: '',
    education: '',
    university: '',
    graduationYear: '',
    agreeToTerms: false
  });

  const router = useRouter();

  // Phase navigation handlers
  const handlePhase1Next = (data: { 
    name: string; 
    email: string; 
    phone: string; 
    ktpPhoto?: FileList; 
  }) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handlePhase2Next = (data: { 
    services: string[]; 
    specialSkills: string[]; 
    salaryMin: number; 
    salaryMax: number; 
    salaryUnit: string; 
    availability: string[];
    profileTitle: string;
    bio: string;
    education: string;
    university: string;
    graduationYear: string;
  }) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handlePhase3Submit = async (data: { 
    agreeToTerms: boolean; 
  }) => {
    setIsLoading(true);
    
    try {
      const finalData = { ...formData, ...data };
      console.log('ArtSignup: Final submission data:', finalData);
      
      // Prepare data for submission
      const submissionData = {
        // Personal Information
        name: finalData.name,
        email: finalData.email,
        phone: finalData.phone,
        ktpPhoto: finalData.ktpPhoto?.[0], // Get first file from FileList
        
        // Professional Details
        services: finalData.services,
        specialSkills: finalData.specialSkills,
        salaryRange: {
          min: finalData.salaryMin,
          max: finalData.salaryMax,
          unit: finalData.salaryUnit,
        },
        availability: finalData.availability,
        
        // Profile Information
        profileTitle: finalData.profileTitle,
        bio: finalData.bio,
        education: finalData.education,
        university: finalData.university,
        graduationYear: finalData.graduationYear,
        
        // Agreement
        agreeToTerms: finalData.agreeToTerms,
      };
      
      // Submit to backend using the service
      const result = await artSignupService.submitArtSignup(submissionData);
      
      if (result.success) {
        console.log('ArtSignup: Success!', result);
        
        if (onSuccess) {
          onSuccess();
        } else {
          router.push(redirectTo);
        }
      } else {
        console.error('ArtSignup: Submission failed:', result.error);
        // TODO: Show error message to user
        alert(`Pendaftaran gagal: ${result.error}`);
      }
    } catch (err) {
      console.error('ArtSignup: Submission error:', err);
      // TODO: Show error message to user
      alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Phase titles
  const getPhaseTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Data Diri';
      case 2:
        return 'Detail Profesional';
      case 3:
        return 'Cek Ulang & Aktifkan Profil Anda';
      default:
        return 'Pendaftaran ART';
    }
  };

  const getPhaseSubtitle = () => {
    switch (currentStep) {
      case 1:
        return 'Tenang, data Anda aman. Informasi ini hanya kami gunakan untuk memvalidasi identitas Anda dan tidak akan dibagikan ke siapapun.';
      case 2:
        return 'Anggap bagian ini sebagai \'etalase\' diri Anda. Semakin lengkap, semakin besar peluang Anda untuk direkrut!';
      case 3:
        return 'Pastikan semuanya sempurna. Profil ini akan tayang dan bisa dilihat oleh ribuan keluarga yang mencari asisten hebat seperti Anda!';
      default:
        return 'Proses pendaftaran AsistenKita';
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute -bottom-30 -left-40 w-96 h-96 rounded-full bg-blue-500/30 blur-[120px]"></div>
        <div className="absolute top-0 -right-40 w-96 h-96 rounded-full bg-blue-500/30 blur-[120px]"></div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
          <div className="mb-8 flex items-center justify-center">
            <LogoFull />
          </div>

          {/* Form Container */}
          <div className={`w-full bg-white rounded-2xl shadow-lg p-8 ${currentStep === 3 ? 'max-w-4xl' : 'max-w-md'}`}>
            {/* Step Indicator */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <div className={`w-8 h-0.5 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <div className={`w-8 h-0.5 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{getPhaseTitle()}</h1>
              <p className="text-gray-600 text-sm">{getPhaseSubtitle()}</p>
            </div>

            {currentStep === 1 && (
              <Phase1
                initialData={{
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  ktpPhoto: formData.ktpPhoto,
                }}
                onNext={handlePhase1Next}
                isLoading={isLoading}
              />
            )}

            {currentStep === 2 && (
              <ArtSignupPhase2
                initialData={{
                  services: formData.services,
                  specialSkills: formData.specialSkills,
                  salaryMin: formData.salaryMin,
                  salaryMax: formData.salaryMax,
                  salaryUnit: formData.salaryUnit,
                  availability: formData.availability,
                  profileTitle: formData.profileTitle,
                  bio: formData.bio,
                  education: formData.education,
                  university: formData.university,
                  graduationYear: formData.graduationYear
                }}
                onNext={handlePhase2Next}
                onBack={handleBack}
                isLoading={isLoading}
              />
            )}

            {currentStep === 3 && (
              <ArtSignupPhase3
                allFormData={formData}
                onSubmit={handlePhase3Submit}
                onUpdateData={(updatedData) => setFormData(prev => ({ ...prev, ...updatedData }))}
                onBack={handleBack}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
        