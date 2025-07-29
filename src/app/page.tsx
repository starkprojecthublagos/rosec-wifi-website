'use client';

import { useState } from 'react';
import type { DataPlan, Hostel, Location } from '@/lib/data';
import { HeroSection } from '@/components/landing/hero-section';
import { HostelSelector } from '@/components/landing/hostel-selector';
import { DataPlans } from '@/components/landing/data-plans';
import { PaymentSection } from '@/components/landing/payment-section';
import { FeaturesSection } from '@/components/landing/features-section';

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedHostel, setSelectedHostel] = useState<Hostel | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null);

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
          {selectedPlan && <PaymentSection selectedPlan={selectedPlan} />}
        </>
      )}
      <FeaturesSection />
    </>
  );
}
