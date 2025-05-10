
import type { Metadata } from 'next';
// import { GeistSans } from 'geist/font/sans'; // Removed GeistSans
// import { GeistMono } from 'geist/font/mono';   // Removed GeistMono
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { MapProvider } from '@/components/map/map-provider';

export const metadata: Metadata = {
  title: 'TasteTracker - Find Your Food Truck',
  description: 'Discover and track your favorite food trucks with TasteTracker.',
  // icons: { // Removed favicon to prevent 500 error as per guidelines
  //   icon: '/favicon.ico', 
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Using system default sans-serif and monospace fonts by removing Geist variables */}
      <body className="antialiased flex flex-col min-h-screen">
        <MapProvider>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </MapProvider>
      </body>
    </html>
  );
}
