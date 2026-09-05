import { t } from '../../tokens'

export function DashboardMockup() {
  return (
    <div
      style={{
        backgroundColor: '#0d1117',
        borderRadius: '10px',
        border: `1px solid ${t.borderStrong}`,
        overflow: 'hidden',
        fontSize: '10px',
        fontFamily: t.fontMono,
      }}
    >
      {/* Chrome */}
      <div style={{ padding: '8px 12px', borderBottom: `1px solid ${t.border}`, display: 'flex', gap: '5px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        <span style={{ marginLeft: '8px', color: t.textTertiary }}>Dashboard Terms</span>
        <span style={{ marginLeft: 'auto', color: t.accent }}>+ Add</span>
      </div>
      {/* Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', minHeight: '180px' }}>
        {/* Sidebar */}
        <div style={{ padding: '12px', borderRight: `1px solid ${t.border}` }}>
          {['Code editor', 'Consoles', 'Shell performance', 'Work documents'].map((item, i) => (
            <div
              key={item}
              style={{
                padding: '5px 8px',
                borderRadius: '5px',
                backgroundColor: i === 0 ? t.accentDim : 'transparent',
                color: i === 0 ? t.accent : t.textSecondary,
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
            {[['Total bonus', '$19.28'], ['Total Expense', '$748'], ['Total proceeds', '87%']].map(([label, val]) => (
              <div key={label} style={{ padding: '8px', borderRadius: '6px', backgroundColor: t.surface, border: `1px solid ${t.border}` }}>
                <div style={{ color: t.textTertiary, fontSize: '9px', marginBottom: '4px' }}>{label}</div>
                <div style={{ color: t.textPrimary, fontWeight: 600, fontSize: '12px' }}>{val}</div>
              </div>
            ))}
          </div>
          {/* Chart area */}
          <div
            style={{
              height: '60px',
              borderRadius: '6px',
              background: `linear-gradient(to top, ${t.accentDim} 0%, transparent 100%)`,
              border: `1px solid ${t.accentDim}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <svg viewBox="0 0 200 60" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
              <polyline
                points="0,50 30,40 60,30 90,35 120,15 150,25 180,10 200,20"
                fill="none"
                stroke={t.accent}
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
