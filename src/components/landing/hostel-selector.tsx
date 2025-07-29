'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { locations } from '@/lib/data';
import type { Location, Hostel } from '@/lib/data';

interface HostelSelectorProps {
  onLocationSelect: (location: Location | null) => void;
  onHostelSelect: (hostel: Hostel | null) => void;
}

export function HostelSelector({ onLocationSelect, onHostelSelect }: HostelSelectorProps) {
  const [selectedLocationId, setSelectedLocationId] = useState<string>('');
  const [selectedHostelId, setSelectedHostelId] = useState<string>('');

  const handleLocationChange = (id: string) => {
    setSelectedLocationId(id);
    setSelectedHostelId('');
    const location = locations.find((l) => l.id === id) || null;
    onLocationSelect(location);
    onHostelSelect(null);
  };

  const handleHostelChange = (id: string) => {
    setSelectedHostelId(id);
    const location = locations.find((l) => l.id === selectedLocationId);
    const hostel = location?.hostels.find((h) => h.id === id) || null;
    onHostelSelect(hostel);
  };

  const selectedLocation = locations.find((l) => l.id === selectedLocationId);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto shadow-premium border-2 border-primary/10">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">Select Your Residence</CardTitle>
            <CardDescription>Choose your location and hostel to view available data plans.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <label className="font-medium">Location</label>
                <Select onValueChange={handleLocationChange} value={selectedLocationId}>
                  <SelectTrigger className="w-full h-12 text-lg">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.id} value={location.id} disabled={!location.active}>
                        {location.name} {!location.active && '(Coming Soon)'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedLocation && (
                <div className="grid gap-2">
                  <label className="font-medium">Hostel</label>
                  <Select onValueChange={handleHostelChange} value={selectedHostelId} disabled={!selectedLocationId}>
                    <SelectTrigger className="w-full h-12 text-lg" >
                      <SelectValue placeholder="Select a hostel" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedLocation.hostels.map((hostel) => (
                        <SelectItem key={hostel.id} value={hostel.id} disabled={!hostel.active}>
                          {hostel.name} {!hostel.active && '(Unavailable)'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
