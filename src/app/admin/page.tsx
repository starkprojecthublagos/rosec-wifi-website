import StatsCards from "@/components/admin/stats-cards";
import SalesChart from "@/components/admin/sales-chart";
import VoucherTable from "@/components/admin/voucher-table";

export default function AdminPage() {
    return (
        <div className="space-y-6">
            <StatsCards />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <SalesChart />
                <VoucherTable />
            </div>
        </div>
    );
}
