# kylie.dev — Portfolio Platform

A software-platform-styled personal site for Kylie Cuadra: a console/IDE shell
(command palette, file-tab sections, repo-style project cards) instead of a
scrolling card-based portfolio. Built with Next.js (App Router) + TypeScript.

## Stack

- **Next.js 16.2.12+** (App Router) + **TypeScript** — pinned to this line
  because earlier 14.x/15.x/16.x ranges carry several patched high-severity
  CVEs (DoS, SSRF, cache poisoning, XSS via Server Components). Re-run
  `npm audit` after `npm install` to confirm a clean report, and keep this
  pinned to the latest patch release rather than a wide caret range.
- `package.json` also pins `overrides` for `postcss` and `sharp`. Both are
  bundled *inside* Next.js itself (not a direct dependency here), and as of
  this writing Next hasn't shipped a stable release with the patched
  versions yet — the fixes only exist in unstable canary builds. The
  overrides force npm to install the patched versions anyway without
  changing your Next version. Once a stable Next release ships with these
  bumped internally, these overrides can be removed — check
  `npm audit` periodically to confirm.
- **React 19** (required by Next 16)
- **lucide-react** for icons
- Plain CSS with custom properties for theming (no Tailwind/CSS-in-JS —
  see `app/globals.css`) — kept intentionally simple so the whole design
  system lives in one readable file
- No backend yet — see "What's not wired up" below

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Project structure

```
app/
  layout.tsx        Root layout, full metadata (icons, OG, Twitter), skip link
  page.tsx           Top-level orchestrator: theme, active section,
                      command palette state, scroll-to-section
  globals.css         The entire design system (CSS variables, every
                      component's styles) in one place
  robots.ts          Auto-generated robots.txt (App Router convention)
  sitemap.ts          Auto-generated sitemap.xml (App Router convention)
components/
  layout/
    TopBar.tsx        Sticky nav + theme toggle + "⌘K" trigger
    CommandPalette.tsx  Ctrl/Cmd+K search across sections & projects
  ui/
    WindowChrome.tsx  The "editor tab" header used at the top of every
                      section (traffic-light dots + filename + tab)
    StatusPill.tsx    Small status badge (production / concept / available)
  sections/
    Dashboard.tsx     Hero, styled as a live status dashboard
    About.tsx         README-style "about" panel
    Stack.tsx          Interactive dependency-chain viewer (click a node
                      to expand its description)
    Projects.tsx        Projects rendered as expandable repositories
                      (Problem → Solution → Stack, plus optional
                      Live demo / Repository / Case study links)
    Experience.tsx     Career history as a version/release log
    Services.tsx        Services listed as API endpoints
    Contact.tsx          Contact form styled as a deploy console
data/
  profile.ts, nav.ts, stack.ts, projects.ts, experience.ts, services.ts
  All real content lives here — edit these files to update the site;
  you should never need to touch component code just to change copy.
types/
  index.ts            Shared TypeScript interfaces for the data layer
public/
  favicon.svg, favicon.ico, favicon-16.png, favicon-32.png,
  apple-touch-icon.png, android-chrome-192x192.png,
  android-chrome-512x512.png, site.webmanifest
  A real, unique favicon set — not a generic icon. It's the same ">_"
  glyph used as the brand mark in the top nav, rasterized at every size
  browsers/devices ask for.
```

Each section is its own component and pulls only from its own `data/*.ts`
file, so adding, removing, or reordering sections is a matter of editing
`app/page.tsx` and the relevant file in `data/`.

## Accessibility

Every element a visitor can click was previously a `<div onClick>` in a few
spots (repo rows, stack nodes, command palette results) — those are now real
`<button>` elements with `aria-expanded`/`aria-controls` where they toggle
content, so keyboard and screen-reader users get the same functionality as
mouse users. Also in place: a skip-to-content link (tab from a fresh page
load to see it), `aria-current` on the active nav item, `aria-live` on the
contact form's success state, and `prefers-reduced-motion` support. This
covers the interactive-semantics half of WCAG 2.2 AA — it hasn't been run
through a full audit (axe, Lighthouse, or a screen reader pass), which is
worth doing before calling it compliant.

## Responsive design

Rather than hand-tuning a dozen discrete breakpoints for every screen from
320px to 2560px, most spacing and type now scales fluidly via `clamp()` —
that's the more maintainable version of "design every breakpoint
independently" for values that just need to grow smoothly. A handful of
real *layout* breakpoints remain where content needs to reflow, not just
resize (480px, 640px, 760px) — e.g. the repo card header wraps to a second
line on phones instead of squeezing five elements into one row.

## What's real vs. placeholder

Every project, stack chain, and experience entry reflects real work.
A few fields are intentionally left as placeholders rather than invented —
fill these in before shipping:

- `data/experience.ts` — exact employment dates (`[years]`, `[start date]`)
- `components/sections/Contact.tsx` — the `handleDeploy` submit handler
  currently just fakes a delay and shows a success state. Wire it to a
  real endpoint (an API route, Formspree, Resend, etc.) before relying on it.
- `data/projects.ts` — `repoUrl` / `liveUrl` / `caseStudyUrl` fields exist on
  the `Project` type and the UI already renders link buttons for whichever
  are present, but none are filled in yet since there's nothing real to
  link to. Add them per project once you have live URLs.
- `SITE_URL` in `app/layout.tsx`, `app/robots.ts`, and `app/sitemap.ts` —
  all set to `https://kylie.dev` as a placeholder domain. Update all three
  to the real deployed domain before launch.

## What isn't built yet

The original brief describes a much larger platform (live GitHub API
integration, a blog, full case-study pages per project with sequence/ER
diagrams, a deployment-pipeline visualization, an architecture/database
explorer, Framer Motion/GSAP animation layer). This build covers the
highest-leverage layer — the part a visitor actually needs to trust you and
reach out — deliberately rather than faking the rest with placeholder data
or animation for its own sake. Reasonable next additions, roughly in order
of impact:

1. Wire the contact form to a real backend
2. A dedicated case-study page per featured project (`app/projects/[slug]/page.tsx`)
3. Live GitHub stats via the GitHub REST API (pinned repos, recent commits)
4. A blog (MDX-based route under `app/blog/`)
5. Full accessibility audit (axe/Lighthouse + a screen-reader pass) — the
   interactive elements are keyboard/screen-reader accessible now, but that's
   not the same as a verified WCAG 2.2 AA pass

## Design notes

- Color and type tokens are defined once in `app/globals.css` under
  `.platform` / `.platform.light` — change the palette there, not per-component.
- Sections identify themselves with a file extension that matches their
  content (`about.md`, `stack.json`, `experience.log`, `contact.sh`) — this
  is the signature device tying the whole site to "this person builds
  software," so keep it consistent if you add sections.
- Respects `prefers-reduced-motion` and uses visible focus outlines
  throughout; check both before adding new interactive elements.
