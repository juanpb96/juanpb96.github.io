import { useId, useState, type CSSProperties } from "react"
import { tokens } from "../../tokens"
import { ChevronDownIcon } from "../icons/ChevronDownIcon"

const steps = [
  {
    label: "Clarify",
    description:
      "Most of the time goes here: who it's for, what it should say, which states it needs.",
  },
  {
    label: "Direct",
    description:
      "Claude Code drafts from a scoped brief. I review every output before it ships.",
  },
  {
    label: "Verify",
    description:
      "By hand on desktop and a real phone. Keyboard, accessibility tree, NVDA.",
  },
]

const reviewCatches = [
  { issue: "Primary CTA read as secondary", fix: "solid fill" },
  { issue: "Tertiary text below AA at small sizes", fix: "contrast raised" },
  {
    issue: "Menu open + resize to tablet locked the page",
    fix: "menu auto-closes",
  },
]

const TITLE = "How this site gets built"

// Stores the last toggled state; with nothing stored the card starts open.
const STORAGE_KEY = "hero-build-card-expanded"

function readStoredExpanded() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "false"
  } catch {
    return true
  }
}

// Same type as the active Experience stepper label.
const labelStyle: CSSProperties = {
  fontFamily: tokens.fonts.body,
  fontSize: "0.875rem",
  fontWeight: 500,
  color: tokens.colors.textPrimary,
}

const metaTagsStyle: CSSProperties = {
  fontFamily: tokens.typography.metaTags.font,
  fontSize: tokens.typography.metaTags.size,
  fontWeight: tokens.typography.metaTags.weight,
  lineHeight: tokens.typography.metaTags.lineHeight,
  letterSpacing: tokens.typography.metaTags.letterSpacing,
}

export function BuildProcessCard() {
  const [expanded, setExpanded] = useState(readStoredExpanded)
  const contentId = useId()

  const toggle = () => {
    const next = !expanded
    setExpanded(next)
    try {
      localStorage.setItem(STORAGE_KEY, String(next))
    } catch {
      // Storage unavailable (private mode, blocked): the toggle still works
      // for this visit, it just won't be remembered.
    }
  }

  return (
    <div
      style={{
        backgroundColor: tokens.colors.surface,
        border: `1px solid ${tokens.colors.border}`,
        borderRadius: `${tokens.radius.lg}px`,
      }}
    >
      {/* Collapsible below mdlg, where the card stacks under the intro and
          would push Projects down; always open beside it at mdlg+. */}
      <h2 style={{ ...labelStyle, margin: 0 }}>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          aria-controls={contentId}
          className="build-card-toggle flex w-full items-center justify-between px-6 py-5 mdlg:hidden"
        >
          {TITLE}
          <ChevronDownIcon
            style={{ transform: expanded ? "rotate(180deg)" : "none" }}
          />
        </button>
        <span className="hidden px-8 pt-8 mdlg:block">{TITLE}</span>
      </h2>

      <div
        id={contentId}
        className={`${
          expanded ? "grid" : "hidden"
        } gap-6 px-6 pb-6 md:grid-cols-2 mdlg:grid mdlg:grid-cols-1 mdlg:px-8 mdlg:pt-6 mdlg:pb-8`}
      >
        <div style={{ position: "relative" }}>
          {/* Rail, aligned to the dots like the Experience stepper's */}
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
          <ol
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: `${tokens.spacing[24]}px`,
            }}
          >
            {steps.map((step, index) => (
              <li
                key={step.label}
                style={{
                  display: "flex",
                  gap: `${tokens.spacing[16]}px`,
                  position: "relative",
                }}
              >
                {/* Dot in the Experience stepper's "selected" state */}
                <span
                  aria-hidden="true"
                  style={{
                    width: "11px",
                    height: "11px",
                    marginTop: "6px",
                    borderRadius: "50%",
                    backgroundColor: tokens.colors.surface,
                    border: `1px solid ${tokens.colors.accentBorder}`,
                    boxShadow: `inset 0 0 6px ${tokens.colors.accentGlow}, inset 0 0 0 1px ${tokens.colors.accentBorder}`,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <span style={{ ...labelStyle, display: "block" }}>
                    <span aria-hidden="true">
                      {String(index + 1).padStart(2, "0")} ·{" "}
                    </span>
                    {step.label}
                  </span>
                  <p
                    style={{
                      fontFamily: tokens.typography.body.font,
                      fontSize: tokens.typography.body.size,
                      fontWeight: tokens.typography.body.weight,
                      lineHeight: tokens.typography.body.lineHeight,
                      letterSpacing: tokens.typography.body.letterSpacing,
                      color: tokens.colors.textSecondary,
                      margin: `${tokens.spacing[4]}px 0 0`,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Code-block styled aside: the only mono text in the card */}
        <div
          className="self-start"
          style={{
            ...metaTagsStyle,
            backgroundColor: tokens.colors.bg,
            border: `1px solid ${tokens.colors.border}`,
            borderRadius: `${tokens.radius.md}px`,
            padding: `${tokens.spacing[20]}px`,
          }}
        >
          <h3
            style={{
              font: "inherit",
              color: tokens.colors.textTertiary,
              margin: `0 0 ${tokens.spacing[16]}px`,
            }}
          >
            caught in review
          </h3>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: `${tokens.spacing[8]}px`,
            }}
          >
            {reviewCatches.map(({ issue, fix }) => (
              <li
                key={issue}
                style={{
                  display: "flex",
                  gap: `${tokens.spacing[8]}px`,
                  color: tokens.colors.textSecondary,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{ color: tokens.colors.accent }}
                >
                  •
                </span>
                <span>
                  {issue}
                  {/* The arrow alone is in Inter: Google's JetBrains Mono
                      subsets don't include →, which would fall back to
                      Courier New. The spaces stay mono-width. */}
                  <span aria-hidden="true">
                    {" "}
                    <span style={{ fontFamily: tokens.fonts.body }}>
                      →
                    </span>{" "}
                  </span>
                  <span className="sr-only">, fixed with: </span>
                  <span style={{ color: tokens.colors.textPrimary }}>
                    {fix}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
