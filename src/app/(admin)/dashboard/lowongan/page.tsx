"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import type { NextPage } from '@/types/routing';
import { Bantuan } from "@/features/bantuan/bantuan";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import ARTDashboard from "@/features/dashboard/ARTDashboard";
import MajikanDashboardLowongan from "@/features/dashboard/MajikanDashboardLowongan";

const DashboardLowonganPage: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <ProtectedRoute>
                <><MajikanDashboardLowongan /> {console.log('Rendering MajikanDashboardLowongan')}</>
            </ProtectedRoute>
            <Footer />
        </div>
    );
};

export default DashboardLowonganPage;