# Herédame — website v2 (fintual-inspired redesign, revision 2)

<!-- Deployment note: 2026-09-01 — Cloudflare rebuild trigger for EmailJS env vars. -->

Vite + React, bilingual (ES default / EN toggle), SEO-ready. No backend
required to run — everything here is static frontend.

This is the **revised** v2: fully white backgrounds, a softer/less-saturated
palette, scroll-reveal and hover animations, a centered nav with the logo and
CTA on the sides, a real team section, a floating WhatsApp button, and a
curated FAQ pulled from your legal knowledge base. See "What changed in this
revision" below for the full list, and the message this shipped with for
exactly what to delete/replace in your own project.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run lint     # oxlint (matches your existing project's linter)
```

Both `npm run build` and `npm run lint` were verified clean before this was
handed off (lint shows two pre-existing informational warnings, no errors —
see "Known lint warnings" below).

## Project structure

```
src/
  i18n/
    translations.js      ← ALL page copy (ES + EN) — edit text here, not in components
    LanguageContext.jsx   ← language state, defaults to Spanish, persists choice in localStorage
  seo/
    Seo.jsx                ← updates <title>/meta tags when language changes
    StructuredData.jsx     ← JSON-LD (LegalService) for Google
  components/
    Reveal.jsx               ← scroll-into-view fade/slide-up wrapper used across every section (respects prefers-reduced-motion)
    Header.jsx               ← logo (left) + centered nav + language switch/CTA (right), mobile hamburger
    Hero.jsx                  ← headline + abstract brand illustration (no photo needed), entrance animation
    Stats.jsx                  ← market-context stats (from your company doc)
    Beneficios.jsx              ← 4 value pillars, hoverable cards
    ComoFunciona.jsx             ← 4-step process
    Servicios.jsx                 ← the 7-tier service ladder with pricing, hoverable cards
    Booking.jsx                    ← placeholder for the free 30-min call (Cal.com) — see below
    Diferenciadores.jsx             ← why Herédame != a traditional law firm
    SobreNosotros.jsx                ← mission / vision + the team grid (5 members)
    Faq.jsx                           ← accordion FAQ, 8 curated questions
    Contacto.jsx                      ← contact form (currently opens the visitor's email client)
    Footer.jsx
    WhatsappButton.jsx                 ← floating WhatsApp button, bottom-right, all pages
  App.jsx        ← assembles every section in order
  App.css        ← all section/component styles
  index.css      ← design tokens (colors/fonts/spacing), resets, reveal-animation base styles
public/
  favicon.svg     ← placeholder brand mark, swap for your real logo-derived icon
  robots.txt
  sitemap.xml
  images/          ← put real images here (see manifest below)
```

## What changed in this revision

- **Fully white backgrounds.** Removed the alternating soft-gray sections;
  every section is now white with a thin top border (`.section-divider`) for
  separation instead of a background-color change.
- **Softer palette.** Navy/blue tokens in `src/index.css` were desaturated
  and lightened (`--navy`, `--blue`, shadows) so the page reads calmer, less
  "corporate-heavy." Same brand family, lower contrast.
- **Header:** logo pinned left, nav links centered, language switch + CTA
  pinned right — collapses to a hamburger menu under 900px.
- **Animations:** every section fades/slides into view on scroll
  (`Reveal.jsx`, IntersectionObserver-based, triggers once), cards lift on
  hover, the hero has an entrance animation, and the decorative hero dots
  float gently. All of it is disabled automatically for visitors with
  `prefers-reduced-motion` set — this never hides content, only its
  entrance animation.
- **New "Nuestro equipo" (team) section**, inside `SobreNosotros.jsx`, below
  mission/vision: 5 cards with initials-avatar, name, and role. No photos
  required to launch — see the image manifest below to add real headshots
  later.
- **New floating WhatsApp button** (`WhatsappButton.jsx`), bottom-right,
  visible on every page. Currently points at the placeholder number
  `+56 9 9397 7894` — **replace this before launch**, see below.
- **Curated FAQ:** replaced the 5 placeholder Q&As with 8 real ones grounded
  in your legal knowledge-base document (posesión efectiva, selling inherited
  property before paperwork is done, inheritance tax exemption thresholds,
  what happens when heirs disagree, whether a will is required, plus the
  original data-safety/pricing/free-call questions).

## Before you launch: 2 things need real values

1. **WhatsApp number** — `src/components/WhatsappButton.jsx`, the `PHONE`
   constant at the top. It's currently the same placeholder number used
   elsewhere on the site (`56993977894`, no `+` or spaces, country code
   first). Swap it for the real WhatsApp Business number.
2. **The unnamed team member** — in `src/i18n/translations.js`, under
   `nosotros.team.members` (both the `es` and `en` blocks), one entry reads
   `"Abogada con experiencia en plataformas legal-tech"` / `"Lawyer with
   legal-tech platform experience"` — this is a placeholder standing in for
   a name that wasn't available yet. Replace it with her real name and
   adjust the `initials` field to match once you have it.

## Where to put images

Nothing in the current build depends on a missing image file — the hero
uses an inline SVG illustration, and the team section uses initials-avatars
instead of photos, so it runs and looks finished with zero images. Add these
when you have them:

| File to add | Used for | Notes |
| --- | --- | --- |
| `public/images/og-cover.jpg` | Social share preview (WhatsApp/LinkedIn/X link previews) | 1200×630px. Once added, uncomment the `og:image` line in `index.html`. |
| `public/favicon-32.png` | Browser tab icon (PNG fallback) | 32×32px, put directly in `public/`, not `public/images/`. |
| `public/apple-touch-icon.png` | iOS home-screen icon | 180×180px, also directly in `public/`. |
| `public/images/logo.svg` | Real Herédame logo (optional) | If you want the actual logo instead of the inline icon mark, drop it here and swap the `<span className="logo-mark">…</span>` block in `Header.jsx` (and the matching one in `Footer.jsx`) for `<img src="/images/logo.svg" alt="Herédame" />`. |
| `public/images/team/*.jpg` (optional) | Real team headshots | If you want photos instead of initials, add them here and swap the `<span className="team-avatar">` block in `SobreNosotros.jsx` for `<img>` tags. |

## Booking (Cal.com)

`src/components/Booking.jsx` has a styled placeholder sitting in the middle
of the page, right after the services section. The comment at the top of
that file has the exact 5-line swap to embed Cal.com once you have your
`cal.com/your-username/30min` link — no API key needed for the basic embed.

## SEO checklist already handled

- Descriptive `<title>` / meta description in Spanish by default, both in
  static `index.html` (for crawlers that don't run JS) and kept in sync
  dynamically when the visitor switches to English.
- Open Graph + Twitter card tags.
- JSON-LD structured data (`LegalService`) so Google can understand what
  Herédame is.
- Semantic HTML: one `<h1>` in the hero, `<h2>` per section, `<nav>`,
  `<main>`, `<footer>`.
- `robots.txt` and `sitemap.xml` in `public/`.
- `lang="es"` on `<html>`, updated to `"en"` when toggled.

Before launch, still update: the real production domain (currently
`https://heredame.cl` as a placeholder in `Seo.jsx`, `StructuredData.jsx`,
`index.html`, `robots.txt`, `sitemap.xml` — search for that string), and add
the `og-cover.jpg` image above.

## Content sources

Copy is grounded in the company definition document you shared (mission,
vision, the 4 value pillars, differentiators, the 7-tier service ladder with
real pricing), the pitch deck's team slide (names/roles for the team
section), and the 150-question legal FAQ document (the 8 curated FAQ
entries). Two things worth a gut-check before publishing:

1. Phone/email/address in `Contacto.jsx` and `Footer.jsx` are still the
   placeholders from your earlier proposals (+56 9 9397 7894,
   contacto@heredame.cl) — confirm these are the real ones, and note the
   same number currently feeds the WhatsApp button (see above).
2. The free 30-minute call is positioned as a no-cost intro/discovery call,
   separate from the paid "Consultoría Express" ($80.000, which bundles a
   paid 30-min call with a full written study). If that distinction isn't
   clear enough on the page, say so and the copy can be adjusted.

Traction numbers from the pitch deck (sales count, average ticket, NPS,
active clients) and any investor-facing figures (valuation, funding ask, cap
table) were deliberately **not** used anywhere on the public site — those
stayed out unless you decide otherwise.

## Known lint warnings (pre-existing, not errors)

`npm run lint` passes clean (exit code 0) but reports two informational
`oxlint` warnings that were already present before this revision and don't
affect behavior:

- `LanguageContext.jsx`: a Fast Refresh warning about exporting a hook
  alongside the provider component — cosmetic, common pattern.
- `Reveal.jsx`: a warning about calling `setState` inside a `useEffect` —
  this is the intended pattern for an IntersectionObserver callback.

Both are safe to ignore; flagging them here so they don't look like
something this revision broke.
