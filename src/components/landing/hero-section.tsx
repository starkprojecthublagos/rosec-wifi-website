import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white bg-gradient-hero">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="University students using laptops"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-20"
        data-ai-hint="university students"
        priority
      />
      <div className="relative z-10 p-4">
        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          Premium University Internet
        </h1>
        <p className="mx-auto mt-4 max-w-[700px] text-lg text-gray-300 md:text-xl">
          Experience seamless, high-speed WiFi designed for the modern student. Professional connectivity, right in your hostel.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-7 px-8 shadow-premium transition-transform duration-300 ease-in-out hover:scale-105">
            <Link href="#get-started">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
