import type { ReactNode } from 'react'
import { tokens } from '../../tokens'

interface PageShellProps {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div style={{ backgroundColor: tokens.colors.bg, minHeight: '100vh' }}>
      {children}
    </div>
  )
}
