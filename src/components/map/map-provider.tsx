
"use client";

import type { ReactNode } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';

interface MapProviderProps {
  children: ReactNode;
}

export function MapProvider({ children }: MapProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  if (!apiKey) {
    return (
      <div className="flex h-screen items-center justify-center p-4 text-center">
        <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md">
          <h2 className="text-xl font-semibold">Google Maps API Key Missing</h2>
          <p>
            Please add your Google Maps API key to your environment variables.
            Create a <code>.env.local</code> file in the root of your project and add:
          </p>
          <pre className="mt-2 p-2 bg-destructive/20 rounded-sm text-sm">
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
          </pre>
          <p className="mt-2">
            Make sure to enable "Maps JavaScript API" in your Google Cloud Console.
          </p>
        </div>
      </div>
    );
  }

  if (!mapId) {
    return (
      <div className="flex h-screen items-center justify-center p-4 text-center">
        <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md">
          <h2 className="text-xl font-semibold">Google Maps Map ID Missing</h2>
          <p>
            Please add your Google Maps Map ID to your environment variables.
            Create a <code>.env.local</code> file in the root of your project and add:
          </p>
          <pre className="mt-2 p-2 bg-destructive/20 rounded-sm text-sm">
            NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID=YOUR_MAP_ID_HERE
          </pre>
          <p className="mt-2">
            Ensure this Map ID is correctly configured and associated with your API key in the Google Cloud Console. This is often required for custom map styles or vector maps.
          </p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      {children}
    </APIProvider>
  );
}
