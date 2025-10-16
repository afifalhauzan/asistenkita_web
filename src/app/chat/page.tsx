"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import type { NextPage } from '@/types/routing';
import { Chat } from "@/features/chat/chat";
import { Footer } from "@/components/Footer";

const ChatPage: NextPage = () => {
    const { user, isAuthenticated, loading } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="">
                <Chat />
            </main>
            <Footer />
        </div>
    );
};

export default ChatPage;