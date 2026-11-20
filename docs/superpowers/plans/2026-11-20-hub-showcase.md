# zills.io showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans.

**Goal:** Replace the angled panels with a hero and four showcase bands.
**Spec:** `docs/superpowers/specs/2026-11-20-hub-showcase-design.md`

## Global Constraints

- The order is Lab, Open Source, Audio, Plugins. Audio and Plugins show "Coming soon" with no link. Accents: Lab `#a78bfa`, OSS `#22d3ee`, Audio `#fbbf24`, Plugins `#fb923c`. No header. No inline `opacity:0`.

## Review Focus

- **The code window:** on desktop no line is wider than the window (headless measurement); on phones it scrolls inside itself and the page never scrolls sideways (Task 2).
- **Links:** live sites link out and "Coming soon" sites have no link (Task 1).

### Task 1: Data and page (TDD)

- **Data tests:** order; numbers 01–04; accents; only Lab and OSS have hrefs, all https.
- **Page tests:**
  - the hero `h1` names Z/LLS, with the new line;
  - four bands in order, each with its number, name, dot and sentence;
  - the CTA links for live sites, and "Coming soon" without a link otherwise;
  - the code window contains "Hello", the GUID and the key, and no `//` comment;
  - the Lab preview image has alt text;
  - no header; no `opacity:0`.
- **Implement.** Remove the Shards, Blades, PanelContent and useCursorGlow code, with their tests.

### Task 2: Verify

- Lint and build.
- Headless check at 360, 390 and 1400px: no sideways scroll on the page; every code line fits on desktop; a clean console.
- Screenshots.
