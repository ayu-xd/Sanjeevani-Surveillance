"use client";

import { useState } from "react";
import { SmartHealthCard } from "@/components/SmartHealthCard";
import { PrescriptionList } from "@/components/PrescriptionList";
import { AdminTrends } from "@/components/AdminTrends";
import { AIOutbreakPredictor } from "@/components/AIOutbreakPredictor";
import { AdminInsights } from "@/components/AdminInsights";
import { LocationMonitor } from "@/components/LocationMonitor";
import { MedicalHistory } from "@/components/MedicalHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartPulse, ShieldCheck, UserCircle, Activity, Sparkles, MapPin, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function HealthWiseApp() {
  const [activeTab, setActiveTab] = useState("patient");

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-body">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/20 rounded-lg">
            <HeartPulse className="h-6 w-6 text-accent" />
          </div>
          <h1 className="text-xl font-headline font-bold text-accent tracking-tight">Arogya Bharat</h1>
        </div>
        
        <div className="flex-1 max-w-md mx-8 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search ABHA ID, records or alerts..." 
              className="pl-9 bg-muted/20 border-accent/5 focus-visible:ring-accent/20 h-9 text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant="outline" className="hidden lg:inline-flex border-accent/20 text-accent gap-1 h-7">
            <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            National Surveillance Active
          </Badge>
          <div className="h-9 w-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
            <UserCircle className="h-5 w-5 text-accent" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-headline font-bold text-accent">Health Dashboard</h2>
              <p className="text-muted-foreground mt-1 text-sm">Namaste. Your health data is secured via National Digital Health Mission protocols.</p>
            </div>
            
            <TabsList className="grid grid-cols-2 md:w-[320px] bg-white border border-accent/10 shadow-sm p-1">
              <TabsTrigger value="patient" className="data-[state=active]:bg-primary/30 data-[state=active]:text-accent rounded-sm h-8">
                <UserCircle className="h-4 w-4 mr-2" /> Citizen
              </TabsTrigger>
              <TabsTrigger value="admin" className="data-[state=active]:bg-primary/30 data-[state=active]:text-accent rounded-sm h-8">
                <ShieldCheck className="h-4 w-4 mr-2" /> Authorities
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="patient" className="space-y-8 mt-0 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: ID & Vitals */}
              <div className="lg:col-span-4 space-y-6">
                <SmartHealthCard 
                  patientName="Arjun Mehra" 
                  patientId="ABHA-1234-5678-9012" 
                  bloodGroup="B Positive"
                />
                
                <Card className="border-accent/10 bg-white/50 shadow-sm overflow-hidden">
                  <CardHeader className="pb-4 bg-muted/20 border-b border-accent/5">
                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-accent">
                      <Activity className="h-4 w-4" /> Live Vitals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    {[
                      { label: "Blood Pressure", value: "118/76", unit: "mmHg", status: "Optimal" },
                      { label: "Heart Rate", value: "68", unit: "bpm", status: "Steady" },
                      { label: "Glucose Level", value: "92", unit: "mg/dL", status: "Normal" },
                      { label: "Oxygen Saturation", value: "99", unit: "%", status: "Healthy" },
                    ].map((vital) => (
                      <div key={vital.label} className="flex justify-between items-center group">
                        <div className="space-y-0.5">
                          <span className="text-xs text-muted-foreground block">{vital.label}</span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-bold text-lg">{vital.value}</span>
                            <span className="text-[10px] text-muted-foreground font-mono">{vital.unit}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-[10px] h-5 bg-teal-50 text-teal-700 border-teal-200">
                          {vital.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-accent/10 bg-accent text-white overflow-hidden relative group cursor-pointer">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="h-24 w-24" />
                  </div>
                  <CardContent className="pt-6 relative z-10">
                    <h4 className="font-headline font-bold text-lg mb-1">NDHM Secure: Active</h4>
                    <p className="text-xs text-white/80">Tap to any PHC or Govt Hospital kiosk to sync your history instantly.</p>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: History & Prescriptions */}
              <div className="lg:col-span-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MedicalHistory />
                  <PrescriptionList />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="admin" className="space-y-8 mt-0 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Active Cases (India)", value: "84,203", icon: Activity, trend: "down", trendVal: "8%", color: "bg-blue-50 text-blue-600" },
                { title: "Districts Monitored", value: "766", icon: MapPin, color: "bg-teal-50 text-teal-600", subtitle: "12 High-risk clusters" },
                { title: "Data Sync Latency", value: "1.8ms", icon: ShieldCheck, color: "bg-purple-50 text-purple-600", subtitle: "Unified Cloud" },
                { title: "AI Predictions Today", value: "156", icon: Sparkles, trend: "up", trendVal: "12", color: "bg-amber-50 text-amber-600" },
              ].map((stat, i) => (
                <Card key={i} className="bg-white border-accent/10 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{stat.title}</p>
                        <p className="text-2xl font-bold text-accent">{stat.value}</p>
                      </div>
                      <div className={`h-10 w-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs">
                      {stat.trend === 'down' && <span className="font-bold text-green-600 mr-1">↓ {stat.trendVal}</span>}
                      {stat.trend === 'up' && <span className="font-bold text-red-600 mr-1">↑ {stat.trendVal}</span>}
                      <span className="text-muted-foreground">{stat.subtitle || 'compared to last week'}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                <AdminTrends />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <LocationMonitor />
                  <AdminInsights />
                </div>
              </div>
              <div className="lg:col-span-4">
                <AIOutbreakPredictor />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t bg-white mt-12 py-10 px-6 text-center text-muted-foreground">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-accent font-bold text-lg">
            <HeartPulse className="h-5 w-5" /> Arogya Bharat
          </div>
          <p className="text-sm">
            Arogya Bharat is India's unified digital health ecosystem under the National Health Mission. 
            All citizen data is anonymized and processed securely within the sovereign cloud infrastructure.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-2 text-xs font-medium">
            <a href="#" className="hover:text-accent transition-colors">Digital Health Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">NDHM Compliance</a>
            <a href="#" className="hover:text-accent transition-colors">Ayushman Bharat API</a>
            <a href="#" className="hover:text-accent transition-colors">National Health Helpline</a>
          </div>
          <p className="text-[10px] mt-4 opacity-50">© 2024 Ministry of Health & Family Welfare. Supporting Digital India.</p>
        </div>
      </footer>
    </div>
  );
}
