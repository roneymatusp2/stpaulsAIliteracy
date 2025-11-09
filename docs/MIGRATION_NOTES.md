# Migration Notes

## Overview
The project now represents St. Paul's School, São Paulo. Donation, book-sales, and personal branding artefacts were removed. Navigation is limited to the six institutional sections requested.

## Configuration changes
- **Env vars**: remove Stripe/PIX secrets. Keep only Supabase + AI API keys.
- **Supabase**: deploy migrations then run the automation panel’s “Initialise automation” button to seed sources.
- **Branding**: fonts now rely on web-safe fallbacks (`Archer` → `Playfair Display`, `Century Gothic` → `Nunito Sans`).
- **Assets**: `public/favicon.svg` represents the crest. All OG/Twitter images point to the official logo URL.

## Breaking changes
- Portuguese routes and data were deleted. Linking to `/pt-br/*` now 404s.
- Donation-related endpoints removed; no server side Stripe dependency remains.
- Newsletter logic removed – contact information points to `edtech@stpauls.br`.

## Deployment checklist
1. `npm install` (removes server dependencies).
2. `npm run build` to ensure Vite + TypeScript succeed.
3. Provision environment variables in hosting (Supabase keys + AI API keys).
4. Run Supabase `fetch-ai-news` and `process-ai-summaries` functions after deployment.
5. Update DNS / hosting metadata to match the new title and description if required by Netlify/Vercel.

## Testing suggestions
- Manual smoke test of each navigation item.
- Validate AI News controls (initialise, manual fetch, cleanup) while monitoring `pipeline_logs`.
- Check colour contrast with a11y tooling (WCAG AA target).
