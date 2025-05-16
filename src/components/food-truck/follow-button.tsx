
"use client";

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/lib/hooks/use-favorites';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast'; // Import useToast

interface FollowButtonProps {
  truckId: string;
  truckName: string; // Added truckName prop
  size?: 'sm' | 'default' | 'lg' | 'icon';
}

export function FollowButton({ truckId, truckName, size = 'default' }: FollowButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const { toast } = useToast(); // Initialize toast

  if (!isLoaded) {
    // Display a skeleton or a disabled button while loading
    return (
      <Button variant="outline" size={size} disabled className="animate-pulse">
        <Heart className="mr-2 h-4 w-4" />
        Loading...
      </Button>
    );
  }

  const favorite = isFavorite(truckId);

  const handleToggleFavorite = () => {
    const currentlyIsFavorite = isFavorite(truckId);
    toggleFavorite(truckId); // Toggle the favorite state

    if (!currentlyIsFavorite) { // If it wasn't favorite and now it is
      toast({
        title: `Following ${truckName}!`,
        description: `You'll now receive notifications and email updates (simulated) from ${truckName}.`,
        duration: 5000,
      });
    } else { // If it was favorite and now it is not
      toast({
        title: `Unfollowed ${truckName}`,
        description: `You will no longer receive its updates (simulated).`,
        variant: 'default', // Or 'destructive' if preferred for unfollow
        duration: 5000,
      });
    }
  };

  return (
    <Button
      variant={favorite ? "secondary" : "outline"}
      size={size}
      onClick={handleToggleFavorite} // Updated onClick handler
      aria-pressed={favorite}
      className="transition-colors duration-200"
    >
      <Heart className={cn("mr-2 h-4 w-4", favorite && "fill-destructive text-destructive")} />
      {favorite ? 'Following' : 'Follow'}
    </Button>
  );
}
