import { LLMConfig, LLMResponse, LLMService, StreamChunk } from './types';

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

  private async makeRequest(prompt: string, stream: boolean = false) {
    const response = await fetch(`${this.config.endpoint}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: this.config.model,
        prompt,
        stream,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  }


  getSlidesPrompt = (prompt: string) => `You are a presentation content generator. Your task is to create high-quality presentation content in Markdown format that is engaging, well-structured, and informative.

INPUT PARAMETERS:
- Topic: ${prompt}

REQUIREMENTS:
1. Generate presentation content using proper Markdown syntax
2. Each slide MUST be separated by exactly "---" with NO extra blank lines before or after
3. There must be no blank lines between slides and "---" separators

SPACING RULES:
- No blank lines between slide content and "---" separators
- Single blank line after each header
- No extra blank lines at the start or end of slides
- No multiple consecutive blank lines anywhere

FORMAT EXAMPLE:
## Title Slide
* Presentation Topic
* Presenter Name
---
## Agenda
* Key Point 1
* Key Point 2
* Key Point 3
---
## Content Slide
* Main point
* Supporting details
* Example or illustration
---
END EXAMPLE

STYLE GUIDELINES:
- Professional: Clear, factual, business-appropriate language
- Casual: Conversational tone, relatable examples
- Technical: Detailed, precise, data-driven
- Creative: Engaging, storytelling approach

OUTPUT CONSTRAINTS:
- Each slide should contain 3-5 bullet points maximum
- Use consistent formatting throughout
- Avoid lengthy paragraphs
- Include relevant examples or data points
- Maintain logical flow between slides

Please generate presentation content based on the following prompt: ${prompt}`


  async generateExplanation(slides: string): Promise<LLMResponse> {
    try {
      const response = await this.makeRequest(`${EXPLANATION_PROMPT}\n\n${slides}`);
      const data = await response.json();

      return {
        content: data.response,
      };
    } catch (error) {
      console.error('Error generating explanation:', error);
      return {
        content: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async *generateSlidesStream(prompt: string): AsyncGenerator<StreamChunk> {
    try {
      const response = await this.makeRequest(this.getSlidesPrompt(prompt), true);
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
