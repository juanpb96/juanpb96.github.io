import { tokens } from '../../tokens'
import { ContentContainer } from '../layout/ContentContainer'

export function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${tokens.colors.border}`,
        fontSize: '13px',
        color: tokens.colors.textTertiary,
        width: '100vw',
        marginLeft: 'calc(50% - 50vw)',
        marginRight: 'calc(50% - 50vw)',
      }}
    >
      <ContentContainer>
        <div
          className="px-container-mobile md:px-container-desktop flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
          style={{
            paddingTop: `${tokens.spacing[24]}px`,
            paddingBottom: `${tokens.spacing[24]}px`,
          }}
        >
          <span>© 2026 Juan Bo</span>
          <span>
            Designed & Developed by{' '}
            <span style={{ color: tokens.colors.textSecondary }}>Juan Bo</span>
            {' '}❤{' '}
            React · TypeScript · Next.js
          </span>
        </div>
      </ContentContainer>
    </footer>
  )
}
