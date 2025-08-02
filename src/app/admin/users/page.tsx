
'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { collection, getDocs, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

type User = {
    id: string;
    displayName: string;
    email: string;
    createdAt: Timestamp;
    role: string;
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, "users"));
                const usersData: User[] = [];
                querySnapshot.forEach((doc) => {
                    usersData.push({ id: doc.id, ...doc.data() } as User);
                });
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user => 
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const UserTableRows = () => (
        <>
            {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={`https://placehold.co/100x100.png`} alt={user.displayName} data-ai-hint="person avatar" />
                                <AvatarFallback>{user.displayName?.charAt(0) || user.email.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.displayName}</span>
                        </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell>
                        {user.createdAt ? format(user.createdAt.toDate(), 'PPP') : 'N/A'}
                    </TableCell>
                </TableRow>
            ))}
        </>
    );

    const SkeletonRows = () => (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`skeleton-${index}`}>
                    <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                    <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                </TableRow>
            ))}
        </>
    );

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>View, search, and manage all registered users.</CardDescription>
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search users..." 
                                className="pl-8" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline">
                            <FileDown className="mr-2" />
                            Export Users
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Join Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? <SkeletonRows /> : <UserTableRows />}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
