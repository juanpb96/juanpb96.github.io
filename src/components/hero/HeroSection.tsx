import { tokens } from "../../tokens"
import { ArrowRightIcon } from "../icons/ArrowRightIcon"
import { Button } from "../shared/Button"
import { TagList } from "../shared/TagList"
import { BuildProcessCard } from "./BuildProcessCard"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="grid grid-cols-1 items-center px-container-mobile md:px-container-desktop mdlg:min-h-screen mdlg:grid-cols-2"
      style={{
        // Columns sit apart beside each other at mdlg+; stacked below it, the
        // card follows the CTA at the same rhythm as the copy above.
        columnGap: "clamp(48px, 8vw, 80px)",
        rowGap: `${tokens.spacing[32]}px`,
        // The nav is fixed, so the top padding clears its height first.
        paddingTop: `calc(${tokens.spacing[64]}px + clamp(32px, 6vw, 64px))`,
        paddingBottom: "clamp(32px, 6vw, 64px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Architectural grid */}
      <div
        className="grid-texture"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Blue ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(77,156,248,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Left: Text */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "560px" }}>
        {/* One heading: the space between the spans keeps the accessible
            name "Juan Bonilla Front-End Engineer" rather than run together. */}
        <h1
          style={{
            fontFamily: tokens.typography.heroTitle.font,
            fontWeight: tokens.typography.heroTitle.weight,
            fontSize: `clamp(${tokens.typography.heroTitle.sizeMobile}, 6vw, ${tokens.typography.heroTitle.size})`,
            lineHeight: tokens.typography.heroTitle.lineHeight,
            letterSpacing: tokens.typography.heroTitle.letterSpacing,
            color: tokens.colors.textPrimary,
            margin: 0,
          }}
        >
          <span className="block">Juan Bonilla</span>{" "}
          <span className="block" style={{ color: tokens.colors.textTertiary }}>
            Front-End Engineer
          </span>
        </h1>

        <TagList
          tags={["React", "TypeScript", "AI-assisted workflow"]}
          variant="accent"
          style={{ marginTop: `${tokens.spacing[24]}px` }}
        />

        <p
          style={{
            fontFamily: tokens.typography.body.font,
            fontSize: tokens.typography.body.size,
            fontWeight: tokens.typography.body.weight,
            lineHeight: tokens.typography.body.lineHeight,
            letterSpacing: tokens.typography.body.letterSpacing,
            color: tokens.colors.textSecondary,
            maxWidth: "520px",
            margin: `${tokens.spacing[24]}px 0 ${tokens.spacing[32]}px`,
          }}
        >
          I build with Claude Code in the loop: it takes the boilerplate, I own
          the design decisions, the accessibility and the final review.
        </p>

        <Button variant="primary" href="#contact" className="w-full sm:w-auto">
          Get in touch
          <ArrowRightIcon className="button-arrow" />
        </Button>
      </div>

      {/* Right (mdlg+) / below: how the site is built */}
      <div
        className="w-full mdlg:max-w-[560px] mdlg:justify-self-end"
        style={{ position: "relative", zIndex: 2 }}
      >
        <BuildProcessCard />
      </div>
    </section>
  )
}
