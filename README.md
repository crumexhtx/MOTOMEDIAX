# motomediax

Car photo catalog inspired by NetCarShow’s make → model → year browse model, with a cleaner UI and SEO-friendly page structure.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Static generation for catalog routes
- Seeded demo data + Unsplash imagery

## Develop

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm start
```

## Routes

- `/` — brand home
- `/makes` — A–Z makes
- `/makes/[make]` — models
- `/makes/[make]/[model]` — years
- `/makes/[make]/[model]/[year]` — gallery + overview
- `/search` — client-side catalog search
- `/about` — about

Demo content only — not affiliated with NetCarShow or vehicle manufacturers.
