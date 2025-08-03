'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/faq-generator.ts';
import '@/ai/flows/voucher-generator.ts';
import { seedVouchers } from '@/ai/flows/voucher-generator.ts';

// To run this seeding function, you could expose it via an admin UI button
// or run it once via a script. For now, it is available to be called.
// Example: `await seedVouchers();`
