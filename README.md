# Neema Sunder AV — Portfolio

A single-page developer portfolio built with Next.js 14 (App Router), Tailwind CSS
and Framer Motion. Dark theme by default with a light mode toggle.

All content is sourced from the resume and lives in [`data/`](./data) — no content is
hardcoded inside components.

## Tech stack

| Layer      | Choice                                   |
| ---------- | ---------------------------------------- |
| Framework  | Next.js 14 (App Router) + TypeScript     |
| Styling    | Tailwind CSS 3 with shadcn/ui tokens     |
| Animation  | Framer Motion 11                         |
| Icons      | Lucide React, React Icons                |
| Fonts      | Inter + Space Grotesk via `next/font`    |
| Validation | Zod (shared by the form and the API)     |
| Hosting    | Vercel                                   |

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Project structure

```
app/
  layout.tsx            # fonts, SEO metadata, JSON-LD Person schema
  page.tsx              # section composition
  providers.tsx         # next-themes provider (dark default)
  globals.css           # design tokens, glass + gradient utilities
  opengraph-image.tsx   # social card generated from resume data
  sitemap.ts, robots.ts # SEO routes
  api/contact/route.ts  # contact form endpoint
components/
  sections/             # Hero, About, Skills, Experience, Projects,
                        # Achievements, Education, Contact, Footer
  ui/                   # NavBar, ThemeToggle, cards, shadcn primitives
  shared/               # Typewriter, Counter, SectionHeading, BackToTop, Loader
data/                   # all resume content (edit here, not in components)
lib/                    # cn() helper, motion variants, contact schema
```

## Editing content

Everything is typed, so edits are checked at build time.

| File                    | Contains                                        |
| ----------------------- | ----------------------------------------------- |
| `data/personal.ts`      | Name, role, contact details, socials, nav links  |
| `data/skills.ts`        | Skill categories, meters, tag cloud, hero badges |
| `data/experience.ts`    | Employment history and tech tags                 |
| `data/projects.ts`      | Projects, tech stacks, demo/source links         |
| `data/education.ts`     | Qualifications and certifications                |
| `data/achievements.ts`  | Stat counters                                    |

## Outstanding TODOs

These items are **not present on the source resume** and are marked with `TODO`
comments in the code:

- **LinkedIn URL** — the resume lists it truncated as `linkedin.com/in/ne`.
  Set the full URL in `data/personal.ts`.
- **GitHub** — no profile on the resume. The GitHub Stats section was omitted
  for this reason; add a `github` field to `data/personal.ts` and build the
  section if a profile becomes available.
- **`public/resume.pdf`** — not included. Export the resume to PDF and drop it
  here so the three "Download CV" buttons work.
- **Profile photo** — `components/sections/About.tsx` renders an icon
  placeholder. Add `public/images/profile.jpg` and swap in `next/image`
  (the exact replacement snippet is in a comment there).
- **Certifications** — none on the resume. `data/education.ts` exports an empty
  array; the section renders a fallback until entries are added.
- **Project links & tech stacks** — the resume gives names and descriptions
  only. Demo/source buttons render disabled while the URLs are `null`.
- **Education years** — not stated; rendered only when present.
- **Skill proficiency levels** — the resume lists no ratings, so the meter
  percentages in `data/skills.ts` are estimates. Adjust them.
- **Twitter/X handle** — no handle on the resume, so `twitter:site` is omitted.

## Contact form

The form validates on the client and again on the server using the shared schema
in `lib/contact-schema.ts`. The API route currently **validates and logs only —
it does not send email**. To enable delivery, add a provider (Resend, SendGrid,
Nodemailer) inside `app/api/contact/route.ts`; the validated payload is available
as `data` and the response shape should stay unchanged.

## SEO

Handled in `app/layout.tsx`: title template, 158-character description, keywords,
canonical URL, robots directives, Open Graph and Twitter cards, and a JSON-LD
`Person` record. `NEXT_PUBLIC_SITE_URL` drives the canonical URL, sitemap and
structured data — set it to the real domain before launch.

The social card at `/opengraph-image` is generated at the edge from resume data.

## Accessibility & performance

- One `<h1>`, with sections nesting `<h2>` then `<h3>` throughout.
- Semantic `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Skill meters expose `role="progressbar"`; the typewriter exposes the full
  role list via `sr-only` text rather than animating for screen readers.
- Form inputs are labelled, with `aria-invalid` and `aria-describedby` errors.
- `prefers-reduced-motion` disables the decorative loops and smooth scrolling.
- Fonts are self-hosted by `next/font` with `display: swap` — no render-blocking
  request to Google.

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — the Next.js preset is
   detected automatically.
3. Add the `NEXT_PUBLIC_SITE_URL` environment variable (your production domain).
4. Deploy.
