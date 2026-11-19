# zills.io

The front door for the Zills sites: a single prerendered page (React, TypeScript, Vite, Tailwind v4) on GitHub Pages.

## Setup

```sh
npm ci
npm run dev        # http://localhost:5173
```

Node 24 (as in CI).

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload. |
| `npm run build` | Type-checks, builds the client and SSR bundles, then prerenders the page into `dist/`. |
| `npm run preview` | Serves `dist/` locally. |
| `npm test` | Unit tests (Vitest). |
| `npm run lint` | ESLint. |

## Editing

- **Panels** (titles, descriptions, links, accents): `src/data/panels.ts`. A panel without an `href` shows "Coming soon"; add the URL when its site launches.
- **Logo**: `src/components/Logo.tsx` holds the placeholder Z/LLS wordmark. Replace it there.
- **Link preview image**: edit `scripts/og-image.html` and regenerate `public/og-image.png` (instructions in the file).

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`: install, test, build, then publish `dist/` to GitHub Pages. `public/CNAME` serves it at `zills.io`.

Design and plan: `docs/superpowers/`.
