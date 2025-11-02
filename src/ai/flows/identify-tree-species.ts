'use server';

/**
 * @fileOverview An AI agent for identifying tree species from images.
 *
 * - identifyTreeSpecies - A function that handles the tree species identification process.
 * - IdentifyTreeSpeciesInput - The input type for the identifyTreeSpecies function.
 * - IdentifyTreeSpeciesOutput - The return type for the identifyTreeSpecies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyTreeSpeciesInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a tree (leaf, bark, flower), as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type IdentifyTreeSpeciesInput = z.infer<typeof IdentifyTreeSpeciesInputSchema>;

const IdentifyTreeSpeciesOutputSchema = z.object({
  speciesName: z.string().describe('The identified English species name of the tree.'),
  speciesNameSpanish: z.string().describe('The identified Spanish species name of the tree.'),
  confidence: z.number().describe('The confidence level of the identification (0-1).'),
  additionalDetails: z.string().optional().describe('Any additional details about the identification.'),
});
export type IdentifyTreeSpeciesOutput = z.infer<typeof IdentifyTreeSpeciesOutputSchema>;

export async function identifyTreeSpecies(input: IdentifyTreeSpeciesInput): Promise<IdentifyTreeSpeciesOutput> {
  return identifyTreeSpeciesFlow(input);
}

const identifyTreeSpeciesPrompt = ai.definePrompt({
  name: 'identifyTreeSpeciesPrompt',
  input: {schema: IdentifyTreeSpeciesInputSchema},
  output: {schema: IdentifyTreeSpeciesOutputSchema},
  prompt: `You are an expert botanist specializing in identifying tree species from images.

You will analyze the provided image and identify the tree species.

Analyze the following image:

{{media url=photoDataUri}}

Return the English and Spanish species names, your confidence level (0-1), and any additional details that might be helpful.
`,
});

const identifyTreeSpeciesFlow = ai.defineFlow(
  {
    name: 'identifyTreeSpeciesFlow',
    inputSchema: IdentifyTreeSpeciesInputSchema,
    outputSchema: IdentifyTreeSpeciesOutputSchema,
  },
  async input => {
    const {output} = await identifyTreeSpeciesPrompt(input);
    return output!;
  }
);
