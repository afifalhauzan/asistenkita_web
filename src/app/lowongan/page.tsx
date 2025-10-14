"use client";

import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import LowonganForm from "@/features/lowongan/components/LowonganForm";
import LowonganCard from "@/features/lowongan/components/LowonganCard";
import { useLowongans, useLowonganMutations } from "@/features/lowongan/hooks/useLowongan";
import { CreateLowonganRequest } from "@/types/lowongan";
import type { NextPage } from '@/types/routing';
import  Lowongan from "@/features/lowongan/components/Lowongan";

const LowonganPage: NextPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 mt-20">
            <Navbar />

            <Lowongan />
            <Footer />  
        </div>
    );
};

export default LowonganPage;