"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, Loader2 } from "lucide-react";
import { predictDiseaseOutbreaks, type PredictDiseaseOutbreaksOutput } from "@/ai/flows/predict-disease-outbreaks";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export function AIOutbreakPredictor() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictDiseaseOutbreaksOutput | null>(null);

  const runPrediction = async () => {
    setLoading(true);
    try {
      const result = await predictDiseaseOutbreaks({
        historicalDataSummary: "Historical data for Delhi/UP region indicates peak Dengue cases post-monsoon (Sept-Nov). West Bengal typically see higher Malaria incidences during rainy season.",
        realtimeCaseData: "Current Trends: 20% rise in respiratory complaints in Delhi NCR due to AQI levels. Mumbai reports a localized cluster of viral fever cases in suburban districts.",
        focusArea: "Delhi NCR and Mumbai Suburban"
      });
      setPrediction(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-accent/20 bg-primary/5">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xl font-headline text-accent flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-teal-600" /> AI Outbreak Forecaster
          </CardTitle>
          <CardDescription>Predicting regional trends for Indian districts</CardDescription>
        </div>
        <Button 
          onClick={runPrediction} 
          disabled={loading}
          variant="outline"
          className="border-accent text-accent hover:bg-accent hover:text-white"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          Run AI Forecast
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {prediction ? (
          <>
            <div className="grid gap-4">
              {prediction.predictedOutbreaks.map((outbreak, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-accent">{outbreak.disease}</h4>
                      <p className="text-xs text-muted-foreground">{outbreak.area}</p>
                    </div>
                    <Badge 
                      variant={outbreak.likelihood === 'High' ? 'destructive' : 'secondary'}
                      className="capitalize"
                    >
                      {outbreak.likelihood} Risk
                    </Badge>
                  </div>
                  <p className="text-sm">{outbreak.trendDescription}</p>
                  <div className="bg-primary/10 p-2 rounded flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <div className="text-xs">
                      <span className="font-semibold block text-accent">MoHFW Recommendation:</span>
                      {outbreak.preventiveMeasures}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Alert className="bg-white border-accent/20">
              <AlertTitle className="text-accent flex items-center gap-2">
                National Health Assessment
              </AlertTitle>
              <AlertDescription className="text-sm">
                {prediction.overallAssessment}
              </AlertDescription>
            </Alert>
          </>
        ) : (
          <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl border-accent/10">
            <p>Initiate AI Analysis for real-time district forecasts</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
