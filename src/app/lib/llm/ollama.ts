import { LLMConfig, LLMResponse, LLMService } from './types';
import {YOUR_MOM_RESPONSE} from './fakeData'

export class OllamaService implements LLMService {
  private config: LLMConfig;

  constructor(config: LLMConfig) {
    this.config = config;
  }

  async generateSlides(prompt: string): Promise<LLMResponse> {
    try {
      // const response = await fetch(`${this.config.endpoint}/api/generate`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     model: this.config.model,
      //     prompt: `Generate presentation slides in Markdown format for the following topic: ${prompt}
          
      //     Format the response as a series of markdown slides using --- as slide separators.
      //     Each slide should have a clear heading and concise bullet points.
      //     Keep the content focused and presentation-friendly.`,
      //     stream: false,
      //   }),
      // });

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      // const data = await response.json();
      return {
        content: YOUR_MOM_RESPONSE,
      };
    } catch (error) {
      console.error('Error generating slides:', error);
      return {
        content: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}
