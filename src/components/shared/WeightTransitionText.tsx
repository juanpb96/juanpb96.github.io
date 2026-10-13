import type { CSSProperties } from "react"

interface WeightTransitionTextProps {
  children: string
  active: boolean
  color: string
  activeColor: string
  style?: CSSProperties
}

/* Cross-fades between a regular (400) and a medium (500) copy of the text
   rather than animating font-weight, which would reflow the layout on every
   frame. See `.weight-transition` in src/index.css. */
export function WeightTransitionText({
  children,
  active,
  color,
  activeColor,
  style,
}: WeightTransitionTextProps) {
  return (
    <span
      className="weight-transition"
      data-text={children}
      data-active={active}
      style={
        {
          ...style,
          "--weight-color": color,
          "--weight-active-color": activeColor,
        } as CSSProperties
      }
    >
      <span className="weight-transition-text">{children}</span>
    </span>
  )
}
