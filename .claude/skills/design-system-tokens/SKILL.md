---
name: design-system-tokens
description: Apply design tokens correctly when touching component styles in this portfolio — matching rules, gap reporting, and responsive conventions.
---

When styling a component or applying tokens to hardcoded values in this project:

1. Only replace a hardcoded value with a token reference when it matches an existing token exactly (color, spacing, radius, or full typography combo). Never round to the nearest token or invent a new one without asking first.
2. If a value has no exact match, leave it unchanged and add it to a gap report grouped by category (colors/opacities, spacing, typography, radius) with file + context. Stop for confirmation before creating any new token.
3. Decorative mockup components (CodePanel, DesignPanel, AccessibilityPanel, DashboardMockup, LayerStackMockup) are exempt from the token system — don't force their colors/spacing into tokens.
4. For responsive behavior: clamp() for values that scale continuously (typography, large section spacing), referencing token values as bounds. Tailwind utility classes with breakpoints for discrete structural changes.
5. Known breakpoints: md (768px, default for structural changes) and mdlg (900px, custom — see --breakpoint-mdlg in index.css). Don't introduce new custom breakpoints on your own judgment — if a component looks broken at an in-between size, flag it and wait for direction instead of adding a new breakpoint value.
6. Never use JS-based viewport detection for responsive behavior. If no CSS-only solution exists, stop and ask before implementing one.
7. Visibility toggles for responsive show/hide are set once, at the point of composition — never duplicated inside the reusable component.
8. For full-width-visual + aligned-content elements (nav bars, footers), wrap only the inner content in ContentContainer and keep the outer element's background/border full width. Non-fixed elements use: width: 100vw; margin-left/right: calc(50% - 50vw).
