import { t } from '../../tokens'

interface LayerStackMockupProps {
  label: string
}

export function LayerStackMockup({ label }: LayerStackMockupProps) {
  return (
    <div style={{ position: 'relative', height: '120px', marginBottom: '8px' }}>
      {[3, 2, 1, 0].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${i * 8}px`,
            top: `${i * 8}px`,
            right: `${-i * 8}px`,
            height: '90px',
            borderRadius: '10px',
            backgroundColor: i === 0 ? '#1e2530' : `rgba(30,37,48,${0.6 - i * 0.15})`,
            border: `1px solid rgba(255,255,255,${0.12 - i * 0.02})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontFamily: t.fontDisplay,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: i === 0 ? t.textPrimary : t.textTertiary,
          }}
        >
          {i === 0 ? label : ''}
        </div>
      ))}
    </div>
  )
}
