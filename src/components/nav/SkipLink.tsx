import { tokens } from "../../tokens"

import { moveFocus } from "../../utils/moveFocus"

export const MAIN_CONTENT_ID = "main-content"

// First focusable element on the page. Visually hidden until focused (see
// .skip-link in index.css), then shown above the fixed nav. Rendered as a
// sibling of <Nav />, so the mobile overlay's inert background covers it too.
export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="skip-link left-container-mobile md:left-container-desktop"
      onClick={() => moveFocus(document.getElementById(MAIN_CONTENT_ID))}
      style={{
        position: "fixed",
        top: `${tokens.spacing[8]}px`,
        zIndex: tokens.zIndex.skipLink,
        display: "inline-flex",
        alignItems: "center",
        minHeight: "44px",
        padding: `0 ${tokens.spacing[16]}px`,
        borderRadius: `${tokens.radius.sm}px`,
        fontFamily: tokens.typography.navigation.font,
        fontSize: `${tokens.typography.navigation.size}px`,
        fontWeight: tokens.typography.navigation.weight,
        lineHeight: tokens.typography.navigation.lineHeight,
        letterSpacing: tokens.typography.navigation.letterSpacing,
      }}
    >
      Skip to main content
    </a>
  )
}
