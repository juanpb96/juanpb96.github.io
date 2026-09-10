import { useState, useEffect } from 'react'
import { tokens } from '../../tokens'
import { ContentContainer } from '../layout/ContentContainer'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: scrolled ? 'rgba(10,11,13,0.85)' : 'transparent',
        borderBottom: scrolled ? `1px solid ${tokens.colors.border}` : '1px solid transparent',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <ContentContainer>
        <div
          className="px-container-mobile md:px-container-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: `${tokens.spacing[64]}px`,
          }}
        >
          {/* Monogram */}
          <div
            style={{
              fontFamily: tokens.fonts.display,
              fontWeight: 700,
              fontSize: '18px',
              letterSpacing: '-0.02em',
              color: tokens.colors.textPrimary,
            }}
          >
            JB
          </div>

          {/* Links */}
          <div className="hidden md:flex" style={{ gap: `${tokens.spacing[32]}px` }}>
            {['Projects', 'Experience', 'Contact'].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                style={{
                  color: tokens.colors.textSecondary,
                  textDecoration: 'none',
                  fontFamily: tokens.typography.navigation.font,
                  fontSize: `${tokens.typography.navigation.size}px`,
                  fontWeight: tokens.typography.navigation.weight,
                  lineHeight: tokens.typography.navigation.lineHeight,
                  letterSpacing: tokens.typography.navigation.letterSpacing,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = tokens.colors.textPrimary)}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = tokens.colors.textSecondary)}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Available badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: `${tokens.spacing[8]}px`,
              padding: '6px 14px',
              borderRadius: '999px',
              border: `1px solid ${tokens.colors.borderStrong}`,
              backgroundColor: tokens.colors.surface,
              fontSize: '13px',
              color: tokens.colors.textSecondary,
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#34d399',
                boxShadow: '0 0 6px rgba(52,211,153,0.6)',
              }}
            />
            <span className="hidden md:inline">Available for work</span>
          </div>
        </div>
      </ContentContainer>
    </nav>
  )
}
