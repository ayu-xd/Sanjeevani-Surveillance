'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating concise, natural language summaries
 * and key insights from aggregated disease surveillance data for health administrators.
 *
 * - generateAdminInsights - A wrapper function to call the Genkit flow.
 * - GenerateAdminInsightsInput - The input type for the generateAdminInsights function.
 * - GenerateAdminInsightsOutput - The return type for the generateAdminInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Schema for the input of the generateAdminInsights flow.
 * It expects a string containing aggregated disease surveillance data.
 */
const GenerateAdminInsightsInputSchema = z.object({
  aggregatedReport: z
    .string()
    .describe(
      'A detailed report string containing aggregated disease surveillance data, including patterns and trends based on location, time, and disease type.'
    ),
});
export type GenerateAdminInsightsInput = z.infer<
  typeof GenerateAdminInsightsInputSchema
>;

/**
 * Schema for the output of the generateAdminInsights flow.
 * It provides a natural language summary and a list of key insights.
 */
const GenerateAdminInsightsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise, natural language summary of the overall health trends and areas of concern derived from the aggregated data.'
    ),
  keyInsights: z
    .array(z.string())
    .describe(
      'An array of bullet points, each representing a key insight or actionable trend identified from the disease surveillance data.'
    ),
});
export type GenerateAdminInsightsOutput = z.infer<
  typeof GenerateAdminInsightsOutputSchema
>;

/**
 * Defines the prompt for generating admin insights from aggregated health data.
 * This prompt instructs the AI to act as a healthcare data analyst and provide
 * a summary and key insights based on the provided report.
 */
const generateAdminInsightsPrompt = ai.definePrompt({
  name: 'generateAdminInsightsPrompt',
  input: {schema: GenerateAdminInsightsInputSchema},
  output: {schema: GenerateAdminInsightsOutputSchema},
  prompt: `You are an expert healthcare data analyst. Your task is to analyze the provided aggregated disease surveillance report and extract the most important health trends and areas of concern.

Based on the following aggregated report, provide a concise natural language summary and a list of key insights. The key insights should be specific and actionable points.

Aggregated Disease Surveillance Report:
{{{aggregatedReport}}}`,
});

/**
 * Defines the Genkit flow for generating admin insights.
 * This flow takes an aggregated report as input, processes it using the defined prompt,
 * and returns a summary and key insights.
 */
const generateAdminInsightsFlow = ai.defineFlow(
  {
    name: 'generateAdminInsightsFlow',
    inputSchema: GenerateAdminInsightsInputSchema,
    outputSchema: GenerateAdminInsightsOutputSchema,
  },
  async input => {
    const {output} = await generateAdminInsightsPrompt(input);
    if (!output) {
      throw new Error('Failed to generate admin insights: output was empty.');
    }
    return output;
  }
);

/**
 * Initiates the generation of admin insights from aggregated disease surveillance data.
 * @param input The input object containing the aggregated report string.
 * @returns A promise that resolves to an object containing a summary and key insights.
 */
export async function generateAdminInsights(
  input: GenerateAdminInsightsInput
): Promise<GenerateAdminInsightsOutput> {
  return generateAdminInsightsFlow(input);
}
