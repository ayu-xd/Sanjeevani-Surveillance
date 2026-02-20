
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
    Disease Surveillance Summary Report - Q4 2024
    --------------------------------------------
    Total Cases: 14,203 (Anonymized)
    
    1. Influenza-like Illness (ILI): 
       - Total: 6,400 cases. 
       - Trend: 22% increase in North Sector.
       - Age group mostly affected: 5-14 years.
    
    2. Water-borne Diseases (Typhoid/Cholera):
       - Total: 1,200 cases.
       - Hotspot: East District (Low-lying areas).
       - Correlation: Recent heavy rainfall events recorded.
    
    3. Chronic Respiratory:
       - Stable trends in Urban zones.
       - Slight decrease in South Sector following emission control policies.
    
    Infrastructure Status:
    - 85% clinics reporting data daily.
    - 15% latency in West Region due to network maintenance.
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
            <FileText className="h-5 w-5" /> Executive Summary
          </CardTitle>
          <Button 
            onClick={fetchInsights} 
            disabled={loading}
            size="sm"
            className="bg-accent hover:bg-accent/90 text-white"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Generate Insights
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {insights ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">General Overview</h4>
              <p className="text-sm leading-relaxed text-foreground/80">{insights.summary}</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Key Actionable Insights</h4>
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
              <p className="text-sm font-medium">No Insights Generated Yet</p>
              <p className="text-xs text-muted-foreground max-w-[200px]">Click the button above to analyze the aggregated surveillance data.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
