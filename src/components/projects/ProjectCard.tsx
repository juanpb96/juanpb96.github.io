import { useState } from 'react'
import { tokens } from '../../tokens'
import { DashboardMockup } from './DashboardMockup'
import { LayerStackMockup } from './LayerStackMockup'

interface ProjectCardProps {
  number: string
  title: string
  description: string
  tags: string[]
  large?: boolean
}

export function ProjectCard({
  number,
  title,
  description,
  tags,
  large,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: `${tokens.radius.lg}px`,
        backgroundColor: tokens.colors.surface,
        border: `1px solid ${hovered ? tokens.colors.borderStrong : tokens.colors.border}`,
        padding: large ? `${tokens.spacing[32]}px` : `${tokens.spacing[24]}px`,
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? `0 0 40px ${tokens.colors.accentGlow}` : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: `${tokens.spacing[20]}px`,
        height: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: `${tokens.spacing[16]}px` }}>
        <span style={{ fontFamily: tokens.fonts.mono, fontSize: '13px', color: tokens.colors.textTertiary }}>{number}</span>
        <h3
          style={{
            fontFamily: tokens.fonts.display,
            fontWeight: 700,
            fontSize: large ? '28px' : '22px',
            letterSpacing: '-0.02em',
            color: tokens.colors.textPrimary,
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>

      {/* Mockup */}
      {large ? <DashboardMockup /> : <LayerStackMockup label={title} />}

      {/* Description */}
      <p style={{ fontSize: '14px', color: tokens.colors.textSecondary, margin: 0, lineHeight: 1.6 }}>{description}</p>

      {/* Tags + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <div style={{ display: 'flex', gap: `${tokens.spacing[8]}px`, flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: `${tokens.spacing[4]}px 10px`,
                borderRadius: '999px',
                border: `1px solid ${tokens.colors.border}`,
                backgroundColor: 'rgba(255,255,255,0.03)',
                fontSize: '11px',
                color: tokens.colors.textSecondary,
                fontFamily: tokens.fonts.mono,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <span style={{ color: tokens.colors.accent, fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>View →</span>
      </div>
    </div>
  )
}
