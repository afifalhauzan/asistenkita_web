"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import type { NextPage } from '@/types/routing';
import { Footer } from "@/components/Footer";
import { Pekerjaan } from "@/features/pekerjaan/Pekerjaan";

const MitraPage: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Pekerjaan />
            </main>
            <Footer />
        </div>
    );
};

export default MitraPage;