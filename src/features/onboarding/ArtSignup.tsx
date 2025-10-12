"use client";

import { useForm } from 'react-hook-form';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoFull } from '../../components/LogoFull';
import { ArtSignupPhase1 } from './components/ArtSignupPhase1';
import { ArtSignupPhase2 } from './components/ArtSignupPhase2';
import { ArtSignupPhase3 } from './components/ArtSignupPhase3';

// Combined form data interface
interface ArtSignupFormData {
  // Phase 1 data
  name: string;
  email: string;
  phone: string;
  // Phase 2 data
  experience: string;
  skills: string[];
  availability: string;
  location: string;
  // Phase 3 data
  password: string;
  confirmPassword: string;
  profilePhoto?: FileList;
  bio: string;
  agreeToTerms: boolean;
}

interface ArtSignupProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export const ArtSignup: React.FC<ArtSignupProps> = ({ 
  onSuccess, 
  redirectTo = '/dashboard' 
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ArtSignupFormData>({
    // Phase 1 defaults
    name: '',
    email: '',
    phone: '',
    // Phase 2 defaults
    experience: '',
    skills: [],
    availability: '',
    location: '',
    // Phase 3 defaults
    password: '',
    confirmPassword: '',
    bio: '',
    agreeToTerms: false
  });

  const router = useRouter();

  // Phase navigation handlers
  const handlePhase1Next = (data: { name: string; email: string; phone: string }) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handlePhase2Next = (data: { experience: string; skills: string[]; availability: string; location: string }) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handlePhase3Submit = async (data: { password: string; confirmPassword: string; profilePhoto?: FileList; bio: string; agreeToTerms: boolean }) => {
    setIsLoading(true);
    
    try {
      const finalData = { ...formData, ...data };
      console.log('ArtSignup: Final submission data:', finalData);
      
      // TODO: Implement actual ART signup API call here
      // For now, just simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push(redirectTo);
      }
    } catch (err) {
      console.error('ArtSignup: Submission error:', err);
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
        return 'Keahlian & Pengalaman';
      case 3:
        return 'Akun & Profil';
      default:
        return 'Pendaftaran ART';
    }
  };

  const getPhaseSubtitle = () => {
    switch (currentStep) {
      case 1:
        return 'Harap isi formulir ini dengan benar';
      case 2:
        return 'Ceritakan keahlian dan pengalaman Anda';
      case 3:
        return 'Lengkapi akun dan profil Anda';
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
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
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
              <ArtSignupPhase1
                initialData={{
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone
                }}
                onNext={handlePhase1Next}
                isLoading={isLoading}
              />
            )}

            {currentStep === 2 && (
              <ArtSignupPhase2
                initialData={{
                  experience: formData.experience,
                  skills: formData.skills,
                  availability: formData.availability,
                  location: formData.location
                }}
                onNext={handlePhase2Next}
                onBack={handleBack}
                isLoading={isLoading}
              />
            )}

            {currentStep === 3 && (
              <ArtSignupPhase3
                initialData={{
                  password: formData.password,
                  confirmPassword: formData.confirmPassword,
                  profilePhoto: formData.profilePhoto,
                  bio: formData.bio,
                  agreeToTerms: formData.agreeToTerms
                }}
                onSubmit={handlePhase3Submit}
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
        