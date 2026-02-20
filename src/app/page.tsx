"use client";

import { useState } from "react";
import { SmartHealthCard } from "@/components/SmartHealthCard";
import { PrescriptionList } from "@/components/PrescriptionList";
import { AdminTrends } from "@/components/AdminTrends";
import { AIOutbreakPredictor } from "@/components/AIOutbreakPredictor";
import { LocationMonitor } from "@/components/LocationMonitor";
import { RegionalHeatMap } from "@/components/RegionalHeatMap";
import { MedicalHistory } from "@/components/MedicalHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeartPulse, ShieldCheck, UserCircle, Activity, Sparkles, MapPin, Search, CalendarClock, Download, BellRing, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
          <div className="flex flex-col">
            <h1 className="text-xl font-headline font-bold text-accent tracking-tight leading-none">Arogya Bharat</h1>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">National Digital Health Stack</span>
          </div>
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
          <div className="hidden lg:flex flex-col items-end mr-2">
            <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50 gap-1 h-6 text-[10px]">
              <BellRing className="h-3 w-3 animate-bounce" />
              Surveillance Alert: Delhi NCR
            </Badge>
          </div>
          <div className="h-9 w-9 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
            <UserCircle className="h-5 w-5 text-accent" />
          </div>
        </div>
      </header>

      {/* Hero / Marquee Section */}
      <div className="bg-accent/5 border-b py-2 px-6 overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-8 animate-marquee text-[10px] font-medium text-accent uppercase tracking-tighter">
          <span>● Sanjeevani Cloud Sync Active</span>
          <span>● 766 Districts reporting real-time</span>
          <span>● AI Outbreak prediction confidence: 94.2%</span>
          <span>● ABDM Version 3.1 Legacy Support Enabled</span>
          <span className="opacity-50">● Niramaya Sovereignty Infrastructure Phase II</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-headline font-bold text-accent">Unified Health Interface</h2>
              <p className="text-muted-foreground mt-1 text-sm">Welcome back. Accessing encrypted records via your Swasthya ID.</p>
            </div>
            
            <TabsList className="grid grid-cols-2 md:w-[360px] bg-white border border-accent/10 shadow-sm p-1">
              <TabsTrigger value="patient" className="data-[state=active]:bg-primary/30 data-[state=active]:text-accent rounded-sm h-8 font-bold">
                <UserCircle className="h-4 w-4 mr-2" /> Swasthya Portal
              </TabsTrigger>
              <TabsTrigger value="admin" className="data-[state=active]:bg-primary/30 data-[state=active]:text-accent rounded-sm h-8 font-bold">
                <ShieldCheck className="h-4 w-4 mr-2" /> Sanjeevani Command
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="patient" className="space-y-8 mt-0 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: ID & Vitals */}
              <div className="lg:col-span-4 space-y-6">
                <SmartHealthCard 
                  patientName="Tanmay Patil" 
                  patientId="ABHA-1234-5678-9012" 
                  bloodGroup="B Positive"
                />
                
                <Card className="border-accent/10 bg-white shadow-sm overflow-hidden">
                  <CardHeader className="pb-4 bg-muted/10 border-b">
                    <CardTitle className="text-xs font-bold flex items-center gap-2 text-accent uppercase tracking-widest">
                      <Activity className="h-4 w-4" /> Swasthya Vitals (IoT Sync)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    {[
                      { label: "Blood Pressure", value: "118/76", unit: "mmHg", status: "Optimal", color: "text-teal-600" },
                      { label: "Heart Rate", value: "68", unit: "bpm", status: "Steady", color: "text-teal-600" },
                      { label: "Glucose Level", value: "92", unit: "mg/dL", status: "Normal", color: "text-teal-600" },
                      { label: "Oxygen Saturation", value: "99", unit: "%", status: "Healthy", color: "text-teal-600" },
                    ].map((vital) => (
                      <div key={vital.label} className="flex justify-between items-center group">
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-muted-foreground block font-bold uppercase">{vital.label}</span>
                          <div className="flex items-baseline gap-1">
                            <span className="font-bold text-lg">{vital.value}</span>
                            <span className="text-[10px] text-muted-foreground font-mono">{vital.unit}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={`text-[10px] h-5 ${vital.color} border-current`}>
                          {vital.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-accent/10 bg-accent text-white overflow-hidden relative group cursor-pointer shadow-lg shadow-accent/20">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Leaf className="h-24 w-24" />
                  </div>
                  <CardContent className="pt-6 relative z-10">
                    <h4 className="font-headline font-bold text-lg mb-1 flex items-center gap-2">
                      Sanjeevani Secure: Active <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    </h4>
                    <p className="text-[10px] text-white/80 leading-relaxed">Your data is stored in the National Niramaya Cloud using AES-256 encryption. Consent is required for every medical access.</p>
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
            {/* Admin Command Center Header */}
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
               <div className="bg-accent/5 border-b p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-accent uppercase tracking-widest">Sanjeevani Surveillance Center</h3>
                    <p className="text-[10px] text-muted-foreground">Monitoring 766 Districts • Real-time Niramaya Data Aggregation</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                   <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm flex-1 md:flex-none">
                    <CalendarClock className="h-3 w-3 text-accent ml-2" />
                    <Select defaultValue="7d">
                      <SelectTrigger className="w-[120px] border-none bg-transparent focus:ring-0 h-7 text-[10px] font-bold">
                        <SelectValue placeholder="Timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">24 Hours</SelectItem>
                        <SelectItem value="7d">7 Days</SelectItem>
                        <SelectItem value="30d">30 Days</SelectItem>
                        <SelectItem value="90d">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm flex-1 md:flex-none">
                    <Activity className="h-3 w-3 text-accent ml-2" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px] border-none bg-transparent focus:ring-0 h-7 text-[10px] font-bold">
                        <SelectValue placeholder="Disease" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Conditions</SelectItem>
                        <SelectItem value="flu">Viral/Flu (ILI)</SelectItem>
                        <SelectItem value="dengue">Vector-Borne</SelectItem>
                        <SelectItem value="covid">Respiratory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button size="sm" variant="outline" className="text-accent border-accent font-bold text-[10px] gap-2 h-9 px-4 hover:bg-accent hover:text-white transition-all">
                    <Download className="h-3 w-3" /> EXPORT REPORT
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b">
                {[
                  { title: "National Active Cases", value: "84,203", icon: Activity, trend: "down", trendVal: "8%", color: "text-blue-600" },
                  { title: "Red Cluster Districts", value: "12", icon: MapPin, trend: "up", trendVal: "2", color: "text-red-600" },
                  { title: "Niramaya Latency", value: "1.8ms", icon: ShieldCheck, color: "text-purple-600" },
                  { title: "Sanjeevani AI Hits", value: "156", icon: Sparkles, trend: "up", trendVal: "12", color: "text-amber-600" },
                ].map((stat, i) => (
                  <div key={i} className="p-6 border-r last:border-r-0 hover:bg-muted/5 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{stat.title}</p>
                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                      <stat.icon className="h-5 w-5 opacity-20" />
                    </div>
                    <div className="mt-4 flex items-center text-[10px] font-bold uppercase">
                      {stat.trend === 'down' && <span className="text-green-600 mr-2">↓ {stat.trendVal} week-on-week</span>}
                      {stat.trend === 'up' && <span className="text-red-600 mr-2">↑ {stat.trendVal} week-on-week</span>}
                      {!stat.trend && <span className="text-muted-foreground">Optimal performance</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <RegionalHeatMap />
                      <LocationMonitor />
                    </div>
                    <AdminTrends />
                  </div>
                  <div className="lg:col-span-4 space-y-6">
                    <AIOutbreakPredictor />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t bg-white mt-12 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-accent font-bold text-xl">
            <HeartPulse className="h-6 w-6" /> Arogya Bharat
          </div>
          <p className="text-sm text-center text-muted-foreground max-w-2xl leading-relaxed">
            Arogya Bharat is India's unified digital health infrastructure under the National Health Mission. 
            Powered by Sanjeevani AI and ABDM protocols, ensuring Niramaya (disease-free) life for 1.4 billion citizens.
          </p>
          <div className="h-1 w-full max-w-xs flex">
            <div className="flex-1 bg-orange-400" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-green-600" />
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-2 text-[10px] font-bold uppercase tracking-widest opacity-60">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">ABDM Compliance</a>
            <a href="#" className="hover:text-accent transition-colors">API Docs</a>
            <a href="#" className="hover:text-accent transition-colors">Jan Kalyan Gateway</a>
          </div>
          <p className="text-[10px] mt-4 opacity-50 font-bold uppercase">© 2025 Ministry of Health & Family Welfare. Supporting Digital India Initiative.</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
