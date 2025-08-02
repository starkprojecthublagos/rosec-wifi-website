"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutDashboard, BarChart3, Ticket, Settings, UploadCloud, MessageSquare, Users } from 'lucide-react';

const adminNavItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/sales", label: "Sales Analytics", icon: BarChart3 },
    { href: "/admin/vouchers", label: "Vouchers", icon: Ticket },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/support", label: "Support", icon: MessageSquare },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebarItems() {
    const pathname = usePathname();

    return (
        <SidebarMenu>
            {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton 
                        asChild 
                        isActive={pathname === item.href} 
                        tooltip={{ children: item.label }}
                    >
                        <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}
