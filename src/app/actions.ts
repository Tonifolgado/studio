'use server';

import { identifyTreeSpecies, IdentifyTreeSpeciesOutput } from '@/ai/flows/identify-tree-species';

export async function handleImageIdentification(
  photoDataUri: string
): Promise<{ success: true; data: IdentifyTreeSpeciesOutput } | { success: false; error: string }> {
  try {
    if (!photoDataUri) {
      return { success: false, error: 'No image data provided.' };
    }
    const result = await identifyTreeSpecies({ photoDataUri });
    return { success: true, data: result };
  } catch (error) {
    console.error('Error identifying tree species:', error);
    return { success: false, error: 'Failed to identify the tree. Please try again.' };
  }
}
