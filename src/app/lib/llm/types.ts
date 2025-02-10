export interface LLMConfig {
  endpoint: string;
  model: string;
}

export type StreamChunk = {
  content: string;
  done: boolean;
}

export interface LLMResponse {
  content: string;
  error?: string;
}

export interface LLMService {
  generateSlidesStream(prompt: string): AsyncGenerator<StreamChunk>;
  generateExplanationStream(slides: string): AsyncGenerator<StreamChunk>;
}
