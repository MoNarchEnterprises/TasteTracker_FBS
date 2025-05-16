
"use client";

import { useUser } from '@/hooks/use-user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AccountClient() {
  const { user, isLoading, signOut } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login'); // Redirect to login if not authenticated
    }
  }, [user, isLoading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  if (isLoading || !user) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-full" />
          </div>
           {/* Placeholder for metadata if needed */}
          <Skeleton className="h-10 w-full mt-4" />
        </CardContent>
      </Card>
    );
  }

  // Assuming user_metadata might contain full_name and account_type
  const displayName = user.user_metadata?.full_name || user.email;
  const accountType = user.user_metadata?.account_type || 'Customer';

  return (
    <Card className="max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Account Details</CardTitle>
        <CardDescription>View and manage your account information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Name</p>
          <p className="text-lg">{displayName}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Email</p>
          <p className="text-lg">{user.email}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Account Type</p>
          <p className="text-lg capitalize">{accountType}</p>
        </div>
        {/* Add more user details here as needed */}
        {/* For example, if food truck details are stored in user_metadata: */}
        {accountType === 'foodTruck' && user.user_metadata?.food_truck_name && (
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Food Truck Name</p>
            <p className="text-lg">{user.user_metadata.food_truck_name}</p>
          </div>
        )}

        <Button onClick={handleSignOut} variant="destructive" className="w-full mt-4">
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}
