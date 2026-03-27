# Elevex Carousel Studio

Mac-first Electron desktop application for building branded Instagram carousel posts.

## Prerequisites

- Node.js 20+
- npm
- macOS 13+

## Setup

1. Clone repository.
2. Install dependencies: `npm install`
3. Create `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Run app: `npm run dev`

## First launch

Open **Settings** and enter all API keys. Keys are stored only in macOS Keychain through `keytar`.

## Run Supabase migration

```bash
npx supabase db push
```
