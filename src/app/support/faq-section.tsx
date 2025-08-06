'use client';

import { useState } from 'react';
import { allFaqs, locations } from '@/lib/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function FaqSection() {
    const [selectedLocationId, setSelectedLocationId] = useState<string>('');
    const [selectedHostelId, setSelectedHostelId] = useState<string>('');

    const selectedLocation = locations.find(l => l.id === selectedLocationId);

    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <Card className="mb-8 shadow-premium">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Location-Based Support</CardTitle>
                            <CardDescription>Select your location and hostel to help us provide better support (optional).</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="grid md:grid-cols-2 gap-4">
                                <Select onValueChange={setSelectedLocationId} value={selectedLocationId}>
                                    <SelectTrigger><SelectValue placeholder="Select Location" /></SelectTrigger>
                                    <SelectContent>
                                        {locations.filter(l => l.active).map(location => (
                                            <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select onValueChange={setSelectedHostelId} value={selectedHostelId} disabled={!selectedLocation}>
                                    <SelectTrigger><SelectValue placeholder="Select Hostel" /></SelectTrigger>
                                    <SelectContent>
                                        {selectedLocation?.hostels.filter(h => h.active).map(hostel => (
                                            <SelectItem key={hostel.id} value={hostel.id}>{hostel.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {selectedLocationId && selectedHostelId && (
                                <p className="text-sm text-muted-foreground text-center">
                                    Location selected: {selectedLocation?.name} - {selectedLocation?.hostels.find(h => h.id === selectedHostelId)?.name}
                                </p>
                            )}
                        </CardContent>
                    </Card>

                     <div className="mt-12">
                         <h3 className="font-headline text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h3>
                         <Accordion type="single" collapsible className="w-full">
                            {allFaqs.map((faq, index) => (
                                <AccordionItem value={`item-${index}`} key={index}>
                                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                                    <AccordionContent>{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                     </div>
                </div>
            </div>
        </section>
    );
}
