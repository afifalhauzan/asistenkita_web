"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { Start } from "@/features/onboarding/Start";

export default function Home() {
    const { user, isAuthenticated, loading } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="">
                <Start />
            </main>
        </div>
    );
}