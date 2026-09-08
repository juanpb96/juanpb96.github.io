import { tokens } from '../../tokens'

export function Sparkle() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 0 L17.5 14.5 L32 16 L17.5 17.5 L16 32 L14.5 17.5 L0 16 L14.5 14.5 Z"
        fill={tokens.colors.textTertiary}
        opacity="0.6"
      />
    </svg>
  )
}
