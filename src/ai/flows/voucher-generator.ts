
'use server';

/**
 * @fileOverview Generates a voucher code after a simulated payment.
 *
 * - generateVoucher - A function that creates a transaction reference and a voucher code.
 * - VoucherGenerationInput - The input type for the generateVoucher function.
 * - VoucherGenerationOutput - The return type for the generateVoucher function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VoucherGenerationInputSchema = z.object({
  planId: z.string().describe('The ID of the plan being purchased.'),
  planName: z.string().describe('The name of the plan being purchased.'),
  userId: z.string().describe('The ID of the user making the purchase.'),
  paymentGateway: z.string().describe('The payment gateway used (e.g., Paystack, Flutterwave).'),
});

export type VoucherGenerationInput = z.infer<typeof VoucherGenerationInputSchema>;

const VoucherGenerationOutputSchema = z.object({
  transactionRef: z.string().describe('A unique transaction reference code.'),
  voucherCode: z.string().describe('The generated WiFi voucher code.'),
});

export type VoucherGenerationOutput = z.infer<typeof VoucherGenerationOutputSchema>;

export async function generateVoucher(input: VoucherGenerationInput): Promise<VoucherGenerationOutput> {
  return voucherGeneratorFlow(input);
}

// This is a simple flow that simulates voucher generation.
// In a real application, this would involve more complex logic,
// like ensuring voucher code uniqueness and saving records to a database.
const voucherGeneratorFlow = ai.defineFlow(
  {
    name: 'voucherGeneratorFlow',
    inputSchema: VoucherGenerationInputSchema,
    outputSchema: VoucherGenerationOutputSchema,
  },
  async (input) => {
    // Simulate generating a unique reference and code
    const timestamp = Date.now();
    
    // Generate a 12-digit numeric string, padded with leading zeros if necessary.
    const randomVoucherNum = Math.floor(Math.random() * 1_000_000_000_000).toString().padStart(12, '0');

    const transactionRef = `${input.paymentGateway.toUpperCase()}-${timestamp}`;
    const voucherCode = randomVoucherNum;
    
    // In a real app, you would now save this to your Firestore database,
    // associating the voucher with the user and plan.
    console.log(`Generated voucher ${voucherCode} for user ${input.userId} and plan ${input.planName}`);

    return {
      transactionRef,
      voucherCode,
    };
  }
);
