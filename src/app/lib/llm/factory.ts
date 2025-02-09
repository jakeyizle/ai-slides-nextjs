import { LLMService, LLMConfig } from './types';
import { OllamaService } from './ollama';

export type LLMProvider = 'ollama';

const DEFAULT_CONFIG: Record<LLMProvider, LLMConfig> = {
  ollama: {
    endpoint: process.env.NEXT_PUBLIC_LLM_ENDPOINT || 'http://localhost:11434',
    model: process.env.NEXT_PUBLIC_LLM_MODEL || 'mistral',
  },
};

export function createLLMService(
  provider: LLMProvider = 'ollama',
  config?: Partial<LLMConfig>
): LLMService {
  const finalConfig: LLMConfig = {
    ...DEFAULT_CONFIG[provider],
    ...config,
  };

  switch (provider) {
    case 'ollama':
      return new OllamaService(finalConfig);
    default:
      throw new Error(`Unsupported LLM provider: ${provider}`);
  }
}
