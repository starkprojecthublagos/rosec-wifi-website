'use client';

import { useState } from 'react';
import { generateLocationAwareFaqs, LocationAwareFaqsOutput } from '@/ai/flows/faq-generator';
import { allFaqs, locations } from '@/lib/data';
import type { Location, Hostel } from '@/lib/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function FaqSection() {
    const [selectedLocationId, setSelectedLocationId] = useState<string>('');
    const [selectedHostelId, setSelectedHostelId] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [relevantFaqs, setRelevantFaqs] = useState<LocationAwareFaqsOutput | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFetchFaqs = async () => {
        const location = locations.find(l => l.id === selectedLocationId);
        const hostel = location?.hostels.find(h => h.id === selectedHostelId);

        if (!location || !hostel) {
            setError('Please select a valid location and hostel.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setRelevantFaqs(null);

        try {
            const allFaqsString = allFaqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n');
            const result = await generateLocationAwareFaqs({
                location: location.name,
                hostel: hostel.name,
                allFaqs: allFaqsString
            });
            setRelevantFaqs(result);
        } catch (e) {
            console.error(e);
            setError('Failed to fetch relevant FAQs. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const selectedLocation = locations.find(l => l.id === selectedLocationId);

    const parsedFaqs = relevantFaqs?.relevantFaqs.split('\n\n').map(faqBlock => {
        const parts = faqBlock.split('\n');
        const question = parts.find(p => p.startsWith('Q: '))?.substring(3);
        const answer = parts.find(p => p.startsWith('A: '))?.substring(3);
        return { question, answer };
    }).filter(faq => faq.question && faq.answer);

    return (
        <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <Card className="mb-8 shadow-premium">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Find Location-Specific Answers</CardTitle>
                            <CardDescription>Select your location and hostel to see FAQs tailored for you, powered by AI.</CardDescription>
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
                            <Button onClick={handleFetchFaqs} disabled={isLoading || !selectedLocationId || !selectedHostelId} className="w-full">
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Get Relevant FAQs
                            </Button>
                        </CardContent>
                    </Card>

                    {error && <p className="text-destructive text-center">{error}</p>}
                    
                    {isLoading && <div className="text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" /></div>}

                    {parsedFaqs && parsedFaqs.length > 0 && (
                        <div>
                            <h3 className="font-headline text-2xl font-bold mb-4 text-center">Most Relevant For You</h3>
                             <Accordion type="single" collapsible className="w-full">
                                {parsedFaqs.map((faq, index) => (
                                    <AccordionItem value={`item-${index}`} key={index}>
                                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                                        <AccordionContent>{faq.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    )}

                    {relevantFaqs && parsedFaqs?.length === 0 && (
                        <p className="text-center text-muted-foreground">No specific FAQs found for your selection. Here are some general ones:</p>
                    )}

                     <div className="mt-12">
                         <h3 className="font-headline text-2xl font-bold mb-4 text-center">All Frequently Asked Questions</h3>
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
