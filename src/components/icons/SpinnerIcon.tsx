interface SpinnerIconProps {
  className?: string
}

/* Three-quarter ring for in-progress states. Decorative (the label next to
   it says what's happening); the rotation lives in the .spinner class in
   index.css, which stops it under prefers-reduced-motion. */
export function SpinnerIcon({ className }: SpinnerIconProps) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M8 2a6 6 0 1 0 6 6" />
    </svg>
  )
}
