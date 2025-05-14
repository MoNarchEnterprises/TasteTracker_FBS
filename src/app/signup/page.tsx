
import type { Metadata } from 'next';
import SignUpForm from '@/components/auth/signup-form';

export const metadata: Metadata = {
  title: 'Sign Up - TasteTracker',
  description: 'Create your TasteTracker account to find or list food trucks.',
};

export default function SignUpPage() {
  return (
    <div className="container mx-auto max-w-lg py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Create Your Account</h1>
      <SignUpForm />
    </div>
  );
}
