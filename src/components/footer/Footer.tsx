import { tokens } from '../../tokens'

export function Footer() {
  return (
    <footer
      style={{
        padding: `${tokens.spacing[24]}px ${tokens.container.paddingDesktop}px`,
        borderTop: `1px solid ${tokens.colors.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '13px',
        color: tokens.colors.textTertiary,
      }}
    >
      <span>© 2026 Juan Bo</span>
      <span>
        Designed & Developed by{' '}
        <span style={{ color: tokens.colors.textSecondary }}>Juan Bo</span>
        {' '}❤{' '}
        React · TypeScript · Next.js
      </span>
    </footer>
  )
}
