
import type { Metadata } from 'next';
import OperatorDashboardClient from './operator-dashboard-client';

export const metadata: Metadata = {
  title: 'Operator Dashboard - TasteTracker',
  description: 'Manage your food truck operations.',
};

export default function OperatorDashboardPage() {
  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Food Truck Dashboard</h1>
      <OperatorDashboardClient />
    </section>
  );
}
