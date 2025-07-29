'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Wifi } from 'lucide-react';
import { AuthDialog } from '../auth-dialog';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/support', label: 'Support' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const NavItems = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={handleLinkClick}
          className={cn(
            'transition-colors hover:text-primary',
            pathname === link.href ? 'text-primary font-semibold' : 'text-muted-foreground'
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Wifi className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg font-headline">RoseC Connect</span>
          </Link>
          <div className="hidden md:flex flex-1 items-center gap-6 text-sm">
            <NavItems />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" onClick={() => setAuthDialogOpen(true)}>
              Login
            </Button>
            <Button className="hidden sm:inline-flex bg-gradient-to-r from-primary to-secondary text-primary-foreground" onClick={() => setAuthDialogOpen(true)}>
              Sign Up
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
                  <Wifi className="h-7 w-7 text-primary" />
                  <span className="font-bold text-lg font-headline">RoseC Connect</span>
                </Link>
                <nav className="flex flex-col gap-4 text-lg">
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <AuthDialog open={isAuthDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  );
}
