"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import type { NextPage } from '@/types/routing';
import { Bantuan } from "@/features/bantuan/bantuan";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import ARTDashboard from "@/features/dashboard/ARTDashboard";
import MajikanDashboard from "@/features/dashboard/MajikanDashboard";

const DashboardPage: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <ProtectedRoute>
                {user?.labels?.includes('art') ? (
                    <><ARTDashboard /> {console.log('Rendering ARTDashboard')}</>
                ) : (
                    <><MajikanDashboard /> {console.log('Rendering MajikanDashboard')}</>
                )}
            </ProtectedRoute>
            <Footer />
        </div>
    );
};

export default DashboardPage;