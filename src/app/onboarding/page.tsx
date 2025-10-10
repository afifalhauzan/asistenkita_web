"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { Start } from "@/features/onboarding/Start";
import type { NextPage } from '@/types/routing';

const OnboardingPage: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="">
                <Start />
            </main>
        </div>
    );
};

export default OnboardingPage;