'use client';

import Link from 'next/link';
import { SignupForm } from '@/features/auth/components/SignupForm';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import type { NextPage } from '@/types/routing';

const SignupPage: NextPage = () => {
  return (
    <div className="min-h-screen ">
      <SignupForm />
    </div>
  );
};

export default SignupPage;