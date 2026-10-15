import { Fragment, useState, type CSSProperties } from "react"

import { tokens } from "../../tokens"

interface TagListProps {
  tags: string[]
  variant?: "neutral" | "accent"
  style?: CSSProperties
}

// Lists longer than this collapse to COLLAPSED_COUNT tags + a "+N" toggle
// below md, where a full row of pills would wrap into several lines.
const MAX_UNCOLLAPSED = 3
const COLLAPSED_COUNT = 2

const tagStyle: CSSProperties = {
  padding: `${tokens.spacing[4]}px 10px`,
  borderRadius: `${tokens.radius.full}px`,
  fontFamily: tokens.typography.tag.font,
  fontSize: tokens.typography.tag.size,
  fontWeight: tokens.typography.tag.weight,
}

const variantStyles = {
  neutral: {
    backgroundColor: tokens.colors.surfaceTint,
    border: `1px solid ${tokens.colors.border}`,
    color: tokens.colors.textSecondary,
  },
  accent: {
    backgroundColor: tokens.colors.accentGlow,
    border: `1px solid ${tokens.colors.accentBorder}`,
    color: tokens.colors.accent,
  },
} satisfies Record<string, CSSProperties>

export function TagList({ tags, variant = "neutral", style }: TagListProps) {
  const [expanded, setExpanded] = useState(false)
  const collapsible = tags.length > MAX_UNCOLLAPSED
  const hiddenCount = tags.length - COLLAPSED_COUNT

  return (
    <ul
      className="flex flex-wrap"
      style={{
        gap: `${tokens.spacing[8]}px`,
        listStyle: "none",
        margin: 0,
        padding: 0,
        ...style,
      }}
    >
      {tags.map((tag, index) => {
        const collapsed = collapsible && !expanded && index >= COLLAPSED_COUNT
        return (
          <Fragment key={tag}>
            {collapsible && index === COLLAPSED_COUNT && (
              <li className="flex md:hidden">
                <button
                  type="button"
                  onClick={() => setExpanded((prev) => !prev)}
                  aria-expanded={expanded}
                  className="tag-toggle"
                  style={{
                    ...tagStyle,
                    backgroundColor: variantStyles.neutral.backgroundColor,
                    cursor: "pointer",
                  }}
                >
                  {expanded ? (
                    <>
                      <span aria-hidden="true">−</span>
                      <span className="sr-only">Show fewer tags</span>
                    </>
                  ) : (
                    <>
                      {/* The space sits outside the sr-only span so every
                          name computation keeps it; as trailing whitespace
                          it doesn't widen the pill. */}
                      +{hiddenCount} <span className="sr-only">more tags</span>
                    </>
                  )}
                </button>
              </li>
            )}
            <li
              className={collapsed ? "hidden md:block" : undefined}
              style={{ ...tagStyle, ...variantStyles[variant] }}
            >
              {tag}
            </li>
          </Fragment>
        )
      })}
    </ul>
  )
}
