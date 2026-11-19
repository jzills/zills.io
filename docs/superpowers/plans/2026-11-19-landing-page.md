# zills.io Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A one-page, prerendered brand landing page for zills.io: Z/LLS placeholder logo, four angled panels (shards on desktop, blades on phone), deployed to GitHub Pages.

**Architecture:** Vite + React app with a single page, rendered to static HTML at build time by an SSR entry and a prerender script (same pattern as `~/src/repos/jzills.github.io`), then hydrated. Panel content lives in one data file. Entrance and hover motion are pure CSS so the prerendered page is fully visible without JavaScript. JS adds only the desktop cursor glow.

**Tech Stack:** Node 24, Vite 8, React 19, TypeScript ~6.0, Tailwind v4 (`@tailwindcss/vite`), Vitest 5, ESLint 10. Copy dependency versions from `~/src/repos/jzills.github.io/package.json`.

**Spec:** `docs/superpowers/specs/2026-11-19-landing-page-design.md`

## Global Constraints

- Palette tokens (Tailwind `@theme`): bg `#09090b`, surface `#111113`, border `#27272a`, fg `#fafafa`, muted `#8b8b94`, accent `#22d3ee`. Per-panel accents: oss `#22d3ee`, audio `#fbbf24`, plugins `#fb923c`, lab `#a78bfa`, applied as a `--a` custom property on each panel. Fonts: Inter (sans), JetBrains Mono (mono), from Google Fonts.
- Dark only. No theme toggle.
- Layout switch at 900px: define `--breakpoint-shards: 56.25rem` in `@theme` and use the `shards:` variant. Below it is the blades layout, at and above it the shards layout.
- Logo placeholder text is exactly `Z/LLS`: Inter 800, tight tracking, the slash at weight 600 in fg at 55% opacity. No skew, no accent colour on the slash. Under it, the line `Software, sound & visuals.` in muted.
- Links: About is `https://j.zills.io/`, Open Source is `https://github.com/jzills`, Lab is `https://j.zills.io/lab/`. Audio and Plugins have no link.
- Motion: the entrance plays once (≈400ms total stagger), nothing loops, and everything is disabled under `prefers-reduced-motion: reduce`.
- Text is real HTML, never SVG `<text>`. Shapes are decoration (`aria-hidden`).
- No framer-motion. CSS covers every motion the spec lists, and keeping it out means the prerendered HTML is never hidden while waiting for JS.

## Review Focus

1. **JS fails or loads slowly:** the prerendered page must show every panel at full opacity. No inline `opacity:0` or `visibility:hidden` in the SSR output (test in Task 4).
2. **Keyboard users:** Tab reaches About, then the linked panels in order 01→04, each with a visible focus ring. "Coming soon" panels aren't tab stops (test in Task 3).
3. **Hydration:** the cursor glow must not change the first client render compared with the SSR markup. Its state is set only in effects or event handlers, and no React hydration warning appears in the console (check in Task 5).
4. **Awkward viewports:** at 900×600 (short desktop) and 1440×900, shard text must not overlap the centred logo. At 320×640 (small phone), blade text must not be clipped (screenshot check in Task 4).
5. **Touch devices at ≥900px (tablets):** the hover state must not stick, and the cursor glow must be off when `(hover: none)` (check in Task 5).

---

### Task 1: Scaffold, logo and prerender pipeline

**Files:**
- Create: `package.json`, `vite.config.ts`, `vitest.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `.gitignore`, `index.html`, `src/index.css`, `src/main.tsx`, `src/entry-server.tsx`, `src/App.tsx`, `src/components/Logo.tsx`, `scripts/prerender.ts`
- Test: `src/components/Logo.test.tsx`

**Interfaces:**
- Produces: `Logo(props: { className?: string }): JSX.Element` renders an `<h1>` containing the text `Z/LLS`, with `aria-label="Zills"`. `App(): JSX.Element` is the page root. `entry-server.tsx` exports `paths = ['/']` and `render(path: string): string`.

- [ ] **Step 1:** Copy configs from `~/src/repos/jzills.github.io`, simplified: a single HTML entry, no `define`, no chunk naming, `@` alias kept. Scripts: `dev`, `build` = `tsc -b && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.ts`, `preview`, `test`, `lint`. `vitest.config.ts` includes `src/**/*.test.{ts,tsx}`, environment `node`. `scripts/prerender.ts` is a copy of the resume's (it already loops over `paths`). `.gitignore`: `node_modules`, `dist`, `dist-ssr`. Run `npm install`.
- [ ] **Step 2: Write the failing test** `Logo.test.tsx`: `renderToString(<Logo />)` contains `Z/LLS` and `<h1`, and contains `aria-label="Zills"`.
- [ ] **Step 3:** Run `npx vitest run src/components/Logo.test.tsx`. Expected: FAIL (module not found).
- [ ] **Step 4:** Implement `Logo`. `index.css` holds `@import "tailwindcss"` and the `@theme` tokens and breakpoint from Global Constraints, plus `body` with an explicit bg. `App` renders `<Logo />` for now. `main.tsx` calls `hydrateRoot`. `index.html` has `<div id="root"></div>`, title `Zills`, and the Google Fonts link.
- [ ] **Step 5:** Run `npm test && npm run lint && npm run build`. Expected: tests pass, and `dist/index.html` contains `Z/LLS` inside `#root`.
- [ ] **Step 6: Commit** `feat: scaffold app with placeholder logo and prerender`

