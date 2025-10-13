"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import type { NextPage } from '@/types/routing';
import { Chat } from "@/features/chat/chat";

const ChatPage: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="">
                {/* Hero Section */}
                <Chat />
            </main>
        </div>
    );
};

export default ChatPage;