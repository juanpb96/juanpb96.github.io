import { useState } from 'react'
import type { Experience } from '../../data/experiences'
import { tokens } from '../../tokens'

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
        borderRadius: `${tokens.radius.lg}px`,
        border: `1px solid ${active ? tokens.colors.accentBorder : tokens.colors.border}`,
        backgroundColor: active ? tokens.colors.accentGlow : tokens.colors.surface,
        padding: `28px ${tokens.spacing[32]}px`,
        transition: 'all 0.3s ease',
        boxShadow: active ? `0 0 40px rgba(77,156,248,0.08), inset 0 1px 0 ${tokens.colors.accentGlow}` : 'none',
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
              backgroundColor: tokens.colors.surfaceRaised,
              border: `1px solid ${tokens.colors.borderStrong}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: tokens.fonts.display,
              fontWeight: 700,
              fontSize: '14px',
              color: active ? tokens.colors.accent : tokens.colors.textSecondary,
              flexShrink: 0,
            }}
          >
            {exp.company[0]}
          </div>
          <div>
            <div
              style={{
                fontFamily: tokens.fonts.display,
                fontWeight: 600,
                fontSize: '16px',
                color: tokens.colors.textPrimary,
                marginBottom: '2px',
              }}
            >
              {exp.role}
            </div>
            <div style={{ fontSize: '13px', color: tokens.colors.textSecondary }}>
              {exp.company} · <span style={{ fontFamily: tokens.fonts.mono, fontSize: '12px' }}>{exp.period}</span>
            </div>
          </div>
        </div>
        <span
          style={{
            fontSize: '12px',
            color: tokens.colors.textTertiary,
            fontFamily: tokens.fonts.mono,
            whiteSpace: 'nowrap',
          }}
        >
          {exp.location}
        </span>
      </div>

      {/* Description + achievements */}
      <p style={{ fontSize: '14px', color: tokens.colors.textSecondary, lineHeight: 1.7, marginBottom: '16px', margin: '0 0 16px 0' }}>
        {exp.description}
      </p>

      <div className="grid grid-cols-1 mdlg:grid-cols-2" style={{ gap: '6px', marginBottom: `${tokens.spacing[20]}px` }}>
        {exp.achievements.map((a) => (
          <div key={a} style={{ fontSize: '13px', color: tokens.colors.textSecondary, display: 'flex', gap: `${tokens.spacing[8]}px`, alignItems: 'flex-start' }}>
            <span style={{ color: active ? tokens.colors.accent : tokens.colors.textTertiary, marginTop: '2px', flexShrink: 0 }}>·</span>
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
                borderRadius: `${tokens.radius.full}px`,
                border: `1px solid ${active ? tokens.colors.accentBorder : tokens.colors.border}`,
                backgroundColor: active ? 'rgba(77,156,248,0.08)' : 'rgba(255,255,255,0.03)',
                fontSize: '11px',
                color: active ? tokens.colors.accent : tokens.colors.textSecondary,
                fontFamily: tokens.fonts.mono,
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
            style={{ color: tokens.colors.accent, fontSize: '13px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            View Projects →
          </a>
        )}
      </div>
    </div>
  )
}
