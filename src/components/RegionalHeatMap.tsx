"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, Info, AlertTriangle, Crosshair } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const HEAT_DATA = [
  { zone: "North (Delhi/NCR)", intensity: 85, cases: "4,200", trend: "+12%", color: "bg-red-500", risk: "Critical" },
  { zone: "West (Mumbai/Pune)", intensity: 70, cases: "2,850", trend: "+5%", color: "bg-orange-500", risk: "High" },
  { zone: "East (Kolkata/NE)", intensity: 55, cases: "1,980", trend: "+8%", color: "bg-orange-400", risk: "Moderate" },
  { zone: "South (Bengaluru/HYD)", intensity: 40, cases: "1,120", trend: "-2%", color: "bg-yellow-500", risk: "Low" },
  { zone: "Central (Bhopal/NGP)", intensity: 30, cases: "850", trend: "0%", color: "bg-green-500", risk: "Low" },
];

interface MapCell {
  color: string;
  opacity: number;
}

export function RegionalHeatMap() {
  const [cells, setCells] = useState<MapCell[]>([]);

  useEffect(() => {
    // Generate random map data only on the client to prevent hydration errors
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-orange-400'];
    const newCells = Array.from({ length: 12 }).map(() => ({
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.8 + 0.2,
    }));
    setCells(newCells);
  }, []);

  return (
    <Card className="border-accent/10 bg-white h-full shadow-sm overflow-hidden">
      <CardHeader className="pb-2 bg-accent/[0.02] border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-accent flex items-center gap-2 uppercase tracking-widest">
            <Map className="h-4 w-4" /> Disease Intensity Map
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">Visualizing anonymized heat signatures based on PHC reports and diagnostic labs across sovereign zones.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-[10px]">Real-time spatial aggregation of disease clusters</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="relative aspect-video bg-muted/20 rounded-xl overflow-hidden border-2 border-dashed border-accent/10 flex items-center justify-center">
            {/* Visual representation of a map grid */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-20 pointer-events-none">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border-[0.5px] border-accent/20" />
              ))}
            </div>
            
            <div className="grid grid-cols-4 grid-rows-3 gap-2 p-4 w-full h-full opacity-80">
              {(cells.length > 0 ? cells : Array(12).fill({ color: 'bg-muted/10', opacity: 0.1 })).map((cell, i) => (
                <div 
                  key={i} 
                  className={`rounded-md transition-all duration-1000 ${cell.color} shadow-lg`}
                  style={{ opacity: cell.opacity }}
                />
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative">
                <Crosshair className="h-12 w-12 text-red-600/20 absolute -top-6 -left-6 animate-pulse" />
                <Badge variant="outline" className="bg-white/95 backdrop-blur shadow-xl text-red-600 border-red-200 font-bold uppercase text-[9px] py-1 px-3">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Active Cluster: North Zone
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {HEAT_DATA.map((item) => (
              <div key={item.zone} className="flex items-center justify-between p-3 rounded-xl border border-accent/5 bg-muted/5 hover:bg-muted/10 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className={`h-2.5 w-2.5 rounded-full ${item.color} shadow-sm group-hover:scale-125 transition-transform`} />
                  <span className="text-[11px] font-bold text-foreground/80">{item.zone}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-accent">{item.cases}</p>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase">{item.risk} RISK</p>
                  </div>
                  <Badge variant="outline" className={`text-[9px] font-bold h-5 px-1.5 ${item.trend.startsWith('+') ? 'text-red-600 bg-red-50 border-red-100' : 'text-green-600 bg-green-50 border-green-100'}`}>
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
