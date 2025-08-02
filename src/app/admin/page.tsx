
'use client';

import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import StatsCards from "@/components/admin/stats-cards";
import SalesChart from "@/components/admin/sales-chart";
import VoucherTable from "@/components/admin/voucher-table";
import { WelcomeAdmin } from "@/components/admin/welcome-admin";
import { Skeleton } from "@/components/ui/skeleton";

type Purchase = {
    id: string;
    planName: string;
    purchaseDate: { toDate: () => Date };
    price: number;
    userId: string;
};

type User = {
    id: string;
    displayName: string;
    email: string;
};

type EnrichedPurchase = Omit<Purchase, 'userId'> & { user: User | null };

async function fetchUsers(userIds: string[]) {
    if (userIds.length === 0) return new Map();
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "in", userIds));
    const querySnapshot = await getDocs(q);
    const usersMap = new Map<string, User>();
    querySnapshot.forEach(doc => {
        const data = doc.data();
        usersMap.set(data.uid, { id: doc.id, displayName: data.displayName, email: data.email });
    });
    return usersMap;
}

export default function AdminPage() {
    const [stats, setStats] = useState({ totalRevenue: 0, totalSales: 0, totalUsers: 0 });
    const [salesData, setSalesData] = useState<any[]>([]);
    const [recentSales, setRecentSales] = useState<EnrichedPurchase[]>([]);
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
                
                // Fetch recent sales
                const recentSalesQuery = query(collection(db, "purchases"), orderBy("purchaseDate", "desc"), limit(5));
                const recentSalesSnapshot = await getDocs(recentSalesQuery);
                const salesDocs = recentSalesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Purchase));
                
                const userIds = [...new Set(salesDocs.map(sale => sale.userId))];
                const usersMap = await fetchUsers(userIds);
                
                const enrichedSales = salesDocs.map(sale => ({
                    ...sale,
                    user: usersMap.get(sale.userId) || null
                }));

                setRecentSales(enrichedSales);

            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <WelcomeAdmin />
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                {isLoading ? (
                    <>
                        <Skeleton className="lg:col-span-4 h-[422px]" />
                        <Skeleton className="lg:col-span-3 h-[422px]" />
                    </>
                ) : (
                    <>
                        <SalesChart data={salesData} />
                        <VoucherTable recentSales={recentSales} />
                    </>
                )}
            </div>
        </div>
    );
}
