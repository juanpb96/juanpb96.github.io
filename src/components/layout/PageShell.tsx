import type { ReactNode } from 'react'
import { tokens } from '../../tokens'
import { ContentContainer } from './ContentContainer'

interface PageShellProps {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div style={{ backgroundColor: tokens.colors.bg, minHeight: '100vh' }}>
      <ContentContainer>{children}</ContentContainer>
    </div>
  )
}
