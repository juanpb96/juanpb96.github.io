import type { CSSProperties } from "react"

interface ChevronDownIconProps {
  style?: CSSProperties
}

export function ChevronDownIcon({ style }: ChevronDownIconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ width: "1rem", height: "1rem", ...style }}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  )
}
