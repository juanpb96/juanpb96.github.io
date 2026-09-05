import { useState } from 'react'
import { t } from '../../tokens'
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
        borderRadius: '20px',
        backgroundColor: t.surface,
        border: `1px solid ${hovered ? t.borderStrong : t.border}`,
        padding: large ? '32px' : '24px',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? `0 0 40px ${t.accentGlow}` : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        height: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
        <span style={{ fontFamily: t.fontMono, fontSize: '13px', color: t.textTertiary }}>{number}</span>
        <h3
          style={{
            fontFamily: t.fontDisplay,
            fontWeight: 700,
            fontSize: large ? '28px' : '22px',
            letterSpacing: '-0.02em',
            color: t.textPrimary,
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>

      {/* Mockup */}
      {large ? <DashboardMockup /> : <LayerStackMockup label={title} />}

      {/* Description */}
      <p style={{ fontSize: '14px', color: t.textSecondary, margin: 0, lineHeight: 1.6 }}>{description}</p>

      {/* Tags + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 10px',
                borderRadius: '999px',
                border: `1px solid ${t.border}`,
                backgroundColor: 'rgba(255,255,255,0.03)',
                fontSize: '11px',
                color: t.textSecondary,
                fontFamily: t.fontMono,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <span style={{ color: t.accent, fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>View →</span>
      </div>
    </div>
  )
}
