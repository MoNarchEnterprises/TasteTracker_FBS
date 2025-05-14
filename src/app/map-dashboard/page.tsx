
import { getAllFoodTrucks } from '@/lib/mock-data';
import HomeClient from './home-client'; // Updated path
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Map Dashboard - TasteTracker',
  description: 'Explore food trucks on the map, filter by cuisine, and find your favorites.',
};

export default async function MapDashboardPage() {
  const trucks = await getAllFoodTrucks();

  return (
    <section className="w-full h-full">
      <HomeClient trucks={trucks} />
    </section>
  );
}
