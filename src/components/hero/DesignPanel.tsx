import { t } from '../../tokens'

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
        border: `1px solid ${t.borderStrong}`,
        boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
        padding: '16px',
        zIndex: 4,
        fontSize: '11px',
        fontFamily: t.fontMono,
      }}
    >
      <div style={{ color: t.textTertiary, marginBottom: '12px', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Auto Layout</div>
      {[['W', '100%'], ['H', 'auto'], ['Gap', '8px'], ['Pad', '16px']].map(([label, val]) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ color: t.textTertiary }}>{label}</span>
          <span style={{ color: t.textPrimary }}>{val}</span>
        </div>
      ))}
      <div style={{ marginTop: '12px', color: t.textTertiary, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>Properties</div>
      {['Component', 'Accessible', 'ARIA Label', 'Focusable'].map((prop) => (
        <div
          key={prop}
          style={{
            padding: '4px 8px',
            borderRadius: '6px',
            backgroundColor: prop === 'Component' ? t.accentDim : 'transparent',
            color: prop === 'Component' ? t.accent : t.textSecondary,
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: prop === 'Component' ? t.accent : t.textTertiary, flexShrink: 0 }} />
          {prop}
        </div>
      ))}
    </div>
  )
}
