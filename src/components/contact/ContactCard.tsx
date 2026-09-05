import { useState } from 'react'
import { t } from '../../tokens'

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
        gap: '16px',
        padding: '20px 24px',
        borderRadius: '16px',
        border: `1px solid ${hovered ? 'rgba(77,156,248,0.3)' : t.borderStrong}`,
        backgroundColor: hovered ? 'rgba(77,156,248,0.06)' : 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: hovered ? `0 8px 32px rgba(77,156,248,0.1)` : 'none',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          backgroundColor: t.surfaceRaised,
          border: `1px solid ${t.borderStrong}`,
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
        <div style={{ fontFamily: t.fontDisplay, fontWeight: 600, fontSize: '15px', color: t.textPrimary, marginBottom: '2px' }}>{title}</div>
        <div style={{ fontSize: '13px', color: t.textSecondary }}>{subtitle}</div>
      </div>
      <span style={{ color: hovered ? t.accent : t.textTertiary, fontSize: '18px', transition: 'color 0.2s' }}>→</span>
    </a>
  )
}
