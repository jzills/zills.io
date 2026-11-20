# zills.io: hero and showcase (redesign)

## Intent

zills.io is the family's landing page, and it felt the most lackluster: the four angled panels named the sites but showed none of them, and two were dead ends. The goal is that a visitor **wants to explore the rest**. Each site should be shown, not just named.

## Approaches

- A. Keep the panels and layer a glimpse of each site into them. Mocked; Joshua didn't love it.
- D. Editorial index (huge names, preview on hover). E. 2×2 full-bleed windows. **F. Hero, then a showcase band per site (chosen).**

## The page (mockups in `mockups/showcase-*`)

- **Hero:** full screen, centred **Z/LLS** wordmark, the line "Software, audio and visual work by Joshua Zillwood.", a faint glow and a small "Scroll ↓" cue. No header.
- **One band per site**, in this order: **Lab, Open Source, Audio, Plugins** (live first). Each band has a large preview window with a cut corner, a number, the name with the site's accent dot, a sentence, and "Enter the Lab →" / "Browse the projects →" for live sites, or "Coming soon" (no link) until a site is public. Bands alternate sides on wide screens; on phones the preview comes first.
- **Previews:**
  - **Lab:** a shader still (Electric Railway to Nowhere-Ville). It will go live later.
  - **Open Source:** an editor window (file tab `Program.cs`, repo `jzills/hmac-manager`, line numbers, syntax colours) showing the hmac-manager registration snippet, with no comments. The policy is `"Hello"`; the public key is the GUID `e600c4c7-3dc3-434b-8eb2-7a81a7df838a`; the private key is `ei4vL3MgbWFkZSB0aGlzLg==`, which decodes to "z.//s made this." (an Easter egg). No line may be cut off: two-space indentation and enough width and padding on desktop, and the window scrolls sideways inside its own box on phones.
  - **Audio:** the cover wall. These are placeholder covers until the Audio site has real ones.
  - **Plugins:** a drawn faceplate, the same as on plugins.zills.io.
- **Motion:** bands rise in on scroll (CSS scroll-driven; nothing hidden where unsupported or under reduced motion).
- **Footer:** unchanged, "z.//s | Me ↗".

## Claude's calls

- The angled panels, the cursor glow and their code are removed.
- Numbers follow display order (01 Lab … 04 Plugins).
- Preview images are committed to `public/previews/`.