### Task 2: Panel data

**Files:**
- Create: `src/data/panels.ts`
- Test: `src/data/panels.test.ts`

**Interfaces:**
- Produces: `type Panel = { id: 'oss' | 'audio' | 'plugins' | 'lab'; label: string; title: string; description: string; accent: string; href?: string }`, `panels: Panel[]`, and `ABOUT_URL = 'https://j.zills.io/'`.

- [ ] **Step 1: Write the failing test.** It asserts:
  - `panels.map(p => p.id)` equals `['oss','audio','plugins','lab']`.
  - The labels equal `['01 · OSS','02 · AUDIO','03 · PLUGINS','04 · LAB']`.
  - Every title and description is non-empty.
  - The accents equal `['#22d3ee','#fbbf24','#fb923c','#a78bfa']`.
  - Every `href` that is present matches `/^https:\/\//`.
  - `panels.find(p=>p.id==='oss')?.href === 'https://github.com/jzills'` and `lab` is `'https://j.zills.io/lab/'`.
  - `audio` and `plugins` have `href === undefined`.
- [ ] **Step 2:** Run it. Expected: FAIL.
- [ ] **Step 3:** Implement with the spec's titles and descriptions: Open Source / "Libraries & tools for .NET, Go, Kubernetes"; Audio / "Sound design & music"; Plugins / "Audio plugins & instruments"; Lab / "Shaders, visuals & experiments".
- [ ] **Step 4:** Run it. Expected: PASS.
- [ ] **Step 5: Commit** `feat: panel data`

### Task 3: PanelContent component

**Files:**
- Create: `src/components/PanelContent.tsx`
- Test: `src/components/PanelContent.test.tsx`

**Interfaces:**
- Consumes: `Panel` (Task 2).
- Produces: `PanelLink(props: { panel: Panel; className?: string; style?: CSSProperties; children?: ReactNode }): JSX.Element`. This is the interactive wrapper, used by both layouts and given their shape via `className`. With an `href` it renders `<a href target="_self">` with class `group` and focus-visible ring styles. Without one it renders a `<div>` (not focusable) with a "Coming soon" tag. It sets `--a: panel.accent` in its style. Inside, it shows the label (mono, in `--a`), the title followed by a `.` in `--a`, the description, and a `→` for links only.

- [ ] **Step 1: Write the failing tests:**
  - `links when href present`: the output contains `<a` and `href="https://github.com/jzills"`, and doesn't contain `Coming soon`.
  - `no link when href absent`: the audio panel's output contains no `<a`, no `tabindex`, and does contain `Coming soon`.
- [ ] **Step 2:** Run it. Expected: FAIL.
- [ ] **Step 3:** Implement. The hover/focus state (`group-hover`, `group-focus-visible`) is a wash and a thin edge in `--a`, plus the arrow moving 4px. Apply hover styles only under `@media (hover: hover)`, using Tailwind's `hover:` (v4 already scopes `hover:` to hover-capable devices).
- [ ] **Step 4:** Run it. Expected: PASS.
- [ ] **Step 5: Commit** `feat: panel link component`

### Task 4: Page layout (blades and shards)

**Files:**
- Create: `src/components/TopBar.tsx`, `src/components/Footer.tsx`, `src/components/Blades.tsx`, `src/components/Shards.tsx`
- Modify: `src/App.tsx`, `src/index.css`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `Logo`, `PanelLink`, `panels`, `ABOUT_URL`.
- Produces: `Blades({ panels })`, which is visible below `shards:` (`shards:hidden`), and `Shards({ panels })`, which is hidden below `shards:` (`hidden shards:block`). `App` renders `TopBar`, `Logo`, `Blades`, `Shards` and `Footer` (`© 2026 Zills` at left, `j.zills.io ↗` linking to `ABOUT_URL` at right, small mono, muted).

Shard geometry, on a 1280×800 reference expressed as `clip-path: polygon(...)` percentages, with C = (650, 395): OSS `0,0 560,0 C 0,360`; Audio `560,0 1280,0 1280,330 C`; Plugins `0,360 C 520,800 0,800`; Lab `C 1280,330 1280,800 520,800`. They go on four absolutely positioned `PanelLink`s that fill the viewport (`100dvh`, min-height 600px). OSS and Lab use surface `#111113`, Audio and Plugins `#0f0f11`. Each has a radial glow of its `--a` (≈ 10% opacity, 30% for the hovered one) in its outer corner. A non-interactive overlay (`pointer-events: none`) above the panels paints a radial gradient of `#0f0f11`, solid to ≈ 55% of a 330px radius and then fading out, centred on C, so the seams and panels merge into one colour under the logo. The logo is centred over C. Text sits in each panel's outer corner. Seams are 6px gaps of bg colour. Blades are a 2×2 grid of parallelograms (`clip-path: polygon(14% 0,100% 0,86% 100%,0 100%)`), 190px tall, 10px gap, under the logo. The background has a faint diagonal hairline texture and a soft cyan radial glow, as in the mockup.

