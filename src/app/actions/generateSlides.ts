'use server'

import { createLLMService } from '@/app/lib/llm/factory';
import { StreamChunk } from '../lib/llm/types';

// For streaming responses
export type StreamResponse = {
  chunks: ReadableStream<StreamChunk>;
  hasStreaming: boolean;
};

export async function generateSlidesStream(prompt: string): Promise<StreamResponse> {
  const llm = createLLMService();
    const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of llm.generateSlidesStream(prompt)) {
          controller.enqueue(chunk);
          if (chunk.done) {
            controller.close();
            break;
          }
        }
      } catch (error) {
        controller.error(error);
      }
    }
  });

  return { chunks: stream, hasStreaming: true };
}

export async function generateExplanationStream(slides: string): Promise<StreamResponse> {
  const llm = createLLMService();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of llm.generateExplanationStream(slides)) {
          controller.enqueue(chunk);
          if (chunk.done) {
            controller.close();
            break;
          }
        }
      } catch (error) {
        controller.error(error);
      }
    }
  });

  return { chunks: stream, hasStreaming: true };
}
