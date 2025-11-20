import LoginForm from '@/features/auth/LoginForm';
import ClientOnlyErrorBoundary from '@/components/ClientOnlyErrorBoundary';

export const metadata = {
  title: 'Login | LemonPeel',
  description: 'Sign in to your LemonPeel account to access premium features and analytics.',
};

export default function LoginPage() {
  return (
    <ClientOnlyErrorBoundary>
      <LoginForm />
    </ClientOnlyErrorBoundary>
  );
}
