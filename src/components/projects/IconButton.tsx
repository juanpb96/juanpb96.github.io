import type { ReactNode } from 'react'
import { tokens } from '../../tokens'

interface IconButtonProps {
  href: string
  ariaLabel: string
  tooltip: string
  children: ReactNode
}

export function IconButton({ href, ariaLabel, tooltip, children }: IconButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="project-icon-btn"
      style={{
        width: '44px',
        height: '44px',
        borderRadius: `${tokens.radius.full}px`,
      }}
    >
      {children}
      <span className="project-icon-btn-tooltip" aria-hidden="true">
        {tooltip}
      </span>
    </a>
  )
}
