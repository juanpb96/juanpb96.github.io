import { useState, useEffect } from 'react'

// ─── Design tokens (mirrors CSS custom properties) ───────────────────────────
const t = {
  bg: '#0a0b0d',
  surface: '#111316',
  surfaceRaised: '#16191f',
  border: 'rgba(255,255,255,0.07)',
  borderStrong: 'rgba(255,255,255,0.13)',
  textPrimary: '#eef0f4',
  textSecondary: '#8b909a',
  textTertiary: '#4a4f5a',
  accent: '#4d9cf8',
  accentDim: 'rgba(77,156,248,0.18)',
  accentGlow: 'rgba(77,156,248,0.10)',
  fontDisplay: "'Instrument Sans', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        height: '64px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: scrolled ? 'rgba(10,11,13,0.85)' : 'transparent',
        borderBottom: scrolled ? `1px solid ${t.border}` : '1px solid transparent',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Monogram */}
      <div
        style={{
          fontFamily: t.fontDisplay,
          fontWeight: 700,
          fontSize: '18px',
          letterSpacing: '-0.02em',
          color: t.textPrimary,
        }}
      >
        JB
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '32px' }}>
        {['Projects', 'Experience', 'Contact'].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            style={{
              color: t.textSecondary,
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.01em',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = t.textPrimary)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = t.textSecondary)}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Available badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '999px',
          border: `1px solid ${t.borderStrong}`,
          backgroundColor: t.surface,
          fontSize: '13px',
          color: t.textSecondary,
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#34d399',
            boxShadow: '0 0 6px rgba(52,211,153,0.6)',
          }}
        />
        Available for work
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function CodePanel() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '24px',
        right: '60px',
        width: '320px',
        borderRadius: '16px',
        backgroundColor: '#0d1117',
        border: `1px solid ${t.borderStrong}`,
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 80px rgba(77,156,248,0.08)',
        overflow: 'hidden',
        zIndex: 3,
      }}
    >
      {/* Window chrome */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: `1px solid ${t.border}`,
          display: 'flex',
          gap: '6px',
          alignItems: 'center',
        }}
      >
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        <span style={{ marginLeft: '8px', fontSize: '11px', color: t.textTertiary, fontFamily: t.fontMono }}>ButtonProps.tsx</span>
      </div>
      {/* Code */}
      <div style={{ padding: '20px', fontFamily: t.fontMono, fontSize: '12px', lineHeight: 1.7 }}>
        <div><span style={{ color: '#ff79c6' }}>interface</span> <span style={{ color: '#8be9fd' }}>ButtonProps</span> <span style={{ color: '#f8f8f2' }}>{'{'}</span></div>
        <div style={{ paddingLeft: '16px' }}>
          <div><span style={{ color: '#f8f8f2' }}>label</span><span style={{ color: '#ff79c6' }}>:</span> <span style={{ color: '#8be9fd' }}>string</span><span style={{ color: '#f8f8f2' }}>;</span></div>
          <div><span style={{ color: '#f8f8f2' }}>onClick</span><span style={{ color: '#ff79c6' }}>:</span> <span style={{ color: '#8be9fd' }}>{'() => void'}</span><span style={{ color: '#f8f8f2' }}>;</span></div>
          <div><span style={{ color: '#f8f8f2' }}>variant</span><span style={{ color: '#ff79c6' }}>?:</span> <span style={{ color: '#f1fa8c' }}>"primary"</span> <span style={{ color: '#ff79c6' }}>|</span> <span style={{ color: '#f1fa8c' }}>"ghost"</span><span style={{ color: '#f8f8f2' }}>;</span></div>
          <div><span style={{ color: '#f8f8f2' }}>disabled</span><span style={{ color: '#ff79c6' }}>?:</span> <span style={{ color: '#8be9fd' }}>boolean</span><span style={{ color: '#f8f8f2' }}>;</span></div>
        </div>
        <div><span style={{ color: '#f8f8f2' }}>{'}'}</span></div>
        <div style={{ marginTop: '12px' }}>
          <span style={{ color: '#ff79c6' }}>export default function</span> <span style={{ color: '#50fa7b' }}>Button</span><span style={{ color: '#f8f8f2' }}>{'('}</span>
        </div>
        <div style={{ paddingLeft: '16px' }}><span style={{ color: '#f8f8f2' }}>{'{ label, onClick, variant = "primary" }'}</span></div>
        <div><span style={{ color: '#f8f8f2' }}>{')'} </span><span style={{ color: '#ff79c6' }}>{'{'}</span></div>
        <div style={{ paddingLeft: '16px', color: t.textTertiary }}>{'// ...'}</div>
      </div>
    </div>
  )
}

