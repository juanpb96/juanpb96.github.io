# Portfolio: Juan Bonilla · Front-End Developer

Live site: https://juanbonilla.me

Personal portfolio built to showcase front-end work, and more specifically, how I approach building interfaces: intentional accessibility, pixel-perfect execution, and careful attention to interaction states across touch, keyboard, and mouse.

## Status

This is a preliminary, publicly deployed version. It's under active development, some sections are still being refined before this becomes the official version.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS v4
- pnpm

## Engineering principles behind this project

This site also works as a running example of how I approach front-end work day to day:

- **Accessibility as a practiced discipline, not a checklist.** 44×44px tap targets, deliberate `:focus-visible` states, `prefers-reduced-motion` support, focus traps in overlays, and `aria-label`s on icon-only controls.
- **Design tokens with intent.** Hardcoded values only get swapped for a token when there's an exact match; gaps get reported, not approximated. No token gets added ahead of an actual need.
- **Diagnosis before patching.** When something breaks in an unusual way (stacking context, z-index, phantom clicks), the goal is understanding the real cause, not the fastest fix.
- **Responsive with purpose.** `clamp()` for values that scale continuously, Tailwind breakpoints for actual structural layout changes.

## Getting started

```bash
pnpm install
pnpm dev
```
