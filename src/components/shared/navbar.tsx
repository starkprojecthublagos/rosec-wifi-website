
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Wifi, LogOut, LayoutDashboard, User } from 'lucide-react';
import { AuthDialog } from '../auth-dialog';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/contexts/auth-context';


export function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/support', label: 'Support' },
    { href: '/about', label: 'About' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };
  
  const handleLogout = async () => {
    await logout();
  };

  const NavItems = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={handleLinkClick}
          className={cn(
            'transition-colors hover:text-primary font-medium',
            pathname === link.href ? 'text-primary' : 'text-muted-foreground'
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
            <span className="text-lg font-bold font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Rosec Wifi</span>
          </Link>
          <div className="hidden md:flex flex-1 items-center gap-6 text-sm">
            <NavItems />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            {!loading && (
              user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.photoURL || `https://placehold.co/100x100.png`} alt={user.displayName || 'User'} data-ai-hint="person avatar" />
                      <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link href="/dashboard"><LayoutDashboard /><span>Dashboard</span></Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/profile"><User /><span>Profile</span></Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/support">Support</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" onClick={() => setAuthDialogOpen(true)}>
                  Login
                </Button>
                <Button className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setAuthDialogOpen(true)}>
                  Sign Up
                </Button>
              </>
            ))}
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
                  <span className="text-lg font-bold font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Rosec Wifi</span>
                </Link>
                <nav className="flex flex-col gap-4 text-lg">
                  <NavItems />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <AuthDialog open={isAuthDialogOpen} onOpenChange={setAuthDialogOpen} onAuthSuccess={() => {}} />
    </>
  );
}
