'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { DataPlan } from '@/lib/data';
import { Loader2, Check, Copy, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface PaymentSectionProps {
  selectedPlan: DataPlan;
}

export function PaymentSection({ selectedPlan }: PaymentSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');
  const { toast } = useToast();

  const handlePayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      const ref = `TXN-${Date.now()}`;
      setTransactionRef(ref);
      setIsLoading(false);
      setIsPaid(true);
      toast({
        title: "Payment Successful!",
        description: `Your purchase of the ${selectedPlan.name} plan is complete.`,
        variant: "default",
      });
    }, 2000);
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  }

  const voucherCode = `VC-${transactionRef.substring(4, 10)}`;

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto shadow-premium transition-all duration-300 hover:shadow-enterprise">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Payment Summary</CardTitle>
            <CardDescription>Confirm your purchase details below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Plan:</span>
              <span className="font-semibold">{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Data:</span>
              <span className="font-semibold">{selectedPlan.data}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Validity:</span>
              <span className="font-semibold">{selectedPlan.validity}</span>
            </div>
            <div className="border-t pt-4 flex justify-between items-center text-lg">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-bold text-primary">₦{selectedPlan.price.toLocaleString()}</span>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button
              onClick={handlePayment}
              disabled={isLoading || isPaid}
              className="w-full h-12 text-lg bg-accent hover:bg-accent/90"
            >
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isPaid && <Check className="mr-2 h-5 w-5" />}
              {isPaid ? 'Payment Confirmed' : isLoading ? 'Processing...' : 'Pay with Paystack'}
            </Button>
             <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-green-600"/> Secure payments powered by Paystack
            </p>
          </CardFooter>
        </Card>
      </div>
      <AlertDialog open={isPaid && !!transactionRef} onOpenChange={() => setIsPaid(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-headline text-2xl">Purchase Confirmed!</AlertDialogTitle>
            <AlertDialogDescription>
              Your voucher code and transaction details are below. Please copy and save them.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4 p-4 bg-muted rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Voucher Code</p>
                <p className="font-mono font-bold text-lg">{voucherCode}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(voucherCode)}><Copy className="h-4 w-4" /></Button>
            </div>
            <div className="flex items-center justify-between">
               <div>
                <p className="text-sm text-muted-foreground">Transaction Reference</p>
                <p className="font-mono">{transactionRef}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => copyToClipboard(transactionRef)}><Copy className="h-4 w-4" /></Button>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsPaid(false)}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
