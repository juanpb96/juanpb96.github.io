import { tokens } from '../../tokens'

export function CodePanel() {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${tokens.spacing[24]}px`,
        right: '60px',
        width: '320px',
        borderRadius: `${tokens.radius.md}px`,
        backgroundColor: '#0d1117',
        border: `1px solid ${tokens.colors.borderStrong}`,
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 80px rgba(77,156,248,0.08)',
        overflow: 'hidden',
        zIndex: 3,
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          padding: `12px ${tokens.spacing[16]}px`,
          borderBottom: `1px solid ${tokens.colors.border}`,
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
        }}
      >
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        <span style={{ marginLeft: `${tokens.spacing[8]}px`, fontSize: '11px', color: tokens.colors.textTertiary, fontFamily: tokens.fonts.mono }}>ButtonProps.tsx</span>
      </div>
      {/* Code */}
      <div style={{ padding: `${tokens.spacing[20]}px`, fontFamily: tokens.fonts.mono, fontSize: '12px', lineHeight: 1.7 }}>
        <div><span style={{ color: '#ff79c6' }}>interface</span> <span style={{ color: '#8be9fd' }}>ButtonProps</span> <span style={{ color: '#f8f8f2' }}>{'{'}</span></div>
        <div style={{ paddingLeft: `${tokens.spacing[16]}px` }}>
          <div><span style={{ color: '#f8f8f2' }}>label</span><span style={{ color: '#ff79c6' }}>:</span> <span style={{ color: '#8be9fd' }}>string</span><span style={{ color: '#f8f8f2' }}>;</span></div>
          <div><span style={{ color: '#f8f8f2' }}>onClick</span><span style={{ color: '#ff79c6' }}>:</span> <span style={{ color: '#8be9fd' }}>{'() => void'}</span><span style={{ color: '#f8f8f2' }}>;</span></div>
          <div><span style={{ color: '#f8f8f2' }}>variant</span><span style={{ color: '#ff79c6' }}>?:</span> <span style={{ color: '#f1fa8c' }}>"primary"</span> <span style={{ color: '#ff79c6' }}>|</span> <span style={{ color: '#f1fa8c' }}>"ghost"</span><span style={{ color: '#f8f8f2' }}>;</span></div>
          <div><span style={{ color: '#f8f8f2' }}>disabled</span><span style={{ color: '#ff79c6' }}>?:</span> <span style={{ color: '#8be9fd' }}>boolean</span><span style={{ color: '#f8f8f2' }}>;</span></div>
        </div>
        <div><span style={{ color: '#f8f8f2' }}>{'}'}</span></div>
        <div style={{ marginTop: '12px' }}>
          <span style={{ color: '#ff79c6' }}>export default function</span> <span style={{ color: '#50fa7b' }}>Button</span><span style={{ color: '#f8f8f2' }}>{'('}</span>
        </div>
        <div style={{ paddingLeft: `${tokens.spacing[16]}px` }}><span style={{ color: '#f8f8f2' }}>{'{ label, onClick, variant = "primary" }'}</span></div>
        <div><span style={{ color: '#f8f8f2' }}>{')'} </span><span style={{ color: '#ff79c6' }}>{'{'}</span></div>
        <div style={{ paddingLeft: `${tokens.spacing[16]}px`, color: tokens.colors.textTertiary }}>{'// ...'}</div>
      </div>
    </div>
  )
}
