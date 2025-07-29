'use server';

/**
 * @fileOverview Generates location-aware FAQs.
 *
 * - generateLocationAwareFaqs - A function that generates FAQs tailored to a specific location.
 * - LocationAwareFaqsInput - The input type for the generateLocationAwareFaqs function.
 * - LocationAwareFaqsOutput - The return type for the generateLocationAwareFaqs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LocationAwareFaqsInputSchema = z.object({
  location: z.string().describe('The location for which to tailor the FAQs.'),
  hostel: z.string().describe('The hostel within the location for which to tailor the FAQs.'),
  allFaqs: z.string().describe('All FAQs available on the FAQ page.'),
});

export type LocationAwareFaqsInput = z.infer<typeof LocationAwareFaqsInputSchema>;

const LocationAwareFaqsOutputSchema = z.object({
  relevantFaqs: z.string().describe('FAQs most relevant to the specified location and hostel.'),
});

export type LocationAwareFaqsOutput = z.infer<typeof LocationAwareFaqsOutputSchema>;

export async function generateLocationAwareFaqs(input: LocationAwareFaqsInput): Promise<LocationAwareFaqsOutput> {
  return locationAwareFaqsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'locationAwareFaqsPrompt',
  input: {schema: LocationAwareFaqsInputSchema},
  output: {schema: LocationAwareFaqsOutputSchema},
  prompt: `You are an expert customer service AI, specializing in providing FAQs that are relevant to a user's location and hostel within that location.\

You will be provided with the location and hostel of the user, as well as all FAQs available on the FAQ page. You will determine which FAQs are most relevant to the user's location and hostel, and return only those FAQs.  Irrelevant FAQs are not returned.\

Location: {{{location}}}
Hostel: {{{hostel}}}
All FAQs: {{{allFaqs}}}`,
});

const locationAwareFaqsFlow = ai.defineFlow({
    name: 'locationAwareFaqsFlow',
    inputSchema: LocationAwareFaqsInputSchema,
    outputSchema: LocationAwareFaqsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
