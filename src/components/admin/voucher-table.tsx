
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button"
import { PlusCircle } from "lucide-react"

type EnrichedPurchase = {
    id: string;
    planName: string;
    user: {
        displayName: string;
        email: string;
    } | null
}

interface VoucherTableProps {
    recentSales: EnrichedPurchase[];
}

export default function VoucherTable({ recentSales }: VoucherTableProps) {
    return (
        <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                        An overview of the most recent vouchers sold.
                    </CardDescription>
                </div>
                 <Button asChild size="sm" className="ml-auto gap-1" disabled>
                    <a href="#">
                        Create Voucher
                        <PlusCircle className="h-4 w-4" />
                    </a>
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Plan</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentSales.map((sale) => (
                            <TableRow key={sale.id}>
                                <TableCell>
                                    <div className="font-medium">{sale.user?.displayName || 'N/A'}</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        {sale.user?.email || 'N/A'}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{sale.planName}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
