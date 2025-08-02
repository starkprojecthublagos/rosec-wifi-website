import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UploadCloud, FileDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const vouchers = [
    { code: 'RC-SDFG-829', plan: 'Premium', status: 'Used', customer: 'test@example.com' },
    { code: 'RC-ASDF-123', plan: 'Standard', status: 'Active', customer: '' },
    { code: 'RC-QWER-456', plan: 'Basic', status: 'Active', customer: '' },
    { code: 'RC-ZXCV-789', plan: 'Enterprise', status: 'Expired', customer: 'another@example.com' },
];

export default function VouchersPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Upload Vouchers</CardTitle>
                    <CardDescription>Upload a CSV file with voucher codes to add them in bulk.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center">
                    <UploadCloud className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">Drag & drop a file here, or click to select a file.</p>
                    <Button className="mt-4">
                        <UploadCloud className="mr-2" />
                        Upload File
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Manage Vouchers</CardTitle>
                        <CardDescription>View, search, and manage all existing vouchers.</CardDescription>
                    </div>
                    <Button variant="outline">
                        <FileDown className="mr-2" />
                        Export Report
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Voucher Code</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Assigned To</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vouchers.map((voucher) => (
                                <TableRow key={voucher.code}>
                                    <TableCell className="font-mono">{voucher.code}</TableCell>
                                    <TableCell>{voucher.plan}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            voucher.status === 'Active' ? 'default' : 
                                            voucher.status === 'Used' ? 'secondary' : 'destructive'
                                        } className={voucher.status === 'Active' ? 'bg-green-500/80' : ''}>
                                            {voucher.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{voucher.customer || 'N/A'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
