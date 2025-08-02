'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wifi, History, User, LogOut, AlertTriangle, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User as FirebaseUser } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';

type Purchase = {
    id: string;
    planName: string;
    purchaseDate: Timestamp;
    price: number;
    transactionRef: string;
};

export default function DashboardPage() {
    const [user, setUser] = useState<FirebaseUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchPurchaseHistory(currentUser.uid);
            } else {
                router.push('/');
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    const fetchPurchaseHistory = async (userId: string) => {
        setIsLoadingHistory(true);
        try {
            const q = query(
                collection(db, "purchases"), 
                where("userId", "==", userId),
                orderBy("purchaseDate", "desc")
            );
            const querySnapshot = await getDocs(q);
            const history: Purchase[] = [];
            querySnapshot.forEach((doc) => {
                history.push({ id: doc.id, ...doc.data() } as Purchase);
            });
            setPurchaseHistory(history);
        } catch (error) {
            console.error("Error fetching purchase history: ", error);
            toast({
                title: "Error",
                description: "Could not fetch purchase history.",
                variant: "destructive"
            });
        } finally {
            setIsLoadingHistory(false);
        }
    };
    
    const handleLogout = async () => {
        await signOut(auth);
        toast({ title: "Logged out successfully!" });
        router.push('/');
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    
    if (!user) {
        return null;
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

                        <Card className="shadow-lg transition-all duration-300 hover:shadow-premium">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><History /> Purchase History</CardTitle>
                                 <CardDescription>Review your past transactions.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isLoadingHistory ? (
                                    <p>Loading history...</p>
                                ) : purchaseHistory.length > 0 ? (
                                    <ul className="space-y-4">
                                        {purchaseHistory.map((item) => (
                                            <li key={item.id} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg hover:bg-muted/90 transition-colors">
                                                <div>
                                                    <p className="font-semibold">{item.planName}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {format(item.purchaseDate.toDate(), 'PPP')} - ID: {item.transactionRef.split('-')[1]}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold text-lg">₦{item.price.toLocaleString()}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>You have no purchase history.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
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
