"use client";

import type { FoodTruck } from '@/types';
import { useFavorites } from '@/lib/hooks/use-favorites';
import { FoodTruckCard } from '@/components/food-truck/food-truck-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface FavoritesClientProps {
  allTrucks: FoodTruck[];
}

export default function FavoritesClient({ allTrucks }: FavoritesClientProps) {
  const { favoriteTruckIds, isLoaded } = useFavorites();
  const [hydrated, setHydrated] = useState(false);

  // Ensure client-side state is hydrated before rendering dependent UI
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!isLoaded || !hydrated) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg animate-pulse">
            <div className="h-32 bg-muted rounded-md mb-4"></div>
            <div className="h-6 w-3/4 bg-muted rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-muted rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  const favoriteTrucks = allTrucks.filter(truck => favoriteTruckIds.has(truck.id));

  if (favoriteTrucks.length === 0) {
    return (
      <Alert className="max-w-md mx-auto">
        <Heart className="h-5 w-5" />
        <AlertTitle>No Favorites Yet!</AlertTitle>
        <AlertDescription>
          You haven&apos;t added any food trucks to your favorites. 
          Start exploring and tap the heart icon on trucks you like!
        </AlertDescription>
        <Button asChild className="mt-4">
          <Link href="/">Find Trucks</Link>
        </Button>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favoriteTrucks.map(truck => (
        <FoodTruckCard key={truck.id} truck={truck} />
      ))}
    </div>
  );
}
