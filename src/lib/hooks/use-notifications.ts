"use client";

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

const NOTIFICATION_PERMISSION_KEY = 'tasteTrackerNotificationPermission';

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission | 'not_set'>('not_set');
  const { toast } = useToast();

  useEffect(() => {
    // Check initial permission from localStorage (user's preference for the app, not browser's actual)
    const storedPermission = localStorage.getItem(NOTIFICATION_PERMISSION_KEY);
    if (storedPermission === 'granted') {
      setPermission('granted');
      // Optionally, re-check browser permission if needed, but for this mock, we trust localStorage
      if (typeof Notification !== 'undefined' && Notification.permission !== 'granted') {
        // Browser permission might have changed, reset app preference
        // localStorage.removeItem(NOTIFICATION_PERMISSION_KEY);
        // setPermission('not_set');
      }
    } else if (storedPermission === 'denied') {
       setPermission('denied');
    } else {
       // If not set, and browser supports Notification API, check actual browser permission
       if (typeof Notification !== 'undefined') {
        setPermission(Notification.permission);
       } else {
        setPermission('denied'); // Notifications not supported
       }
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (typeof Notification === 'undefined') {
      toast({ title: "Notifications not supported", description: "Your browser does not support notifications.", variant: "destructive" });
      setPermission('denied');
      localStorage.setItem(NOTIFICATION_PERMISSION_KEY, 'denied');
      return;
    }

    if (Notification.permission === 'granted') {
      setPermission('granted');
      localStorage.setItem(NOTIFICATION_PERMISSION_KEY, 'granted');
      toast({ title: "Notifications already enabled", description: "You will receive updates about nearby food trucks." });
      return;
    }

    if (Notification.permission === 'denied') {
      setPermission('denied');
      localStorage.setItem(NOTIFICATION_PERMISSION_KEY, 'denied');
      toast({ title: "Notifications blocked", description: "Please enable notifications in your browser settings.", variant: "destructive" });
      return;
    }
    
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === 'granted') {
      localStorage.setItem(NOTIFICATION_PERMISSION_KEY, 'granted');
      toast({ title: "Notifications Enabled!", description: "You will now receive updates about nearby food trucks." });
    } else {
      localStorage.setItem(NOTIFICATION_PERMISSION_KEY, 'denied');
      toast({ title: "Notifications Not Enabled", description: "You chose not to enable notifications.", variant: "destructive" });
    }
  }, [toast]);

  const showMockNotification = useCallback((title: string, body: string) => {
    if (permission === 'granted' && typeof Notification !== 'undefined') {
      try {
        new Notification(title, { body, icon: '/logo-icon.png' }); // Assuming you have a logo icon
      } catch (error) {
        // Fallback for browsers that don't support service worker for notifications directly
        // Or if the icon path is problematic.
        // This is a very basic fallback.
        alert(`${title}\n${body}`);
        console.error("Error showing notification:", error)
      }
      
    } else if (permission !== 'denied' && permission !== 'not_set') {
      // This case is tricky, if permission is default, we should prompt.
      // For simplicity, if not explicitly granted, we don't show.
      // toast({ title: "Enable Notifications", description: "To get alerts, please enable notifications first." });
    }
  }, [permission]);

  return { permission, requestPermission, showMockNotification };
}
