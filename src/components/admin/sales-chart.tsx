
'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SalesChartProps {
    data: any[];
}

export default function SalesChart({ data }: SalesChartProps) {
    return (
        <Card className="lg:col-span-4">
            <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `₦${value.toLocaleString()}`}
                        />
                         <Tooltip
                            cursor={{ fill: 'hsl(var(--muted))' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    return (
                                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-xs uppercase text-muted-foreground">{payload[0].payload.name}</span>
                                            <span className="font-bold text-foreground">
                                                 ₦{payload[0].value?.toLocaleString()}
                                            </span>
                                        </div>
                                        </div>
                                    </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
