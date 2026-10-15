import { tokens } from "../../tokens"

// Inset glow + 1px ring for a "selected" marker: the Experience stepper dot
// and card avatar, and the Hero BuildProcessCard dot that mirrors them.
export const SELECTED_RING = `inset 0 0 6px ${tokens.colors.accentGlow}, inset 0 0 0 1px ${tokens.colors.accentBorder}`
