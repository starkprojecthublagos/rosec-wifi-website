
'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UploadCloud, FileDown, FileCheck2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";

type Voucher = {
    id: string;
    code: string;
    planName: string;
    status: 'Active' | 'Used' | 'Expired';
    userId: string;
};

export default function VouchersPage() {
    const { toast } = useToast();
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVouchers = async () => {
            setIsLoading(true);
            try {
                const q = query(collection(db, "vouchers"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const vouchersData: Voucher[] = [];
                querySnapshot.forEach((doc) => {
                    vouchersData.push({ id: doc.id, ...doc.data() } as Voucher);
                });
                setVouchers(vouchersData);
            } catch (error) {
                console.error("Error fetching vouchers:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchVouchers();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (file.type === 'text/csv') {
                setUploadedFile(file);
            } else {
                toast({
                    title: 'Invalid File Type',
                    description: 'Please upload a valid CSV file.',
                    variant: 'destructive'
                });
            }
        }
    };

    const handleUpload = () => {
        if (uploadedFile) {
            // In a real app, you would process the CSV file here.
            // This would involve reading the file and adding each voucher to Firestore.
            toast({
                title: 'Upload Successful',
                description: `${uploadedFile.name} has been uploaded and vouchers are being processed.`,
            });
            setUploadedFile(null); // Reset after upload
        }
    }

    const SkeletonRows = () => (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                 <TableRow key={`skeleton-${index}`}>
                    <TableCell><Skeleton className="h-8 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-8 w-full" /></TableCell>
                </TableRow>
            ))}
        </>
    );

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Upload Vouchers</CardTitle>
                    <CardDescription>Upload a CSV file with voucher codes to add them in bulk.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!uploadedFile ? (
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center">
                            <UploadCloud className="h-12 w-12 text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">Drag & drop a CSV file here, or click to select.</p>
                            <Button asChild variant="outline" className="mt-4">
                                <label htmlFor="csv-upload" className="cursor-pointer">
                                    <UploadCloud className="mr-2" />
                                    Select File
                                </label>
                            </Button>
                            <Input id="csv-upload" type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                        </div>
                    ) : (
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                            <div className="flex items-center gap-3">
                                <FileCheck2 className="h-6 w-6 text-green-500" />
                                <div>
                                    <p className="font-semibold">{uploadedFile.name}</p>
                                    <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button onClick={handleUpload}>Upload</Button>
                                <Button variant="ghost" size="icon" onClick={() => setUploadedFile(null)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    )}
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
                                <TableHead>Assigned To User ID</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? <SkeletonRows /> : (
                                vouchers.map((voucher) => (
                                    <TableRow key={voucher.id}>
                                        <TableCell className="font-mono">{voucher.code}</TableCell>
                                        <TableCell>{voucher.planName}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                voucher.status === 'Active' ? 'default' : 
                                                voucher.status === 'Used' ? 'secondary' : 'destructive'
                                            } className={voucher.status === 'Active' ? 'bg-green-500/80' : ''}>
                                                {voucher.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs">{voucher.userId || 'N/A'}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
