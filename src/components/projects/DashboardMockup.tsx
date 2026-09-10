import { tokens } from '../../tokens'

export function DashboardMockup() {
  return (
    <div
      className="hidden md:block"
      style={{
        backgroundColor: '#0d1117',
        borderRadius: '10px',
        border: `1px solid ${tokens.colors.borderStrong}`,
        overflow: 'hidden',
        fontSize: '10px',
        fontFamily: tokens.fonts.mono,
      }}
    >
      {/* Chrome */}
      <div style={{ padding: `${tokens.spacing[8]}px 12px`, borderBottom: `1px solid ${tokens.colors.border}`, display: 'flex', gap: '5px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        <span style={{ marginLeft: `${tokens.spacing[8]}px`, color: tokens.colors.textTertiary }}>Dashboard Terms</span>
        <span style={{ marginLeft: 'auto', color: tokens.colors.accent }}>+ Add</span>
      </div>
      {/* Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', minHeight: '180px' }}>
        {/* Sidebar */}
        <div style={{ padding: '12px', borderRight: `1px solid ${tokens.colors.border}` }}>
          {['Code editor', 'Consoles', 'Shell performance', 'Work documents'].map((item, i) => (
            <div
              key={item}
              style={{
                padding: '5px 8px',
                borderRadius: '5px',
                backgroundColor: i === 0 ? tokens.colors.accentDim : 'transparent',
                color: i === 0 ? tokens.colors.accent : tokens.colors.textSecondary,
                marginBottom: '2px',
                fontSize: '10px',
              }}
            >
              {item}
            </div>
          ))}
        </div>
        {/* Main */}
        <div style={{ padding: '12px' }}>
          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: `${tokens.spacing[8]}px`, marginBottom: '12px' }}>
            {[['Total bonus', '$19.28'], ['Total Expense', '$748'], ['Total proceeds', '87%']].map(([label, val]) => (
              <div key={label} style={{ padding: `${tokens.spacing[8]}px`, borderRadius: '6px', backgroundColor: tokens.colors.surface, border: `1px solid ${tokens.colors.border}` }}>
                <div style={{ color: tokens.colors.textTertiary, fontSize: '9px', marginBottom: '4px' }}>{label}</div>
                <div style={{ color: tokens.colors.textPrimary, fontWeight: 600, fontSize: '12px' }}>{val}</div>
              </div>
            ))}
          </div>
          {/* Chart area */}
          <div
            style={{
              height: '60px',
              borderRadius: '6px',
              background: `linear-gradient(to top, ${tokens.colors.accentDim} 0%, transparent 100%)`,
              border: `1px solid ${tokens.colors.accentDim}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <svg viewBox="0 0 200 60" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
              <polyline
                points="0,50 30,40 60,30 90,35 120,15 150,25 180,10 200,20"
                fill="none"
                stroke={tokens.colors.accent}
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
