'use client';

import Link from 'next/link';
import { SignupForm } from '@/features/auth/components/SignupForm';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full">
      <SignupForm />
    </div>
  );
}