The entrance is a CSS keyframe (fade and translate 8px, 300ms) on each panel, with `animation-delay` of 0/40/80/120ms via a `--i` custom property, wrapped in `@media (prefers-reduced-motion: no-preference)`. `animation-fill-mode: backwards`, so a missing animation leaves the panel fully visible.

Each panel is rendered twice (once per layout). The hidden layout uses `display:none`, which removes it from tab order and the accessibility tree, so screen readers don't hear duplicates.

- [ ] **Step 1: Write the failing tests** on `renderToString(<App />)`:
  - `about link` contains `href="https://j.zills.io/"`.
  - `all panels` contains each panel title.
  - `order` has the index of `Open Source` < `Audio` < `Plugins` < `Lab` (first occurrences).
  - `visible without js` does not match `/opacity:\s*0|visibility:\s*hidden/`.
- [ ] **Step 2:** Run it. Expected: FAIL.
- [ ] **Step 3:** Implement the components above.
- [ ] **Step 4:** Run `npm test`. Expected: PASS.
- [ ] **Step 5: Visual check.** Run `npm run build && npx vite preview --port 4173`. Screenshot with `~/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell --no-sandbox --hide-scrollbars --virtual-time-budget=4000 --window-size=W,H --screenshot=out.png http://localhost:4173/` at 390×844, 320×640, 900×600, 1280×800 and 1440×900, using `--force-device-scale-factor=2` for the phones. Expected: it matches the mockups, with no text overlapping the logo and no clipped text. Send the screenshots to the user.
- [ ] **Step 6: Commit** `feat: blades and shards layouts`

### Task 5: Cursor glow

**Files:**
- Create: `src/lib/useCursorGlow.ts`
- Modify: `src/components/Shards.tsx`

**Interfaces:**
- Produces: `useCursorGlow(): { onPointerMove: (e: PointerEvent<HTMLElement>) => void }`. It sets the `--gx` and `--gy` custom properties (px, relative to the element) directly on `e.currentTarget.style`, with no React state, so hydration is unaffected. Shard `PanelLink`s use it, and a `::after` radial gradient (accent at 10% opacity, 240px) is shown only under `@media (hover: hover) and (prefers-reduced-motion: no-preference)` while hovered.

- [ ] **Step 1:** Implement it. The hook body is a handful of lines; `getBoundingClientRect` gives the offset.
- [ ] **Step 2:** Run `npm test && npm run lint`. Expected: PASS.
- [ ] **Step 3: Check.** Run `npm run dev`. Hover a shard in a desktop browser; the glow follows the cursor. Reload with the console open; there are no hydration warnings. If no headed browser is available, say so and ask the user to check.
- [ ] **Step 4: Commit** `feat: cursor glow on desktop shards`

### Task 6: Meta, favicon, OG image, deploy

**Files:**
- Create: `public/favicon.svg`, `public/og-image.png`, `public/CNAME`, `public/robots.txt`, `.github/workflows/deploy.yml`, `README.md`, `scripts/og-image.html`
- Modify: `index.html`

- [ ] **Step 1:** In `index.html`, set the title `Zills — Software, sound & visuals` and a meta description. Add `og:*` and `twitter:*` tags pointing to `https://zills.io/og-image.png`, a canonical link `https://zills.io/`, and `theme-color` `#09090b`. `favicon.svg` is `Z` in heavy white type on a `#09090b` rounded square. `public/CNAME` contains `zills.io`.
- [ ] **Step 2:** Build the OG image: `scripts/og-image.html` (1200×630, the logo centred on bg with the hairline texture), screenshotted with the headless shell above into `public/og-image.png`.
- [ ] **Step 3:** Copy `deploy.yml` from the resume repo, minus the weekly `schedule` (nothing here fetches external content).
- [ ] **Step 4:** Write a short `README.md`: setup, scripts, deployment, and where to edit panels (`src/data/panels.ts`) and the logo (`src/components/Logo.tsx`).
- [ ] **Step 5:** Run `npm test && npm run lint && npm run build`. Expected: all pass, and `dist/CNAME`, `dist/og-image.png` and `dist/favicon.svg` exist.
- [ ] **Step 6: Commit** `feat: meta, OG image and Pages deploy`
- [ ] **Step 7:** Tell the user what's left for them: create the GitHub repo and push, enable Pages from Actions, and point the DNS for `zills.io` at GitHub Pages (A/AAAA records on the apex).
