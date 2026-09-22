import { tokens } from '../../tokens'

interface ContactCardProps {
  icon: string
  title: string
  badge?: string
  subtitle: string
  href: string
}

export function ContactCard({
  icon,
  title,
  badge,
  subtitle,
  href,
}: ContactCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: `${tokens.spacing[16]}px`,
        padding: `${tokens.spacing[20]}px ${tokens.spacing[24]}px`,
        borderRadius: `${tokens.radius.md}px`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      {/* Icon */}
      <div
        className="contact-card-icon"
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '12px',
          backgroundColor: tokens.colors.surfaceRaised,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
          <div style={{ fontFamily: tokens.fonts.display, fontWeight: 600, fontSize: '15px', color: tokens.colors.textPrimary }}>{title}</div>
          {badge && (
            <span
              style={{
                padding: '3px 10px',
                borderRadius: `${tokens.radius.full}px`,
                border: `1px solid ${tokens.colors.accentBorder}`,
                backgroundColor: 'rgba(77,156,248,0.08)',
                fontSize: '11px',
                color: tokens.colors.accent,
                fontFamily: tokens.fonts.mono,
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <div style={{ fontSize: '13px', color: tokens.colors.textSecondary }}>{subtitle}</div>
      </div>
      <span className="contact-card-arrow" style={{ fontSize: '18px' }}>→</span>
    </a>
  )
}
