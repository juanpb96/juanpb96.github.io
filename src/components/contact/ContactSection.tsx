import { tokens } from '../../tokens'
import { ContactCard } from './ContactCard'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="px-container-mobile md:px-container-desktop"
      style={{
        paddingTop: 'clamp(64px, 10vw, 120px)',
        paddingBottom: 'clamp(48px, 8vw, 80px)',
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
        className="grid grid-cols-1 md:grid-cols-2"
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
              marginBottom: '16px',
              maxWidth: '420px',
            }}
          >
            If you'd like to discuss a project, collaborate, or simply say hello, feel free to reach out through email or LinkedIn.
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

        {/* Right: Contact cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 mdlg:grid-cols-1"
          style={{ gap: `${tokens.spacing[20]}px` }}
        >
          <ContactCard
            icon="✉"
            title="Email"
            badge="Preferred"
            subtitle="The best way to reach me directly."
            href="mailto:hello@juanbonilla.me"
          />
          <ContactCard
            icon="in"
            title="LinkedIn"
            subtitle="A closer look at my experience, let's connect."
            href="https://www.linkedin.com/in/juanpablobonilla"
          />
        </div>
      </div>
    </section>
  )
}
