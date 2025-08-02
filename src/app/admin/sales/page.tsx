
import SalesChart from "@/components/admin/sales-chart";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import StatsCards from "@/components/admin/stats-cards";

export default function SalesAnalyticsPage() {
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

            <StatsCards />

            <div className="grid gap-6">
                <SalesChart />
            </div>
        </div>
    )
}
