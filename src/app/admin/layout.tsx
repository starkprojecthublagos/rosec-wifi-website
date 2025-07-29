import type { Metadata } from 'next';
import Link from 'next/link';
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
import { LayoutDashboard, BarChart3, Ticket, Settings, LogOut, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Admin - RoseC Connect',
  description: 'Admin Dashboard for RoseC Connect',
};

const AdminUser = () => (
  <div className="flex items-center gap-3">
    <Avatar className="h-9 w-9">
      <AvatarImage src="https://placehold.co/100x100.png" alt="Admin" data-ai-hint="person avatar" />
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
    <div className="hidden md:block">
      <p className="text-sm font-semibold">Admin User</p>
      <p className="text-xs text-muted-foreground">admin@rosec.com</p>
    </div>
  </div>
);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/40">
      <SidebarProvider>
        <Sidebar side="left" collapsible="icon" className="group-data-[collapsible=icon]:border-r">
          <SidebarHeader className="h-16 flex items-center justify-center p-0">
            <Link href="/" className="flex items-center gap-2 font-bold text-primary">
              <Wifi className="h-7 w-7" />
              <span className="text-lg font-headline group-data-[collapsible=icon]:hidden">RoseC Connect</span>
            </Link>
          </SidebarHeader>
          <Separator />
          <SidebarContent className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={true} tooltip={{ children: 'Dashboard' }}>
                  <Link href="/admin"><LayoutDashboard /><span>Dashboard</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: 'Sales Analytics' }}>
                  <Link href="#"><BarChart3 /><span>Sales Analytics</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: 'Voucher Management' }}>
                  <Link href="#"><Ticket /><span>Vouchers</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={{ children: 'Settings' }}>
                  <Link href="#"><Settings /><span>Settings</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
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
