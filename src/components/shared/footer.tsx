import Link from 'next/link';
import { Wifi, Twitter, Facebook, Instagram } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <Wifi className="h-7 w-7 text-primary" />
              <span className="font-bold text-lg font-headline text-foreground">Rosec Wifi</span>
            </Link>
            <p className="mt-4 text-sm max-w-xs text-muted-foreground">
              Premium university internet service provider, delivering fast and reliable connectivity to students.
            </p>
             <div className="flex space-x-4 mt-6">
              <Link href="#" aria-label="Twitter" className="text-muted-foreground/60 hover:text-primary transition-colors"><Twitter /></Link>
              <Link href="#" aria-label="Facebook" className="text-muted-foreground/60 hover:text-primary transition-colors"><Facebook /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground/60 hover:text-primary transition-colors"><Instagram /></Link>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/#get-started" className="hover:text-primary transition-colors">Get Started</Link></li>
              <li><Link href="/support" className="hover:text-primary transition-colors">Support</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/admin" className="hover:text-primary transition-colors">Admin</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
             <h3 className="font-semibold text-foreground mb-4">Stay Updated</h3>
             <p className="text-muted-foreground text-sm mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
             <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="bg-background" />
                <Button type="submit">Subscribe</Button>
             </form>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Rosec Wifi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