function DesignPanel() {
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

function AccessibilityPanel() {
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

function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '0 48px',
        paddingTop: '64px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Architectural grid */}
      <div
        className="grid-texture"
        style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }}
      />

      {/* Blue ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77,156,248,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Left: Text */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '560px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '999px',
            border: `1px solid ${t.borderStrong}`,
            backgroundColor: t.surface,
            fontSize: '12px',
            color: t.textSecondary,
            fontFamily: t.fontMono,
            marginBottom: '32px',
            letterSpacing: '0.06em',
          }}
        >
          <span style={{ color: t.accent }}>◆</span> Design Exploration · 1440px
        </div>

        <h1
          style={{
            fontFamily: t.fontDisplay,
            fontWeight: 700,
            fontSize: 'clamp(56px, 6vw, 88px)',
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
            color: t.textPrimary,
            margin: '0 0 8px 0',
          }}
        >
          Juan Bo
        </h1>
        <h2
          style={{
            fontFamily: t.fontDisplay,
            fontWeight: 600,
            fontSize: 'clamp(32px, 4vw, 52px)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: t.textPrimary,
            margin: '0 0 20px 0',
          }}
        >
          Front-End Developer
        </h2>

        <p
          style={{
            fontSize: '18px',
            color: t.textSecondary,
            marginBottom: '12px',
            letterSpacing: '0.02em',
          }}
        >
          React · TypeScript · Accessible Interfaces
        </p>

        <p
          style={{
            fontSize: '16px',
            color: t.textSecondary,
            lineHeight: 1.7,
            maxWidth: '420px',
            marginBottom: '40px',
          }}
        >
          I build web interfaces where design, code, and accessibility meet in perfect balance.
        </p>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a
            href="#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '13px 28px',
              borderRadius: '12px',
              border: `1px solid ${t.borderStrong}`,
              backgroundColor: 'transparent',
              color: t.textPrimary,
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: 500,
              fontFamily: t.fontDisplay,
              transition: 'background-color 0.2s, border-color 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = t.accentDim
              el.style.borderColor = t.accent
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = 'transparent'
              el.style.borderColor = t.borderStrong
            }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            style={{
              fontSize: '15px',
              color: t.textSecondary,
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = t.textPrimary)}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = t.textSecondary)}
          >
            Get in touch →
          </a>
        </div>
      </div>

      {/* Right: Floating Panels */}
      <div style={{ position: 'relative', height: '520px', zIndex: 2 }}>
        <CodePanel />
        <DesignPanel />
        <AccessibilityPanel />
      </div>
    </section>
  )
}

