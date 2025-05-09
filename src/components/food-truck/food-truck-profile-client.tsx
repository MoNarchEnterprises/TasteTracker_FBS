"use client";

import type { FoodTruck, MenuItem } from '@/types';
import Image from 'next/image';
import { Star, MapPin, Phone, Globe, Clock } from 'lucide-react';
import { FollowButton } from './follow-button';
import { AvailabilityIndicator } from './availability-indicator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FoodTruckProfileClientProps {
  truck: FoodTruck;
}

export default function FoodTruckProfileClient({ truck }: FoodTruckProfileClientProps) {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <Card className="overflow-hidden">
        <CardHeader className="relative p-0 h-64 md:h-80">
          {truck.photos.length > 0 && (
            <Image
              src={truck.photos[0]}
              alt={`Main photo of ${truck.name}`}
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint="food truck main"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-4xl font-bold text-white shadow-md">{truck.name}</h1>
            <p className="text-lg text-gray-200 shadow-sm">{truck.cuisine}</p>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(truck.rating) ? 'fill-amber-500' : 'fill-gray-300'}`} />
                ))}
                <span className="ml-2 text-foreground">{truck.rating.toFixed(1)} stars</span>
              </div>
              <AvailabilityIndicator status={truck.availability} size="md" />
            </div>
            <FollowButton truckId={truck.id} size="lg" />
          </div>
          <p className="mt-4 text-muted-foreground">{truck.description}</p>
        </CardContent>
      </Card>

      {/* Details Section */}
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {truck.location.address && (
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 mt-1 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-muted-foreground">{truck.location.address}</p>
                <Button variant="link" size="sm" className="p-0 h-auto" asChild>
                  <Link href={`/?selectedTruckId=${truck.id}`} target="_blank" rel="noopener noreferrer">
                    View on Map
                  </Link>
                </Button>
              </div>
            </div>
          )}
          <div className="flex items-start">
            <Clock className="w-5 h-5 mr-3 mt-1 text-primary shrink-0" />
            <div>
              <h4 className="font-semibold">Hours</h4>
              <p className="text-muted-foreground whitespace-pre-line">{truck.schedule}</p>
            </div>
          </div>
          {truck.contact?.phone && (
            <div className="flex items-start">
              <Phone className="w-5 h-5 mr-3 mt-1 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold">Phone</h4>
                <a href={`tel:${truck.contact.phone}`} className="text-muted-foreground hover:text-primary">{truck.contact.phone}</a>
              </div>
            </div>
          )}
          {truck.contact?.website && (
            <div className="flex items-start">
              <Globe className="w-5 h-5 mr-3 mt-1 text-primary shrink-0" />
              <div>
                <h4 className="font-semibold">Website</h4>
                <a href={truck.contact.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary break-all">{truck.contact.website}</a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Menu and Photos Tabs */}
      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-1/2">
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>
        <TabsContent value="menu">
          <Card>
            <CardHeader>
              <CardTitle>Menu</CardTitle>
            </CardHeader>
            <CardContent>
              {truck.menu.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {truck.menu.map((item: MenuItem) => (
                    <AccordionItem value={item.id} key={item.id}>
                      <AccordionTrigger>
                        <div className="flex justify-between items-center w-full pr-2">
                          <span className="font-medium">{item.name}</span>
                          <Badge variant="secondary">{item.price}</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        {item.imageUrl && (
                           <Image
                              src={item.imageUrl}
                              alt={item.name}
                              width={150}
                              height={100}
                              className="rounded-md object-cover aspect-[3/2]"
                              data-ai-hint="menu item food"
                            />
                        )}
                        {item.description && <p className="text-sm text-muted-foreground">{item.description}</p>}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className="text-muted-foreground">Menu currently not available.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="photos">
          <Card>
            <CardHeader>
              <CardTitle>Photo Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              {truck.photos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {truck.photos.map((photoUrl: string, index: number) => (
                    <div key={index} className="aspect-square relative rounded-lg overflow-hidden shadow-md">
                      <Image
                        src={photoUrl}
                        alt={`${truck.name} photo ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="food truck gallery"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No photos available yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
