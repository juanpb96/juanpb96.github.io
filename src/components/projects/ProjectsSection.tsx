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
        paddingTop: "clamp(64px, 10vw, 120px)",
        paddingBottom: "clamp(64px, 10vw, 120px)",
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
            fontFamily: tokens.fonts.display,
            fontWeight: 700,
            fontSize: `clamp(${tokens.typography.sectionTitle.sizeMobile}, 5vw, ${tokens.typography.sectionTitle.size})`,
            letterSpacing: "-0.03em",
            color: tokens.colors.textPrimary,
            margin: "0 0 clamp(32px, 6vw, 64px) 0",
            lineHeight: 1.05,
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
            margin: `clamp(48px, 8vw, 80px) 0 ${tokens.spacing[16]}px`,
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
