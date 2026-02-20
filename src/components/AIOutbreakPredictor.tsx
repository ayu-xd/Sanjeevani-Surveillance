"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, Loader2, Database, Globe, MessageSquare, Activity, Hospital, TrendingUp, AlertTriangle } from "lucide-react";
import { predictDiseaseOutbreaks, type PredictDiseaseOutbreaksOutput } from "@/ai/flows/predict-disease-outbreaks";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function AIOutbreakPredictor() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictDiseaseOutbreaksOutput | null>(null);

  const runPrediction = async () => {
    setLoading(true);
    try {
      const result = await predictDiseaseOutbreaks({
        newsData: "National media reporting sudden school closures in Noida due to 'unknown viral symptoms'. Global health reports indicate a new H1N1 variant in neighboring countries.",
        socialForumsData: "Twitter/X trends: #DelhiPollution and #Fever are up 300% in local NCR geo-tags. Reddit 'r/delhi' has multiple threads about recurring cough in children.",
        anonymousVitalsData: "IoT Data (Niramaya Cloud): 15% increase in average body temperature readings across 12,000 anonymized devices in South Delhi over the last 48 hours.",
        hospitalOpsData: "ABDM Dashboard: OPD registrations for respiratory distress up by 40% in Safdarjung and Max Healthcare. Antibiotic prescriptions peaking in district pharmacies.",
        focusArea: "Delhi NCR Region"
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
            <Sparkles className="h-5 w-5 text-teal-600" /> Sanjeevani Predictive Engine
          </CardTitle>
          <CardDescription>Multi-source Quantitative Health Analysis</CardDescription>
        </div>
        <Button 
          onClick={runPrediction} 
          disabled={loading}
          variant="outline"
          className="border-accent text-accent hover:bg-accent hover:text-white transition-all font-bold"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Database className="h-4 w-4 mr-2" />}
          INITIATE INGESTION
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Data Sources Visualizer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "NEWS", icon: Globe, status: loading ? "ingesting" : "synced", color: "text-blue-500" },
            { label: "FORUMS", icon: MessageSquare, status: loading ? "parsing" : "synced", color: "text-purple-500" },
            { label: "VITALS", icon: Activity, status: loading ? "aggregating" : "synced", color: "text-teal-500" },
            { label: "HOSPITAL", icon: Hospital, status: loading ? "validating" : "synced", color: "text-red-500" },
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
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Health Volatility (HVIX)</p>
                  <p className="text-4xl font-black">{prediction.riskIndex}.0</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-white border-white/40 mb-1">LIVE FORECAST</Badge>
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
                        <Badge variant="outline" className="text-[9px] font-mono">{outbreak.confidenceLevel}% CONF</Badge>
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
                      <span className="font-black block text-accent uppercase tracking-widest mb-1">Preventive Strategy</span>
                      {outbreak.preventiveMeasures}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Alert className="bg-white border-amber-200 shadow-sm">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800 font-bold text-xs uppercase tracking-widest">
                Executive Assessment
              </AlertTitle>
              <AlertDescription className="text-xs font-medium text-amber-900/80">
                {prediction.overallAssessment}
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground border-2 border-dashed rounded-xl border-accent/10 bg-white/50">
            <Sparkles className="h-10 w-10 mx-auto mb-4 opacity-20" />
            <p className="text-sm font-bold text-accent/40 uppercase tracking-widest">Awaiting Command Input</p>
            <p className="text-[10px] max-w-[200px] mx-auto mt-2 leading-relaxed">System is ready to aggregate News, Social, and IoT streams for predictive modeling.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