// ─── Selected Work ────────────────────────────────────────────────────────────
function DashboardMockup() {
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

function LayerStackMockup({ label }: { label: string }) {
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

function ProjectCard({
  number,
  title,
  description,
  tags,
  large,
}: {
  number: string
  title: string
  description: string
  tags: string[]
  large?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        backgroundColor: t.surface,
        border: `1px solid ${hovered ? t.borderStrong : t.border}`,
        padding: large ? '32px' : '24px',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? `0 0 40px ${t.accentGlow}` : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        height: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
        <span style={{ fontFamily: t.fontMono, fontSize: '13px', color: t.textTertiary }}>{number}</span>
        <h3
          style={{
            fontFamily: t.fontDisplay,
            fontWeight: 700,
            fontSize: large ? '28px' : '22px',
            letterSpacing: '-0.02em',
            color: t.textPrimary,
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>

      {/* Mockup */}
      {large ? <DashboardMockup /> : <LayerStackMockup label={title} />}

      {/* Description */}
      <p style={{ fontSize: '14px', color: t.textSecondary, margin: 0, lineHeight: 1.6 }}>{description}</p>

      {/* Tags + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '4px 10px',
                borderRadius: '999px',
                border: `1px solid ${t.border}`,
                backgroundColor: 'rgba(255,255,255,0.03)',
                fontSize: '11px',
                color: t.textSecondary,
                fontFamily: t.fontMono,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <span style={{ color: t.accent, fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>View →</span>
      </div>
    </div>
  )
}

function WorkSection() {
  return (
    <section
      id="projects"
      style={{
        padding: '120px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid texture */}
      <div
        className="grid-texture"
        style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div style={{ marginBottom: '64px' }}>
          <div
            style={{
              fontFamily: t.fontMono,
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: t.textTertiary,
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Architectural Grid Exhibition · 3
          </div>
          <h2
            style={{
              fontFamily: t.fontDisplay,
              fontWeight: 700,
              fontSize: 'clamp(40px, 5vw, 72px)',
              letterSpacing: '-0.03em',
              color: t.textPrimary,
              margin: 0,
            }}
          >
            Selected Work
          </h2>
        </div>

        {/* Asymmetric grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto auto',
            gap: '24px',
          }}
        >
          {/* Large feature project */}
          <div style={{ gridRow: '1 / 3' }}>
            <ProjectCard
              number="01"
              title="Space Tourism Dashboard"
              description="Enterprise analytics platform built with React and TypeScript. 250K+ monthly active users. Reduced bundle size by 35% through aggressive code splitting."
              tags={['React', 'TypeScript', 'Recharts', 'RTK Query']}
              large
            />
          </div>

          {/* Two smaller projects */}
          <ProjectCard
            number="02"
            title="Flux Web Kit"
            description="Open-source component library with 60+ accessible components. Storybook docs, full ARIA compliance, 4.2k GitHub stars."
            tags={['Storybook', 'Radix UI', 'Tailwind']}
          />
          <ProjectCard
            number="03"
            title="Component Studio"
            description="Visual design system builder. Drag-and-drop interface for composing and exporting React components with live code preview."
            tags={['Next.js', 'Framer Motion', 'AST']}
          />
        </div>
      </div>
    </section>
  )
}

// ─── Experience ───────────────────────────────────────────────────────────────
const experiences = [
  {
    role: 'Senior Frontend Engineer',
    company: 'Acme Studio',
    period: '2023 — Present',
    location: 'Remote',
    description: 'Building modern web platforms and design systems focused on accessibility, performance, and developer experience.',
    achievements: [
      'Developed scalable component libraries.',
      'Improved Lighthouse performance score to 98+.',
      'Reduced bundle size by 35%.',
      'Collaborated closely with UX and Product teams.',
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'Accessibility', 'Storybook'],
    active: true,
  },
  {
    role: 'Frontend Developer',
    company: 'Flux Digital',
    period: '2021 — 2023',
    location: 'Madrid, Spain',
    description: 'Designed and implemented enterprise dashboards and internal platforms with a focus on maintainability.',
    achievements: [
      'Built reusable UI architecture.',
      'Migrated legacy applications.',
      'Improved Core Web Vitals.',
      'Introduced automated testing.',
    ],
    tags: ['React', 'Redux', 'Jest', 'Tailwind'],
    active: false,
  },
  {
    role: 'Junior Frontend Developer',
    company: 'Creative Labs',
    period: '2019 — 2021',
    location: 'Barcelona',
    description: 'Started career building consumer-facing web products. Focused on responsive layout and cross-browser compatibility.',
    achievements: [
      'Shipped 12 production features.',
      'Established CSS architecture conventions.',
      'Mentored two intern developers.',
      'Achieved 100% accessibility audit pass rate.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Sass'],
    active: false,
  },
]

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const active = exp.active || hovered

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        border: `1px solid ${active ? 'rgba(77,156,248,0.3)' : t.border}`,
        backgroundColor: active ? '#111620' : t.surface,
        padding: '28px 32px',
        transition: 'all 0.3s ease',
        boxShadow: active ? `0 0 40px rgba(77,156,248,0.08), inset 0 1px 0 rgba(77,156,248,0.1)` : 'none',
        position: 'relative',
      }}
    >
      {/* Role header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Company avatar */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: t.surfaceRaised,
              border: `1px solid ${t.borderStrong}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: t.fontDisplay,
              fontWeight: 700,
              fontSize: '14px',
              color: active ? t.accent : t.textSecondary,
              flexShrink: 0,
            }}
          >
            {exp.company[0]}
          </div>
          <div>
            <div
              style={{
                fontFamily: t.fontDisplay,
                fontWeight: 600,
                fontSize: '16px',
                color: t.textPrimary,
                marginBottom: '2px',
              }}
            >
              {exp.role}
            </div>
            <div style={{ fontSize: '13px', color: t.textSecondary }}>
              {exp.company} · <span style={{ fontFamily: t.fontMono, fontSize: '12px' }}>{exp.period}</span>
            </div>
          </div>
        </div>
        <span
          style={{
            fontSize: '12px',
            color: t.textTertiary,
            fontFamily: t.fontMono,
            whiteSpace: 'nowrap',
          }}
        >
          {exp.location}
        </span>
      </div>

      {/* Description + achievements */}
      <p style={{ fontSize: '14px', color: t.textSecondary, lineHeight: 1.7, marginBottom: '16px', margin: '0 0 16px 0' }}>
        {exp.description}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '20px' }}>
        {exp.achievements.map((a) => (
          <div key={a} style={{ fontSize: '13px', color: t.textSecondary, display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <span style={{ color: active ? t.accent : t.textTertiary, marginTop: '2px', flexShrink: 0 }}>·</span>
            {a}
          </div>
        ))}
      </div>

      {/* Tags + CTA */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {exp.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '3px 10px',
                borderRadius: '999px',
                border: `1px solid ${active ? 'rgba(77,156,248,0.25)' : t.border}`,
                backgroundColor: active ? 'rgba(77,156,248,0.08)' : 'rgba(255,255,255,0.03)',
                fontSize: '11px',
                color: active ? t.accent : t.textSecondary,
                fontFamily: t.fontMono,
                transition: 'all 0.3s',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        {exp.active && (
          <a
            href="#projects"
            style={{ color: t.accent, fontSize: '13px', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            View Projects →
          </a>
        )}
      </div>
    </div>
  )
}

function ExperienceSection() {
  return (
    <section
      id="experience"
      style={{ padding: '120px 48px', position: 'relative' }}
    >
      {/* Vertical separator line */}
      <div
        style={{
          position: 'absolute',
          left: 'calc(48px + 340px)',
          top: '120px',
          bottom: '120px',
          width: '1px',
          backgroundColor: t.border,
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '80px', alignItems: 'start' }}>
        {/* Left: sticky label */}
        <div style={{ position: 'sticky', top: '96px' }}>
          <div
            style={{
              fontFamily: t.fontMono,
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: t.textTertiary,
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Professional Journey
          </div>
          <h2
            style={{
              fontFamily: t.fontDisplay,
              fontWeight: 700,
              fontSize: 'clamp(40px, 4vw, 64px)',
              letterSpacing: '-0.03em',
              color: t.textPrimary,
              margin: '0 0 20px 0',
              lineHeight: 1.05,
            }}
          >
            Experience
          </h2>
          <p style={{ fontSize: '15px', color: t.textSecondary, lineHeight: 1.7, margin: 0 }}>
            Building accessible, scalable and high-performance digital products through thoughtful engineering and user-centered design.
          </p>

          {/* Timeline dots */}
          <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: '5px',
                top: '6px',
                bottom: '6px',
                width: '1px',
                backgroundColor: t.border,
              }}
            />
            {experiences.map((exp, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0', position: 'relative' }}>
                <div
                  style={{
                    width: '11px',
                    height: '11px',
                    borderRadius: '50%',
                    backgroundColor: i === 0 ? t.accent : t.surface,
                    border: `1px solid ${i === 0 ? t.accent : t.borderStrong}`,
                    boxShadow: i === 0 ? `0 0 12px ${t.accent}` : 'none',
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                />
                <div>
                  <div style={{ fontSize: '13px', color: i === 0 ? t.textPrimary : t.textSecondary, fontWeight: i === 0 ? 500 : 400 }}>{exp.company}</div>
                  <div style={{ fontSize: '11px', color: t.textTertiary, fontFamily: t.fontMono }}>{exp.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactCard({
  icon,
  title,
  subtitle,
  href,
}: {
  icon: string
  title: string
  subtitle: string
  href: string
}) {
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

function Sparkle() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 0 L17.5 14.5 L32 16 L17.5 17.5 L16 32 L14.5 17.5 L0 16 L14.5 14.5 Z"
        fill={t.textTertiary}
        opacity="0.6"
      />
    </svg>
  )
}

function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        padding: '120px 48px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid texture */}
      <div
        className="grid-texture"
        style={{ position: 'absolute', inset: 0, opacity: 0.2, pointerEvents: 'none' }}
      />

      {/* Blue ambient blob */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '20%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77,156,248,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left */}
        <div>
          <div
            style={{
              fontFamily: t.fontMono,
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: t.textTertiary,
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            Get in Touch
          </div>
          <h2
            style={{
              fontFamily: t.fontDisplay,
              fontWeight: 700,
              fontSize: 'clamp(36px, 4.5vw, 64px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: t.textPrimary,
              margin: '0 0 24px 0',
            }}
          >
            Let's create something exceptional.
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: t.textSecondary,
              lineHeight: 1.7,
              marginBottom: '40px',
              maxWidth: '420px',
            }}
          >
            If you'd like to discuss a project, collaborate, or simply say hello, feel free to reach out through any of the channels below.
          </p>
          <a
            href="mailto:hello@juanbo.dev"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 32px',
              borderRadius: '12px',
              backgroundColor: t.textPrimary,
              color: t.bg,
              textDecoration: 'none',
              fontFamily: t.fontDisplay,
              fontWeight: 600,
              fontSize: '15px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#c8d4e8')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = t.textPrimary)}
          >
            Send an Email →
          </a>
        </div>

        {/* Right: Contact cards + decorative elements */}
        <div style={{ position: 'relative' }}>
          {/* Decorative floating shape */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-20px',
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              border: `1px solid ${t.borderStrong}`,
              backgroundColor: 'rgba(77,156,248,0.05)',
              backdropFilter: 'blur(8px)',
              transform: 'rotate(15deg)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
            <ContactCard
              icon="✉"
              title="Email"
              subtitle="The best way to reach me directly."
              href="mailto:hello@juanbo.dev"
            />
            <ContactCard
              icon="in"
              title="LinkedIn"
              subtitle="Connect and follow my professional journey."
              href="https://linkedin.com"
            />
            <ContactCard
              icon="◎"
              title="GitHub"
              subtitle="Explore my projects and open-source work."
              href="https://github.com"
            />
          </div>

          {/* Sparkle decoration */}
          <div style={{ position: 'absolute', bottom: '-24px', right: '0' }}>
            <Sparkle />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        padding: '24px 48px',
        borderTop: `1px solid ${t.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '13px',
        color: t.textTertiary,
      }}
    >
      <span>© 2026 Juan Bo</span>
      <span>
        Designed & Developed by{' '}
        <span style={{ color: t.textSecondary }}>Juan Bo</span>
        {' '}❤{' '}
        React · TypeScript · Next.js
      </span>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ backgroundColor: t.bg, minHeight: '100vh' }}>
      <Nav />
      <HeroSection />

      {/* Section divider */}
      <div style={{ height: '1px', backgroundColor: t.border, margin: '0 48px' }} />

      <WorkSection />

      {/* Section divider */}
      <div style={{ height: '1px', backgroundColor: t.border, margin: '0 48px' }} />

      <ExperienceSection />

      {/* Section divider */}
      <div style={{ height: '1px', backgroundColor: t.border, margin: '0 48px' }} />

      <ContactSection />
      <Footer />
    </div>
  )
}
