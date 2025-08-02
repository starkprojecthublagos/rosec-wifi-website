
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, Users, Ticket, Activity } from 'lucide-react';

interface StatsCardsProps {
    stats: {
        totalRevenue: number;
        totalSales: number;
        totalUsers: number;
    }
}

export default function StatsCards({ stats }: StatsCardsProps) {
    const { totalRevenue, totalSales, totalUsers } = stats;
    
    const statsData = [
        { title: "Total Revenue", value: `₦${totalRevenue.toLocaleString()}`, change: "All time revenue", icon: DollarSign },
        { title: "Total Sales", value: `+${totalSales.toLocaleString()}`, change: "Total vouchers sold", icon: Ticket },
        { title: "Total Users", value: `+${totalUsers.toLocaleString()}`, change: "Total registered users", icon: Users },
        { title: "Average Sale", value: `₦${(totalSales > 0 ? totalRevenue / totalSales : 0).toFixed(2)}`, change: "Average revenue per sale", icon: Activity },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
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
