"use client";

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_STORAGE_KEY = 'tasteTrackerFavorites';

export function useFavorites() {
  const [favoriteTruckIds, setFavoriteTruckIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        setFavoriteTruckIds(new Set(JSON.parse(storedFavorites)));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage", error);
      // Initialize with empty set if parsing fails or localStorage is unavailable
      setFavoriteTruckIds(new Set());
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(favoriteTruckIds)));
      } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
      }
    }
  }, [favoriteTruckIds, isLoaded]);

  const addFavorite = useCallback((truckId: string) => {
    setFavoriteTruckIds(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      newFavorites.add(truckId);
      return newFavorites;
    });
  }, []);

  const removeFavorite = useCallback((truckId: string) => {
    setFavoriteTruckIds(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      newFavorites.delete(truckId);
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((truckId: string) => {
    return favoriteTruckIds.has(truckId);
  }, [favoriteTruckIds]);

  const toggleFavorite = useCallback((truckId: string) => {
    if (isFavorite(truckId)) {
      removeFavorite(truckId);
    } else {
      addFavorite(truckId);
    }
  }, [addFavorite, isFavorite, removeFavorite]);

  return {
    favoriteTruckIds,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    isLoaded, // To allow components to wait for localStorage hydration
  };
}
