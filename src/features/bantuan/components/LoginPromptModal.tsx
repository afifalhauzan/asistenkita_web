import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from "flowbite-react";
import { customTheme } from '@/lib/themeProvider';

export const useLoginPrompt = (artId: string) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const handleContactART = (artId: string) => {
        console.log('auth status:', isAuthenticated);
        if (!isAuthenticated) {
            setIsModalOpen(true);
        } else {
            router.push('/art/' + artId);
        }
    };

    const handleLoginRedirect = () => {
        setIsModalOpen(false);
        router.push('/login');
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return {
        isModalOpen,
        handleContactART,
        handleLoginRedirect,
        closeModal,
    };
};

interface LoginPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginRedirect: () => void;
}

export const LoginPromptModal: React.FC<LoginPromptModalProps> = ({
    isOpen,
    onClose,
    onLoginRedirect
}) => {

    return (
        <ThemeProvider theme={customTheme}>
            <Modal dismissible color="default" show={isOpen} onClose={onClose}>
                {/* <ModalHeader></ModalHeader> */}
                <ModalBody>
                    <div className="space-y-6 text-center">
                        <p className="text-base leading-relaxed text-gray-500">
                            Login dulu weh
                        </p>
                        <p className="text-base leading-relaxed text-gray-500">
                            Biar datanya aman ea
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onLoginRedirect}>Login</Button>
                    <Button color="secondary" onClick={onClose}>
                        Kembali
                    </Button>
                </ModalFooter>
            </Modal>
        </ThemeProvider>
    );
};