"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, Loader2, Database, Globe, MessageSquare, Activity, Hospital, TrendingUp, AlertTriangle, Zap, Server } from "lucide-react";
import { predictDiseaseOutbreaks, type PredictDiseaseOutbreaksOutput } from "@/ai/flows/predict-disease-outbreaks";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export function AIOutbreakPredictor() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictDiseaseOutbreaksOutput | null>(null);

  const runPrediction = async () => {
    setLoading(true);
    try {
      // Injecting random/buzzword heavy data for the quant health model
      const result = await predictDiseaseOutbreaks({
        newsData: "Hyper-local news scrapers detecting 'flu-cluster' spikes in Noida/Greater Noida. Global bio-surveillance nodes reporting H1N1-v2 volatility. Real-time media sentiment trending towards 'pediatric respiratory distress'.",
        socialForumsData: "Social listening vectors: #DelhiFlu up 450%. Reddit/r/India sub-threads identifying cough-latency anomalies in South Delhi cohorts. High-frequency symptom keyword ingestion hitting 99th percentile.",
        anonymousVitalsData: "IoT Niramaya Ingestion: Aggregating 50k+ anonymized heart-rate and thermal vectors. Detecting 2.3 standard deviation shift in average diurnal temperature across Delhi-NCR bio-zone.",
        hospitalOpsData: "ABDM 3.1 Gateway: High-concurrency OPD hits in tertiary care centers. Diagnostic lab throughput showing 35% surge in ILI-markers. Pharmaceutical supply-chain liquidity decreasing for broad-spectrum antivirals.",
        focusArea: "Pan-India Sovereignty Zone"
      });
      setPrediction(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-accent/20 bg-primary/5 shadow-inner">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xl font-headline text-accent flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" /> Sanjeevani Predictive Engine
          </CardTitle>
          <CardDescription>High-Frequency Symptom Ingestion & Backtesting</CardDescription>
        </div>
        <Button 
          onClick={runPrediction} 
          disabled={loading}
          variant="outline"
          className="border-accent text-accent hover:bg-accent hover:text-white transition-all font-bold"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Server className="h-4 w-4 mr-2" />}
          EXECUTE INGESTION
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Data Sources Visualizer with Buzzwords */}
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
            <p className="text-sm font-bold text-accent/40 uppercase tracking-widest">Standby for Signal Detection</p>
            <p className="text-[10px] max-w-[200px] mx-auto mt-2 leading-relaxed">Engine is primed for multi-vector ingestion (OSINT, IoT, ABDM). Press execute to run predictive backtesting.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
