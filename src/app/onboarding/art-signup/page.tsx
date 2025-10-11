"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { Start } from "@/features/onboarding/Start";
import type { NextPage } from '@/types/routing';
import { ArtSignup } from "@/features/onboarding/ArtSignup";

const ArtSignupPage: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="">
                <ArtSignup />
            </main>
        </div>
    );
};

export default ArtSignupPage;