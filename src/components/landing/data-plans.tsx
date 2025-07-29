import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { dataPlans } from '@/lib/data';
import type { DataPlan } from '@/lib/data';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface DataPlansProps {
  selectedPlan: DataPlan | null;
  onPlanSelect: (plan: DataPlan) => void;
}

export function DataPlans({ selectedPlan, onPlanSelect }: DataPlansProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">Choose Your Perfect Plan</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Affordable, high-speed plans designed for every student's needs and budget.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {dataPlans.map((plan) => {
            const isSelected = selectedPlan?.id === plan.id;
            return (
              <Card
                key={plan.id}
                className={cn(
                  'flex flex-col transition-all duration-300 ease-in-out hover:shadow-premium hover:-translate-y-2',
                  isSelected && 'ring-2 ring-primary shadow-enterprise',
                  plan.bestValue && 'relative overflow-hidden border-accent/50 ring-2 ring-accent'
                )}
              >
                {plan.bestValue && (
                  <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-4 py-1.5 rounded-bl-lg">
                    Best Value
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <div className="mb-4">
                    <span className="text-4xl font-bold">₦{plan.price.toLocaleString()}</span>
                    <span className="text-muted-foreground">/{plan.validity}</span>
                  </div>
                  <ul className="space-y-3 text-sm">
                    {plan.features.map((feature, i) => (
                       <li className="flex items-center gap-3" key={i}>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => onPlanSelect(plan)}
                    className={cn('w-full', isSelected && 'bg-primary hover:bg-primary/90')}
                    variant={isSelected ? 'default' : 'outline'}
                    size="lg"
                  >
                    {isSelected ? 'Plan Selected' : 'Choose Plan'}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
