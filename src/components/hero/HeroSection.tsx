import { tokens } from '../../tokens'
import { AccessibilityPanel } from './AccessibilityPanel'
import { CodePanel } from './CodePanel'
import { DesignPanel } from './DesignPanel'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="grid grid-cols-1 md:grid-cols-2 px-container-mobile md:px-container-desktop"
      style={{
        minHeight: '100vh',
        alignItems: 'center',
        paddingTop: 'clamp(32px, 6vw, 64px)',
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
        <h1
          style={{
            fontFamily: tokens.fonts.display,
            fontWeight: 700,
            fontSize: `clamp(${tokens.typography.heroTitle.sizeMobile}px, 6vw, ${tokens.typography.heroTitle.size}px)`,
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            color: tokens.colors.textPrimary,
            margin: '0 0 8px 0',
          }}
        >
          Juan Bonilla
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
          React · TypeScript · Intentional Accessibility
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
          I build interfaces with genuine attention to accessibility. Minimalist at heart,
          adaptable to each project's vision.
        </p>

        <div style={{ display: 'flex', gap: `${tokens.spacing[16]}px`, alignItems: 'center' }}>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 28px',
              borderRadius: `${tokens.radius.sm}px`,
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
            Get in touch
          </a>
        </div>
      </div>

      {/* Right: Floating Panels */}
      <div className="hidden mdlg:block" style={{ position: 'relative', height: '520px', zIndex: 2 }}>
        <CodePanel />
        <DesignPanel />
        <AccessibilityPanel />
      </div>
    </section>
  )
}
