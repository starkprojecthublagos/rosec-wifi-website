
'use server';

/**
 * @fileOverview Generates a voucher code after a simulated payment and saves it to Firestore.
 *
 * - generateVoucher - A function that creates a transaction reference, a voucher code, and saves records.
 * - VoucherGenerationInput - The input type for the generateVoucher function.
 * - VoucherGenerationOutput - The return type for the generateVoucher function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, writeBatch } from 'firebase/firestore';

const VoucherGenerationInputSchema = z.object({
  planId: z.string().describe('The ID of the plan being purchased.'),
  planName: z.string().describe('The name of the plan being purchased.'),
  planPrice: z.number().describe('The price of the plan being purchased.'),
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

const voucherGeneratorFlow = ai.defineFlow(
  {
    name: 'voucherGeneratorFlow',
    inputSchema: VoucherGenerationInputSchema,
    outputSchema: VoucherGenerationOutputSchema,
  },
  async (input) => {
    const timestamp = Date.now();
    const randomVoucherNum = Math.floor(Math.random() * 1_000_000_000_000).toString().padStart(12, '0');

    const transactionRef = `${input.paymentGateway.toUpperCase()}-${timestamp}`;
    const voucherCode = randomVoucherNum;

    try {
      // Save the generated voucher to the 'vouchers' collection
      const voucherDocRef = await addDoc(collection(db, 'vouchers'), {
        code: voucherCode,
        planId: input.planId,
        planName: input.planName,
        userId: input.userId,
        status: 'Active', // Initial status
        createdAt: serverTimestamp(),
        transactionRef: transactionRef,
      });
      console.log('Voucher document written with ID: ', voucherDocRef.id);

      // Save the purchase record to the 'purchases' collection
      const purchaseDocRef = await addDoc(collection(db, 'purchases'), {
        userId: input.userId,
        planId: input.planId,
        planName: input.planName,
        price: input.planPrice,
        transactionRef: transactionRef,
        purchaseDate: serverTimestamp(),
        voucherId: voucherDocRef.id,
      });
      console.log('Purchase document written with ID: ', purchaseDocRef.id);

    } catch (e) {
      console.error("Error adding document: ", e);
      // In a real app, you might want to handle this error more gracefully
      // For example, by trying to refund the payment if saving fails.
      throw new Error('Failed to save voucher and purchase to the database.');
    }

    return {
      transactionRef,
      voucherCode,
    };
  }
);


const seedVouchersFlow = ai.defineFlow(
  {
    name: 'seedVouchersFlow',
    inputSchema: z.void(),
    outputSchema: z.string(),
  },
  async () => {
    const voucherCodes = [
      '473018', '267835', '567010',
      '959595', '342629', '526049',
      '784821', '986812', '761161',
      '684956', '507390', '155592',
      '681510', '413863', '139555'
    ];

    const planDetails = {
      planId: 'student',
      planName: 'Student Plan',
    };

    try {
      const batch = writeBatch(db);
      const vouchersCollection = collection(db, 'vouchers');

      voucherCodes.forEach(code => {
        const docRef = addDoc(vouchersCollection, {
            code: code,
            planId: planDetails.planId,
            planName: planDetails.planName,
            status: 'Active', // Initial status
            createdAt: serverTimestamp(),
            userId: null, // Not assigned to a user yet
            transactionRef: 'seeded'
        })._key.path.segments.join('/');
        
        // This is a workaround to get a document reference for a new document in a batch
        const newDocRef = doc(db, 'vouchers');
        batch.set(newDocRef, {
           code: code,
           planId: planDetails.planId,
           planName: planDetails.planName,
           status: 'Active',
           createdAt: serverTimestamp(),
           userId: null, 
           transactionRef: 'seeded',
        });
      });

      await batch.commit();
      
      const message = `${voucherCodes.length} vouchers have been successfully seeded to the database.`;
      console.log(message);
      return message;

    } catch (e) {
      console.error("Error seeding vouchers: ", e);
      throw new Error('Failed to seed vouchers to the database.');
    }
  }
);

export async function seedVouchers(): Promise<string> {
    return seedVouchersFlow();
}
