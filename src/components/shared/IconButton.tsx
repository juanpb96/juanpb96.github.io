import type { ReactNode } from "react"

import { tokens } from "../../tokens"

interface IconButtonProps {
  href: string

  ariaLabel: string

  tooltip: string

  children: ReactNode
}

/* The circle is the 1.125rem glyph plus 13px of inset on each side: 44px at
   the default size (the tap target minimum), growing with the glyph. */
const BUTTON_SIZE = "calc(1.125rem + 26px)"

export function IconButton({
  href,
  ariaLabel,
  tooltip,
  children,
}: IconButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="icon-button"
      style={{
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: `${tokens.radius.full}px`,
      }}
    >
      {children}
      <span className="icon-button-tooltip" aria-hidden="true">
        {tooltip}
      </span>
    </a>
  )
}
