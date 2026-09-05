import { experiences } from '../../data/experiences'
import { t } from '../../tokens'
import { ExperienceCard } from './ExperienceCard'

export function ExperienceSection() {
  return (
    <section
      id="experience"
      style={{ padding: '120px 48px', position: 'relative' }}
    >
      {/* Vertical separator line */}
      <div
        style={{
          position: 'absolute',
          left: 'calc(48px + 340px)',
          top: '120px',
          bottom: '120px',
          width: '1px',
          backgroundColor: t.border,
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '80px', alignItems: 'start' }}>
        {/* Left: sticky label */}
        <div style={{ position: 'sticky', top: '96px' }}>
          <div
            style={{
              fontFamily: t.fontMono,
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: t.textTertiary,
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Professional Journey
          </div>
          <h2
            style={{
              fontFamily: t.fontDisplay,
              fontWeight: 700,
              fontSize: 'clamp(40px, 4vw, 64px)',
              letterSpacing: '-0.03em',
              color: t.textPrimary,
              margin: '0 0 20px 0',
              lineHeight: 1.05,
            }}
          >
            Experience
          </h2>
          <p style={{ fontSize: '15px', color: t.textSecondary, lineHeight: 1.7, margin: 0 }}>
            Building accessible, scalable and high-performance digital products through thoughtful engineering and user-centered design.
          </p>

          {/* Timeline dots */}
          <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: '5px',
                top: '6px',
                bottom: '6px',
                width: '1px',
                backgroundColor: t.border,
              }}
            />
            {experiences.map((exp, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0', position: 'relative' }}>
                <div
                  style={{
                    width: '11px',
                    height: '11px',
                    borderRadius: '50%',
                    backgroundColor: i === 0 ? t.accent : t.surface,
                    border: `1px solid ${i === 0 ? t.accent : t.borderStrong}`,
                    boxShadow: i === 0 ? `0 0 12px ${t.accent}` : 'none',
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                />
                <div>
                  <div style={{ fontSize: '13px', color: i === 0 ? t.textPrimary : t.textSecondary, fontWeight: i === 0 ? 500 : 400 }}>{exp.company}</div>
                  <div style={{ fontSize: '11px', color: t.textTertiary, fontFamily: t.fontMono }}>{exp.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
