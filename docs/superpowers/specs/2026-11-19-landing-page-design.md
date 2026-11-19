# zills.io landing page: design

## Intent

zills.io is the brand's front door, facing clients. It should feel polished, bold, sleek and professional: a showcase, not a sales funnel. It points visitors to the brand's sections, most of which become their own subdomains later. The resume (j.zills.io) is not the focus. It gets a small link, not a panel.

## Goals

- One page with a strong hero logo and four angled panels linking to: **Open Source**, **Audio**, **Plugins**, **Lab**.
- Interactive enough to feel alive, never distracting.
- Looks like it belongs with jzills.github.io: same palette and fonts.
- Loads fast as static HTML.

## Non-goals

- No contact form, calls to action or analytics.
- No storefront. Plugins will later get its own subdomain with a store; here it is just a panel.
- No final logo. Z/LLS in type is a placeholder (see Logo).

## Anti-goals

- Playful or gimmicky. Earlier mockups with a big skewed cyan slash were rejected for this.
- Motion that loops, follows the visitor around aggressively, or competes with the content.

## Approaches considered

1. **Plain HTML and CSS, no build step.** Smallest, but shares no tooling with the existing site and makes anything interactive later hand-rolled.
2. **Same stack as jzills.github.io: Vite, React, TypeScript, Tailwind v4 and framer-motion, prerendered and deployed to GitHub Pages.** *Chosen.* The user already maintains this stack and its deploy workflow, framer-motion makes the polish cheap, and prerendering keeps it fast static HTML.
3. **Astro.** Good for many pages, but zills.io stays one page (sections live on subdomains), so it buys a new tool for no gain.

## Layout (decided: mockups B and C combined)

- **Desktop (≥ 900px), "Shards" (C):** the full viewport is split into four triangulated panels, one per section, with the logo centred in a dark core shape where they meet. Panels are separated by thin seams of background colour. Each panel carries a small mono label (`01 · OSS`), a title and a one-line description, placed in its outer corner.
- **Phone, "Blades" (B):** the logo on top, then a 2×2 grid of slanted parallelogram cards (number label, title, short description).
- **Top bar, both sizes:** `zills.io` at left, and a pill link `J · About ↗` at right pointing to `https://j.zills.io/`.
- Dark only (Claude's call: it's a brand page with one fixed look, and a theme toggle would add clutter). Palette from jzills.github.io: bg `#09090b`, surface `#111113`, border `#27272a`, fg `#fafafa`, muted `#8b8b94`, accent `#22d3ee`. Fonts: Inter, JetBrains Mono. Faint diagonal hairline texture and a soft cyan glow in the background.

## Logo

Placeholder: **Z/LLS** set in clean, heavy type, the slash an ordinary character. No skew, no colour accent (both read as gimmicky). It lives in one component so a designed mark can replace it without touching the layout. The logo will be revisited later.

## Panels

Defined in one data file. Each has: label, title, description, and an optional `href`.

| Panel | Description (draft) | Link for now |
|---|---|---|
| Open Source | Libraries & tools for .NET, Go, Kubernetes | `https://github.com/jzills` (Claude's call; the user didn't pick) |
| Audio | Sound design & music | none: "Coming soon" |
| Plugins | Audio plugins & instruments | none: "Coming soon" |
| Lab | Shaders, visuals & experiments | `https://j.zills.io/lab/` until a Lab subdomain exists |

A panel without an `href` renders as a non-link with a "Coming soon" tag and no hover state.

## Motion

- On load, panels appear once in a short stagger (≈ 400ms total), then the page is still.
- On hover or keyboard focus (tap on phone), a panel brightens with a cyan wash and a thin accent edge, and its arrow nudges.
- Desktop only: a faint highlight that follows the cursor within the hovered panel.
- Nothing loops. With `prefers-reduced-motion`, all motion is off and states change instantly.

## Accessibility and SEO

- Panels are real `<a>` elements in DOM order 01–04, with visible focus styles matching hover.
- The shard shapes are decoration (SVG/`clip-path`). Text stays real HTML, not SVG text, so it's selectable and readable by screen readers.
- Title, meta description, Open Graph image (logo on dark), favicon. AA contrast for all text.

## Build and deploy

- Vite, React 19, TypeScript, Tailwind v4, framer-motion, mirroring jzills.github.io's config and versions.
- Prerendered to static HTML. The page is simple enough that a single prerender step suffices.
- GitHub Actions on push to `main`: install, test, build, deploy `dist/` to GitHub Pages, with a `CNAME` for `zills.io`. DNS is the user's to set up.
- Tests (Vitest): panels data is valid (every panel has a title and description, hrefs are absolute URLs), and panels without an href render as non-links.

## Left to the builder

Exact shard geometry, seam width, type sizes, the breakpoint fine-tuning, and the OG image design. They should match the approved mockups (scratchpad `mock/index.html` #b and #c).
