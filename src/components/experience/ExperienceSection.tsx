import { experiences } from '../../data/experiences'
import { tokens } from '../../tokens'
import { ExperienceCard } from './ExperienceCard'

export function ExperienceSection() {
  return (
    <section
      id="experience"
      style={{ padding: `${tokens.spacing[120]}px ${tokens.container.paddingDesktop}px`, position: 'relative' }}
    >
      {/* Vertical separator line */}
      <div
        style={{
          position: 'absolute',
          left: 'calc(48px + 340px)',
          top: `${tokens.spacing[120]}px`,
          bottom: `${tokens.spacing[120]}px`,
          width: '1px',
          backgroundColor: tokens.colors.border,
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: `${tokens.spacing[80]}px`, alignItems: 'start' }}>
        {/* Left: sticky label */}
        <div style={{ position: 'sticky', top: '96px' }}>
          <h2
            style={{
              fontFamily: tokens.fonts.display,
              fontWeight: 700,
              fontSize: 'clamp(40px, 4vw, 64px)',
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
