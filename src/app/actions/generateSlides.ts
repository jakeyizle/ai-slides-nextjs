'use server'

import { createLLMService } from '@/app/lib/llm/factory';

export async function generateSlides(prompt: string) {
  try {
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    const llm = createLLMService();
    const result = await llm.generateSlides(prompt);

    if (result.error) {
      throw new Error(result.error);
    }
    return { content: result.content };
  } catch (error) {
    console.error('Error in slides generation:', error);
    throw new Error('Failed to generate slides');
  }
}
