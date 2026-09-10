import { tokens } from '../../tokens'

interface LayerStackMockupProps {
  label: string
}

export function LayerStackMockup({ label }: LayerStackMockupProps) {
  return (
    <div className="hidden md:block" style={{ position: 'relative', height: `${tokens.spacing[120]}px`, marginBottom: `${tokens.spacing[8]}px` }}>
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
            fontFamily: tokens.fonts.display,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: i === 0 ? tokens.colors.textPrimary : tokens.colors.textTertiary,
          }}
        >
          {i === 0 ? label : ''}
        </div>
      ))}
    </div>
  )
}
