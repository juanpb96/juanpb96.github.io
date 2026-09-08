import { tokens } from '../../tokens'
import { AccessibilityPanel } from './AccessibilityPanel'
import { CodePanel } from './CodePanel'
import { DesignPanel } from './DesignPanel'

export function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: `0 ${tokens.container.paddingDesktop}px`,
        paddingTop: `${tokens.spacing[64]}px`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Architectural grid */}
      <div
        className="grid-texture"
        style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }}
      />

      {/* Blue ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77,156,248,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Left: Text */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '560px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '999px',
            border: `1px solid ${tokens.colors.borderStrong}`,
            backgroundColor: tokens.colors.surface,
            fontSize: '12px',
            color: tokens.colors.textSecondary,
            fontFamily: tokens.fonts.mono,
            marginBottom: `${tokens.spacing[32]}px`,
            letterSpacing: '0.06em',
          }}
        >
          <span style={{ color: tokens.colors.accent }}>◆</span> Design Exploration · 1440px
        </div>

        <h1
          style={{
            fontFamily: tokens.fonts.display,
            fontWeight: 700,
            fontSize: 'clamp(56px, 6vw, 88px)',
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            color: tokens.colors.textPrimary,
            margin: '0 0 8px 0',
          }}
        >
          Juan Bo
        </h1>
        <h2
          style={{
            fontFamily: tokens.fonts.display,
            fontWeight: 600,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: tokens.colors.textPrimary,
            margin: `0 0 ${tokens.spacing[20]}px 0`,
          }}
        >
          Front-End Developer
        </h2>

        <p
          style={{
            fontSize: '18px',
            color: tokens.colors.textSecondary,
            marginBottom: '12px',
            letterSpacing: '0.02em',
          }}
        >
          React · TypeScript · Accessible Interfaces
        </p>

        <p
          style={{
            fontSize: '16px',
            color: tokens.colors.textSecondary,
            lineHeight: 1.7,
            maxWidth: '420px',
            marginBottom: '40px',
          }}
        >
          I build web interfaces where design, code, and accessibility meet in perfect balance.
        </p>

        <div style={{ display: 'flex', gap: `${tokens.spacing[16]}px`, alignItems: 'center' }}>
          <a
            href="#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 28px',
              borderRadius: '12px',
              border: `1px solid ${tokens.colors.borderStrong}`,
              backgroundColor: 'transparent',
              color: tokens.colors.textPrimary,
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 500,
              fontFamily: tokens.fonts.display,
              transition: 'background-color 0.2s, border-color 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = tokens.colors.accentDim
              el.style.borderColor = tokens.colors.accent
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'transparent'
              el.style.borderColor = tokens.colors.borderStrong
            }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            style={{
              fontSize: '15px',
              color: tokens.colors.textSecondary,
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = tokens.colors.textPrimary)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = tokens.colors.textSecondary)}
          >
            Get in touch →
          </a>
        </div>
      </div>

      {/* Right: Floating Panels */}
      <div style={{ position: 'relative', height: '520px', zIndex: 2 }}>
        <CodePanel />
        <DesignPanel />
        <AccessibilityPanel />
      </div>
    </section>
  )
}
