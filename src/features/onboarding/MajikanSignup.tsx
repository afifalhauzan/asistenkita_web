"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoFull } from '../../components/LogoFull';
import { Phase1 } from './components/Phase1';
import { MajikanSignupPhase2 } from './components/majikan/MajikanSignupPhase2';
import { MajikanSignupPhase3 } from './components/majikan/MajikanSignupPhase3';
import { majikanSignupService } from '../../services/majikanSignupService';
import { CreateLowonganRequest } from '@/types/lowongan';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface Phase1FormData {
  name: string;
  email: string;
  phone: string;
}

interface MajikanSignupProps {
  onSuccess?: () => void;
  redirectTo?: string;
  skipPhase1?: boolean;
}

interface MajikanSignupState {
  phase1: Phase1FormData;
  phase2: CreateLowonganRequest | null;
}

export default function MajikanSignup({
  onSuccess,
  redirectTo = '/dashboard/lowongan',
  skipPhase1 = false
}: MajikanSignupProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(skipPhase1 ? 2 : 1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Initialize signupState with user data if skipPhase1 is true
  const [signupState, setSignupState] = useState<MajikanSignupState>(() => {
    if (skipPhase1 && user) {
      console.log('MajikanSignup: Initializing with user data:', user);
      return {
        phase1: {
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || ''
        },
        phase2: null
      };
    }
    return {
      phase1: {
        name: '',
        email: '',
        phone: ''
      },
      phase2: null
    };
  });

  // Auto-fill Phase1 data from authenticated user if skipPhase1 is true and user loads later
  useEffect(() => {
    if (skipPhase1 && user && !signupState.phase1.email) {
      console.log('MajikanSignup: Auto-filling Phase1 data from user (useEffect):', user);
      const phase1Data = {
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      };
      console.log('MajikanSignup: Phase1 data:', phase1Data);
      setSignupState(prev => ({
        ...prev,
        phase1: phase1Data
      }));
    }
  }, [skipPhase1, user, signupState.phase1.email]);

  const handlePhase1Next = (data: Phase1FormData) => {
    setSignupState(prev => ({ ...prev, phase1: data }));
    setCurrentStep(2);
  };

  const handlePhase2Next = (data: CreateLowonganRequest) => {
    setSignupState(prev => ({ ...prev, phase2: data }));
    setCurrentStep(3);
  };

  const handlePhase3Submit = async (data: CreateLowonganRequest) => {
    setIsLoading(true);

    try {
      const finalData = {
        phase1: signupState.phase1,
        lowongan: { ...signupState.phase2, ...data },
        agreeToTerms: true
      };
      console.log('Submitting final data:', finalData);
      
      const result = await majikanSignupService.submitMajikanSignup(finalData);
      console.log('Submission result:', result);

      if (!result.success) {
        alert(`Error: ${result.error}`);
        setIsLoading(false);
        return;
      }

      console.log('Final data submitted successfully');

      if (onSuccess) {
        onSuccess();
        console.log('onSuccess callback executed');
      } else {
        router.push(redirectTo);
      }
    } catch (error) {
      console.error('Majikan signup error:', error);
      alert(`Terjadi kesalahan: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderPhaseTitle = () => {
    switch (currentStep) {
      case 1:
        return {
          title: 'Data Diri',
          subtitle: 'Tenang, data Anda aman. Informasi ini hanya kami gunakan untuk memvalidasi identitas Anda dan tidak akan dibagikan ke siapapun.'
        };
      case 2:
        return {
          title: "Detail Lowongan Kerja",
          subtitle: "Buat Lowongan ART"
        };
      case 3:
        return {
          title: "Konfirmasi & Publikasi",
          subtitle: "Review Lowongan"
        };
      default:
        return { title: "", subtitle: "" };
    }
  };

  const { title, subtitle } = renderPhaseTitle();

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
                {/* Step Indicator - Only show if not skipping Phase 1 */}
                {!skipPhase1 && (
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
                )}

                {/* Step Indicator for skipPhase1 - Only 2 steps */}
                {skipPhase1 && (
                  <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        1
                      </div>
                      <div className={`w-8 h-0.5 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        2
                      </div>
                    </div>
                  </div>
                )}
    
                {/* Title */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{renderPhaseTitle().title}</h1>
                  <p className="text-gray-600 text-sm">{renderPhaseTitle().subtitle}</p>
                </div>
    
                {/* Only show Phase1 if not skipping */}
                {currentStep === 1 && !skipPhase1 && (
              <Phase1
                onNext={handlePhase1Next}
                isLoading={isLoading}
                initialData={signupState.phase1}
              />
            )}

            {currentStep === 2 && (
              <MajikanSignupPhase2
                onNext={handlePhase2Next}
                onBack={!skipPhase1 ? handleBack : undefined}
                isLoading={isLoading}
              />
            )}

            {currentStep === 3 && signupState.phase2 && (
              <MajikanSignupPhase3
                initialData={signupState.phase2}
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
}