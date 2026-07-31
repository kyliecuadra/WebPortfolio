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
  layout.tsx        Root layout, metadata, imports globals.css
  page.tsx           Top-level orchestrator: theme, active section,
                      command palette state, scroll-to-section
  globals.css         The entire design system (CSS variables, every
                      component's styles) in one place
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
                      (Problem → Solution → Stack per project)
    Experience.tsx     Career history as a version/release log
    Services.tsx        Services listed as API endpoints
    Contact.tsx          Contact form styled as a deploy console
data/
  profile.ts, nav.ts, stack.ts, projects.ts, experience.ts, services.ts
  All real content lives here — edit these files to update the site;
  you should never need to touch component code just to change copy.
types/
  index.ts            Shared TypeScript interfaces for the data layer
```

Each section is its own component and pulls only from its own `data/*.ts`
file, so adding, removing, or reordering sections is a matter of editing
`app/page.tsx` and the relevant file in `data/`.

## What's real vs. placeholder

Every project, stack chain, and experience entry reflects real work.
A few fields are intentionally left as `[bracket]` placeholders rather than
invented — fill these in before shipping:

- `data/experience.ts` — exact employment dates
- `components/sections/Contact.tsx` — the `handleDeploy` submit handler
  currently just fakes a delay and shows a success state. Wire it to a
  real endpoint (an API route, Formspree, Resend, etc.) before relying on it.

## What isn't built yet

The original brief describes a much larger platform (live GitHub API
integration, a blog, full case-study pages per project, deployment-pipeline
visualization, a code/architecture explorer). This build covers the
highest-leverage layer — the part a visitor actually needs to trust you and
reach out — deliberately rather than faking the rest with placeholder data.
Reasonable next additions, roughly in order of impact:

1. Wire the contact form to a real backend
2. A dedicated case-study page per featured project (`app/projects/[slug]/page.tsx`)
3. Live GitHub stats via the GitHub REST API (pinned repos, recent commits)
4. A blog (MDX-based route under `app/blog/`)

## Design notes

- Color and type tokens are defined once in `app/globals.css` under
  `.platform` / `.platform.light` — change the palette there, not per-component.
- Sections identify themselves with a file extension that matches their
  content (`about.md`, `stack.json`, `experience.log`, `contact.sh`) — this
  is the signature device tying the whole site to "this person builds
  software," so keep it consistent if you add sections.
- Respects `prefers-reduced-motion` and uses visible focus outlines
  throughout; check both before adding new interactive elements.
