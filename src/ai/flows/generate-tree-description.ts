'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a short, engaging description of a tree species.
 *
 * It includes:
 * - generateTreeDescription: The main function to generate the tree description.
 * - GenerateTreeDescriptionInput: The input type for the function, specifying the tree species name.
 * - GenerateTreeDescriptionOutput: The output type, containing the generated description.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTreeDescriptionInputSchema = z.object({
  treeSpecies: z.string().describe('The name of the tree species to describe.'),
});
export type GenerateTreeDescriptionInput = z.infer<typeof GenerateTreeDescriptionInputSchema>;

const GenerateTreeDescriptionOutputSchema = z.object({
  description: z.string().describe('A short, engaging description of the tree species.'),
});
export type GenerateTreeDescriptionOutput = z.infer<typeof GenerateTreeDescriptionOutputSchema>;

export async function generateTreeDescription(input: GenerateTreeDescriptionInput): Promise<GenerateTreeDescriptionOutput> {
  return generateTreeDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTreeDescriptionPrompt',
  input: {schema: GenerateTreeDescriptionInputSchema},
  output: {schema: GenerateTreeDescriptionOutputSchema},
  prompt: `Provide a short, engaging description of the following tree species:

{{treeSpecies}}

The description should be no more than 3 sentences long and highlight interesting facts about the tree.`,
});

const generateTreeDescriptionFlow = ai.defineFlow(
  {
    name: 'generateTreeDescriptionFlow',
    inputSchema: GenerateTreeDescriptionInputSchema,
    outputSchema: GenerateTreeDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
