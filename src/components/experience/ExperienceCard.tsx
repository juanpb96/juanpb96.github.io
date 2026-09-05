import { useState } from 'react'
import type { Experience } from '../../data/experiences'
import { t } from '../../tokens'

interface ExperienceCardProps {
  exp: Experience
  index: number
}

export function ExperienceCard({ exp, index }: ExperienceCardProps) {
  const [hovered, setHovered] = useState(false)
  const active = exp.active || hovered

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        border: `1px solid ${active ? 'rgba(77,156,248,0.3)' : t.border}`,
        backgroundColor: active ? '#111620' : t.surface,
        padding: '28px 32px',
        transition: 'all 0.3s ease',
        boxShadow: active ? `0 0 40px rgba(77,156,248,0.08), inset 0 1px 0 rgba(77,156,248,0.1)` : 'none',
        position: 'relative',
      }}
    >
      {/* Role header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Company avatar */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: t.surfaceRaised,
              border: `1px solid ${t.borderStrong}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: t.fontDisplay,
              fontWeight: 700,
              fontSize: '14px',
              color: active ? t.accent : t.textSecondary,
              flexShrink: 0,
            }}
          >
            {exp.company[0]}
          </div>
          <div>
            <div
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 600,
                fontSize: '16px',
                color: t.textPrimary,
                marginBottom: '2px',
              }}
            >
              {exp.role}
            </div>
            <div style={{ fontSize: '13px', color: t.textSecondary }}>
              {exp.company} · <span style={{ fontFamily: t.fontMono, fontSize: '12px' }}>{exp.period}</span>
            </div>
          </div>
        </div>
        <span
          style={{
            fontSize: '12px',
            color: t.textTertiary,
            fontFamily: t.fontMono,
            whiteSpace: 'nowrap',
          }}
        >
          {exp.location}
        </span>
      </div>

      {/* Description + achievements */}
      <p style={{ fontSize: '14px', color: t.textSecondary, lineHeight: 1.7, marginBottom: '16px', margin: '0 0 16px 0' }}>
        {exp.description}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '20px' }}>
        {exp.achievements.map((a) => (
          <div key={a} style={{ fontSize: '13px', color: t.textSecondary, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: active ? t.accent : t.textTertiary, marginTop: '2px', flexShrink: 0 }}>·</span>
            {a}
          </div>
        ))}
      </div>

      {/* Tags + CTA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {exp.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '3px 10px',
                borderRadius: '999px',
                border: `1px solid ${active ? 'rgba(77,156,248,0.25)' : t.border}`,
                backgroundColor: active ? 'rgba(77,156,248,0.08)' : 'rgba(255,255,255,0.03)',
                fontSize: '11px',
                color: active ? t.accent : t.textSecondary,
                fontFamily: t.fontMono,
                transition: 'all 0.3s',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {exp.active && (
          <a
            href="#projects"
            style={{ color: t.accent, fontSize: '13px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            View Projects →
          </a>
        )}
      </div>
    </div>
  )
}
