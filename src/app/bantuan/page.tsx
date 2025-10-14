"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import type { NextPage } from '@/types/routing';
import { Bantuan } from "@/features/bantuan/bantuan";
import { Footer } from "@/components/Footer";

const BantuanPage: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Bantuan />
            <Footer />
        </div>
    );
};

export default BantuanPage;