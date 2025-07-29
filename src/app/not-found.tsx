import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WifiOff } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4 bg-background">
      <WifiOff className="h-24 w-24 text-destructive/70 mb-4" />
      <h1 className="text-6xl md:text-9xl font-black font-headline text-primary opacity-20">404</h1>
      <h2 className="mt-[-2rem] md:mt-[-4rem] text-2xl md:text-4xl font-bold font-headline">Page Not Found</h2>
      <p className="mt-4 max-w-md text-muted-foreground">
        Oops! It seems you've lost connection to our pages. The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="mt-8" size="lg">
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
