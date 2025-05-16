
"use client";

import type { FoodTruck } from '@/types';
import { Map } from '@vis.gl/react-google-maps';
import { FoodTruckMarker } from './food-truck-marker';
import { useEffect, useState } from 'react';

interface MapComponentProps {
  trucks: FoodTruck[];
  selectedTruckId?: string | null; // Kept for potential future use (e.g., highlighting)
  onMarkerClick: (truck: FoodTruck) => void; // New prop
}

const DEFAULT_CENTER = { lat: 34.052235, lng: -118.243683 }; // Downtown Los Angeles
const DEFAULT_ZOOM = 12;

export function MapComponent({ trucks, selectedTruckId, onMarkerClick }: MapComponentProps) {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  useEffect(() => {
    if (selectedTruckId) {
      const truckToSelect = trucks.find(t => t.id === selectedTruckId);
      if (truckToSelect) {
        setCenter(truckToSelect.location);
        setZoom(15);
      }
    }
    // Removed automatic geolocation on load to prevent violation.
  }, [selectedTruckId, trucks]);


  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg">
      <Map
        center={center}
        zoom={zoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID!}
        className="h-full w-full"
        onCenterChanged={(ev) => setCenter(ev.detail.center)}
        onZoomChanged={(ev) => setZoom(ev.detail.zoom)}
      >
        {trucks.map(truck => (
          <FoodTruckMarker key={truck.id} truck={truck} onMarkerClick={onMarkerClick} />
        ))}
      </Map>
    </div>
  );
}
