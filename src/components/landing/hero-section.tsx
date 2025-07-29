import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white bg-gradient-hero">
      <Image
        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470"
        alt="University students collaborating"
        fill
        className="absolute inset-0 z-0 object-cover opacity-20"
        data-ai-hint="university students collaborating"
        priority
      />
      <div className="relative z-10 p-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          Seamless Connectivity, Uninterrupted Learning.
        </h1>
        <p className="mx-auto mt-6 max-w-[700px] text-lg text-gray-200 md:text-xl">
          Experience blazing-fast, reliable WiFi designed for the modern student. Professional-grade internet, right in your hostel.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-7 px-8 shadow-premium transition-transform duration-300 ease-in-out hover:scale-105">
            <Link href="#get-started">Get Your Plan</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
