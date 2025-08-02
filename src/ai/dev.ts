'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/faq-generator.ts';
import '@/ai/flows/voucher-generator.ts';
