
"use client";

import type { FoodTruck } from '@/types';
import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { Utensils } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { AvailabilityIndicator } from '@/components/food-truck/availability-indicator';

interface FoodTruckMarkerProps {
  truck: FoodTruck;
}

export function FoodTruckMarker({ truck }: FoodTruckMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const statusColors: Record<FoodTruck['availability'], string> = {
    available: 'bg-status-green',
    busy: 'bg-status-red',
    promotion: 'bg-status-yellow',
  };

  const toggleInfoWindow = () => setInfoWindowShown(previousState => !previousState);
  const closeInfoWindow = () => setInfoWindowShown(false);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={truck.location}
        title={truck.name}
        onClick={toggleInfoWindow}
      >
        <div className={`p-2 rounded-full shadow-lg ${statusColors[truck.availability]}`}>
          <Utensils className="h-5 w-5 text-white" />
        </div>
      </AdvancedMarker>
      {infoWindowShown && marker && (
        <InfoWindow
          anchor={marker}
          onCloseClick={closeInfoWindow}
          shouldFocus={false} // To prevent map recentering on open
        >
          <div className="p-2 w-64">
            {truck.photos[0] && (
              <div className="relative w-full h-32 rounded-t-md overflow-hidden">
                 <Image
                  src={truck.photos[0]}
                  alt={truck.name}
                  fill
                  sizes="256px" // approx width of infowindow
                  style={{ objectFit: 'cover' }}
                  data-ai-hint="food truck photo"
                />
              </div>
            )}
            <h3 className="text-lg font-semibold mt-2">{truck.name}</h3>
            <p className="text-sm text-muted-foreground">{truck.cuisine}</p>
            <div className="my-2">
              <AvailabilityIndicator status={truck.availability} />
            </div>
            <Button asChild size="sm" className="w-full mt-2">
              <Link href={`/trucks/${truck.id}`}>View Profile</Link>
            </Button>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
