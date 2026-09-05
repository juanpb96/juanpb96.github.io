import { t } from '../../tokens'

export function AccessibilityPanel() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '40px',
        right: '120px',
        width: '240px',
        borderRadius: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        padding: '20px',
        zIndex: 5,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '14px',
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#0a0b0d', fontFamily: t.fontDisplay }}>Accessibility Inspector</span>
        <span style={{ fontSize: '16px', color: '#9ca3af', cursor: 'pointer' }}>×</span>
      </div>
      {['WCAG AA', 'Keyboard Navigation', 'ARIA Labels', 'Color Contrast'].map((item) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: '#4d9cf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ color: '#fff', fontSize: '10px', lineHeight: 1 }}>✓</span>
          </div>
          <span style={{ fontSize: '13px', color: '#374151' }}>{item}</span>
        </div>
      ))}
    </div>
  )
}
