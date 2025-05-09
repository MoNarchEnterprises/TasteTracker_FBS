import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { MapProvider } from '@/components/map/map-provider';

export const metadata: Metadata = {
  title: 'TasteTracker - Find Your Food Truck',
  description: 'Discover and track your favorite food trucks with TasteTracker.',
  icons: {
    icon: '/favicon.ico', // Make sure to add a favicon.ico to your /public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased flex flex-col min-h-screen`}>
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
