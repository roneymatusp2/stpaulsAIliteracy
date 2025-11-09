# 🔑 Recommended AI API Keys (Priority Order)

## 1. OpenAI (Primary)
- **URL**: https://platform.openai.com/api-keys
- **Model**: `gpt-4o-mini`
- **Cost**: approx. USD 0.15 / 1M tokens
- **Variable**: `OPENAI_API_KEY`

## 2. Groq (Fallback #1 – Free)
- **URL**: https://console.groq.com/keys
- **Model**: `llama3-8b-8192`
- **Variable**: `GROQ_API_KEY`

## 3. Cohere (Fallback #2 – Free tier)
- **URL**: https://dashboard.cohere.com/api-keys
- **Model**: `command-light`
- **Variable**: `COHERE_API_KEY`

## 4. Anthropic (Fallback #3)
- **URL**: https://console.anthropic.com/account/keys
- **Model**: `claude-3-haiku-20240307`
- **Variable**: `ANTHROPIC_API_KEY`

## 5. xAI Grok (Fallback #4)
- **URL**: https://console.x.ai/team/api-keys
- **Model**: `grok-beta`
- **Variable**: `GROK_API_KEY`

### Recommended order inside Supabase Edge Functions
```
OpenAI → Groq → Cohere → Anthropic → Grok
```

### Supabase Edge Function variables
Add these under **Settings → Edge Functions → Environment Variables**:
```
OPENAI_API_KEY=sk-...
GROQ_API_KEY=gsk-...
COHERE_API_KEY=...
ANTHROPIC_API_KEY=...
GROK_API_KEY=...
```

Only the keys you supply will be used; the automation gracefully falls back through the list.
