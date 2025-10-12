import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';

export const useContactART = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [openModal, setOpenModal] = useState(true);
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    const handleContactART = (artId: string) => {
        if (!isAuthenticated || !user) {
            // Show modal first, then redirect to login
            setOpenModal(true);
            return;
        }

        console.log('Contacting ART:', artId);
        // TODO: Implement actual contact ART logic here
        // This could open a chat, send a message, etc.
    };

    const handleLoginRedirect = () => {
        setShowLoginModal(false);
        router.push('/login');
    };

    const closeModal = () => {
        setShowLoginModal(false);
    };

    return {
        showLoginModal,
        handleContactART,
        handleLoginRedirect,
        closeModal,
        isAuthenticated,
        user
    };
};