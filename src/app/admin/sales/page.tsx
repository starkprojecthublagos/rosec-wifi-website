
'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import SalesChart from "@/components/admin/sales-chart";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import StatsCards from "@/components/admin/stats-cards";
import { Skeleton } from '@/components/ui/skeleton';

type Purchase = {
    price: number;
    purchaseDate: { toDate: () => Date };
};

export default function SalesAnalyticsPage() {
    const [stats, setStats] = useState({ totalRevenue: 0, totalSales: 0, totalUsers: 0 });
    const [salesData, setSalesData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch all purchases for stats and chart
                const purchasesSnapshot = await getDocs(collection(db, "purchases"));
                let totalRevenue = 0;
                const monthlySales = new Array(12).fill(0);
                purchasesSnapshot.forEach(doc => {
                    const purchase = doc.data() as Purchase;
                    totalRevenue += purchase.price;
                    const month = purchase.purchaseDate.toDate().getMonth();
                    monthlySales[month] += purchase.price;
                });
                const totalSales = purchasesSnapshot.size;

                // Fetch total users
                const usersSnapshot = await getDocs(collection(db, "users"));
                const totalUsers = usersSnapshot.size;

                setStats({ totalRevenue, totalSales, totalUsers });

                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                setSalesData(monthlySales.map((total, index) => ({ name: monthNames[index], total })));

            } catch (error) {
                console.error("Error fetching sales data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-6">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Sales Analytics</CardTitle>
                        <CardDescription>Detailed insights into your sales performance.</CardDescription>
                    </div>
                    <Button variant="outline">
                        <FileDown className="mr-2" />
                        Export Report
                    </Button>
                </CardHeader>
            </Card>

            {isLoading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Skeleton className="h-[125px] w-full" />
                    <Skeleton className="h-[125px] w-full" />
                    <Skeleton className="h-[125px] w-full" />
                    <Skeleton className="h-[125px] w-full" />
                </div>
            ) : (
                <StatsCards stats={stats} />
            )}

            <div className="grid gap-6">
                 {isLoading ? (
                    <Skeleton className="h-[450px]" />
                ) : (
                    <SalesChart data={salesData} />
                )}
            </div>
        </div>
    )
}
