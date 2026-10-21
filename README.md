# Portfolio: Juan Bonilla · Front-End Engineer

Live site: https://juanbonilla.me

Personal portfolio built to showcase front-end work, and more specifically, how I approach building interfaces: intentional accessibility, pixel-perfect execution, and careful attention to interaction states across touch, keyboard, and mouse.

## What's on the site

- **Hero**: who I am and how I work with Claude Code in the loop, plus a "How this site gets built" card that walks through the process (clarify, direct, verify) and lists real issues caught in review.
- **Projects**: a featured project and "Also built" rows, each with its live site and source code. The projects are Frontend Mentor challenges served under the same domain (`/FEM_*`).
- **Experience**: roles at Globant, Monks and Colcan on a timeline you can step through, each with its achievements and tech tags.
- **Contact**: a form that sends in place (sending, error and success states) through Netlify Forms, plus LinkedIn and GitHub links.

## Tech stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4, with design tokens in `src/tokens.ts`
- Self-hosted, subset variable fonts (Instrument Sans, Inter, JetBrains Mono)
- Netlify: hosting, Netlify Forms, security headers and an edge function that proxies the weather app
- Umami: privacy-friendly analytics
- pnpm, with exact versions and a release-age quarantine for dependencies

## Engineering principles behind this project

This site also works as a running example of how I approach front-end work day to day:

- **Accessibility as a practiced discipline, not a checklist.** 44×44px tap targets, deliberate `:focus-visible` states, `prefers-reduced-motion` support, focus management in overlays, and `aria-label`s on icon-only controls. Checked by hand with a keyboard and a screen reader, and by axe (WCAG 2.2 AA) in CI.
- **Design tokens with intent.** Hardcoded values only get swapped for a token when there's an exact match; gaps get reported, not approximated. No token gets added ahead of an actual need.
- **Diagnosis before patching.** When something breaks in an unusual way (stacking context, z-index, phantom clicks), the goal is understanding the real cause, not the fastest fix.
- **Responsive with purpose.** `clamp()` for values that scale continuously, Tailwind breakpoints for actual structural layout changes.
- **Every change goes through a pull request.** CI runs type checks, lint, format, unit tests, Playwright accessibility and visual checks, Lighthouse budgets, CodeQL and dependency review before anything deploys.

## Getting started

Requires Node.js 26+ and pnpm.

```bash
pnpm install
pnpm dev
```

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server on `localhost:8443` |
| `pnpm run dev:lan` | Dev server exposed on your network, to test on a phone |
| `pnpm build` / `pnpm preview` | Production build in `dist/` and a local preview of it |
| `pnpm test` | Unit and component tests (Vitest + Testing Library) |
| `pnpm run e2e` | Playwright accessibility and visual checks against a production build |
| `pnpm run lint` / `pnpm run format` | oxlint and oxfmt |
| `pnpm run fonts` | Regenerate the subset fonts in `public/fonts/` |
| `pnpm run og` | Regenerate the Open Graph image |

`AGENTS.md` documents the project structure, conventions and CI in detail.

## Versions

- **v2** (current, `main`): the official version, the result of a full refinement cycle on accessibility, performance, SEO, security, design tokens and CI.
- **`preliminary` tag**: the first public version of this site, before that refinement cycle.
- **`v1` branch**: the previous portfolio.
