
import Image from 'next/image';
import { Wifi, Target, Eye } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="relative py-20 md:py-32 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl font-headline">About Rosec Wifi</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Connecting students with fast, reliable, and affordable internet. We're dedicated to empowering the next generation through digital access.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-headline text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground text-lg mb-6">
                Founded by a team of passionate technologists and former students, Rosec Wifi was born from a simple observation: students need better internet. We experienced firsthand the frustration of slow, unreliable connections that hindered learning and communication. We knew there had to be a better way.
              </p>
              <p className="text-muted-foreground text-lg">
                Today, we are on a mission to bridge the digital divide in university hostels across the nation, providing top-tier infrastructure and student-friendly pricing to ensure every student has the tools they need to succeed.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1611223930232-2a0a2a781373?q=80&w=1470"
              alt="Our team"
              width={600}
              height={400}
              className="rounded-lg shadow-premium"
              data-ai-hint="nigerian students smiling"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold">Our Mission & Vision</h2>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide seamless, high-speed internet connectivity to every student in university residences, fostering an environment where learning and innovation can thrive without digital barriers.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline mb-2">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be the leading and most trusted provider of student internet services, recognized for our commitment to quality, affordability, and exceptional customer support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
