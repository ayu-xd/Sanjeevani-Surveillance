"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Wifi, ShieldCheck, Smartphone, CheckCircle2 } from "lucide-react";

interface SmartHealthCardProps {
  patientName: string;
  patientId: string;
  bloodGroup: string;
}

export function SmartHealthCard({ patientName, patientId, bloodGroup }: SmartHealthCardProps) {
  const [pattern, setPattern] = useState<boolean[]>([]);

  useEffect(() => {
    // Generate the pattern only on the client to avoid hydration mismatch
    const newPattern = Array.from({ length: 64 }).map(() => Math.random() > 0.4);
    setPattern(newPattern);
  }, []);

  return (
    <Card className="w-full overflow-hidden bg-white border-accent/20 shadow-xl group hover:shadow-2xl transition-all duration-500 relative">
      <div className="absolute top-0 left-0 w-full h-1 flex">
        <div className="flex-1 bg-orange-400" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-green-600" />
      </div>
      
      <CardHeader className="pb-4 pt-6 bg-accent/[0.02]">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <img src="https://picsum.photos/seed/india/20/20" className="h-4 w-4 rounded-sm" alt="GOI" />
              <span className="text-[10px] font-bold text-accent/70 uppercase tracking-widest">Government of India</span>
            </div>
            <CardTitle className="text-xl font-headline text-accent font-black tracking-tight">ABHA CARD</CardTitle>
            <CardDescription className="text-[9px] font-bold tracking-widest uppercase opacity-70">Ayushman Bharat Health Account</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[8px] border-accent/20 text-accent font-bold bg-white">ABDM 3.1</Badge>
            <Wifi className="h-4 w-4 text-accent/50" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative p-4 bg-white rounded-2xl shadow-inner border-2 border-accent/5">
            <div className="w-44 h-44 bg-foreground/5 grid grid-cols-8 grid-rows-8 gap-1.5 p-1.5 rounded-lg">
              {(pattern.length > 0 ? pattern : Array(64).fill(false)).map((isActive, i) => (
                <div 
                  key={i} 
                  className={`rounded-sm transition-colors duration-500 ${isActive ? 'bg-accent' : 'bg-accent/10'}`} 
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-3 rounded-xl border border-accent/20 shadow-lg">
                  <QrCode className="w-12 h-12 text-accent" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full space-y-4 text-center">
            <div className="space-y-1">
              <div className="font-black text-2xl tracking-tighter text-foreground uppercase">{patientName}</div>
              <div className="flex items-center justify-center gap-4">
                 <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-teal-600" /> AES-256 SECURE
                </p>
                <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                  <Smartphone className="h-3 w-3 text-blue-600" /> NFC ENABLED
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center px-4 py-2 bg-accent/5 rounded-xl border border-accent/10">
                <span className="text-[9px] font-black text-accent/60 uppercase tracking-wider">ABHA ID</span>
                <span className="text-xs font-mono font-black text-accent">{patientId}</span>
              </div>
              <div className="flex flex-col items-center px-4 py-2 bg-red-50 rounded-xl border border-red-100">
                <span className="text-[9px] font-black text-red-800/60 uppercase tracking-wider">Blood Group</span>
                <span className="text-xs font-black text-red-600">{bloodGroup}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-teal-600">
                <CheckCircle2 className="h-3 w-3" /> VERIFIED CITIZEN RECORD
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 via-white to-green-400 opacity-50" />
    </Card>
  );
}
