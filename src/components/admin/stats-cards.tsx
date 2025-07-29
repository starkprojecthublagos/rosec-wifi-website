import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, Users, Ticket, Activity } from 'lucide-react';

export default function StatsCards() {
    const stats = [
        { title: "Total Revenue", value: "₦45,231.89", change: "+20.1% from last month", icon: DollarSign },
        { title: "Active Subscriptions", value: "+2350", change: "+180.1% from last month", icon: Users },
        { title: "Vouchers Sold", value: "+12,234", change: "+19% from last month", icon: Ticket },
        { title: "Average Sale", value: "₦1,845.32", change: "+2.5% from last month", icon: Activity },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
