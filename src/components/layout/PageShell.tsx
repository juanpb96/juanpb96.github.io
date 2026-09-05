import type { ReactNode } from 'react'
import { t } from '../../tokens'

interface PageShellProps {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div style={{ backgroundColor: t.bg, minHeight: '100vh' }}>
      {children}
    </div>
  )
}
