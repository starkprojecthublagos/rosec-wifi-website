
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Business Settings</CardTitle>
                    <CardDescription>Manage your business information and branding.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="business-name">Business Name</Label>
                        <Input id="business-name" defaultValue="Rosec Wifi" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="support-email">Support Email</Label>
                        <Input id="support-email" type="email" defaultValue="support@rosecwifi.com" />
                    </div>
                </CardContent>
            </Card>

            <Separator />
            
            <Card>
                <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Configure system-wide application settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-semibold">Maintenance Mode</p>
                            <p className="text-sm text-muted-foreground">Temporarily disable access to the user-facing site.</p>
                        </div>
                        <Switch />
                    </div>

                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <p className="font-semibold">Allow New User Registrations</p>
                            <p className="text-sm text-muted-foreground">Control whether new users can sign up.</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Default Plan for New Users</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a default plan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="basic">Basic Plan</SelectItem>
                                <SelectItem value="standard">Standard Plan</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button>Save Changes</Button>
            </div>
        </div>
    )
}
