'use server';
/**
 * @fileOverview A sophisticated Genkit flow for predicting potential disease outbreaks using multi-source data.
 *
 * - predictDiseaseOutbreaks - A function that handles the disease outbreak prediction process.
 * - PredictDiseaseOutbreaksInput - The input type for the predictDiseaseOutbreaks function.
 * - PredictDiseaseOutbreaksOutput - The return type for the predictDiseaseOutbreaks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictDiseaseOutbreaksInputSchema = z.object({
  newsData: z
    .string()
    .describe('Aggregated health news and media reports.'),
  socialForumsData: z
    .string()
    .describe('Social media sentiment and local forum discussions regarding health symptoms.'),
  anonymousVitalsData: z
    .string()
    .describe('Anonymized, aggregated vital signs (temperature, heart rate) from connected health devices.'),
  hospitalOpsData: z
    .string()
    .describe('Direct hospital reporting data including OPD footfall and diagnostic lab hits.'),
  focusArea: z
    .string()
    .optional()
    .describe('An optional specific geographical area for which to prioritize outbreak prediction.'),
});
export type PredictDiseaseOutbreaksInput = z.infer<
  typeof PredictDiseaseOutbreaksInputSchema
>;

const PredictDiseaseOutbreaksOutputSchema = z.object({
  predictedOutbreaks: z
    .array(
      z.object({
        area: z.string().describe('The geographical area of the predicted outbreak.'),
        disease: z.string().describe('The predicted disease type.'),
        likelihood: z
          .enum(['High', 'Medium', 'Low'])
          .describe('The likelihood of the outbreak occurring.'),
        severity: z
          .enum(['Critical', 'Moderate', 'Mild'])
          .describe('The predicted severity of the outbreak.'),
        confidenceLevel: z.number().describe('A percentage confidence score for this prediction.'),
        trendDescription: z
          .string()
          .describe('A description of the data patterns and trends leading to this prediction.'),
        preventiveMeasures: z
          .string()
          .describe('Suggested preventive measures or recommendations.'),
      })
    )
    .describe('A list of predicted disease outbreaks.'),
  riskIndex: z.number().describe('A national health risk index (0-100) similar to a volatility index.'),
  overallAssessment: z
    .string()
    .describe('An overall assessment of the current disease surveillance situation.'),
  forecast7Days: z.string().describe('A 7-day quantitative forecast trend.'),
});
export type PredictDiseaseOutbreaksOutput = z.infer<
  typeof PredictDiseaseOutbreaksOutputSchema
>;

export async function predictDiseaseOutbreaks(
  input: PredictDiseaseOutbreaksInput
): Promise<PredictDiseaseOutbreaksOutput> {
  return predictDiseaseOutbreaksFlow(input);
}

const predictDiseaseOutbreaksPrompt = ai.definePrompt({
  name: 'predictDiseaseOutbreaksPrompt',
  input: { schema: PredictDiseaseOutbreaksInputSchema },
  output: { schema: PredictDiseaseOutbreaksOutputSchema },
  prompt: `You are an AI-powered disease surveillance expert operating the "Sanjeevani Predictive Engine".
Your task is to act like a quantitative health analyst. Analyze the following data streams to predict potential disease outbreaks.

### DATA STREAMS:
1. News & Media: {{{newsData}}}
2. Social & Forum Sentiment: {{{socialForumsData}}}
3. Anonymous Vitals (IoT): {{{anonymousVitalsData}}}
4. Hospital Operations (ABDM): {{{hospitalOpsData}}}

{{#if focusArea}}
### Focus Area:
Priority prediction zone: {{{focusArea}}}
{{/if}}

Identify correlations across these streams (e.g., social media mentions of "fever" preceding hospital OPD spikes). Provide a quantitative-style risk report, including a Risk Index (similar to a VIX for health) and a 7-day forecast.

Structure your response as a JSON object matching the PredictDiseaseOutbreaksOutputSchema.`,
});

const predictDiseaseOutbreaksFlow = ai.defineFlow(
  {
    name: 'predictDiseaseOutbreaksFlow',
    inputSchema: PredictDiseaseOutbreaksInputSchema,
    outputSchema: PredictDiseaseOutbreaksOutputSchema,
  },
  async (input) => {
    const { output } = await predictDiseaseOutbreaksPrompt(input);
    return output!;
  }
);
