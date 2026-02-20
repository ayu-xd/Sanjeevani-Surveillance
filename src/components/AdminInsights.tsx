"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, FileText, ChevronRight } from "lucide-react";
import { generateAdminInsights, type GenerateAdminInsightsOutput } from "@/ai/flows/generate-admin-insights";

export function AdminInsights() {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<GenerateAdminInsightsOutput | null>(null);

  const mockAggregatedReport = `
    India National Health Surveillance Report - Jan 2025
    --------------------------------------------
    Total ABHA Records Processed: 4.2 Million (Anonymized)
    
    1. Seasonal Flu / ILI: 
       - Total: 45,000 cases reported across Delhi NCR and Punjab. 
       - Trend: 18% weekly increase.
       - Predominant Age Group: 0-12 years (Pediatric focus required).
    
    2. Vector-Borne Diseases:
       - Malaria Spike: 1,500 cases in rural Odisha and coastal Karnataka.
       - Correlation: Unseasonal rains in the southern peninsula.
    
    3. Non-Communicable Diseases (NCD):
       - Hypertension: Stable reporting from Kerala and Tamil Nadu wellness centers.
       - Screening compliance: 92% via Ayushman Bharat Health Accounts.
    
    Digital Infrastructure:
    - 98% PHCs in Rajasthan reporting real-time data.
    - Minor sync latency observed in North-East hill districts.
  `;

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const result = await generateAdminInsights({
        aggregatedReport: mockAggregatedReport,
      });
      setInsights(result);
    } catch (error) {
      console.error("Failed to generate insights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-accent/10 bg-white overflow-hidden h-full">
      <CardHeader className="bg-accent/[0.03] border-b border-accent/5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-headline text-accent flex items-center gap-2">
            <FileText className="h-5 w-5" /> Executive Summary (National)
          </CardTitle>
          <Button 
            onClick={fetchInsights} 
            disabled={loading}
            size="sm"
            className="bg-accent hover:bg-accent/90 text-white"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
            AI Insight Report
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {insights ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">National Situation Overview</h4>
              <p className="text-sm leading-relaxed text-foreground/80">{insights.summary}</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Actionable Policy Insights</h4>
              <div className="grid gap-2">
                {insights.keyInsights.map((insight, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-muted/20 p-3 rounded-lg border border-accent/5">
                    <ChevronRight className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <p className="text-sm font-medium">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Ready for National Analysis</p>
              <p className="text-xs text-muted-foreground max-w-[200px]">Click to analyze the latest aggregated data from the NHM cloud.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
