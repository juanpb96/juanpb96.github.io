import { tokens } from '../../tokens'
import creativeAgencyHero from '../../assets/projects/creative-agency-hero.webp'
import githubSearchHero from '../../assets/projects/github-search-hero.webp'
import { ProjectCard } from './ProjectCard'

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="px-container-mobile md:px-container-desktop"
      style={{
        paddingTop: 'clamp(64px, 10vw, 120px)',
        paddingBottom: 'clamp(64px, 10vw, 120px)',
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
        <div style={{ marginBottom: 'clamp(32px, 6vw, 64px)' }}>
          <h2
            style={{
              fontFamily: tokens.fonts.display,
              fontWeight: 700,
              fontSize: `clamp(${tokens.typography.sectionTitle.sizeMobile}px, 5vw, ${tokens.typography.sectionTitle.size}px)`,
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
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            gridTemplateRows: 'auto auto',
            gap: `${tokens.spacing[24]}px`,
          }}
        >
          {/* Large feature project */}
          <div className="row-span-1 md:row-span-2">
            <ProjectCard
              number="01"
              title="Space Tourism Website"
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
            image={githubSearchHero}
            imageAlt="GitHub User Search App result card"
          />
          <ProjectCard
            number="03"
            title="Component Studio"
            description="Visual design system builder. Drag-and-drop interface for composing and exporting React components with live code preview."
            tags={['Next.js', 'Framer Motion', 'AST']}
            image={creativeAgencyHero}
            imageAlt="Creative Agency site hero with headline and team photo"
          />
        </div>
      </div>
    </section>
  )
}
