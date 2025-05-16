
// src/app/account/page.tsx
import type { Metadata } from 'next';
import AccountClient from './account-client';

export const metadata: Metadata = {
  title: 'My Account - TasteTracker',
  description: 'Manage your TasteTracker account details.',
};

export default function AccountPage() {
  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      <AccountClient />
    </section>
  );
}
