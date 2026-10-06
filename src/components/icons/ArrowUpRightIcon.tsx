interface ArrowUpRightIconProps {
  className?: string
}

/* Same stroke weight as ArrowRightIcon, for links that open in a new tab. */
export function ArrowUpRightIcon({ className }: ArrowUpRightIconProps) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12l8-8" />
      <path d="M5.5 4H12v6.5" />
    </svg>
  )
}
