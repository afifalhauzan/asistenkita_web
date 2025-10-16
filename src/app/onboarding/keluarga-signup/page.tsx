"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import MajikanSignup from '@/features/onboarding/MajikanSignup';
import { useSearchParams } from 'next/navigation';
import type { NextPage } from '@/types/routing';

const MajikanSignupPage: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const searchParams = useSearchParams();
    const skipPhase1 = searchParams.get('skipPhase1') === 'true';

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="">
                <MajikanSignup skipPhase1={skipPhase1} />
            </main>
        </div>
    );
};

export default MajikanSignupPage;
