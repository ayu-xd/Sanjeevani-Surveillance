"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { region: "North", flu: 400, malaria: 240, dengue: 120 },
  { region: "South", flu: 300, malaria: 139, dengue: 280 },
  { region: "East", flu: 200, malaria: 980, dengue: 390 },
  { region: "West", flu: 278, malaria: 390, dengue: 190 },
  { region: "Central", flu: 189, malaria: 480, dengue: 480 },
];

const chartConfig = {
  flu: { label: "Flu", color: "hsl(var(--chart-1))" },
  malaria: { label: "Malaria", color: "hsl(var(--chart-2))" },
  dengue: { label: "Dengue", color: "hsl(var(--chart-3))" },
};

export function AdminTrends() {
  return (
    <Card className="w-full bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-headline text-accent">Disease Prevalence by Region</CardTitle>
        <CardDescription>Real-time surveillance based on location data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="region" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend verticalAlign="top" align="right" height={36}/>
              <Bar dataKey="flu" fill="var(--color-flu)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="malaria" fill="var(--color-malaria)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="dengue" fill="var(--color-dengue)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}