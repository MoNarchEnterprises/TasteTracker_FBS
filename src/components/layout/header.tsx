
"use client"; 

import Link from 'next/link';
import { MapPin, Heart, LogOut, User as UserIcon, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { NotificationToggle } from '@/components/layout/notification-toggle';
import { TasteTrackerLogo } from '@/components/icons';
import { useUser } from '@/hooks/use-user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';

export function Header() {
  const { user, isLoading, signOut } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/'); 
    router.refresh();
  };

  const getInitials = (email?: string | null) => {
    if (!email) return 'TT'; 
    const fullName = user?.user_metadata?.full_name;
    if (fullName && typeof fullName === 'string' && fullName.trim().length > 0) {
      const nameParts = fullName.split(' ');
      if (nameParts.length > 1) {
        return `${nameParts[0][0]}${nameParts[nameParts.length -1][0]}`.toUpperCase();
      }
      return fullName.substring(0, 2).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  const isFoodTruckOperator = user?.user_metadata?.account_type === 'foodTruck';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <TasteTrackerLogo width={32} height={32} />
          <span className="font-bold sm:inline-block text-lg">
            TasteTracker
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/map-dashboard" className="text-sm font-medium">
              <MapPin className="mr-2 h-4 w-4" />
              Map
            </Link>
          </Button>
          {user && (
            <Button variant="ghost" asChild>
              <Link href="/favorites" className="text-sm font-medium">
                <Heart className="mr-2 h-4 w-4" />
                Favorites
              </Link>
            </Button>
          )}
        </nav>
        <div className="flex items-center space-x-2">
          <NotificationToggle />
          <ThemeToggle />
          {isLoading ? (
            <Skeleton className="h-8 w-8 rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    {user.user_metadata?.avatar_url && (
                      <AvatarImage 
                        src={user.user_metadata.avatar_url} 
                        alt={user.user_metadata?.full_name || user.email || 'User Avatar'} 
                      />
                    )}
                    <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Account
                  </Link>
                </DropdownMenuItem>
                {isFoodTruckOperator && (
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/operator">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      My Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
