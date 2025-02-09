# Local LLM Setup for AI Slides

This project uses Ollama for local LLM capabilities during development. Follow these steps to set up the local environment.

## Prerequisites

- Docker and Docker Compose installed on your system
- Node.js and npm (already required for the Next.js project)

## Setup Steps

1. Start the Ollama container:
   ```bash
   docker-compose up -d
   ```

2. Pull the Mistral model (this only needs to be done once):
   ```bash
   curl -X POST http://localhost:11434/api/pull -d '{"name": "mistral"}'
   ```
   Note: This may take a few minutes depending on your internet connection.

3. Verify the setup:
   ```bash
   curl http://localhost:11434/api/generate -d '{
     "model": "mistral",
     "prompt": "Hello!"
   }'
   ```
   You should receive a response from the model.

## Environment Configuration

The project uses the following environment variables (already set in .env.local):

- `NEXT_PUBLIC_LLM_PROVIDER`: Set to 'ollama' for local development
- `NEXT_PUBLIC_LLM_ENDPOINT`: The Ollama API endpoint (default: http://localhost:11434)
- `NEXT_PUBLIC_LLM_MODEL`: The model to use (default: mistral)

## Usage

The LLM service is accessible through the `/api/slides/generate` endpoint:

```typescript
// Example API call
const response = await fetch('/api/slides/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Create a presentation about...',
  }),
});

const data = await response.json();
console.log(data.content); // Markdown-formatted slides
```

## Production Deployment

For production, you can modify the LLM provider by:

1. Creating a new implementation of the `LLMService` interface
2. Adding the new provider type to the `LLMProvider` type
3. Updating the factory to handle the new provider
4. Configuring environment variables for the production service

## Troubleshooting

1. If Ollama is not responding:
   - Check if the container is running: `docker ps`
   - View logs: `docker logs ai-slides-ollama`
   - Ensure port 11434 is not being used by another service

2. If the model is not loaded:
   - Try pulling the model again
   - Check Ollama logs for any errors
   - Verify the model name in your environment variables matches the pulled model
