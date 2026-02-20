"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, ShieldCheck, Loader2, Globe, MessageSquare, Activity, Hospital, TrendingUp, AlertTriangle, Zap, Server, Terminal } from "lucide-react";
import { predictDiseaseOutbreaks, type PredictDiseaseOutbreaksOutput } from "@/ai/flows/predict-disease-outbreaks";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export function AIOutbreakPredictor() {
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState<PredictDiseaseOutbreaksOutput | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const rawDataSources = {
    newsData: "Hyper-local OSINT scrapers detecting 'flu-cluster' spikes in Noida/Greater Noida bioregions. Global bio-surveillance nodes reporting H1N1-v2 volatility. Real-time media sentiment trending towards 'pediatric respiratory distress' in urban cohorts.",
    socialForumsData: "Social listening vectors: #DelhiFlu up 450%. High-frequency symptom keyword ingestion hitting 99th percentile for 'dry cough' and 'breathlessness'. Sentiment polarity shifting to -0.85 (High Anxiety).",
    anonymousVitalsData: "IoT Niramaya Ingestion: Aggregating 50k+ anonymized thermal and HRV vectors. Detecting 2.3 sigma standard deviation shift in average diurnal temperature across Delhi-NCR cluster.",
    hospitalOpsData: "ABDM 3.1 Gateway: High-concurrency OPD hits in tertiary care centers. Diagnostic lab throughput showing 35% surge in ILI-markers. Pharmaceutical supply-chain liquidity decreasing for antivirals.",
    focusArea: "Pan-India Sovereignty Zone"
  };

  useEffect(() => {
    const addLog = (msg: string) => {
      setLogs(prev => [...prev.slice(-15), `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    const runAutoIngestion = async () => {
      addLog("Initializing Multi-Source Ingestion Engine...");
      await new Promise(r => setTimeout(r, 800));
      addLog("Connection established with ABDM 3.1 Gateway.");
      await new Promise(r => setTimeout(r, 600));
      addLog("Scraping OSINT news vectors for Delhi-NCR...");
      await new Promise(r => setTimeout(r, 700));
      addLog("Normalizing IoT telemetry from Niramaya Cloud (50k active nodes).");
      await new Promise(r => setTimeout(r, 900));
      addLog("Parsing Social Forum sentiment (India/Health sub-threads).");
      
      try {
        const result = await predictDiseaseOutbreaks(rawDataSources);
        addLog("Prediction Engine: Processing Alpha Signals...");
        await new Promise(r => setTimeout(r, 1000));
        setPrediction(result);
        addLog("Signal Detection Complete. Outbreak parameters localized.");
      } catch (error) {
        addLog("Error: Signal corruption detected in hospital ops stream.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    runAutoIngestion();
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <Card className="border-accent/20 bg-primary/5 shadow-inner">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-headline text-accent flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" /> Sanjeevani Predictive Engine
            </CardTitle>
            <CardDescription>High-Frequency Signal Detection & Backtesting</CardDescription>
          </div>
          {loading && <Loader2 className="h-4 w-4 animate-spin text-accent" />}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Raw Ingestion Terminal */}
        <div className="bg-black/90 rounded-lg p-3 font-mono text-[9px] text-green-400 overflow-hidden border border-accent/20 h-32 relative">
          <div className="absolute top-2 right-2 opacity-50">
            <Terminal className="h-3 w-3" />
          </div>
          <div className="space-y-1">
            <p className="text-white/60 mb-2 border-b border-white/10 pb-1">LIVE INGESTION STREAM (AES-256)</p>
            {logs.map((log, i) => (
              <p key={i} className="animate-in fade-in duration-300">{log}</p>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>

        {/* Data Sources Visualizer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "OSINT FEED", icon: Globe, status: loading ? "parsing" : "synced", color: "text-blue-500" },
            { label: "SOCIAL VECTORS", icon: MessageSquare, status: loading ? "weighting" : "synced", color: "text-purple-500" },
            { label: "IoT TELEMETRY", icon: Activity, status: loading ? "normalizing" : "synced", color: "text-teal-500" },
            { label: "HOSPITAL OPS", icon: Hospital, status: loading ? "validating" : "synced", color: "text-red-500" },
          ].map((src, idx) => (
            <div key={idx} className="bg-white p-3 rounded-lg border flex flex-col items-center gap-2 shadow-sm">
              <src.icon className={`h-4 w-4 ${src.color} ${loading ? 'animate-pulse' : ''}`} />
              <div className="text-center">
                <p className="text-[9px] font-black text-muted-foreground uppercase">{src.label}</p>
                <p className="text-[8px] font-bold text-accent uppercase">{src.status}</p>
              </div>
            </div>
          ))}
        </div>

        {prediction ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* National Risk Index */}
            <div className="bg-accent text-white p-4 rounded-xl shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 p-2 opacity-10">
                <TrendingUp className="h-20 w-20" />
              </div>
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Predictive Alpha (HVIX)</p>
                  <p className="text-4xl font-black">{prediction.riskIndex}.0</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-white border-white/40 mb-1 font-mono">BACKTESTED</Badge>
                  <p className="text-[10px] font-bold opacity-80">{prediction.forecast7Days}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {prediction.predictedOutbreaks.map((outbreak, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border-l-4 border-l-red-500 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-accent uppercase tracking-tight">{outbreak.disease}</h4>
                        <Badge variant="outline" className="text-[9px] font-mono">{outbreak.confidenceLevel}% SIGMA</Badge>
                      </div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{outbreak.area}</p>
                    </div>
                    <Badge 
                      variant={outbreak.likelihood === 'High' ? 'destructive' : 'secondary'}
                      className="capitalize text-[10px]"
                    >
                      {outbreak.likelihood} Risk
                    </Badge>
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed font-medium">
                    {outbreak.trendDescription}
                  </p>
                  <div className="bg-primary/5 p-3 rounded-lg flex items-start gap-3 border border-primary/10">
                    <ShieldCheck className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <div className="text-[10px]">
                      <span className="font-black block text-accent uppercase tracking-widest mb-1">Mitigation Protocol</span>
                      {outbreak.preventiveMeasures}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Alert className="bg-white border-amber-200 shadow-sm">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800 font-bold text-xs uppercase tracking-widest">
                Quant Assessment
              </AlertTitle>
              <AlertDescription className="text-xs font-medium text-amber-900/80">
                {prediction.overallAssessment}
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-xl border-accent/10 bg-white/50">
            <Sparkles className="h-10 w-10 mx-auto mb-4 opacity-20" />
            <p className="text-sm font-bold text-accent/40 uppercase tracking-widest">Signal Detection Active</p>
            <p className="text-[10px] max-w-[200px] mx-auto mt-2 leading-relaxed">Engine is currently correlating multi-vector ingestion streams. Prediction results will stabilize shortly.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
