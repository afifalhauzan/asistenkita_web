"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoFull } from '../../components/LogoFull';
import { Phase1 } from './components/Phase1';
import { MajikanSignupPhase2 } from './components/majikan/MajikanSignupPhase2';
import { MajikanSignupPhase3 } from './components/majikan/MajikanSignupPhase3';
import { majikanSignupService } from '../../services/majikanSignupService';
import { CreateLowonganRequest } from '@/types/lowongan';

interface Phase1FormData {
  name: string;
  email: string;
  phone: string;
}

interface MajikanSignupProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

interface MajikanSignupState {
  phase1: Phase1FormData;
  phase2: CreateLowonganRequest | null;
}

export default function MajikanSignup({ 
  onSuccess, 
  redirectTo = '/dashboard' 
}: MajikanSignupProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signupState, setSignupState] = useState<MajikanSignupState>({
    phase1: {
      name: '',
      email: '',
      phone: ''
    },
    phase2: null
  });

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

      await majikanSignupService.submitMajikanSignup(finalData);

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(redirectTo);
      }
    } catch (error) {
      console.error('Majikan signup error:', error);
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
          title: "Buat Akun Keluarga",
          subtitle: "Langkah 1 dari 3: Informasi Dasar"
        };
      case 2:
        return {
          title: "Detail Lowongan Kerja",
          subtitle: "Langkah 2 dari 3: Buat Lowongan ART"
        };
      case 3:
        return {
          title: "Konfirmasi & Publikasi",
          subtitle: "Langkah 3 dari 3: Review Lowongan"
        };
      default:
        return { title: "", subtitle: "" };
    }
  };

  const { title, subtitle } = renderPhaseTitle();

  return (
    <div className="min-h-screen BG-GRAY-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <LogoFull className="h-12 mx-auto" />
          </Link>
          
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            } font-semibold text-sm`}>
              1
            </div>
            <div className={`h-1 w-16 ${
              currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            } font-semibold text-sm`}>
              2
            </div>
            <div className={`h-1 w-16 ${
              currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            } font-semibold text-sm`}>
              3
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {currentStep === 1 && (
              <Phase1
                onNext={handlePhase1Next}
                isLoading={isLoading}
                initialData={signupState.phase1}
              />
            )}

            {currentStep === 2 && (
              <MajikanSignupPhase2
                onNext={handlePhase2Next}
                onBack={handleBack}
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