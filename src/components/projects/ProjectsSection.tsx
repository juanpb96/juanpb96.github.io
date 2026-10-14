import { projects } from "../../data/projects"
import { tokens } from "../../tokens"
import { ProjectCard } from "./ProjectCard"
import { SoftHyphenWord } from "../shared/SoftHyphenWord"

const formatNumber = (index: number) => String(index + 1).padStart(2, "0")

export function ProjectsSection() {
  const [featured, ...others] = projects

  return (
    <section
      id="projects"
      className="px-container-mobile md:px-container-desktop"
      style={{
        paddingTop: `clamp(${tokens.spacing[64]}px, 10vw, ${tokens.spacing[120]}px)`,
        paddingBottom: `clamp(${tokens.spacing[64]}px, 10vw, ${tokens.spacing[120]}px)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid texture */}
      <div
        className="grid-texture"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontFamily: tokens.typography.sectionTitle.font,
            fontWeight: tokens.typography.sectionTitle.weight,
            fontSize: `clamp(${tokens.typography.sectionTitle.sizeMobile}, 5vw, ${tokens.typography.sectionTitle.size})`,
            letterSpacing: tokens.typography.sectionTitle.letterSpacing,
            color: tokens.colors.textPrimary,
            margin: `0 0 clamp(${tokens.spacing[32]}px, 6vw, ${tokens.spacing[64]}px) 0`,
            lineHeight: tokens.typography.sectionTitle.lineHeight,
          }}
        >
          <SoftHyphenWord>Pro&shy;jects</SoftHyphenWord>
        </h2>

        <ProjectCard number={formatNumber(0)} project={featured} large />

        {/* Same type as an inactive Experience stepper label */}
        <p
          id="projects-also-built"
          style={{
            fontSize: "0.875rem",
            color: tokens.colors.textSecondary,
            margin: `clamp(${tokens.spacing[48]}px, 8vw, ${tokens.spacing[80]}px) 0 ${tokens.spacing[16]}px`,
          }}
        >
          Also built
        </p>
        <ul
          aria-labelledby="projects-also-built"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {/* A divider above each row, none after the last: it ends
              straight into the section's bottom padding, ahead of the
              SectionDivider. */}
          {others.map((project, index) => (
            <li
              key={project.title}
              className="py-6 last:pb-0"
              style={{ borderTop: `1px solid ${tokens.colors.border}` }}
            >
              <ProjectCard number={formatNumber(index + 1)} project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
