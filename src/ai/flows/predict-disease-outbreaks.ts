'use server';
/**
 * @fileOverview A Genkit flow for predicting potential disease outbreaks.
 *
 * - predictDiseaseOutbreaks - A function that handles the disease outbreak prediction process.
 * - PredictDiseaseOutbreaksInput - The input type for the predictDiseaseOutbreaks function.
 * - PredictDiseaseOutbreaksOutput - The return type for the predictDiseaseOutbreaks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictDiseaseOutbreaksInputSchema = z.object({
  historicalDataSummary: z
    .string()
    .describe(
      'A summary of historical disease patterns, outbreaks, and relevant health data.'
    ),
  realtimeCaseData: z
    .string()
    .describe(
      'A summary of current real-time health information, including recent case counts, locations, and disease types.'
    ),
  focusArea: z
    .string()
    .optional()
    .describe(
      'An optional specific geographical area for which to prioritize outbreak prediction.'
    ),
  focusDisease: z
    .string()
    .optional()
    .describe(
      'An optional specific disease type to focus on for prediction.'
    ),
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
        trendDescription: z
          .string()
          .describe(
            'A description of the data patterns and trends leading to this prediction.'
          ),
        preventiveMeasures: z
          .string()
          .describe('Suggested preventive measures or recommendations.'),
      })
    )
    .describe('A list of predicted disease outbreaks.'),
  overallAssessment: z
    .string()
    .describe('An overall assessment of the current disease surveillance situation.'),
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
  prompt: `You are an AI-powered disease surveillance expert.
Your task is to analyze provided historical and real-time health data to proactively identify and predict potential disease outbreaks in specific geographical areas.

### Historical Data Summary:
{{{historicalDataSummary}}}

### Real-time Case Data:
{{{realtimeCaseData}}}

{{#if focusArea}}
### Focus Area:
Predict potential outbreaks specifically for: {{{focusArea}}}
{{/if}}

{{#if focusDisease}}
### Focus Disease:
Prioritize prediction for disease type: {{{focusDisease}}}
{{/if}}

Carefully analyze the provided data, identify patterns and trends related to location, time, and disease type. Then, provide predictions for potential outbreaks, including the likelihood, severity, a description of the trends observed, and actionable preventive measures.

Structure your response as a JSON object matching the PredictDiseaseOutbreaksOutputSchema. If no significant outbreaks are predicted, still provide an overall assessment.`,
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
