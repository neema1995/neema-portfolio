/**
 * Inference provider config.
 *
 * The endpoint is OpenAI-compatible, which is the de-facto standard for
 * open-model hosts — so Groq, Together, OpenRouter, Fireworks or a local
 * vLLM/Ollama server are all reachable by changing AI_BASE_URL and AI_MODEL.
 * Nothing else in the codebase needs to know which one is in use.
 */
const DEFAULT_BASE_URL = 'https://api.groq.com/openai/v1'
const DEFAULT_MODEL = 'openai/gpt-oss-120b'

/** Human-readable names for the models we ship a default for. */
const MODEL_LABELS: Record<string, string> = {
  'llama-3.3-70b-versatile': 'Llama 3.3 70B',
  'llama-3.1-8b-instant': 'Llama 3.1 8B',
  'openai/gpt-oss-120b': 'GPT-OSS 120B',
  'openai/gpt-oss-20b': 'GPT-OSS 20B',
}

/** Provider names keyed by API host, used only for the transparency answer. */
const PROVIDER_LABELS: Record<string, string> = {
  'api.groq.com': 'Groq',
  'api.together.xyz': 'Together AI',
  'openrouter.ai': 'OpenRouter',
  'api.fireworks.ai': 'Fireworks AI',
}

function env(name: string, fallback: string): string {
  const value = process.env[name]?.trim()
  return value && value.length > 0 ? value : fallback
}

export const aiConfig = {
  baseUrl: env('AI_BASE_URL', DEFAULT_BASE_URL).replace(/\/$/, ''),
  model: env('AI_MODEL', DEFAULT_MODEL),
  get apiKey(): string | undefined {
    return process.env.AI_API_KEY?.trim() || undefined
  },
  /** e.g. "Llama 3.3 70B" — falls back to the raw id for unknown models. */
  get modelLabel(): string {
    return MODEL_LABELS[this.model] ?? this.model
  },
  /** e.g. "Groq" — falls back to the hostname so the answer stays truthful. */
  get providerLabel(): string {
    try {
      const host = new URL(this.baseUrl).hostname
      return PROVIDER_LABELS[host] ?? host
    } catch {
      return 'the configured provider'
    }
  },
}
