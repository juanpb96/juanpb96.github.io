import type { ReactNode } from "react"

import { tokens } from "../../tokens"

interface IconButtonProps {
  href: string
  ariaLabel: string
  tooltip: string
  children: ReactNode
  onClick?: () => void
}

/* The circle is the 1.125rem glyph plus ICON_BUTTON_INSET on each side: 44px
   at the default size (the tap target minimum), growing with the glyph. */
export const ICON_BUTTON_INSET = 13
const BUTTON_SIZE = `calc(1.125rem + ${ICON_BUTTON_INSET * 2}px)`

export function IconButton({
  href,
  ariaLabel,
  tooltip,
  children,
  onClick,
}: IconButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${ariaLabel} (opens in new tab)`}
      onClick={onClick}
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
