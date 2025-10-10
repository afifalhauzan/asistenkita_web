'use client';

import Link from 'next/link';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import type { NextPage } from '@/types/routing';

const LoginPage: NextPage = () => {
  return (
    <div className="min-h-screen w-full">
      <LoginForm />
    </div>
  );
};

export default LoginPage;