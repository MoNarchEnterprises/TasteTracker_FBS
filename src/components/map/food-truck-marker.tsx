
"use client";

import type { FoodTruck } from '@/types';
import { AdvancedMarker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { Utensils } from 'lucide-react';

interface FoodTruckMarkerProps {
  truck: FoodTruck;
  onMarkerClick: (truck: FoodTruck) => void;
}

export function FoodTruckMarker({ truck, onMarkerClick }: FoodTruckMarkerProps) {
  const [markerRef] = useAdvancedMarkerRef();

  const statusColors: Record<FoodTruck['availability'], string> = {
    available: 'bg-status-green', // Use HSL var: bg-[hsl(var(--status-green))] if direct color doesn't work
    busy: 'bg-status-red',       // Use HSL var: bg-[hsl(var(--status-red))]
    promotion: 'bg-status-yellow', // Use HSL var: bg-[hsl(var(--status-yellow))]
  };

  const handleMarkerClick = () => {
    onMarkerClick(truck);
  };

  return (
    <AdvancedMarker
      ref={markerRef}
      position={truck.location}
      title={truck.name}
      onClick={handleMarkerClick} // Call the passed-in handler
    >
      <div className={`p-2 rounded-full shadow-lg ${statusColors[truck.availability]}`}>
        <Utensils className="h-5 w-5 text-white" />
      </div>
    </AdvancedMarker>
  );
}
