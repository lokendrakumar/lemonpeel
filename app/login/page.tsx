"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/features/auth/LoginForm';
import ClientOnlyErrorBoundary from '@/components/ClientOnlyErrorBoundary';

export default function LoginPage() {
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

  return (
    <ClientOnlyErrorBoundary>
      <LoginForm />
    </ClientOnlyErrorBoundary>
  );
}