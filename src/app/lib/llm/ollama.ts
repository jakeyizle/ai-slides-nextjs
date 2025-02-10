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


  getSlidesPrompt =  `Generate presentation slides using full markdown capabilities. CRITICAL: Each slide MUST be separated by a "---" line.

Example format:
# Slide 1 Title
Content for slide 1
- Point 1
- Point 2

---

# Slide 2 Title
Content for slide 2
* Bullet point
* Another point

---

# Slide 3 Title
Final slide content

Guidelines:
- ALWAYS separate each slide with "---" (this is required and non-negotiable)
- Use markdown elements: headings (#, ##, ###), lists (-, *, numbers), bold (**), italic (*), code blocks (\`\`\`), blockquotes (>), tables
- Structure each slide with a clear hierarchy using different heading levels
- Include relevant code snippets, quotes, or tables where appropriate
- Use emphasis and formatting to highlight key points
- Keep content concise and visually scannable
- Ensure proper markdown syntax and formatting

Topic:`

  async *generateSlidesStream(prompt: string): AsyncGenerator<StreamChunk> {
    try {
      const response = await this.makeRequest(`${this.getSlidesPrompt} ${prompt}}`, true);
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
