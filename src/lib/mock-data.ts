import type { FoodTruck } from '@/types';

export const mockFoodTrucks: FoodTruck[] = [
  {
    id: '1',
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    description: 'Authentic Mexican street tacos, burritos, and quesadillas made with fresh ingredients.',
    location: { lat: 34.0522, lng: -118.2437, address: '123 Main St, Los Angeles, CA' },
    availability: 'available',
    menu: [
      { id: 'm1-1', name: 'Carne Asada Taco', price: '$3.50', description: 'Grilled steak taco with onions and cilantro.' , imageUrl: 'https://picsum.photos/seed/carne_taco/200/150' },
      { id: 'm1-2', name: 'Al Pastor Burrito', price: '$10.00', description: 'Marinated pork burrito with pineapple, rice, and beans.', imageUrl: 'https://picsum.photos/seed/pastor_burrito/200/150' },
      { id: 'm1-3', name: 'Chicken Quesadilla', price: '$8.50', description: 'Cheesy chicken quesadilla with a side of salsa.', imageUrl: 'https://picsum.photos/seed/chicken_quesadilla/200/150' },
    ],
    photos: [
      'https://picsum.photos/seed/taco_truck_1/600/400',
      'https://picsum.photos/seed/taco_truck_2/600/400',
      'https://picsum.photos/seed/taco_food_1/600/400',
    ],
    rating: 4.5,
    schedule: 'Mon-Fri: 11am-7pm, Sat: 12pm-5pm',
    contact: { phone: '555-1234', website: 'http://tacofiesta.example.com' }
  },
  {
    id: '2',
    name: 'Burger Bliss',
    cuisine: 'American',
    description: 'Gourmet burgers with creative toppings and hand-cut fries.',
    location: { lat: 34.0550, lng: -118.2500, address: '456 Burger Ave, Los Angeles, CA' },
    availability: 'busy',
    menu: [
      { id: 'm2-1', name: 'Classic Cheeseburger', price: '$9.00', description: 'Juicy beef patty with cheddar, lettuce, tomato, and special sauce.', imageUrl: 'https://picsum.photos/seed/cheeseburger/200/150' },
      { id: 'm2-2', name: 'Spicy Jalapeño Burger', price: '$10.50', description: 'Beef patty with pepper jack, jalapeños, and spicy mayo.', imageUrl: 'https://picsum.photos/seed/jalapeno_burger/200/150' },
      { id: 'm2-3', name: 'Truffle Fries', price: '$5.00', description: 'Crispy fries tossed in truffle oil and parmesan.', imageUrl: 'https://picsum.photos/seed/truffle_fries/200/150' },
    ],
    photos: [
      'https://picsum.photos/seed/burger_truck_1/600/400',
      'https://picsum.photos/seed/burger_food_1/600/400',
    ],
    rating: 4.8,
    schedule: 'Tue-Sun: 12pm-8pm',
    contact: { website: 'http://burgerbliss.example.com' }
  },
  {
    id: '3',
    name: 'Pizza Planet Express',
    cuisine: 'Italian',
    description: 'Delicious wood-fired pizzas with a variety of fresh toppings. Special promotion today!',
    location: { lat: 34.0600, lng: -118.2450, address: '789 Pizza Pl, Los Angeles, CA' },
    availability: 'promotion',
    menu: [
      { id: 'm3-1', name: 'Margherita Pizza', price: '$12.00', description: 'Classic pizza with tomato, mozzarella, and basil.', imageUrl: 'https://picsum.photos/seed/margherita_pizza/200/150' },
      { id: 'm3-2', name: 'Pepperoni Pizza', price: '$14.00', description: 'Loaded with spicy pepperoni and mozzarella.', imageUrl: 'https://picsum.photos/seed/pepperoni_pizza/200/150' },
      { id: 'm3-3', name: 'Veggie Supreme Pizza', price: '$15.00', description: 'Mushrooms, peppers, onions, olives, and mozzarella.', imageUrl: 'https://picsum.photos/seed/veggie_pizza/200/150' },
    ],
    photos: [
      'https://picsum.photos/seed/pizza_truck_1/600/400',
      'https://picsum.photos/seed/pizza_oven/600/400',
    ],
    rating: 4.2,
    schedule: 'Wed-Sun: 5pm-10pm',
    contact: { phone: '555-9876' }
  },
  {
    id: '4',
    name: 'Curry Up Now',
    cuisine: 'Indian',
    description: 'Flavorful Indian curries, biryanis, and street food delights.',
    location: { lat: 34.0480, lng: -118.2550, address: '321 Curry St, Los Angeles, CA' },
    availability: 'available',
    menu: [
      { id: 'm4-1', name: 'Chicken Tikka Masala', price: '$13.00', description: 'Creamy tomato-based chicken curry.', imageUrl: 'https://picsum.photos/seed/tikka_masala/200/150' },
      { id: 'm4-2', name: 'Vegetable Biryani', price: '$11.00', description: 'Aromatic rice dish with mixed vegetables.', imageUrl: 'https://picsum.photos/seed/veg_biryani/200/150' },
      { id: 'm4-3', name: 'Samosas (2 pcs)', price: '$5.00', description: 'Crispy pastry filled with spiced potatoes and peas.', imageUrl: 'https://picsum.photos/seed/samosas/200/150' },
    ],
    photos: [
        'https://picsum.photos/seed/curry_truck_1/600/400',
        'https://picsum.photos/seed/indian_food_1/600/400',
    ],
    rating: 4.6,
    schedule: 'Mon-Sat: 11:30am-2:30pm, 5:30pm-9:00pm',
    contact: { website: 'http://curryup.example.com' }
  }
];

export const getFoodTruckById = async (id: string): Promise<FoodTruck | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFoodTrucks.find(truck => truck.id === id));
    }, 200); // Simulate network delay
  });
};

export const getAllFoodTrucks = async (): Promise<FoodTruck[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFoodTrucks);
    }, 200); // Simulate network delay
  });
};
