"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import  MajikanSignup  from '@/features/onboarding/MajikanSignup';
import type { NextPage } from '@/types/routing';

const MajikanSignupPage: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="">
                <MajikanSignup />
            </main>
        </div>
    );
};

export default MajikanSignupPage;
