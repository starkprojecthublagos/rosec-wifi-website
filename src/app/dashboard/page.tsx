import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wifi, History, User, LogOut } from "lucide-react"

const activePlans = [
    { name: "Standard Plan", dataLeft: "7.5GB", expiry: "in 12 days" },
];

const purchaseHistory = [
    { plan: "Standard Plan", date: "2024-07-15", price: "₦1,500" },
    { plan: "Basic Plan", date: "2024-06-28", price: "₦500" },
];

export default function DashboardPage() {
    return (
        <div className="bg-muted/40 min-h-screen">
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold font-headline">My Dashboard</h1>
                    <Button variant="outline">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-8">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Wifi /> Active Plans</CardTitle>
                                <CardDescription>Here are your current active data plans.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {activePlans.length > 0 ? (
                                    activePlans.map((plan, index) => (
                                        <div key={index} className="p-4 bg-primary/10 rounded-lg flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-lg">{plan.name}</p>
                                                <p className="text-muted-foreground">Expires {plan.expiry}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-2xl text-primary">{plan.dataLeft}</p>
                                                <p className="text-muted-foreground">Remaining</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-muted-foreground mb-4">You have no active plans.</p>
                                        <Button>Purchase a Plan</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><History /> Purchase History</CardTitle>
                                 <CardDescription>Review your past transactions.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {purchaseHistory.map((item, index) => (
                                        <li key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                                            <div>
                                                <p className="font-semibold">{item.plan}</p>
                                                <p className="text-sm text-muted-foreground">{item.date}</p>
                                            </div>
                                            <p className="font-semibold">{item.price}</p>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><User /> Profile Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p><strong>Name:</strong> John Doe</p>
                                <p><strong>Email:</strong> john.doe@example.com</p>
                                <Button variant="outline" className="w-full">Edit Profile</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
