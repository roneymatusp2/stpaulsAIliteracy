# St. Paul's School – AI Learning Platform

Institutional platform for St. Paul's School (São Paulo, Brazil) that curates AI tools, guidance, and professional learning resources for staff and pupils.

## ✨ Features

### Core Platform
- **AI Tools Directory** – vetted for safeguarding, privacy, and curriculum fit
- **Professional Learning Guides** – practical pathways for staff development
- **Library & Video Collections** – research, policy, and classroom exemplars
- **AI News Automation** – Supabase-backed ingestion with manual override tools

### 🔐 User Features (New!)
- **Firebase Authentication** – Google Sign-In and email/password authentication
- **Personal Bookmarks** – save favorite tools, courses, and resources
- **Learning Progress Tracking** – monitor course completion and professional development
- **Custom Collections** – organize bookmarked resources into themed collections
- **Activity Analytics** – personalized recommendations based on usage

### ⚡ Performance & PWA
- **Progressive Web App** – installable on mobile and desktop
- **Offline Support** – cached content works without internet
- **Code Splitting** – 44% smaller initial bundle (lazy-loaded routes)
- **Smart Caching** – optimized for fonts, images, and API responses

## Getting started
```bash
npm install
npm run dev
```
The application uses Vite + React + TailwindCSS. Environment variables live in `.env` (see below).

### Environment variables

Create a `.env` file (see `.env.example` for template):

```bash
# Firebase (Required for authentication)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# Supabase (Required)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# Backend only (for Edge Functions)
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
```

**Note:** Only `VITE_` prefixed variables are exposed to the browser. The service role key and AI keys are server-side only.

📖 **Setup Guides:**
- [Firebase Authentication Setup](./docs/FIREBASE_AUTH_SETUP.md)
- [PWA Icons Guide](./docs/PWA_ICONS_GUIDE.md)
- [New Features Documentation](./docs/NEW_FEATURES.md)

## Project scripts
| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite in development mode |
| `npm run build` | Type-check + production bundle |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint with ESLint |

## Colour & typography reference
```
Ruby Red   #820021  (primary accents)
Indigo Blue #001D31 (backgrounds, footer)
British Green #002718 (success, highlights)
Headings: Archer / Playfair Display fallback
Body: Century Gothic / Nunito Sans fallback
```

## Database Setup

### Supabase Migrations

Deploy all migrations to set up database tables:

```bash
supabase db push
```

This creates:
- **AI News tables**: `ai_news`, `news_sources`, `ai_news_summaries`, `pipeline_logs`
- **User tables**: `user_profiles`, `bookmarks`, `learning_progress`, `user_activity`, `collections`

### AI News Automation
- Deploy Edge Functions: `fetch-ai-news`, `process-ai-summaries`
- Schedule cron jobs via Supabase dashboard (`pg_cron`)
- Use the in-app **AI News Automation** panel to initialize, fetch manually, or clean up data

### Row-Level Security (RLS)

User data is protected with RLS policies. Firebase JWT tokens are used for authentication with Supabase, ensuring users can only access their own data.

## Maintenance guidelines
1. **Governance first** – update content when safeguarding or curriculum policies change.
2. **Translate resources** – keep public‑facing copy in British English.
3. **Validate colours & contrast** – WCAG AA minimum for every new component.
4. **Document automation changes** – update `pipeline_logs` via the panel or Supabase SQL when altering schedules.

## Support
Educational Technology Department · St. Paul's School, São Paulo  
Rua Juquiá, 166 – Jardim Paulistano – São Paulo – 01440‑903  
edtech@stpauls.br
