'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { DataPlan } from '@/lib/data';
import { Loader2, Copy, ShieldCheck } from 'lucide-react';
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
import type { User as FirebaseUser } from 'firebase/auth';

interface PaymentSectionProps {
  selectedPlan: DataPlan;
  user: FirebaseUser | null;
  onPayNow: () => void;
}

type PaymentGateway = 'paystack' | 'flutterwave';

export function PaymentSection({ selectedPlan, user, onPayNow }: PaymentSectionProps) {
  const [isLoading, setIsLoading] = useState<PaymentGateway | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [voucherDetails, setVoucherDetails] = useState<{ transactionRef: string; voucherCode: string } | null>(null);
  const { toast } = useToast();

  const handlePayment = async (gateway: PaymentGateway) => {
    if (!user) {
      onPayNow();
      return;
    }

    setIsLoading(gateway);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a simple voucher code without AI
      const transactionRef = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const voucherCode = `${selectedPlan.name.slice(0, 3).toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

      setVoucherDetails({
        transactionRef,
        voucherCode
      });
      setIsPaid(true);
      toast({
        title: "Payment Successful!",
        description: `Your purchase of the ${selectedPlan.name} plan is complete.`,
      });

    } catch (error) {
      console.error("Payment failed:", error);
      toast({
        title: "Something Went Wrong",
        description: "We couldn't process your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  }

  const closeDialog = () => {
    setIsPaid(false);
    setVoucherDetails(null);
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto shadow-premium transition-all duration-300 hover:shadow-enterprise">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Payment Summary</CardTitle>
            <CardDescription>Confirm your purchase and choose a provider.</CardDescription>
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
            <div className='w-full space-y-3'>
               <Button
                onClick={() => handlePayment('paystack')}
                disabled={!!isLoading || isPaid}
                className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700"
              >
                {isLoading === 'paystack' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                Pay with Paystack
              </Button>
               <Button
                onClick={() => handlePayment('flutterwave')}
                disabled={!!isLoading || isPaid}
                className="w-full h-12 text-lg bg-orange-500 hover:bg-orange-600"
              >
                {isLoading === 'flutterwave' ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                Pay with Flutterwave
              </Button>
            </div>
             <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-2">
              <ShieldCheck className="h-3.5 w-3.5 text-green-600"/> Secure payments guaranteed
            </p>
          </CardFooter>
        </Card>
      </div>
      <AlertDialog open={isPaid && !!voucherDetails} onOpenChange={closeDialog}>
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
                <p className="font-mono font-bold text-lg">{voucherDetails?.voucherCode}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => voucherDetails && copyToClipboard(voucherDetails.voucherCode)}><Copy className="h-4 w-4" /></Button>
            </div>
            <div className="flex items-center justify-between">
               <div>
                <p className="text-sm text-muted-foreground">Transaction Reference</p>
                <p className="font-mono text-sm">{voucherDetails?.transactionRef}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => voucherDetails && copyToClipboard(voucherDetails.transactionRef)}><Copy className="h-4 w-4" /></Button>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeDialog}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
