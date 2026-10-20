import { forwardRef, useState } from "react"

import type { Experience } from "../../data/experiences"
import { tokens } from "../../tokens"
import { SELECTED_RING } from "../shared/selectedRing"

interface ExperienceCardProps {
  exp: Experience
  isActive: boolean
  selected: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

export const ExperienceCard = forwardRef<HTMLDivElement, ExperienceCardProps>(
  function ExperienceCard(
    { exp, isActive, selected, onMouseEnter, onMouseLeave, onClick },
    ref,
  ) {
    const highlighted = isActive || selected
    const [logoFailed, setLogoFailed] = useState(false)
    const showLogo = Boolean(exp.logo) && !logoFailed

    return (
      // Intentional a11y exception, not a gap: the onClick below only mirrors the side stepper's selection for mouse/touch. The stepper button (native <button>, aria-pressed, aria-label, focus-visible) is the sole keyboard entry point by design, since focus on the card has no action of its own beyond that visual mirror. The stepper moves focus here only as a Tab starting point (moveFocus), hence no focus ring (see .experience-card in src/index.css).
      <div // oxlint-disable-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        ref={ref}
        className="experience-card experience-highlight"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        style={{
          borderRadius: `${tokens.radius.lg}px`,
          border: `1px solid ${
            highlighted ? tokens.colors.accentBorder : tokens.colors.border
          }`,
          backgroundColor: highlighted
            ? tokens.colors.accentGlow
            : tokens.colors.surface,
          padding: `28px ${tokens.spacing[32]}px`,
          boxShadow: highlighted
            ? `0 0 40px ${tokens.colors.accentFaint}, inset 0 1px 0 ${tokens.colors.accentGlow}`
            : "none",
          position: "relative",
          // Adds to the html scroll-padding-top (--nav-height + 16px,
          // src/index.css), so the stepper's scrollIntoView lands the card
          // 4px lower than other scroll targets.
          scrollMarginTop: `${tokens.spacing[4]}px`,
        }}
      >
        {/* Role header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
            marginBottom: `${tokens.spacing[16]}px`,
          }}
        >
          {/* Company avatar */}
          <div
            className="experience-highlight"
            style={{
              width: "36px",
              height: "36px",
              padding: showLogo ? `${tokens.spacing[4]}px` : undefined,
              borderRadius: `${tokens.radius.sm}px`,
              backgroundColor: tokens.colors.surfaceRaised,
              border: `1px solid ${
                highlighted
                  ? tokens.colors.accentBorder
                  : tokens.colors.borderStrong
              }`,
              boxShadow: highlighted ? SELECTED_RING : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: tokens.fonts.display,
              fontWeight: 700,
              fontSize: "0.875rem",
              color: highlighted
                ? tokens.colors.accent
                : tokens.colors.textSecondary,
              flexShrink: 0,
            }}
          >
            {showLogo ? (
              <img
                src={exp.logo}
                alt=""
                onError={() => setLogoFailed(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            ) : (
              exp.company[0]
            )}
          </div>
          <div>
            {/* Real heading for the screen reader heading list, sitting under
                the section's h2. Tailwind's preflight already zeroes h3
                margins and makes size/weight inherit, so the inline values
                below fully define its look. */}
            <h3
              style={{
                fontFamily: tokens.fonts.display,
                fontWeight: 600,
                fontSize: "1rem",
                color: tokens.colors.textPrimary,
                margin: "0 0 2px 0",
              }}
            >
              {exp.role}
            </h3>
            <div
              style={{
                fontSize: "0.8125rem",
                color: tokens.colors.textSecondary,
                marginBottom: "2px",
              }}
            >
              {exp.company}
              {exp.formerName && ` (formerly ${exp.formerName})`}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: tokens.colors.textTertiary,
                fontFamily: tokens.fonts.mono,
              }}
            >
              {exp.period}
            </div>
          </div>
        </div>

        {/* Description + achievements */}
        <p
          style={{
            fontSize: "0.875rem",
            color: tokens.colors.textSecondary,
            lineHeight: 1.7,
            margin: `0 0 ${tokens.spacing[16]}px 0`,
          }}
        >
          {exp.description}
        </p>

        <div
          className="grid grid-cols-1"
          style={{
            gap: `${tokens.spacing[6]}px`,
            marginBottom: `${tokens.spacing[20]}px`,
          }}
        >
          {exp.achievements.map((a) => (
            <div
              key={a}
              style={{
                fontSize: "0.8125rem",
                color: tokens.colors.textSecondary,
                display: "flex",
                gap: `${tokens.spacing[8]}px`,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  color: highlighted
                    ? tokens.colors.accent
                    : tokens.colors.textTertiary,
                  marginTop: "2px",
                  flexShrink: 0,
                }}
              >
                ·
              </span>
              {a}
            </div>
          ))}
        </div>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: `${tokens.spacing[6]}px`,
            flexWrap: "wrap",
          }}
        >
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="experience-highlight"
              style={{
                padding: `${tokens.spacing[4]}px 10px`,
                borderRadius: `${tokens.radius.full}px`,
                border: `1px solid ${
                  highlighted
                    ? tokens.colors.accentBorder
                    : tokens.colors.border
                }`,
                backgroundColor: highlighted
                  ? tokens.colors.accentGlow
                  : tokens.colors.surfaceTint,
                fontFamily: tokens.typography.tag.font,
                fontSize: tokens.typography.tag.size,
                fontWeight: tokens.typography.tag.weight,
                color: highlighted
                  ? tokens.colors.accent
                  : tokens.colors.textSecondary,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    )
  },
)
