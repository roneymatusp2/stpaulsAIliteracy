# Change Log – St. Paul's School Rebrand

## Removed files
- `server.js` and all donation/payment components (`DonationSection*`, `StripePaymentLinks`, PIX assets).
- Portuguese content folders (`src/pages/pt-br`, `src/data/*PTBR.ts`, legacy Astro pages, unused course data, newsletter components).
- Legacy documentation about donations (`DONATION_SETUP.md`, `PIX_DONATION_IMPLEMENTATION.md`, `STRIPE_PAYMENT_LINKS_IMPLEMENTATION.md`).

## Added / rewritten files
- `docs/CHANGELOG.md`, `docs/MIGRATION_NOTES.md`, new English documentation (`AI_NEWS_*`, `SUPABASE_AI_NEWS_SETUP.md`, `API_KEYS_SETUP.md`).
- Rebuilt `README.md`, `public/favicon.svg`.

## Modified files (highlights)
- Global branding (`index.html`, `tailwind.config.js`, `src/styles/globals.css`, `src/components/*`, `src/pages/*`).
- Supabase automation utilities (`src/lib/aiNewsAutomation.ts`, `supabase/functions/fetch-ai-news/index.ts`).
- Data & UI components (`App.tsx`, `Hero.tsx`, `Footer.tsx`, `HomePage.tsx`, `ToolsPage.tsx`, `LibraryPage.tsx`, `VideosPage.tsx`, `AboutPage.tsx`, `AINewsSection.tsx`, `AINewsAutomationPanel.tsx`, `SearchModal.tsx`, `FilterBar.tsx`, `FloatingCardGrid.tsx`, etc.).

## Dependencies
- Removed unused server dependencies: `express`, `cors`, `stripe`, `dotenv`, `nodemon`.

See `docs/MIGRATION_NOTES.md` for configuration steps.
