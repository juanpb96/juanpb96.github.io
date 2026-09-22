import { tokens } from '../../tokens'
import { ContactForm } from './ContactForm'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="px-container-mobile md:px-container-desktop"
      style={{
        paddingTop: 'clamp(64px, 10vw, 120px)',
        paddingBottom: 'clamp(64px, 10vw, 120px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid texture */}
      <div
        className="grid-texture"
        style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }}
      />

      <div
        className="grid grid-cols-1 mdlg:grid-cols-2"
        style={{
          gap: 'clamp(48px, 8vw, 80px)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left */}
        <div>
          <h2
            style={{
              fontFamily: tokens.fonts.display,
              fontWeight: 700,
              fontSize: `clamp(${tokens.typography.sectionTitle.sizeMobile}px, 5vw, ${tokens.typography.sectionTitle.size}px)`,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: tokens.colors.textPrimary,
              margin: `0 0 ${tokens.spacing[24]}px 0`,
            }}
          >
            Let's create something exceptional.
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: tokens.colors.textSecondary,
              lineHeight: 1.7,
              marginBottom: '12px',
              maxWidth: '420px',
            }}
          >
            If you'd like to discuss a project, collaborate, or simply say hello, feel free to reach out through{' '}
            <a href="mailto:hello@juanbonilla.me" className="inline-link">
              email
            </a>{' '}
            or{' '}
            <a
              href="https://www.linkedin.com/in/juanpablobonilla"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link"
            >
              LinkedIn
            </a>
            .
          </p>
          <p
            style={{
              fontSize: '12px',
              color: tokens.colors.textTertiary,
              lineHeight: 1.7,
              maxWidth: '420px',
            }}
          >
            Bogotá, GMT-5. Usually replies within a day
          </p>
        </div>

        {/* Right: Contact form */}
        <ContactForm />
      </div>
    </section>
  )
}
