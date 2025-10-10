'use client';

import Link from 'next/link';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';

export default function LoginPage() {
  return (
    // <ProtectedRoute>
      <div className="min-h-screen w-full">
            <LoginForm />
      </div>
    // </ProtectedRoute>
  );
}