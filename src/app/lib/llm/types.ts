export interface LLMConfig {
  endpoint: string;
  model: string;
}

export interface LLMResponse {
  content: string;
  error?: string;
}

export interface LLMService {
  generateSlides(prompt: string): Promise<LLMResponse>;
}
