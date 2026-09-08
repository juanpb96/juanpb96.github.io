import { tokens } from '../../tokens'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{
        padding: `${tokens.spacing[120]}px ${tokens.container.paddingDesktop}px`,
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
        <div style={{ marginBottom: `${tokens.spacing[64]}px` }}>
          <div
            style={{
              fontFamily: tokens.fonts.mono,
              fontSize: '11px',
              letterSpacing: '0.14em',
              color: tokens.colors.textTertiary,
              textTransform: 'uppercase',
              marginBottom: `${tokens.spacing[16]}px`,
            }}
          >
            Architectural Grid Exhibition · 3
          </div>
          <h2
            style={{
              fontFamily: tokens.fonts.display,
              fontWeight: 700,
              fontSize: 'clamp(40px, 5vw, 72px)',
              letterSpacing: '-0.03em',
              color: tokens.colors.textPrimary,
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
            gap: `${tokens.spacing[24]}px`,
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
