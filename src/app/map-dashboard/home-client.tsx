
"use client";

import type { FoodTruck } from '@/types';
import { MapComponent } from '@/components/map/map-component';
import { FoodTruckCard } from '@/components/food-truck/food-truck-card';
import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // DialogClose is part of DialogContent
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react'; // For a manual close button if needed, though Dialog handles it.

interface HomeClientProps {
  trucks: FoodTruck[];
}

export default function HomeClient({ trucks }: HomeClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | FoodTruck['availability']>('all');
  
  const [selectedTruckForDialog, setSelectedTruckForDialog] = useState<FoodTruck | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const uniqueCuisines = useMemo(() => {
    const cuisines = new Set<string>();
    trucks.forEach(truck => cuisines.add(truck.cuisine));
    return Array.from(cuisines).sort();
  }, [trucks]);

  const filteredTrucks = useMemo(() => {
    return trucks.filter(truck => {
      const matchesSearch = truck.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            truck.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCuisine = cuisineFilter === 'all' || truck.cuisine === cuisineFilter;
      const matchesAvailability = availabilityFilter === 'all' || truck.availability === availabilityFilter;
      return matchesSearch && matchesCuisine && matchesAvailability;
    });
  }, [trucks, searchTerm, cuisineFilter, availabilityFilter]);

  const handleMarkerClick = (truck: FoodTruck) => {
    setSelectedTruckForDialog(truck);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] gap-6"> {/* Adjusted height */}
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center p-4 bg-card border rounded-lg shadow">
        <Input
          placeholder="Search trucks or cuisine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by cuisine" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cuisines</SelectItem>
              {uniqueCuisines.map(cuisine => (
                <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={availabilityFilter} onValueChange={(value) => setAvailabilityFilter(value as 'all' | FoodTruck['availability'])}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="promotion">Promotion</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-grow rounded-lg shadow-md overflow-hidden">
        <MapComponent 
            trucks={filteredTrucks} 
            onMarkerClick={handleMarkerClick} 
        />
      </div>

      {/* Dialog for Food Truck Details */}
      {selectedTruckForDialog && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
            {/* DialogContent in ShadCN already has a close button (X icon) by default in the top right */}
            <DialogHeader className="p-6 pb-0"> {/* Add padding to header if needed, or keep sr-only title compact */}
              <DialogTitle className="sr-only">{selectedTruckForDialog.name} Details</DialogTitle>
            </DialogHeader>
            <FoodTruckCard truck={selectedTruckForDialog} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
