import { getFoodTruckById } from '@/lib/mock-data';
import FoodTruckProfileClient from '@/components/food-truck/food-truck-profile-client';
import { notFound } from 'next/navigation';
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id
  const truck = await getFoodTruckById(id)
 
  if (!truck) {
    return {
      title: 'Truck Not Found - TasteTracker',
    }
  }
 
  return {
    title: `${truck.name} - TasteTracker`,
    description: `View menu, photos, and details for ${truck.name}. ${truck.description}`,
  }
}

export default async function FoodTruckProfilePage({ params }: Props) {
  const truck = await getFoodTruckById(params.id);

  if (!truck) {
    notFound();
  }

  return (
    <section className="container mx-auto py-8">
      <FoodTruckProfileClient truck={truck} />
    </section>
  );
}

export async function generateStaticParams() {
  // In a real app, you'd fetch all truck IDs. For mock, it's not strictly necessary
  // but good for demonstrating how it would work.
  // const trucks = await getAllFoodTrucks(); // Assuming this exists
  // return trucks.map((truck) => ({ id: truck.id }));
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }]; // Mocking a few IDs
}
