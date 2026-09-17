import { useRef, useState } from 'react'
import { experiences, isCurrentExperience } from '../../data/experiences'
import { tokens } from '../../tokens'
import { ExperienceCard } from './ExperienceCard'

function supportsHoverPointer() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
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
    if (supportsHoverPointer()) setHoverIndex((prev) => (prev === i ? null : prev))
  }

  const pinIndex = (i: number) => setPinnedIndex(i)

  const handleActivate = (i: number) => {
    pinIndex(i)
    cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="experience"
      className="px-container-mobile md:px-container-desktop"
      style={{ paddingTop: 'clamp(64px, 10vw, 120px)', paddingBottom: 'clamp(64px, 10vw, 120px)', position: 'relative' }}
    >
      {/* Vertical separator line — offset must track the grid's own column
          boundary: proportional (42%) in the md-mdlg range, fixed 340px at
          mdlg+, matching the grid-cols breakpoints below exactly. Grid
          percentage tracks resolve against the full content box (gap
          included), not the space left after the gap, hence no gap term here. */}
      <div
        className="hidden md:block md:left-[calc(48px_+_(100%_-_96px)_*_0.42)] mdlg:left-[calc(48px_+_340px)]"
        style={{
          position: 'absolute',
          top: 'clamp(64px, 10vw, 120px)',
          bottom: 'clamp(64px, 10vw, 120px)',
          width: '1px',
          backgroundColor: tokens.colors.border,
          pointerEvents: 'none',
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-[42%_1fr] mdlg:grid-cols-[340px_1fr]" style={{ gap: 'clamp(48px, 8vw, 80px)', alignItems: 'start' }}>
        {/* Left: sticky label */}
        <div className="md:sticky md:top-24">
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
            Experience
          </h2>
          <p style={{ fontSize: '15px', color: tokens.colors.textSecondary, lineHeight: 1.7, margin: 0 }}>
            Building accessible, scalable and high-performance digital products through thoughtful engineering and user-centered design.
          </p>

          {/* Timeline dots */}
          <div style={{ marginTop: `${tokens.spacing[48]}px`, display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: '5px',
                top: '6px',
                bottom: '6px',
                width: '1px',
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
                    display: 'flex',
                    alignItems: 'center',
                    gap: `${tokens.spacing[16]}px`,
                    padding: '12px 0',
                    position: 'relative',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    font: 'inherit',
                    color: 'inherit',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      width: '11px',
                      height: '11px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? tokens.colors.accent : tokens.colors.surface,
                      border: `1px solid ${isActive ? tokens.colors.accent : selected ? tokens.colors.accentBorder : tokens.colors.borderStrong}`,
                      boxShadow: isActive
                        ? `0 0 12px ${tokens.colors.accent}`
                        : selected
                          ? `inset 0 0 6px ${tokens.colors.accentGlow}, inset 0 0 0 1px ${tokens.colors.accentBorder}`
                          : 'none',
                      transition: 'all 0.2s ease',
                      flexShrink: 0,
                      zIndex: 1,
                    }}
                  />
                  <span>
                    {/* Google Fonts serves Instrument Sans 400/500 as separate static
                        faces (not a variable-font wght axis), so font-weight can't be
                        interpolated. Two stacked layers cross-fade via opacity instead,
                        for the same perceived smoothness as the color transition. */}
                    <span style={{ display: 'grid' }}>
                      <span
                        style={{
                          gridArea: '1 / 1',
                          fontSize: '14px',
                          fontWeight: 400,
                          color: tokens.colors.textSecondary,
                          opacity: highlighted ? 0 : 1,
                          transition: 'opacity 0.2s ease',
                        }}
                      >
                        {exp.company}
                      </span>
                      <span
                        aria-hidden="true"
                        style={{
                          gridArea: '1 / 1',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: tokens.colors.textPrimary,
                          opacity: highlighted ? 1 : 0,
                          transition: 'opacity 0.2s ease',
                        }}
                      >
                        {exp.company}
                      </span>
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '12px',
                        color: highlighted ? tokens.colors.textSecondary : tokens.colors.textTertiary,
                        fontFamily: tokens.fonts.mono,
                        transition: 'color 0.2s ease',
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing[20]}px` }}>
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
