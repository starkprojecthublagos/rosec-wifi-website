import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Hand } from "lucide-react";

export function WelcomeAdmin() {
    return (
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Hand className="h-8 w-8 text-primary" />
                    <div>
                        <CardTitle className="font-headline text-2xl">Welcome Back, Admin!</CardTitle>
                        <CardDescription>Here's a quick overview of your business today.</CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>
    )
}
