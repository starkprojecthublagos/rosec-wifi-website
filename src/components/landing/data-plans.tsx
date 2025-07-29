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
          <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">Choose Your Plan</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We have a variety of plans to suit every need and budget.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {dataPlans.map((plan) => {
            const isSelected = selectedPlan?.id === plan.id;
            return (
              <Card
                key={plan.id}
                className={cn(
                  'flex flex-col transition-all duration-300 ease-in-out hover:shadow-premium hover:-translate-y-2',
                  isSelected && 'border-2 border-primary shadow-enterprise',
                  plan.bestValue && 'relative overflow-hidden border-accent'
                )}
              >
                {plan.bestValue && (
                  <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Best Value
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <span className="text-4xl font-bold">₦{plan.price.toLocaleString()}</span>
                    <span className="text-muted-foreground">/{plan.validity}</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>{plan.data} Data</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>High-Speed Access</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => onPlanSelect(plan)}
                    className={cn('w-full', isSelected ? 'bg-primary' : 'bg-secondary text-secondary-foreground')}
                    variant={isSelected ? 'default' : 'secondary'}
                  >
                    {isSelected ? 'Selected' : 'Choose Plan'}
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
