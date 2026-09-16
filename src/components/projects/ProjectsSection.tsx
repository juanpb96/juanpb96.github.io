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
              margin: `0 0 ${tokens.spacing[20]}px 0`,
              lineHeight: 1.05,
            }}
          >
            Projects
          </h2>
          <p
            className="sm:max-w-[600px]"
            style={{ fontSize: '15px', color: tokens.colors.textSecondary, lineHeight: 1.7, margin: 0, textWrap: 'balance' }}
          >
            Showcasing the projects that best reflect my approach to structure, interaction, and accessibility in practice.
          </p>
        </div>

        {/* Asymmetric grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{
            gridTemplateRows: 'auto auto',
            gap: `${tokens.spacing[24]}px`,
          }}
        >
          {/* Large feature project */}
          <div className="row-span-1 lg:row-span-2">
            <ProjectCard
              number="01"
              title="Space Tourism Website"
              description="Multi-page space tourism site: home, destination, crew, and technology, with client-side routing and Storybook-driven component development. Animated with Framer Motion."
              tags={['React', 'TypeScript', 'Framer Motion', 'React Router', 'Storybook']}
              liveUrl="https://juanbonilla.me/FEM_space-tourism-website/home"
              githubUrl="https://github.com/juanpb96/FEM_space-tourism-website"
              large
            />
          </div>

          {/* Two smaller projects */}
          <ProjectCard
            number="02"
            title="GitHub User Search App"
            description="Look up any GitHub profile: repos, followers, bio, with light/dark theme support. Focused on accessible error handling."
            tags={['React', 'Redux', 'SCSS']}
            liveUrl="https://juanbonilla.me/FEM_github-user-search-app/"
            githubUrl="https://github.com/juanpb96/FEM_github-user-search-app"
            image={githubSearchHero}
            imageAlt="GitHub User Search App result card"
            mobileImageZoom
          />
          <ProjectCard
            number="03"
            title="Creative Agency Single Page Site"
            description="Branding agency landing page with layered visual design and an accessible image carousel, built with proper ARIA roles."
            tags={['HTML5', 'Tailwind', 'JavaScript']}
            liveUrl="https://juanbonilla.me/FEM_creative-single-page-site/"
            githubUrl="https://github.com/juanpb96/FEM_creative-single-page-site"
            image={creativeAgencyHero}
            imageAlt="Creative Agency site hero with headline and team photo"
          />
        </div>
      </div>
    </section>
  )
}
