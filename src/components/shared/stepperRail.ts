import type { CSSProperties } from "react"

import { tokens } from "../../tokens"

// Geometry shared by the Experience stepper and the Hero BuildProcessCard,
// which mirrors it: an 11px dot and a 1px rail centred on it.
export const STEPPER_DOT_SIZE = "11px"

export const STEPPER_RAIL_STYLE: CSSProperties = {
  position: "absolute",
  left: "5px",
  top: "6px",
  bottom: "6px",
  width: "1px",
  backgroundColor: tokens.colors.border,
}
