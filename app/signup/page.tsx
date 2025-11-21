"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import SignupForm from '@/features/auth/SignupForm';

export default function SignupPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/projects');
    }
  }, [isAuthenticated, loading, router]);

  if (loading || isAuthenticated) {
    return null; // or a loading spinner
  }

  return <SignupForm />;
}
