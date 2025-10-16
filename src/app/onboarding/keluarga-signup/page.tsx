"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import MajikanSignup from '@/features/onboarding/MajikanSignup';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import type { NextPage } from '@/types/routing';

function MajikanSignupContent() {
    const searchParams = useSearchParams();
    const skipPhase1 = searchParams.get('skipPhase1') === 'true';

    return <MajikanSignup skipPhase1={skipPhase1} />;
}

const MajikanSignupPage: NextPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="">
                <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Memuat...</p>
                        </div>
                    </div>
                }>
                    <MajikanSignupContent />
                </Suspense>
            </main>
        </div>
    );
};

export default MajikanSignupPage;
