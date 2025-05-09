"use client";

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/lib/hooks/use-favorites';
import { cn } from '@/lib/utils';

interface FollowButtonProps {
  truckId: string;
  size?: 'sm' | 'default' | 'lg' | 'icon';
}

export function FollowButton({ truckId, size = 'default' }: FollowButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  if (!isLoaded) {
    return <Button variant="outline" size={size} disabled>Loading...</Button>;
  }

  const favorite = isFavorite(truckId);

  return (
    <Button
      variant={favorite ? "secondary" : "outline"}
      size={size}
      onClick={() => toggleFavorite(truckId)}
      aria-pressed={favorite}
      className="transition-colors duration-200"
    >
      <Heart className={cn("mr-2 h-4 w-4", favorite && "fill-red-500 text-red-500")} />
      {favorite ? 'Following' : 'Follow'}
    </Button>
  );
}
