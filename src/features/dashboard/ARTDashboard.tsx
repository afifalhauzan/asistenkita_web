"use client";

import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { NextPage } from '@/types/routing';

const ARTDashboard: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Selamat Datang di Dashboard ART</h1>
                </div>
            </main>
        </div>
    );
};

export default ARTDashboard;

