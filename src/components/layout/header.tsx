import Link from 'next/link';
import { MapPin, Heart, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { NotificationToggle } from '@/components/layout/notification-toggle';
import { TasteTrackerLogo } from '@/components/icons';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <TasteTrackerLogo className="h-8 w-8" />
          <span className="font-bold sm:inline-block text-lg">
            TasteTracker
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="text-sm font-medium">
              <MapPin className="mr-2 h-4 w-4" />
              Map
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/favorites" className="text-sm font-medium">
              <Heart className="mr-2 h-4 w-4" />
              Favorites
            </Link>
          </Button>
        </nav>
        <div className="flex items-center space-x-2">
          <NotificationToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
