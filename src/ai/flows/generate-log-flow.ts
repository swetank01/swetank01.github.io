
'use server';
/**
 * @fileOverview A flow to generate a fictional mission log for a project.
 *
 * - generateMissionLog - A function that creates a mission log.
 * - MissionLogInput - The input type for the generateMissionLog function.
 * - MissionLogOutput - The return type for the generateMissionLog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const MissionLogInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  description: z.string().describe('The description of the project.'),
});
export type MissionLogInput = z.infer<typeof MissionLogInputSchema>;

const MissionLogOutputSchema = z.object({
  log: z.string().describe('The generated mission log.'),
});
export type MissionLogOutput = z.infer<typeof MissionLogOutputSchema>;

export async function generateMissionLog(input: MissionLogInput): Promise<MissionLogOutput> {
  return await generateMissionLogFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMissionLogPrompt',
  input: {schema: MissionLogInputSchema},
  output: {schema: MissionLogOutputSchema},
  prompt: `You are a futuristic AI assistant for a DevOps Engineer named Sw3t@nK.
  Your task is to generate a short, creative, and engaging mission log entry for a given project.
  The tone should be professional but with a sci-fi, "hackerverse" flavor.
  Focus on the outcome and impact of the project.

  Project Title: {{{title}}}
  Project Description: {{{description}}}
  
  Generate a mission log based on this information.
  Keep it concise, around 2-3 sentences.
  `,
});

const generateMissionLogFlow = ai.defineFlow(
  {
    name: 'generateMissionLogFlow',
    inputSchema: MissionLogInputSchema,
    outputSchema: MissionLogOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
