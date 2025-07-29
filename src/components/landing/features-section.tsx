import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, ShieldCheck, Zap, Coins } from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Student-First Pricing',
    description: 'Affordable data plans tailored to fit a student budget without compromising on quality.',
  },
  {
    icon: ShieldCheck,
    title: '24/7 Support & Security',
    description: 'Our dedicated support team is always available, and our network is secured to protect your data.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Speed',
    description: 'Enjoy high-speed internet for streaming, gaming, and online classes without interruptions.',
  },
  {
    icon: Coins,
    title: 'No Hidden Fees',
    description: 'Transparent pricing with no surprises. What you see is what you pay.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">Why Choose RoseC Connect?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We are committed to providing the best internet experience on campus.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="text-center bg-muted/30 hover:bg-muted/60 transition-colors">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
