
import type { Metadata } from 'next';
import LoginForm from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Login - TasteTracker',
  description: 'Log in to your TasteTracker account.',
};

export default function LoginPage() {
  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Login to TasteTracker</h1>
      <LoginForm />
    </div>
  );
}
