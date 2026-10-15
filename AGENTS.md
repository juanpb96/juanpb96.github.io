# juan-bonilla-portfolio

React + Vite + Tailwind CSS personal portfolio site.

## Development Server

Run `pnpm run dev` to start the Vite dev server (default port `8443`, overridable via `$PORT`). It binds to `localhost` only (as does `pnpm run preview`); set `$VITE_HOST` to bind elsewhere.

To test on a phone or another device on the same network, run `pnpm run dev:lan` instead — it exposes the server on all interfaces and prints a Network URL to open on the device.

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `{ App }` from `src/App.tsx` into the `#root` element
- `src/App.tsx` - Page composition only: named-export `App` imports section components and renders them in order: `SkipLink`, `Nav`, the sections inside `<main id="main-content">`, then `Footer`. Keep those four as siblings: the mobile nav overlay makes every sibling of `<nav>` inert while open
- `src/tokens.ts` - Grouped design tokens object (`tokens`), used in inline styles. Structured as `colors`, `fonts`, `typography`, `spacing`, `radius`, `container`, `zIndex`, defined with `as const` for strict literal types. Extend by adding to the relevant group; don't flatten the structure or remove the grouping as part of unrelated component/layout work
- `src/components/layout/ContentContainer.tsx` - Wraps children to `tokens.container.maxWidth`, centered (`margin: 0 auto`). For full-width-visual elements needing aligned content (nav bars, footers), keep the outer element full width and wrap only the inner content in `ContentContainer`
- `src/data/projects.ts` - Project entries and the `Project` interface (`title`, `description`, `tags`, `liveUrl`, `githubUrl`, `image`, `imageAlt`, optional `imageScale`). The first entry is the featured project; the rest render as "Also built" rows
- `src/data/experiences.ts` - Experience entries and the `Experience` interface (`role`, `company`, `period`, `location`, `description`, `achievements`, `tags`, `active`)
- `src/components/` - One folder per page section, one file per component, no barrel `index.ts` files. Folders: `layout/`, `nav/`, `hero/`, `projects/`, `experience/`, `contact/`, `footer/`, plus `icons/` for SVG icon components (import icons from there, not from a section folder) and `shared/` for small presentational primitives reused across sections (e.g. `Button` for primary/secondary CTAs, `TagList`, `IconButton`, `WeightTransitionText`, `SoftHyphenWord` for long heading words with `&shy;` syllable breaks). Components use named exports (`export function X`), imported as `import { X } from './X'`
- `src/components/nav/SkipLink.tsx` - "Skip to main content" link, visually hidden until focused (`.skip-link` in `src/index.css`); exports `MAIN_CONTENT_ID`
- `src/utils/moveFocus.ts` - Moves focus to an in-page target (section or `<main>`) via a temporary `tabindex="-1"` removed on blur. Shared by the mobile nav overlay, the skip link, and the contact form success message
- `src/components/contact/ContactForm.tsx` - Contact form, submitted with `fetch` to Netlify Forms so the visitor stays on the page; owns the sending/error/success states. `index.html` carries a hidden static replica of the form for Netlify's build-time detection — keep its name, `netlify-honeypot="bot-field"` attribute, and field names (`form-name`, `bot-field`, `name`, `email`, `message`) in sync
- `src/test/setup.ts` - Vitest setup: jest-dom matchers and Testing Library cleanup; first imports `src/test/animationEvent.ts`, an `AnimationEvent` polyfill so React's `onAnimationStart` fires in jsdom. Tests sit next to the component they cover, as `X.test.tsx`
- `e2e/` - Playwright browser checks, one spec per section (`nav`, `hero`, `projects`, `experience`, `contact`, `footer`), each tagged `@<section>` in its title: axe (WCAG 2.2 AA tags) on the section plus `toHaveScreenshot()` at 375×812 and 1440×900 (`playwright.config.ts`). Baselines live in `e2e/<section>.spec.ts-snapshots/` and are exempt from LFS. See "Browser checks" below
- `src/components/projects/ProjectCard.tsx` - Single component for both project layouts; optional `large` prop switches the featured layout (image beside the copy, button links) and the "Also built" row (thumbnail, text links). Do not split into separate default/large components
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `public/fonts/` - Self-hosted Instrument Sans, Inter and JetBrains Mono variable fonts (woff2, subset to the site's characters) with their OFL licenses; declared in `src/index.css`. Instrument Sans and Inter are preloaded in `index.html`; JetBrains Mono is not (mono text is never the LCP element). Generated — don't edit by hand
- `scripts/subset-fonts.mjs` - Regenerates `public/fonts/` from pinned upstream Google Fonts sources (`pnpm run fonts`). Re-run it when new copy introduces characters outside the current subset
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`. Its `<head>` holds the static metadata (description, canonical, Open Graph/Twitter, Person JSON-LD); the page is client-rendered, so scrapers only see what is here. Keep it consistent with the site: the JSON-LD `sameAs` must match the LinkedIn/GitHub links in `Footer.tsx` and `ContactSection.tsx` (`src/test/headMetadata.test.tsx` enforces it), and the descriptions and `knowsAbout` should follow the hero copy and the experience/project data. `og:image` points at `/og-image.png`, which does not exist yet
- `package.json` - Project dependencies and the Vite build, development, preview, test, formatting, and lint scripts
- `vite.config.ts` - Vite configuration with the React plugin, Tailwind CSS v4 plugin, the `@` alias for `src`, and the Vitest `test` config (jsdom environment)
- `.oxlintrc.json` - oxlint configuration: enabled plugins (`typescript`, `unicorn`, `oxc`, `react`, `jsx-a11y`) and the `correctness` rule category

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 7, and `@vitejs/plugin-react`
- Testing: Vitest with jsdom, React Testing Library, `@testing-library/user-event`, and jest-dom. Run `pnpm test` (or `pnpm run test:watch`). Vitest only picks up `src/**/*.test.ts(x)`
- Browser checks: Playwright with `@axe-core/playwright`. Run `pnpm run e2e` (builds, serves with `vite preview` on port 4173, then tests)
- Formatting: oxfmt
- Linting: oxlint, including the native `jsx-a11y` plugin for accessibility rules. Run `pnpm run lint`

### Dependency policy

Supply-chain settings live in `pnpm-workspace.yaml`:

- Exact versions only: `saveExact: true` makes `pnpm add` write `1.2.3`, not `^1.2.3`. Don't hand-write ranges in `package.json`.
- `pnpm-lock.yaml` is committed; CI installs with `pnpm install --frozen-lockfile`, so commit the lockfile alongside any `package.json` change.
- Release-age quarantine: `minimumReleaseAge: 4320` (minutes, 3 days) refuses versions published more recently. For an urgent security patch, add the package name to `minimumReleaseAgeExclude` with a comment linking the advisory, and remove the entry once the version is older than 3 days.
- `trustPolicy: no-downgrade` fails install if a package's publish trust (trusted publisher / provenance) is weaker than an earlier version's. Only after confirming the release is legitimate, add the narrowest exclusion — `trustPolicyExclude: ["pkg@1.2.3"]` — with a comment explaining why.

## CI

`.github/workflows/ci.yml` runs on PRs to `main` and on manual dispatch. The `changes` job feeds the changed paths to `.github/scripts/ci-changes.sh`, which decides which jobs run; the rest are skipped:

- `static` (source, config, `.github/`): typecheck, lint, format check, tests, and a guard against `^`/`~` ranges in `package.json`
- `build` (anything that ships in `dist/`): `pnpm build`
- `dependency-review` (`package.json`, `pnpm-*`): fails on high-severity advisories
- `zizmor` (`.github/`): audits workflows, actions and Dependabot config
- `codeql` (`src/`, `netlify/`, `scripts/`): JavaScript/TypeScript analysis
- `links` (changed `*.md`, `index.html`, `src/data/`, `src/components/`): Lychee on those files only
- `lighthouse` (anything that changes the built site; skipped for tests, `e2e/` and docs): Lighthouse CI against `dist/` with the budgets in `lighthouserc.json` (category scores, LCP/CLS/TBT, script size); the report is uploaded as the `lighthouse-report` artifact. Run locally with `pnpm build && pnpm exec lhci autorun` (set `CHROME_PATH` if Chrome is not installed); lab numbers vary a little between machines
- `e2e` (sections a change can affect, see "Browser checks"): Playwright axe + visual snapshots inside the pinned Playwright Docker image

`ci-ok` is the single required status check: it fails if any job failed or was cancelled, and passes when jobs were skipped. Add the `full-check` label to a PR (or run the workflow manually) to run every job. When adding a job, add it to `ci-ok`'s `needs`. Pin every third-party `uses:` to a commit SHA with a version comment; shared setup steps live in the local `.github/actions/setup` action.

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

## Code quality

- Use double quotes for strings, matching `oxfmt`'s default (enforced by `pnpm run format` and the CI format check).
- Ensure JSX tags are closed and braces are balanced.
- Export components as named exports (`export function X`), not default exports.
- Avoid type assertions (`x as T`, `<T>x`, non-null `!`). Narrow instead: `instanceof`/type guards, typed refs (`useRef<HTMLButtonElement>(null)`), `satisfies` for object literals, and module augmentation for custom CSS properties (see `src/react-css-properties.d.ts`). `as const` is fine. If an assertion is truly unavoidable (e.g. a DOM API typed too loosely), keep it local and add a one-line comment saying why.
- Avoid `!important` in CSS. Fix specificity or cascade order instead, or apply the style conditionally (e.g. motion classes only under `prefers-reduced-motion: no-preference`, as in `src/index.css`). Inline `style` can't be beaten without `!important`, so move styles that need overriding into classes. If one is truly unavoidable (e.g. overriding third-party CSS), comment why next to it.
- Linter is oxlint (`pnpm run lint`), with the `jsx-a11y` plugin enabled — keep interactive JSX accessible (keyboard handlers alongside click handlers, semantic roles, labelled controls, etc.). Suppress a rule with `// oxlint-disable-next-line <rule>` or `// oxlint-disable-line <rule>` (not the ESLint `// eslint-disable-next-line` syntax) — prefer `-disable-line` on a trailing JSX attribute/tag comment, since `oxfmt` inserts a blank line after a leading `-next-line` comment in JSX and breaks the suppression.
- Blank lines separate logical groups only: imports from code, setup from act from assert in a test, top-level declarations, functions. Don't put one between every import, interface member, hook/`const` declaration or `expect`. `oxfmt` keeps a single blank line but neither adds nor removes one, so this is by hand.
- Imports: third-party (incl. `node:*`) first, then one blank line, then local (relative paths and the `@` alias), each group consecutive with no blank lines and in its existing order.

## Browser checks

CI runs the `e2e` job only for the sections a PR can affect (`src/components/<section>/**` → `@<section>`, `src/data/projects.ts` → `@projects`, `src/data/experiences.ts` → `@experience`); shared code, global CSS, tokens, `index.html`, `public/`, deps and workflows run every tag, as do the `full-check` label and a manual run. The mapping is in `.github/scripts/ci-changes.sh`.

Screenshots differ between operating systems and browser builds, so baselines are only valid from the Playwright Docker image pinned in the `e2e` job. Locally, `pnpm run e2e` is reliable for the axe checks; a snapshot mismatch there does not mean CI will fail. To run against a Chromium you already have, set `PLAYWRIGHT_CHROMIUM_PATH`.

The `e2e` job installs git-lfs and checks out with `lfs: true`, so the screenshots show the real LFS images (project thumbnails, experience logos). Baselines generated from a checkout without LFS objects would show broken images.

To update the baselines after an intended visual change:

1. Push the branch, then run the CI workflow manually on it (Actions → CI → Run workflow, pick the branch, tick `update-snapshots`).
2. Download the `playwright-snapshots` artifact and unzip it over `e2e/`, so each `<section>.spec.ts-snapshots/` folder is replaced.
3. Look at the new images, then commit them.

Alternatively, run the tests inside the same image: `docker run --rm -v "$PWD":/work -w /work mcr.microsoft.com/playwright:v1.64.0-noble sh -c "corepack enable && pnpm install --frozen-lockfile && pnpm exec playwright test --update-snapshots"`.

When bumping `@playwright/test`, bump the image tag and digest in `.github/workflows/ci.yml` to the same version and regenerate the baselines in the same PR.

## Responsive conventions

See `.claude/skills/design-system-tokens/SKILL.md` for the full checklist when touching component styles, tokens, or responsive behavior.
