import { experiences } from '../../data/experiences'
import { tokens } from '../../tokens'
import { ExperienceCard } from './ExperienceCard'

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="px-container-mobile md:px-container-desktop"
      style={{ paddingTop: 'clamp(64px, 10vw, 120px)', paddingBottom: 'clamp(64px, 10vw, 120px)', position: 'relative' }}
    >
      {/* Vertical separator line */}
      <div
        className="hidden md:block"
        style={{
          position: 'absolute',
          left: 'calc(48px + 340px)',
          top: 'clamp(64px, 10vw, 120px)',
          bottom: 'clamp(64px, 10vw, 120px)',
          width: '1px',
          backgroundColor: tokens.colors.border,
          pointerEvents: 'none',
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-[340px_1fr]" style={{ gap: 'clamp(48px, 8vw, 80px)', alignItems: 'start' }}>
        {/* Left: sticky label */}
        <div className="md:sticky md:top-24">
          <h2
            style={{
              fontFamily: tokens.fonts.display,
              fontWeight: 700,
              fontSize: `clamp(${tokens.typography.sectionTitle.sizeMobile}px, 5vw, ${tokens.typography.sectionTitle.size}px)`,
              letterSpacing: '-0.03em',
              color: tokens.colors.textPrimary,
              margin: `0 0 ${tokens.spacing[20]}px 0`,
              lineHeight: 1.05,
            }}
          >
            Experience
          </h2>
          <p style={{ fontSize: '15px', color: tokens.colors.textSecondary, lineHeight: 1.7, margin: 0 }}>
            Building accessible, scalable and high-performance digital products through thoughtful engineering and user-centered design.
          </p>

          {/* Timeline dots */}
          <div style={{ marginTop: `${tokens.spacing[48]}px`, display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: '5px',
                top: '6px',
                bottom: '6px',
                width: '1px',
                backgroundColor: tokens.colors.border,
              }}
            />
            {experiences.map((exp, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: `${tokens.spacing[16]}px`, padding: '12px 0', position: 'relative' }}>
                <div
                  style={{
                    width: '11px',
                    height: '11px',
                    borderRadius: '50%',
                    backgroundColor: i === 0 ? tokens.colors.accent : tokens.colors.surface,
                    border: `1px solid ${i === 0 ? tokens.colors.accent : tokens.colors.borderStrong}`,
                    boxShadow: i === 0 ? `0 0 12px ${tokens.colors.accent}` : 'none',
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                />
                <div>
                  <div style={{ fontSize: '13px', color: i === 0 ? tokens.colors.textPrimary : tokens.colors.textSecondary, fontWeight: i === 0 ? 500 : 400 }}>{exp.company}</div>
                  <div style={{ fontSize: '11px', color: tokens.colors.textTertiary, fontFamily: tokens.fonts.mono }}>{exp.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing[20]}px` }}>
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
