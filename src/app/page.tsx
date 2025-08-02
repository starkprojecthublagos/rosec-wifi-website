'use client';

import { useState, useEffect } from 'react';
import type { DataPlan, Hostel, Location } from '@/lib/data';
import { HeroSection } from '@/components/landing/hero-section';
import { HostelSelector } from '@/components/landing/hostel-selector';
import { DataPlans } from '@/components/landing/data-plans';
import { PaymentSection } from '@/components/landing/payment-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { auth } from '@/lib/firebase';
import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthDialog } from '@/components/auth-dialog';


export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLocationSelect = (location: Location | null) => {
    setSelectedLocation(location);
    setSelectedHostel(null);
    setSelectedPlan(null);
  };

  const handleHostelSelect = (hostel: Hostel | null) => {
    setSelectedHostel(hostel);
    setSelectedPlan(null);
  };

  const handlePlanSelect = (plan: DataPlan) => {
    setSelectedPlan(plan);
  };

  return (
    <>
      <AuthDialog open={isAuthDialogOpen} onOpenChange={setAuthDialogOpen} onAuthSuccess={() => setUser(auth.currentUser)} />
      <HeroSection />
      <div id="get-started" className="scroll-mt-20">
        <HostelSelector
          onLocationSelect={handleLocationSelect}
          onHostelSelect={handleHostelSelect}
        />
      </div>

      {selectedLocation && selectedHostel && (
        <>
          <DataPlans selectedPlan={selectedPlan} onPlanSelect={handlePlanSelect} />
          {selectedPlan && (
            <PaymentSection 
              selectedPlan={selectedPlan} 
              user={user}
              onPayNow={() => setAuthDialogOpen(true)}
            />
          )}
        </>
      )}
      <FeaturesSection />
    </>
  );
}
