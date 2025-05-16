
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Utensils, MapPin, Send, Tag, Settings } from 'lucide-react';

export default function OperatorDashboardClient() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.user_metadata?.account_type !== 'foodTruck')) {
      router.replace('/login'); // Or a specific "access denied" page
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.user_metadata?.account_type !== 'foodTruck') {
    // Show a more comprehensive skeleton for the dashboard layout
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3 mb-4" /> 
        <Skeleton className="h-12 w-full rounded-md" /> {/* TabsList skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/2 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-1/3" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const truckName = user.user_metadata?.food_truck_name || "Your Food Truck";

  return (
    <Tabs defaultValue="menu" className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6">
        <TabsTrigger value="menu"><Utensils className="mr-2 h-4 w-4 sm:hidden md:inline-block" />Menu</TabsTrigger>
        <TabsTrigger value="location"><MapPin className="mr-2 h-4 w-4 sm:hidden md:inline-block" />Location</TabsTrigger>
        <TabsTrigger value="notifications"><Send className="mr-2 h-4 w-4 sm:hidden md:inline-block" />Updates</TabsTrigger>
        <TabsTrigger value="specials"><Tag className="mr-2 h-4 w-4 sm:hidden md:inline-block" />Specials</TabsTrigger>
        <TabsTrigger value="profile"><Settings className="mr-2 h-4 w-4 sm:hidden md:inline-block" />Profile</TabsTrigger>
      </TabsList>

      <TabsContent value="menu">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Menu Management</CardTitle>
            <CardDescription>Add, edit, or remove items from your menu for {truckName}.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Menu editing features coming soon!</p>
            {/* Placeholder for menu items list, add item button etc. */}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="location">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Location Management</CardTitle>
            <CardDescription>Set your current location or schedule future spots for {truckName}.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Location setting and scheduling features coming soon!</p>
            {/* Placeholder for map integration, address input, schedule form etc. */}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Send Updates</CardTitle>
            <CardDescription>Notify your followers about your location, specials, or other news from {truckName}.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Notification and email sending features coming soon!</p>
            {/* Placeholder for message composer, audience selection etc. */}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="specials">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Create Specials</CardTitle>
            <CardDescription>Highlight special offers or promotions for {truckName}.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Specials creation features coming soon!</p>
            {/* Placeholder for special item form, duration settings etc. */}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="profile">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Truck Profile</CardTitle>
            <CardDescription>Update your food truck details for {truckName}, like cuisine type, logo, and contact information.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Profile editing features coming soon!</p>
            {/* Placeholder for form to edit truck name, description, cuisine, logo, etc. */}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
