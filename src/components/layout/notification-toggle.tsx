"use client";

import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/lib/hooks/use-notifications';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function NotificationToggle() {
  const { permission, requestPermission } = useNotifications();

  const handleToggle = () => {
    if (permission !== 'granted') {
      requestPermission();
    } else {
      // Logic to "disable" app-level notifications if desired, though browser permission remains.
      // For this mock, clicking when granted could show a message or do nothing.
      // Or, it could re-prompt if it was 'default' and now we treat default as off for our app.
      requestPermission(); // Re-running requestPermission handles existing states gracefully.
    }
  };

  const tooltipText = permission === 'granted' ? "Notifications Enabled" : 
                      permission === 'denied' ? "Notifications Blocked" : 
                      "Enable Notifications";

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleToggle} aria-label={tooltipText}>
            {permission === 'granted' ? (
              <Bell className="h-[1.2rem] w-[1.2rem] text-primary" />
            ) : (
              <BellOff className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
