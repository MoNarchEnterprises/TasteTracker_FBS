
"use client";

import type { FoodTruck } from '@/types';
import { Map } from '@vis.gl/react-google-maps';
import { FoodTruckMarker } from './food-truck-marker';
import { useEffect, useState } from 'react';

interface MapComponentProps {
  trucks: FoodTruck[];
  selectedTruckId?: string | null;
}

const DEFAULT_CENTER = { lat: 34.052235, lng: -118.243683 }; // Downtown Los Angeles
const DEFAULT_ZOOM = 12;
const DEFAULT_MAP_ID = "8ea6910316a0016bfd7680be";

export function MapComponent({ trucks, selectedTruckId }: MapComponentProps) {
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  useEffect(() => {
    if (selectedTruckId) {
      const selectedTruck = trucks.find(t => t.id === selectedTruckId);
      if (selectedTruck) {
        setCenter(selectedTruck.location);
        setZoom(15);
      }
    } else if (trucks.length > 0) {
       // Optional: Adjust center based on average location of trucks or first truck
       // For simplicity, we keep default or previously set center
    }
  }, [selectedTruckId, trucks]);
  
  // For initial load, try to get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setZoom(13);
        },
        () => {
          // Handle error or user denial - use default location
          console.warn("Geolocation permission denied or unavailable. Using default location.");
        }
      );
    }
  }, []);


  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg">
      <Map
        defaultCenter={DEFAULT_CENTER}
        center={center}
        zoom={zoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || DEFAULT_MAP_ID}
        className="h-full w-full"
        onCenterChanged={(ev) => setCenter(ev.detail.center)}
        onZoomChanged={(ev) => setZoom(ev.detail.zoom)}
      >
        {trucks.map(truck => (
          <FoodTruckMarker key={truck.id} truck={truck} />
        ))}
      </Map>
    </div>
  );
}

