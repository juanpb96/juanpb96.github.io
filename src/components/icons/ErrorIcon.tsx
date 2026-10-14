import type { CSSProperties } from "react"

interface ErrorIconProps {
  style?: CSSProperties
}

/* Circled exclamation mark for error messages. Decorative: the message's
   own text always states the error, so it's hidden from screen readers. */
export function ErrorIcon({ style }: ErrorIconProps) {
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
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 5v3.5" />
      <path d="M8 11h.01" />
    </svg>
  )
}
