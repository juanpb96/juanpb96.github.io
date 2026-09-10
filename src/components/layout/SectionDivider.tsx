import { tokens } from '../../tokens'

export function SectionDivider() {
  return <div className="mx-container-mobile md:mx-container-desktop" style={{ height: '1px', backgroundColor: tokens.colors.border }} />
}
