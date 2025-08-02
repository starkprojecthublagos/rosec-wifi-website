
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const supportTickets = [
    { id: 'TKT-001', subject: 'Slow connection speed', user: 'user1@example.com', status: 'Open', priority: 'High' },
    { id: 'TKT-002', subject: 'Cannot log in to portal', user: 'user2@example.com', status: 'In Progress', priority: 'Medium' },
    { id: 'TKT-003', subject: 'Voucher not working', user: 'user3@example.com', status: 'Closed', priority: 'High' },
    { id: 'TKT-004', subject: 'Billing inquiry', user: 'user4@example.com', status: 'Open', priority: 'Low' },
];

export default function SupportPage() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Support Tickets</CardTitle>
                    <CardDescription>Manage and respond to user support requests.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {supportTickets.map(ticket => (
                             <AccordionItem value={ticket.id} key={ticket.id}>
                                <AccordionTrigger>
                                    <div className="flex justify-between items-center w-full pr-4">
                                        <div className="text-left">
                                            <p className="font-semibold">{ticket.subject}</p>
                                            <p className="text-sm text-muted-foreground">{ticket.user}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant={ticket.priority === 'High' ? 'destructive' : ticket.priority === 'Medium' ? 'secondary' : 'outline'}>
                                                {ticket.priority}
                                            </Badge>
                                             <Badge variant={ticket.status === 'Open' ? 'default' : 'secondary'} className={ticket.status === 'Open' ? 'bg-green-500/80' : ''}>
                                                {ticket.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="space-y-4">
                                   <p>Details about the ticket would go here. For now, this is a placeholder for the content of ticket {ticket.id}.</p>
                                   <div className="flex justify-end gap-2">
                                        <Button variant="outline">Mark as Resolved</Button>
                                        <Button>Reply</Button>
                                   </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    )
}
