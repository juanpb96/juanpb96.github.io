import { tokens } from '../../tokens'

export function SectionDivider() {
  return <div style={{ height: '1px', backgroundColor: tokens.colors.border, margin: `0 ${tokens.container.paddingDesktop}px` }} />
}
