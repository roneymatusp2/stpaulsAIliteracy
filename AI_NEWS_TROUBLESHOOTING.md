# 🔧 AI News System – Troubleshooting Guide

## What usually breaks?
1. **Missing environment variables** – `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and service role keys.
2. **Supabase schema not deployed** – tables or Edge Functions unavailable.
3. **Edge Functions offline** – `fetch-ai-news` and `process-ai-summaries` fail to deploy or run.

## Quick recovery checklist

### 1. Create/update `.env`
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_ROLE_KEY=service-role-key
OPENAI_API_KEY=sk-your-openai-key
```

### 2. Connect Supabase CLI
```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
supabase functions deploy fetch-ai-news
supabase functions deploy process-ai-summaries
```

### 3. Use the built-in diagnostic buttons
1. Open the AI News panel inside the platform.
2. If no news is visible, a yellow troubleshooting card appears.
3. Use **System Diagnostic** to view missing pieces.
4. Use **Auto-Fix System** to reinsert reliable sources and clean corrupted rows.
5. Monitor the browser console (`F12`) for detailed logs.

## What the diagnostic checks
- Supabase connection and credentials.
- Presence of required tables (`ai_news`, `news_sources`, `pipeline_logs`).
- Edge Function availability.
- Existence of trusted sources and recent successful fetches.

## When to raise with EdTech
- The automation log reports repeated errors after running Auto-Fix.
- Edge Functions deploy successfully but Supabase usage is blocked by the network.
- The platform must add or remove data sources for policy reasons.

Document any steps taken and share console output with the Educational Technology team for rapid follow-up.
