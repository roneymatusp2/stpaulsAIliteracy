# 🤖 St. Paul's AI News Automation – Supabase Setup Guide

## Prerequisites
- Active Supabase project (Pro tier recommended for Edge Functions + `pg_cron`).
- Supabase CLI logged in.
- API keys for OpenAI plus optional fallbacks (Groq, Cohere, Anthropic, xAI).

## 1. Environment variables
Create `.env` at the project root:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_ROLE_KEY=service-role-key

# Edge Functions
OPENAI_API_KEY=sk-your-openai-key
GROQ_API_KEY=gsk-optional
COHERE_API_KEY=optional
ANTHROPIC_API_KEY=optional
GROK_API_KEY=optional
```

## 2. Supabase dashboard checklist
1. Visit **Settings → API** and copy the project URL + anon key.
2. Store the service role key securely.
3. Enable the `pg_cron` extension.
4. Deploy database migrations with `supabase db push`.
5. Deploy the Edge Functions:
   ```bash
   supabase functions deploy fetch-ai-news
   supabase functions deploy process-ai-summaries
   ```

## 3. Database structure
- `ai_news` – processed articles.
- `ai_news_summaries` – AI-generated summaries.
- `news_sources` – active RSS/API providers.
- `pipeline_logs` – automation events.
- `ai_news_tag_categories` – extended tagging.

## 4. Automation cadence
- Fetch every **3 hours** (configurable via `AUTOMATION_CONFIG`).
- Summaries start **15 minutes** after the fetch completes.
- Clean-up removes stale or failed rows every 30 days.

## 5. Manual controls inside the UI
- **Initialise automation** – seeds trusted sources and schedules cron jobs.
- **Manual fetch** – instant article retrieval for testing.
- **Process AI summaries** – forces summarisation without waiting for cron.
- **Clean & validate data** – purges failures and re-runs health checks.

## 6. Logging
Each setup step inserts a row in `pipeline_logs` so you can audit who triggered what. Use the diagnostic panel or run:
```sql
select * from pipeline_logs order by created_at desc limit 20;
```

With this configuration the AI News feature remains aligned with the St. Paul’s School governance expectations while still being easy to maintain.
