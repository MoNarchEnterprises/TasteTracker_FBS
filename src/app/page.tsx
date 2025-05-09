import { getAllFoodTrucks } from '@/lib/mock-data';
import HomeClient from './home-client';

export default async function HomePage() {
  const trucks = await getAllFoodTrucks();

  return (
    <section className="w-full h-full">
      <HomeClient trucks={trucks} />
    </section>
  );
}
