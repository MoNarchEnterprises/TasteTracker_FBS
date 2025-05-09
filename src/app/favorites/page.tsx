import { getAllFoodTrucks } from '@/lib/mock-data';
import FavoritesClient from './favorites-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Favorite Trucks - TasteTracker',
  description: 'View and manage your list of favorite food trucks.',
};

export default async function FavoritesPage() {
  // Fetch all trucks, client will filter based on localStorage favorites
  const allTrucks = await getAllFoodTrucks();

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">My Favorite Trucks</h1>
      <FavoritesClient allTrucks={allTrucks} />
    </section>
  );
}
