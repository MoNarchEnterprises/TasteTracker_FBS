export type AvailabilityStatus = 'available' | 'busy' | 'promotion';

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description?: string;
  imageUrl?: string;
}

export interface FoodTruck {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  availability: AvailabilityStatus;
  menu: MenuItem[];
  photos: string[]; // URLs
  rating: number; // 1-5
  schedule: string; // e.g., "Mon-Fri: 11am-3pm, Sat: 12pm-4pm"
  contact?: {
    phone?: string;
    website?: string;
  };
}
