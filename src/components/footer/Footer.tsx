import { t } from '../../tokens'

export function Footer() {
  return (
    <footer
      style={{
        padding: '24px 48px',
        borderTop: `1px solid ${t.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '13px',
        color: t.textTertiary,
      }}
    >
      <span>© 2026 Juan Bo</span>
      <span>
        Designed & Developed by{' '}
        <span style={{ color: t.textSecondary }}>Juan Bo</span>
        {' '}❤{' '}
        React · TypeScript · Next.js
      </span>
    </footer>
  )
}
