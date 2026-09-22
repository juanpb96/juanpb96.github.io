interface ArrowRightIconProps {
  className?: string
}

/* Hand-drawn to match the visual weight of the "→" glyph it replaces: a thin
   stroke line with a small chevron head, sized for CTA button text. Used in
   place of a text arrow character so hover/focus transforms animate SVG
   geometry instead of font-dependent glyph rendering (baseline/metrics vary
   by font/OS/browser and were the source of a transform-animation glitch). */
export function ArrowRightIcon({ className }: ArrowRightIconProps) {
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
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 8h12" />
      <path d="M9 3l5 5-5 5" />
    </svg>
  )
}
