"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { region: "Delhi", flu: 850, malaria: 120, dengue: 450 },
  { region: "Mumbai", flu: 600, malaria: 340, dengue: 580 },
  { region: "Bengaluru", flu: 400, malaria: 100, dengue: 290 },
  { region: "Kolkata", flu: 500, malaria: 680, dengue: 790 },
  { region: "Chennai", flu: 300, malaria: 420, dengue: 380 },
];

const chartConfig = {
  flu: { label: "Flu/ILI", color: "hsl(var(--chart-1))" },
  malaria: { label: "Malaria", color: "hsl(var(--chart-2))" },
  dengue: { label: "Dengue", color: "hsl(var(--chart-3))" },
};

export function AdminTrends() {
  return (
    <Card className="w-full bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-headline text-accent">Disease Prevalence (Tier 1 Cities)</CardTitle>
        <CardDescription>Consolidated national data from IDSP integration</CardDescription>
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
