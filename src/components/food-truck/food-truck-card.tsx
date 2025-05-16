
import type { FoodTruck } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { AvailabilityIndicator } from './availability-indicator';
import { FollowButton } from './follow-button';

interface FoodTruckCardProps {
  truck: FoodTruck;
}

export function FoodTruckCard({ truck }: FoodTruckCardProps) {
  return (
    <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-0">
        {truck.photos[0] && (
          <div className="aspect-[16/9] relative">
            <Image
              src={truck.photos[0]}
              alt={`Photo of ${truck.name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority // LCP candidate
              data-ai-hint="food truck photo"
            />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-1">{truck.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2">{truck.cuisine}</p>
        <div className="flex items-center text-sm text-amber-500 mb-2">
          <Star className="w-4 h-4 mr-1 fill-amber-500" />
          <span>{truck.rating.toFixed(1)}</span>
        </div>
        <div className="mb-3">
          <AvailabilityIndicator status={truck.availability} />
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{truck.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button asChild variant="default" size="sm" className="flex-grow sm:flex-grow-0">
            <Link href={`/trucks/${truck.id}`}>View Profile</Link>
          </Button>
        </div>
        <FollowButton truckId={truck.id} truckName={truck.name} size="sm" />
      </CardFooter>
    </Card>
  );
}
