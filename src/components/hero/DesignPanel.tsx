import { tokens } from '../../tokens'

export function DesignPanel() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '220px',
        right: '-20px',
        width: '200px',
        borderRadius: '14px',
        backgroundColor: '#1a1d24',
        border: `1px solid ${tokens.colors.borderStrong}`,
        boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
        padding: `${tokens.spacing[16]}px`,
        zIndex: 4,
        fontSize: '11px',
        fontFamily: tokens.fonts.mono,
      }}
    >
      <div style={{ color: tokens.colors.textTertiary, marginBottom: '12px', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Auto Layout</div>
      {[['W', '100%'], ['H', 'auto'], ['Gap', '8px'], ['Pad', '16px']].map(([label, val]) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ color: tokens.colors.textTertiary }}>{label}</span>
          <span style={{ color: tokens.colors.textPrimary }}>{val}</span>
        </div>
      ))}
      <div style={{ marginTop: '12px', color: tokens.colors.textTertiary, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: `${tokens.spacing[8]}px` }}>Properties</div>
      {['Component', 'Accessible', 'ARIA Label', 'Focusable'].map((prop) => (
        <div
          key={prop}
          style={{
            padding: `${tokens.spacing[4]}px ${tokens.spacing[8]}px`,
            borderRadius: '6px',
            backgroundColor: prop === 'Component' ? tokens.colors.accentDim : 'transparent',
            color: prop === 'Component' ? tokens.colors.accent : tokens.colors.textSecondary,
            marginBottom: `${tokens.spacing[4]}px`,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ width: `${tokens.spacing[4]}px`, height: `${tokens.spacing[4]}px`, borderRadius: '50%', backgroundColor: prop === 'Component' ? tokens.colors.accent : tokens.colors.textTertiary, flexShrink: 0 }} />
          {prop}
        </div>
      ))}
    </div>
  )
}
