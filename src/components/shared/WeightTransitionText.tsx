import type { CSSProperties, ReactNode } from "react"

interface WeightTransitionTextProps {
  children: ReactNode
  active: boolean
  color: string
  activeColor: string
  style?: CSSProperties
}

/* Transitions weight (400 -> 500) and color together. Instrument Sans and
   Inter are self-hosted as variable fonts whose @font-face declares a
   weight range, so font-weight interpolates smoothly instead of snapping
   between static faces. */
export function WeightTransitionText({
  children,
  active,
  color,
  activeColor,
  style,
}: WeightTransitionTextProps) {
  return (
    <span
      style={{
        ...style,
        display: "block",
        fontWeight: active ? 500 : 400,
        color: active ? activeColor : color,
        transition: "font-weight 0.2s ease, color 0.2s ease",
      }}
    >
      {children}
    </span>
  )
}
