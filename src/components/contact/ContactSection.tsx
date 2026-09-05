import { t } from '../../tokens'
import { ContactCard } from './ContactCard'
import { Sparkle } from './Sparkle'

export function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        padding: '120px 48px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid texture */}
      <div
        className="grid-texture"
        style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }}
      />

      {/* Blue ambient blob */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '20%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77,156,248,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              fontFamily: t.fontMono,
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: t.textTertiary,
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            Get in Touch
          </div>
          <h2
            style={{
              fontFamily: t.fontDisplay,
              fontWeight: 700,
              fontSize: 'clamp(36px, 4.5vw, 64px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: t.textPrimary,
              margin: '0 0 24px 0',
            }}
          >
            Let's create something exceptional.
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: t.textSecondary,
              lineHeight: 1.7,
              marginBottom: '40px',
              maxWidth: '420px',
            }}
          >
            If you'd like to discuss a project, collaborate, or simply say hello, feel free to reach out through any of the channels below.
          </p>
          <a
            href="mailto:hello@juanbo.dev"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              borderRadius: '12px',
              backgroundColor: t.textPrimary,
              color: t.bg,
              textDecoration: 'none',
              fontFamily: t.fontDisplay,
              fontWeight: 600,
              fontSize: '15px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#c8d4e8')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = t.textPrimary)}
          >
            Send an Email →
          </a>
        </div>

        {/* Right: Contact cards + decorative elements */}
        <div style={{ position: 'relative' }}>
          {/* Decorative floating shape */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-20px',
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              border: `1px solid ${t.borderStrong}`,
              backgroundColor: 'rgba(77,156,248,0.05)',
              backdropFilter: 'blur(8px)',
              transform: 'rotate(15deg)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
            <ContactCard
              icon="✉"
              title="Email"
              subtitle="The best way to reach me directly."
              href="mailto:hello@juanbo.dev"
            />
            <ContactCard
              icon="in"
              title="LinkedIn"
              subtitle="Connect and follow my professional journey."
              href="https://linkedin.com"
            />
            <ContactCard
              icon="◎"
              title="GitHub"
              subtitle="Explore my projects and open-source work."
              href="https://github.com"
            />
          </div>

          {/* Sparkle decoration */}
          <div style={{ position: 'absolute', bottom: '-24px', right: '0' }}>
            <Sparkle />
          </div>
        </div>
      </div>
    </section>
  )
}
