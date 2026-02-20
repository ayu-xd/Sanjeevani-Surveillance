"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, Info, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const HEAT_DATA = [
  { zone: "North (Delhi/NCR)", intensity: 85, cases: "4,200", trend: "+12%", color: "bg-red-500" },
  { zone: "West (Mumbai/Pune)", intensity: 70, cases: "2,850", trend: "+5%", color: "bg-orange-500" },
  { zone: "South (Bengaluru/CHN)", intensity: 40, cases: "1,120", trend: "-2%", color: "bg-yellow-500" },
  { zone: "East (Kolkata/Guwahati)", intensity: 55, cases: "1,980", trend: "+8%", color: "bg-orange-400" },
  { zone: "Central (Bhopal/Nagpur)", intensity: 30, cases: "850", trend: "0%", color: "bg-green-500" },
];

export function RegionalHeatMap() {
  return (
    <Card className="border-accent/10 bg-white h-full shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-headline text-accent flex items-center gap-2">
            <Map className="h-5 w-5" /> National Disease Heat Map
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">Data is anonymized and aggregated by district codes (IDSP integration). Individual identities are strictly encrypted.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>Live intensity mapping across sovereign health zones</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          <div className="relative aspect-[4/3] bg-muted/20 rounded-xl overflow-hidden border border-accent/5 flex items-center justify-center">
            {/* Visual representation of a heat map grid */}
            <div className="grid grid-cols-4 grid-rows-3 gap-2 p-4 w-full h-full opacity-80">
              {Array.from({ length: 12 }).map((_, i) => {
                const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-orange-400'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                const opacity = Math.random() * 0.8 + 0.2;
                return (
                  <div 
                    key={i} 
                    className={`rounded-md transition-all duration-1000 ${randomColor}`}
                    style={{ opacity }}
                  />
                );
              })}
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Badge variant="outline" className="bg-white/90 backdrop-blur shadow-md text-accent border-accent/20">
                <AlertTriangle className="h-3 w-3 mr-1 text-red-600" /> High Activity: Northern Cluster
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {HEAT_DATA.map((item) => (
              <div key={item.zone} className="flex items-center justify-between p-2 rounded-lg border border-accent/5 bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${item.color} shadow-sm`} />
                  <span className="text-xs font-semibold">{item.zone}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono font-bold">{item.cases} Cases</span>
                  <Badge variant="secondary" className={`text-[10px] h-5 ${item.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                    {item.trend}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}