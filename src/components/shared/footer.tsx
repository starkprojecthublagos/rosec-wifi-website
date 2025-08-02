import Link from 'next/link';
import { Wifi, Twitter, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <Wifi className="h-7 w-7 text-primary" />
              <span className="font-bold text-lg font-headline text-foreground">Rosec Connect</span>
            </Link>
            <p className="mt-2 text-sm max-w-xs">
              Premium university internet service provider, delivering fast and reliable connectivity to students.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/#get-started" className="hover:text-primary transition-colors">Get Started</Link></li>
                <li><Link href="/support" className="hover:text-primary transition-colors">Support</Link></li>
                <li><Link href="/admin" className="hover:text-primary transition-colors">Admin</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 md:mt-0">
             <h3 className="font-semibold text-foreground mb-3 text-center md:text-left">Follow Us</h3>
            <div className="flex space-x-4">
              <span className="cursor-not-allowed text-muted-foreground/50"><Twitter /></span>
              <span className="cursor-not-allowed text-muted-foreground/50"><Facebook /></span>
              <span className="cursor-not-allowed text-muted-foreground/50"><Instagram /></span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm">
          <p>&copy; {currentYear} Rosec Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
