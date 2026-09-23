# juan-bonilla-portfolio

React + Vite + Tailwind CSS personal portfolio site.

## Development Server

Run `pnpm run dev` to start the Vite dev server (default port `8443`, overridable via `$PORT`).

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `{ App }` from `src/App.tsx` into the `#root` element
- `src/App.tsx` - Page composition only: named-export `App` imports section components and renders them in order
- `src/tokens.ts` - Grouped design tokens object (`tokens`), used in inline styles. Structured as `colors`, `fonts`, `typography`, `spacing`, `radius`, `container`, defined with `as const` for strict literal types. Extend by adding to the relevant group; don't flatten the structure or remove the grouping as part of unrelated component/layout work
- `src/components/layout/ContentContainer.tsx` - Wraps children to `tokens.container.maxWidth`, centered (`margin: 0 auto`). For full-width-visual elements needing aligned content (nav bars, footers), keep the outer element full width and wrap only the inner content in `ContentContainer`
- `src/data/experiences.ts` - Experience entries and the `Experience` interface (`role`, `company`, `period`, `location`, `description`, `achievements`, `tags`, `active`)
- `src/components/` - One folder per page section, one file per component, no barrel `index.ts` files. Folders: `layout/`, `nav/`, `hero/`, `projects/`, `experience/`, `contact/`, `footer/`. Components use named exports (`export function X`), imported as `import { X } from './X'`
- `src/components/projects/ProjectCard.tsx` - Single card component for default and featured layouts; optional `large` prop (padding, title size, and which mockup). Do not split into separate default/large components
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with the React plugin, Tailwind CSS v4 plugin, and the `@` alias for `src`

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Ensure JSX tags are closed and braces are balanced.
- Export components as named exports (`export function X`), not default exports.

## Responsive conventions

See `.claude/skills/design-system-tokens/SKILL.md` for the full checklist when touching component styles, tokens, or responsive behavior.
