"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Stethoscope, Activity, FileText } from "lucide-react";

const HISTORY_EVENTS = [
  {
    date: "Jan 22, 2025",
    type: "Diagnostic Lab",
    title: "Routine Blood Profile",
    provider: "Apollo Diagnostics, Delhi",
    summary: "Hemoglobin and vitamins within expected ranges. Advised Vitamin D supplements.",
    icon: Activity,
    color: "bg-blue-100 text-blue-700"
  },
  {
    date: "Nov 05, 2024",
    type: "Consultation",
    title: "General Physician Visit",
    provider: "Dr. Rajesh Gupta • AIIMS Delhi",
    summary: "Patient complained of seasonal allergies. Prescribed anti-histamines. Vitals stable.",
    icon: Stethoscope,
    color: "bg-teal-100 text-teal-700"
  },
  {
    date: "Aug 15, 2024",
    type: "Vaccination",
    title: "Covaxin Booster Dose",
    provider: "Public Health Center (PHC), Mumbai",
    summary: "Third booster dose administered successfully. Digital certificate synced to ABHA.",
    icon: FileText,
    color: "bg-purple-100 text-purple-700"
  }
];

export function MedicalHistory() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-accent flex items-center gap-2">
          <Calendar className="h-5 w-5" /> Medical History (ABHA Sync)
        </h3>
      </div>
      
      <div className="space-y-4">
        {HISTORY_EVENTS.map((event, idx) => (
          <div key={idx} className="relative pl-8 pb-8 group last:pb-0">
            {/* Timeline connector line */}
            {idx !== HISTORY_EVENTS.length - 1 && (
              <div className="absolute left-[15px] top-[30px] bottom-0 w-0.5 bg-muted group-hover:bg-accent/30 transition-colors" />
            )}
            
            {/* Timeline Dot */}
            <div className={`absolute left-0 top-0 h-8 w-8 rounded-full ${event.color} flex items-center justify-center z-10 shadow-sm border border-white`}>
              <event.icon className="h-4 w-4" />
            </div>
            
            <Card className="border-accent/5 bg-white/50 hover:bg-white transition-all shadow-none hover:shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{event.type}</span>
                    <h4 className="font-bold text-sm text-foreground">{event.title}</h4>
                  </div>
                  <Badge variant="secondary" className="w-fit text-[10px] font-mono whitespace-nowrap">
                    {event.date}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{event.provider}</p>
                <div className="bg-muted/30 p-3 rounded-lg border-l-2 border-accent/20">
                  <p className="text-xs italic text-foreground/80 leading-relaxed">
                    "{event.summary}"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
