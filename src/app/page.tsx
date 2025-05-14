
import type { Metadata } from 'next';
import LandingClient from '@/components/auth/landing-client';

export const metadata: Metadata = {
  title: 'Welcome to TasteTracker - Find Your Next Meal!',
  description: 'Discover local food trucks or list your own. Join TasteTracker today!',
};

export default function LandingPage() {
  return (
    <LandingClient />
  );
}
