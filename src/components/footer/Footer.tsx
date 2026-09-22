import { tokens } from '../../tokens'
import { ContentContainer } from '../layout/ContentContainer'
import { GithubIcon } from '../projects/GithubIcon'
import { IconButton } from '../projects/IconButton'
import { LinkedinIcon } from '../projects/LinkedinIcon'

const FALLBACK_YEAR = 2026

function getYear() {
  try {
    return new Date().getFullYear()
  } catch {
    return FALLBACK_YEAR
  }
}

export function Footer() {
  const year = getYear()

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
          <span>
            {year} · Designed & developed by{' '}
            <span style={{ color: tokens.colors.textSecondary }}>Juan Bonilla</span>
          </span>
          <div className="flex items-center gap-2">
            <IconButton
              href="https://www.linkedin.com/in/juanpablobonilla"
              ariaLabel="View LinkedIn profile"
              tooltip="LinkedIn"
            >
              <LinkedinIcon />
            </IconButton>
            <IconButton href="https://github.com/juanpb96" ariaLabel="View GitHub profile" tooltip="GitHub">
              <GithubIcon />
            </IconButton>
          </div>
        </div>
      </ContentContainer>
    </footer>
  )
}
