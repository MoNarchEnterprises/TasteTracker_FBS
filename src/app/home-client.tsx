"use client";

import type { FoodTruck } from '@/types';
import { MapComponent } from '@/components/map/map-component';
import { FoodTruckCard } from '@/components/food-truck/food-truck-card';
import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from '@/components/ui/button';
import { List, MapPinned, PanelLeft, PanelRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HomeClientProps {
  trucks: FoodTruck[];
}

export default function HomeClient({ trucks }: HomeClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | FoodTruck['availability']>('all');
  const [selectedTruckId, setSelectedTruckId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isListCollapsed, setIsListCollapsed] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const largeScreen = window.innerWidth >= 1024;
      setIsLargeScreen(largeScreen);
      // If screen becomes small, ensure list is not considered collapsed for map view logic
      if (!largeScreen) {
        setIsListCollapsed(false);
      }
    };
    checkScreenSize(); 
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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

  const handleViewOnMap = (truckId: string) => {
    setSelectedTruckId(truckId);
    setViewMode('map');
    if (isLargeScreen) {
      setIsListCollapsed(false); // Ensure list panel is open to see context
    }
    const mapElement = document.getElementById('map-view-section');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const showListTitle = (viewMode === 'list') || (isLargeScreen && viewMode === 'map' && !isListCollapsed);


  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-12rem)] gap-6">
      {/* Filters and View Toggle */}
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
        <div className="flex gap-2 items-center">
           {isLargeScreen && viewMode === 'map' && (
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setIsListCollapsed(!isListCollapsed)} 
              title={isListCollapsed ? 'Show truck list' : 'Hide truck list'}
              aria-label={isListCollapsed ? 'Show truck list' : 'Hide truck list'}
            >
              {isListCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
            </Button>
          )}
          <Button variant={viewMode === 'map' ? 'default' : 'outline'} onClick={() => setViewMode('map')}>
            <MapPinned className="mr-2 h-4 w-4" /> Map View
          </Button>
          <Button variant={viewMode === 'list' ? 'default' : 'outline'} onClick={() => setViewMode('list')}>
            <List className="mr-2 h-4 w-4" /> List View
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* Map Container */}
        <div
          id="map-view-section"
          className={cn(
            'h-full min-h-[300px] md:min-h-[400px] rounded-lg shadow-md overflow-hidden',
            // Visibility on small screens
            !isLargeScreen && viewMode === 'list' && 'hidden', 
            !isLargeScreen && viewMode === 'map' && 'block col-span-1', 
            // Sizing on large screens
            isLargeScreen && viewMode === 'map' && (isListCollapsed ? 'lg:col-span-3' : 'lg:col-span-2'),
            isLargeScreen && viewMode === 'list' && 'lg:col-span-1'
          )}
        >
          {(!isLargeScreen && viewMode === 'list') ? null : <MapComponent trucks={filteredTrucks} selectedTruckId={selectedTruckId} />}
        </div>

        {/* List Panel Container */}
        {((isLargeScreen && viewMode === 'map' && !isListCollapsed) ||
          (isLargeScreen && viewMode === 'list') ||
          (!isLargeScreen && viewMode === 'list')) && (
          <div
            className={cn(
              'h-full min-h-0 bg-card border rounded-lg shadow-md p-1',
              !isLargeScreen && viewMode === 'list' && 'block col-span-1', 
              isLargeScreen && viewMode === 'map' && !isListCollapsed && 'lg:col-span-1 block',
              isLargeScreen && viewMode === 'list' && 'lg:col-span-2 block'
            )}
          >
            {showListTitle && (
              <h2 className="text-xl font-semibold mb-3 px-3 pt-3">
                {isLargeScreen && viewMode === 'map' ? 'Nearby Trucks' : 'Truck List'}
              </h2>
            )}
            <ScrollArea className={cn("pr-3", showListTitle ? "h-[calc(100%-3.75rem)]" : "h-full")}> {/* Adjusted for padding */}
              <div className="space-y-4 p-3">
                {filteredTrucks.length > 0 ? (
                  filteredTrucks.map(truck => (
                    <FoodTruckCard key={truck.id} truck={truck} onViewOnMap={handleViewOnMap} />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-10">No food trucks match your criteria.</p>
                )}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
        )}
      </div>
      
      {/* Fallback list for small screens when map view is active */}
      {viewMode === 'map' && !isLargeScreen && (
        <div className="mt-6 lg:hidden bg-card border rounded-lg shadow-md p-1">
          <h2 className="text-xl font-semibold mb-3 px-3 pt-3">Truck List</h2>
           <ScrollArea className="h-[calc(100vh-28rem)] pr-3"> {/* Adjusted for padding and title */}
              <div className="space-y-4 p-3">
                {filteredTrucks.length > 0 ? (
                  filteredTrucks.map(truck => (
                    <FoodTruckCard key={truck.id} truck={truck} onViewOnMap={handleViewOnMap} />
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-10">No food trucks match your criteria.</p>
                )}
              </div>
              <ScrollBar orientation="vertical" />
            </ScrollArea>
        </div>
      )}
    </div>
  );
}