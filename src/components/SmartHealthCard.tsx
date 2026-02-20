
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Wifi, ShieldCheck } from "lucide-react";

interface SmartHealthCardProps {
  patientName: string;
  patientId: string;
  bloodGroup: string;
}

export function SmartHealthCard({ patientName, patientId, bloodGroup }: SmartHealthCardProps) {
  return (
    <Card className="w-full overflow-hidden bg-gradient-to-br from-white to-primary/10 border-accent/20 shadow-sm group hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-4 border-b border-accent/5 bg-accent/[0.02]">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <CardTitle className="text-xl font-headline text-accent">HealthWise</CardTitle>
            <CardDescription className="text-xs font-semibold tracking-wide uppercase opacity-70">Unified Digital Reference</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" title="NFC Active" />
            <Wifi className="h-5 w-5 text-accent/50" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-8">
        <div className="flex flex-col items-center gap-6">
          <div className="relative p-3 bg-white rounded-2xl shadow-inner border border-accent/10">
            {/* Visual representation of a QR Code */}
            <div className="w-40 h-40 bg-foreground/5 grid grid-cols-8 grid-rows-8 gap-1.5 p-1.5 rounded-lg">
              {Array.from({ length: 64 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`rounded-sm transition-colors duration-500 ${Math.random() > 0.4 ? 'bg-accent' : 'bg-accent/10'}`} 
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-2 rounded-lg border border-accent/20 shadow-md">
                  <QrCode className="w-10 h-10 text-accent" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full space-y-4 text-center">
            <div className="space-y-1">
              <div className="font-bold text-xl tracking-tight text-foreground">{patientName}</div>
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-3 w-3 text-teal-600" /> Secure Encryption HW-RSA
              </p>
            </div>
            
            <div className="flex justify-center gap-3">
              <div className="flex flex-col items-center px-4 py-2 bg-white rounded-lg border border-accent/5 shadow-sm">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Patient ID</span>
                <span className="text-xs font-mono font-bold text-accent">{patientId}</span>
              </div>
              <div className="flex flex-col items-center px-4 py-2 bg-white rounded-lg border border-accent/5 shadow-sm">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">Blood Group</span>
                <span className="text-xs font-bold text-red-600">{bloodGroup}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <div className="h-1.5 w-full bg-gradient-to-r from-teal-400 via-accent to-blue-400" />
    </Card>
  );
}
