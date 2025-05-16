
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TasteTrackerLogo } from '@/components/icons/taste-tracker-logo';
import { useRouter } from 'next/navigation';

export default function LandingClient() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4 py-8">
      <TasteTrackerLogo width={128} height={128} className="mb-6" />
      <h1 className="text-5xl font-bold mb-4 text-primary">
        TasteTracker
      </h1>
      <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
        Your ultimate guide to discovering amazing food trucks or getting your own truck noticed.
        Find delicious eats on the go, or manage your mobile culinary business with ease.
      </p>
      <div className="space-y-4 sm:space-y-0 sm:space-x-4">
        <Button size="lg" onClick={() => router.push('/login')}>
          Login
        </Button>
        <Button size="lg" variant="outline" onClick={() => router.push('/signup')}>
          Sign Up
        </Button>
      </div>
      <p className="mt-12 text-muted-foreground">
        Ready to explore? <Link href="/map-dashboard" className="text-primary hover:underline">View the map</Link>
      </p>
    </div>
  );
}
