import type { ReactNode } from 'react'
import { tokens } from '../../tokens'

interface ContentContainerProps {
  children: ReactNode
}

export function ContentContainer({ children }: ContentContainerProps) {
  return (
    <div style={{ maxWidth: `${tokens.container.maxWidth}px`, margin: '0 auto' }}>
      {children}
    </div>
  )
}
