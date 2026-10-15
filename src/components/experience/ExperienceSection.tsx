import { useRef, useState } from "react"

import { experiences, isCurrentExperience } from "../../data/experiences"
import { tokens } from "../../tokens"
import { moveFocus } from "../../utils/moveFocus"
import { WeightTransitionText } from "../shared/WeightTransitionText"
import { SELECTED_RING } from "../shared/selectedRing"
import { ExperienceCard } from "./ExperienceCard"
import { SoftHyphenWord } from "../shared/SoftHyphenWord"

// Created once and reused: the MediaQueryList's .matches stays live, so
// hover handlers skip a matchMedia call per event while still reflecting a
// pointer change (e.g. a mouse connected to a tablet mid-session).
let hoverPointerQuery: MediaQueryList | undefined

function supportsHoverPointer() {
  if (typeof window === "undefined") return false

  hoverPointerQuery ??= window.matchMedia("(hover: hover) and (pointer: fine)")

  return hoverPointerQuery.matches
}

export function ExperienceSection() {
  // Hover is transient (fine-pointer only, per the media-query gating used for
  // conditional hover styles elsewhere in the site). A click/tap/keyboard
  // activation pins the selection so it survives the mouseleave that scrolling
  // to a card can trigger when the pointer ends up over different content.
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleMouseEnter = (i: number) => {
    if (supportsHoverPointer()) setHoverIndex(i)
  }

  const handleMouseLeave = (i: number) => {
    if (supportsHoverPointer())
      setHoverIndex((prev) => (prev === i ? null : prev))
  }

  const pinIndex = (i: number) => setPinnedIndex(i)

  const handleActivate = (i: number) => {
    pinIndex(i)

    // No explicit behavior: it follows html { scroll-behavior }, which is
    // smooth by default and auto under prefers-reduced-motion.
    const card = cardRefs.current[i]

    card?.scrollIntoView({ block: "start" })

    // Continue the Tab order from the card (it's far below the stepper on
    // mobile). moveFocus uses preventScroll, so the scroll above stays the
    // only one and keeps its scroll-behavior.
    moveFocus(card ?? null)
  }

  return (
    <section
      id="experience"
      className="px-container-mobile md:px-container-desktop"
      style={{
        "--experience-gap": `clamp(${tokens.spacing[48]}px, 8vw, ${tokens.spacing[80]}px)`,
        paddingTop: `clamp(${tokens.spacing[64]}px, 10vw, ${tokens.spacing[120]}px)`,
        paddingBottom: `clamp(${tokens.spacing[64]}px, 10vw, ${tokens.spacing[120]}px)`,
        position: "relative",
      }}
    >
      {/* Grid texture. Unlike Projects/Contact, the section doesn't set
          overflow: hidden: that would break the sticky left column below,
          and the inset: 0 layer can't overflow anyway. */}
      <div
        className="grid-texture"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />

      {/* Vertical separator line, centered in the column gap: left padding
          (--spacing-container-desktop, 48px) + first column + half the gap. The first column is
          proportional (42%) in the md-mdlg range and a fixed 340px at mdlg+,
          matching the grid-cols breakpoints below exactly. Grid percentage
          tracks resolve against the full content box (section width minus
          2 × that padding, gap included). The gap is read from the same
          --experience-gap the grid uses, so the line follows its 8vw growth
          instead of assuming a fixed value. */}
      <div
        className="hidden md:block md:left-[calc(var(--spacing-container-desktop)_+_(100%_-_2_*_var(--spacing-container-desktop))_*_0.42_+_var(--experience-gap)_/_2)] mdlg:left-[calc(var(--spacing-container-desktop)_+_340px_+_var(--experience-gap)_/_2)]"
        style={{
          position: "absolute",
          top: `clamp(${tokens.spacing[64]}px, 10vw, ${tokens.spacing[120]}px)`,
          bottom: `clamp(${tokens.spacing[64]}px, 10vw, ${tokens.spacing[120]}px)`,
          width: "1px",
          transform: "translateX(-50%)",
          backgroundColor: tokens.colors.border,
          pointerEvents: "none",
        }}
      />

      <div
        className="grid grid-cols-1 md:grid-cols-[42%_1fr] mdlg:grid-cols-[340px_1fr]"
        style={{
          gap: "var(--experience-gap)",
          alignItems: "start",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left: sticky label */}
        <div className="md:sticky md:top-24">
          <h2
            style={{
              fontFamily: tokens.typography.sectionTitle.font,
              fontWeight: tokens.typography.sectionTitle.weight,
              fontSize: `clamp(${tokens.typography.sectionTitle.sizeMobile}, 5vw, ${tokens.typography.sectionTitle.size})`,
              letterSpacing: tokens.typography.sectionTitle.letterSpacing,
              color: tokens.colors.textPrimary,
              margin: `0 0 ${tokens.spacing[20]}px 0`,
              lineHeight: tokens.typography.sectionTitle.lineHeight,
            }}
          >
            <SoftHyphenWord>Ex&shy;pe&shy;ri&shy;ence</SoftHyphenWord>
          </h2>
          <p
            style={{
              fontFamily: tokens.typography.sectionIntro.font,
              fontSize: tokens.typography.sectionIntro.size,
              fontWeight: tokens.typography.sectionIntro.weight,
              lineHeight: tokens.typography.sectionIntro.lineHeight,
              color: tokens.colors.textSecondary,
              margin: 0,
              textWrap: "balance",
            }}
          >
            Building interfaces since 2021 across financial platforms, media,
            retail, and enterprise data tools, with a focus on pixel-perfect
            execution and accessibility as a practiced discipline, not an
            afterthought.
          </p>

          {/* Timeline dots */}
          <div
            style={{
              marginTop: `${tokens.spacing[48]}px`,
              display: "flex",
              flexDirection: "column",
              gap: "0",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "5px",
                top: "6px",
                bottom: "6px",
                width: "1px",
                backgroundColor: tokens.colors.border,
              }}
            />
            {experiences.map((exp, i) => {
              const isActive = isCurrentExperience(exp)
              const selected = hoverIndex === i || pinnedIndex === i
              const highlighted = isActive || selected
              const currentRoleId = `experience-current-role-${i}`

              return (
                <button
                  key={i}
                  type="button"
                  className="experience-stepper-item"
                  aria-label={`View ${exp.company} experience, ${exp.period}`}
                  aria-pressed={pinnedIndex === i}
                  aria-describedby={isActive ? currentRoleId : undefined}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={() => handleMouseLeave(i)}
                  onClick={() => handleActivate(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: `${tokens.spacing[16]}px`,
                    padding: "12px 0",
                    position: "relative",
                    width: "100%",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    font: "inherit",
                    color: "inherit",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: "11px",
                      height: "11px",
                      borderRadius: "50%",
                      backgroundColor: isActive
                        ? tokens.colors.accent
                        : tokens.colors.surface,
                      border: `1px solid ${
                        isActive
                          ? tokens.colors.accent
                          : selected
                            ? tokens.colors.accentBorder
                            : tokens.colors.borderStrong
                      }`,
                      boxShadow: isActive
                        ? `0 0 12px ${tokens.colors.accent}`
                        : selected
                          ? SELECTED_RING
                          : "none",
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                      zIndex: 1,
                    }}
                  />
                  <span>
                    <WeightTransitionText
                      active={highlighted}
                      color={tokens.colors.textSecondary}
                      activeColor={tokens.colors.textPrimary}
                      style={{
                        fontFamily: tokens.typography.label.font,
                        fontSize: tokens.typography.label.size,
                        lineHeight: tokens.typography.label.lineHeight,
                      }}
                    >
                      {exp.company}
                    </WeightTransitionText>
                    <span
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        color: highlighted
                          ? tokens.colors.textSecondary
                          : tokens.colors.textTertiary,
                        fontFamily: tokens.fonts.mono,
                        transition: "color 0.2s ease",
                      }}
                    >
                      {exp.period}
                    </span>
                  </span>
                  {isActive && (
                    <span id={currentRoleId} className="sr-only">
                      (current role)
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right: cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: `${tokens.spacing[20]}px`,
          }}
        >
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              exp={exp}
              isActive={isCurrentExperience(exp)}
              selected={hoverIndex === i || pinnedIndex === i}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              onClick={() => pinIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
