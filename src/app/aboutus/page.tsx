"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import type { NextPage } from '@/types/routing';
import { AboutUs } from "@/features/aboutus/AboutUs";
import { Footer } from "@/components/Footer";

const AboutUsPage: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="">
                <AboutUs />
            </main>
            <Footer />
        </div>
    );
};

export default AboutUsPage;