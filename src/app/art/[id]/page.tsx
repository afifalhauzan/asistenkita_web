"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DetailART } from '@/features/bantuan/components/DetailART';
import { useART } from '@/features/bantuan/hooks/useARTs';
import { Navbar } from '@/components/Navbar';

export default function ARTProfilePage() {
    const params = useParams();
    const router = useRouter();
    const artId = params.id as string;

    const { data: art, isLoading, error } = useART(artId);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <DetailART data={art} />
        </div>
    );
}