import type { CSSProperties, ReactNode } from "react"

interface CrossfadeTextProps {
  children: ReactNode

  active: boolean

  color: string

  activeColor: string

  style?: CSSProperties
}

const layerStyle: CSSProperties = {
  gridArea: "1 / 1",

  transition: "opacity 0.2s ease",
}

/* Instrument Sans ships 400/500 as separate static faces (no variable wght
   axis), so font-weight can't be interpolated. Two stacked layers cross-fade
   via opacity instead, each carrying its own static color, which reads as a
   combined color + weight transition. The active layer is aria-hidden so the
   text is only announced once. */
export function CrossfadeText({
  children,
  active,
  color,
  activeColor,
  style,
}: CrossfadeTextProps) {
  return (
    <span style={{ ...style, display: "grid" }}>
      <span
        style={{
          ...layerStyle,

          fontWeight: 400,

          color,

          opacity: active ? 0 : 1,
        }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        style={{
          ...layerStyle,

          fontWeight: 500,

          color: activeColor,

          opacity: active ? 1 : 0,
        }}
      >
        {children}
      </span>
    </span>
  )
}
