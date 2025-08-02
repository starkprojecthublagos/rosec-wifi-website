
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const users = [
    { name: 'Olivia Martin', email: 'olivia.martin@email.com', plan: 'Premium', joinDate: '2024-07-01' },
    { name: 'Jackson Lee', email: 'jackson.lee@email.com', plan: 'Standard', joinDate: '2024-07-05' },
    { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', plan: 'Basic', joinDate: '2024-06-20' },
    { name: 'William Kim', email: 'will@email.com', plan: 'Enterprise', joinDate: '2024-05-15' },
    { name: 'Sofia Davis', email: 'sofia.davis@email.com', plan: 'Standard', joinDate: '2024-07-10' },
];

export default function UsersPage() {
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
                            <Input placeholder="Search users..." className="pl-8" />
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
                                <TableHead>Current Plan</TableHead>
                                <TableHead>Join Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.email}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={`https://placehold.co/100x100.png`} alt={user.name} data-ai-hint="person avatar" />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{user.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.plan}</TableCell>
                                    <TableCell>{user.joinDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
