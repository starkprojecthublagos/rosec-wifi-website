'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wifi, History, User, LogOut, AlertTriangle, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const purchaseHistory = [
    { id: "TXN7462", plan: "Standard Plan", date: "2024-07-15", price: "₦1,500", status: "Active" },
    { id: "TXN6543", plan: "Basic Plan", date: "2024-06-28", price: "₦500", status: "Expired" },
    { id: "TXN5432", plan: "Premium Plan", date: "2024-06-15", price: "₦5,000", status: "Expired" },
];

export default function DashboardPage() {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push('/');
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [router]);
    
    const handleLogout = async () => {
        await signOut(auth);
        toast({ title: "Logged out successfully!" });
        router.push('/');
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    
    if (!user) {
        return null; // or a loading spinner, or a redirect message
    }


    return (
        <div className="bg-muted/30 min-h-screen">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">Welcome, {user.displayName || 'User'}!</h1>
                        <p className="text-muted-foreground">Here is your account overview.</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-8">
                        {/* Active Plan */}
                        <Card className="shadow-lg transition-all duration-300 hover:shadow-premium">
                             <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Wifi /> Active Plan</CardTitle>
                                <CardDescription>Your current subscription details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-6 bg-primary/10 rounded-lg">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="font-bold text-2xl text-primary">Standard Plan</p>
                                            <p className="text-muted-foreground">Expires in 12 days</p>
                                        </div>
                                        <Badge variant="secondary" className="bg-green-500/20 text-green-800 border-green-500/30">Active</Badge>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="font-medium">Data Remaining</span>
                                            <span className="font-bold text-primary">7.5GB / 10GB</span>
                                        </div>
                                        <Progress value={75} className="h-3" />
                                    </div>
                                </div>
                            </CardContent>
                             <CardFooter>
                                <Button>Upgrade Plan</Button>
                            </CardFooter>
                        </Card>

                        {/* Purchase History */}
                        <Card className="shadow-lg transition-all duration-300 hover:shadow-premium">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><History /> Purchase History</CardTitle>
                                 <CardDescription>Review your past transactions.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {purchaseHistory.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg hover:bg-muted/90 transition-colors">
                                            <div>
                                                <p className="font-semibold">{item.plan}</p>
                                                <p className="text-sm text-muted-foreground">{item.date} - ID: {item.id}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-lg">{item.price}</p>
                                                <Badge variant={item.status === 'Active' ? 'default' : 'destructive'} className={item.status === 'Active' ? 'bg-green-500/80' : ''}>
                                                    {item.status}
                                                </Badge>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        {/* Profile */}
                        <Card className="shadow-lg transition-all duration-300 hover:shadow-premium">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><User /> Profile Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <p className="font-semibold text-muted-foreground">Full Name</p>
                                    <p className="text-lg">{user.displayName}</p>
                                </div>
                                 <div>
                                    <p className="font-semibold text-muted-foreground">Email Address</p>
                                    <p className="text-lg">{user.email}</p>
                                </div>
                                <div className="flex items-center gap-2 text-green-600">
                                    <ShieldCheck className="h-5 w-5" />
                                    <span>Email Verified</span>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full">Edit Profile</Button>
                            </CardFooter>
                        </Card>

                        {/* Security Alert */}
                        <Card className="border-amber-500/50 bg-amber-500/5 shadow-md">
                            <CardHeader className="flex-row items-center gap-3 space-y-0">
                                <AlertTriangle className="text-amber-500" />
                                <CardTitle className="text-amber-700">Account Security</CardTitle>
                            </CardHeader>
                             <CardContent>
                                <p className="text-sm text-amber-900/80">
                                    For enhanced security, we recommend enabling two-factor authentication (2FA).
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="secondary" className="w-full bg-amber-200/50 text-amber-800 hover:bg-amber-200">Enable 2FA</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
