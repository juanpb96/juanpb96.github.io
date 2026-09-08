import { useState } from 'react'
import { tokens } from '../../tokens'

interface ContactCardProps {
  icon: string
  title: string
  subtitle: string
  href: string
}

export function ContactCard({
  icon,
  title,
  subtitle,
  href,
}: ContactCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: `${tokens.spacing[16]}px`,
        padding: `${tokens.spacing[20]}px ${tokens.spacing[24]}px`,
        borderRadius: `${tokens.radius.md}px`,
        border: `1px solid ${hovered ? 'rgba(77,156,248,0.3)' : tokens.colors.borderStrong}`,
        backgroundColor: hovered ? 'rgba(77,156,248,0.06)' : 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: hovered ? `0 8px 32px ${tokens.colors.accentGlow}` : 'none',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          backgroundColor: tokens.colors.surfaceRaised,
          border: `1px solid ${tokens.colors.borderStrong}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: tokens.fonts.display, fontWeight: 600, fontSize: '15px', color: tokens.colors.textPrimary, marginBottom: '2px' }}>{title}</div>
        <div style={{ fontSize: '13px', color: tokens.colors.textSecondary }}>{subtitle}</div>
      </div>
      <span style={{ color: hovered ? tokens.colors.accent : tokens.colors.textTertiary, fontSize: '18px', transition: 'color 0.2s' }}>→</span>
    </a>
  )
}
