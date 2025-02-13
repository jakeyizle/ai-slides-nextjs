import { GENERATE_SLIDES_PROMPT, MARKDOWN_SYSTEM_PROMPT } from './prompts';
import { LLMConfig, LLMService, StreamChunk } from './types';

const EXPLANATION_PROMPT = `Analyze these presentation slides and provide a presenter's guide:

1. Explain the narrative flow and key messages
2. Highlight important points and their significance
3. Provide tips for delivering each section effectively
4. Suggest areas for audience interaction or emphasis

Slides to analyze:`;

export class OllamaService implements LLMService {
  private config: LLMConfig;
  public hasStreaming = true;

  constructor(config: LLMConfig) {
    this.config = config;
  }

  private async makeRequest(prompt: string, stream: boolean = false, system: string = '') {
    const response = await fetch(`${this.config.endpoint}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model,
        prompt,
        stream,
        system,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  }

  async *generateSlidesStream(prompt: string): AsyncGenerator<StreamChunk> {
    try {
      const response = await this.makeRequest(`${GENERATE_SLIDES_PROMPT} ${prompt}}`, true, MARKDOWN_SYSTEM_PROMPT);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body is null');
      }

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          yield { content: '', done: true };
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.trim()) {
            try {
              const parsed = JSON.parse(line);
              yield {
                content: parsed.response,
                done: false
              };
            } catch (e) {
              console.warn('Failed to parse streaming response:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in slides stream:', error);
      throw error;
    }
  }

  async *generateExplanationStream(slides: string): AsyncGenerator<StreamChunk> {
    try {
      const response = await this.makeRequest(`${EXPLANATION_PROMPT}\n\n${slides}`, true);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body is null');
      }

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          yield { content: '', done: true };
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.trim()) {
            try {
              const parsed = JSON.parse(line);
              yield {
                content: parsed.response,
                done: false
              };
            } catch (e) {
              console.warn('Failed to parse streaming response:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in explanation stream:', error);
      throw error;
    }
  }
}
