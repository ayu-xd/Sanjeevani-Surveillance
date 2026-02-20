
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, TrendingDown, Minus } from "lucide-react";

const REGION_DATA = [
  { name: "North Sector", cases: 420, capacity: 500, trend: "up", severity: "High" },
  { name: "East District", cases: 280, capacity: 450, trend: "up", severity: "Moderate" },
  { name: "South Sector", cases: 150, capacity: 600, trend: "down", severity: "Low" },
  { name: "West Wing", cases: 310, capacity: 400, trend: "stable", severity: "Moderate" },
  { name: "Central Plaza", cases: 95, capacity: 300, trend: "down", severity: "Low" },
];

export function LocationMonitor() {
  return (
    <Card className="border-accent/10 bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-headline text-accent flex items-center gap-2">
          <MapPin className="h-5 w-5" /> Location-Based Prevalence
        </CardTitle>
        <CardDescription>Regional healthcare burden and case monitoring</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {REGION_DATA.map((region) => {
            const percentage = (region.cases / region.capacity) * 100;
            return (
              <div key={region.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{region.name}</span>
                    {region.trend === "up" && <TrendingUp className="h-3 w-3 text-red-500" />}
                    {region.trend === "down" && <TrendingDown className="h-3 w-3 text-green-500" />}
                    {region.trend === "stable" && <Minus className="h-3 w-3 text-amber-500" />}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-[10px] uppercase font-bold ${
                      region.severity === "High" ? "border-red-500 text-red-500" :
                      region.severity === "Moderate" ? "border-amber-500 text-amber-500" :
                      "border-green-500 text-green-500"
                    }`}
                  >
                    {region.severity} Risk
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress 
                    value={percentage} 
                    className="h-2 flex-1" 
                  />
                  <span className="text-[10px] font-mono text-muted-foreground w-12 text-right">
                    {region.cases}/{region.capacity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t flex items-center justify-around">
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Highest Trend</p>
            <p className="text-sm font-bold text-accent">North Sector</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Safest Zone</p>
            <p className="text-sm font-bold text-teal-600">Central Plaza</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
