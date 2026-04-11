# ADR 0007 — AI Provider Abstraction

## Status

Decided

## Context

The original AI integration (ADR 0004) was hard-coupled to Anthropic Claude. As requirements
evolved, two providers became needed:

- **Local development**: Ollama running in a Docker container — zero API cost, works offline.
- **Production**: Google AI Studio free tier — no infrastructure overhead.

A direct swap would have scattered provider-specific SDK calls across multiple files. A clean
abstraction was needed so that the provider can be switched via a single environment variable
without touching call sites.

## Decision

Introduce a `providers/` module inside `packages/ai` that acts as the single source of truth
for AI model instantiation.

### Structure

```
packages/ai/src/
  providers/
    types.ts     — AIProviderName union type
    ollama.ts    — createOllamaModel() using @ai-sdk/openai with Ollama's OpenAI-compatible endpoint
    google.ts    — createGoogleModel() using @ai-sdk/google for Google AI Studio
    index.ts     — getAIModel() factory; reads AI_PROVIDER env var and delegates
  config.ts      — AI_CONFIG (maxTokens, temperature) — no model field
```

### Rules

- All AI model instantiation goes through `getAIModel()` — never import a provider SDK directly
  outside `packages/ai/src/providers/`.
- `AI_PROVIDER` env var controls which provider is active: `"ollama"` (default) or `"google"`.
- Model names are controlled by `OLLAMA_MODEL` and `GOOGLE_MODEL` env vars with sensible defaults.

### Required environment variables

| Variable          | Local dev (default)              | Production         |
|-------------------|----------------------------------|--------------------|
| `AI_PROVIDER`     | `ollama`                         | `google`           |
| `OLLAMA_BASE_URL` | `http://localhost:11434/v1`      | _(not used)_       |
| `OLLAMA_MODEL`    | `llama3.2`                       | _(not used)_       |
| `GOOGLE_AI_API_KEY` | _(not used)_                   | required           |
| `GOOGLE_MODEL`    | _(not used)_                     | `gemini-2.0-flash` |

### Ollama Docker setup (local dev)

```yaml
# docker-compose.yml (add to project root for local dev)
services:
  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama

volumes:
  ollama_data:
```

Pull the model once after starting the container:

```bash
docker compose up -d ollama
docker exec -it <container_name> ollama pull llama3.2
```

## Consequences

- Switching the AI provider requires only changing `AI_PROVIDER` in `.env.local` / deployment env.
- No call site needs to know which provider is active.
- Adding a new provider (e.g., OpenAI, Mistral) requires only a new file in `providers/` and a
  new case in `getAIModel()` — no changes outside `packages/ai`.
- `@ai-sdk/anthropic` is no longer a dependency; replaced by `@ai-sdk/openai` (Ollama) and
  `@ai-sdk/google`.
- The Vercel AI SDK's `LanguageModelV1` interface provides the shared contract between providers
  and call sites — both `streamText` and `generateText` accept it unchanged.
