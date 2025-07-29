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

const recentSales = [
    { name: "Olivia Martin", email: "olivia.martin@email.com", plan: "Premium", status: "Active" },
    { name: "Jackson Lee", email: "jackson.lee@email.com", plan: "Standard", status: "Active" },
    { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", plan: "Basic", status: "Expired" },
    { name: "William Kim", email: "will@email.com", plan: "Enterprise", status: "Active" },
    { name: "Sofia Davis", email: "sofia.davis@email.com", plan: "Standard", status: "Active" },
]

export default function VoucherTable() {
    return (
        <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                        An overview of the most recent vouchers sold.
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
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
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentSales.map((sale, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className="font-medium">{sale.name}</div>
                                    <div className="hidden text-sm text-muted-foreground md:inline">
                                        {sale.email}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{sale.plan}</Badge>
                                </TableCell>
                                <TableCell>
                                     <Badge variant={sale.status === 'Active' ? 'default' : 'destructive'} className={sale.status === 'Active' ? 'bg-green-500/80' : ''}>
                                        {sale.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
