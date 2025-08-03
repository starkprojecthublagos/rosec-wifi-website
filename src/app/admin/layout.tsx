'use client';

import { useEffect } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { LogOut, Wifi } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { AdminSidebarItems } from '@/components/admin/admin-sidebar-items';
import { Skeleton } from '@/components/ui/skeleton';


const AdminUser = () => (
  <div className="flex items-center gap-3">
    <Avatar className="h-9 w-9">
      <AvatarImage src="https://placehold.co/100x100.png" alt="Admin" data-ai-hint="person avatar" />
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
    <div className="hidden md:block">
      <p className="text-sm font-semibold">Admin User</p>
      <p className="text-xs text-muted-foreground">edafesonvictor@gmail.com</p>
    </div>
  </div>
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (!user || user.email !== 'edafesonvictor@gmail.com') {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Render a loading state while checking auth
  if (auth.currentUser?.email !== 'edafesonvictor@gmail.com') {
    return (
      <div className="flex h-screen items-center justify-center">
        <Skeleton className="h-full w-full" />
      </div>
    );
  }

  return (
    <div className="bg-muted/40">
      <SidebarProvider>
        <Sidebar side="left" collapsible="icon" className="group-data-[collapsible=icon]:border-r">
          <SidebarHeader className="h-16 flex items-center justify-center p-0">
            <Link href="/" className="flex items-center gap-2 font-bold text-primary">
              <Wifi className="h-7 w-7" />
              <span className="text-lg font-headline group-data-[collapsible=icon]:hidden">Rosec Wifi</span>
            </Link>
          </SidebarHeader>
          <Separator />
          <SidebarContent className="p-2">
            <AdminSidebarItems />
          </SidebarContent>
          <Separator />
          <SidebarFooter className="p-2">
             <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={{ children: 'Logout' }}>
                        <Link href="#"><LogOut /><span>Logout</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
             <h1 className="text-xl font-semibold font-headline hidden md:block">Admin Dashboard</h1>
            <div className="ml-auto flex items-center gap-4">
              <AdminUser />
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
