import { useEffect, useId, useRef, useState, type CSSProperties } from "react"

import { createPortal } from "react-dom"

import { tokens } from "../../tokens"

import { moveFocus } from "../../utils/moveFocus"

import { ContentContainer } from "../layout/ContentContainer"

const links = ["Projects", "Experience", "Contact"]

const CLOSE_ANIMATION_MS = 260

// Must match the media query that gates the overlay animations in index.css.
const MOTION_OK_QUERY = "(prefers-reduced-motion: no-preference)"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  const [open, setOpen] = useState(false)

  const [closing, setClosing] = useState(false)

  // Overlay links whose entry animation has started (see nav-link-in). Until
  // then they're visibility: hidden (motion-allowed only; under reduced motion
  // they're always visible), so the focus trap must skip them. Tracked
  // from onAnimationStart rather than read back via getComputedStyle so the
  // trap doesn't depend on layout/animation support (e.g. jsdom in tests).
  const [revealedLinks, setRevealedLinks] = useState<ReadonlySet<number>>(
    () => new Set(),
  )

  const dialogId = useId()

  const navRef = useRef<HTMLElement>(null)

  const logoRef = useRef<HTMLAnchorElement>(null)

  const hamburgerRef = useRef<HTMLButtonElement>(null)

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  // Pending close timer. Its presence doubles as the "already closing" guard:
  // the keydown/breakpoint handlers are created once per open and would read a
  // stale `closing`, and a second timer could close a menu reopened meanwhile.
  const closeTimerRef = useRef<number | null>(null)

  // Where focus goes once the overlay unmounts; set by whoever closed it.
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)

    window.addEventListener("scroll", handler)

    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
      }
    },
    [],
  )

  const openMenu = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)

      closeTimerRef.current = null
    }

    setOpen(true)

    setClosing(false)

    // Links replay their entry animation on every open.
    setRevealedLinks(new Set())
  }

  const closeMenu = (restoreFocusTo: HTMLElement | null) => {
    if (closeTimerRef.current !== null) return

    restoreFocusRef.current = restoreFocusTo

    setClosing(true)

    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null

      setOpen(false)

      setClosing(false)
    }, CLOSE_ANIMATION_MS)
  }

  const toggleMenu = () => {
    if (open && !closing) {
      closeMenu(hamburgerRef.current)
    } else if (!open) {
      openMenu()
    }
  }

  useEffect(() => {
    if (!open) return

    const hamburgerButton = hamburgerRef.current

    // When motion is allowed, overlay links stay visibility: hidden until
    // their entry animation starts (see nav-link-in), and focus() on a hidden
    // element is a no-op, so the manual trap has to skip them too. Each link
    // carries data-revealed once it's visible (read from the DOM, as this
    // handler is created once per open and would otherwise see stale state).
    //
    // The entry animation is opt-in (index.css only applies it under
    // MOTION_OK_QUERY), so otherwise the links are visible from the start and
    // no animationstart ever fires: count them all as revealed. Checked on
    // every Tab so a preference change while open is picked up too.
    const getFocusables = (): HTMLElement[] => {
      const linksAnimate = window.matchMedia(MOTION_OK_QUERY).matches

      return [
        ...linkRefs.current.filter(
          (el) => !linksAnimate || el?.dataset.revealed !== undefined,
        ),
        logoRef.current,
        hamburgerRef.current,
      ].filter((el): el is HTMLAnchorElement | HTMLButtonElement => el !== null)
    }

    // Focus stays on the toggle, now the visible close (X) button, instead of
    // jumping into the links while they're still animating in; Tab reaches
    // the links once they start to appear. Set explicitly because some
    // browsers (e.g. Safari) don't focus a button on mouse click, which would
    // leave focus on <body>.
    hamburgerButton?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu(hamburgerButton)

        return
      }

      if (e.key !== "Tab") return

      const focusables = getFocusables()

      if (focusables.length === 0) return

      const active = document.activeElement

      const currentIndex =
        active instanceof HTMLElement ? focusables.indexOf(active) : -1

      const lastIndex = focusables.length - 1

      const nextIndex = e.shiftKey
        ? currentIndex <= 0
          ? lastIndex
          : currentIndex - 1
        : currentIndex === -1 || currentIndex === lastIndex
          ? 0
          : currentIndex + 1

      e.preventDefault()

      focusables[nextIndex]?.focus()
    }

    window.addEventListener("keydown", handleKeyDown)

    // The overlay is mobile-only (its toggle is md:hidden). If the viewport
    // crosses Tailwind's md breakpoint (48rem) while it's open, close it so
    // the overlay, scroll lock and inert background don't linger on desktop.
    // A CSS-only hide can't undo that JS-applied state, hence the listener.
    const desktopQuery = window.matchMedia("(min-width: 48rem)")

    // The toggle is hidden past the breakpoint, so hand focus to the logo,
    // the one nav control visible in both layouts.
    const handleBreakpointChange = (e: MediaQueryListEvent) => {
      if (e.matches) closeMenu(logoRef.current)
    }

    desktopQuery.addEventListener("change", handleBreakpointChange)

    document.body.style.overflow = "hidden"

    // Reinforce the trap: make everything outside Nav/overlay unreachable,
    // in case focus or assistive tech ever slips past the keydown handler.
    const backgroundSiblings = navRef.current?.parentElement
      ? Array.from(navRef.current.parentElement.children).filter(
          (el) => el !== navRef.current,
        )
      : []

    // Set as an attribute (not the inert property) so it's reflected in
    // the DOM everywhere, including jsdom in tests.
    backgroundSiblings.forEach((el) => {
      el.setAttribute("inert", "")
    })

    return () => {
      window.removeEventListener("keydown", handleKeyDown)

      desktopQuery.removeEventListener("change", handleBreakpointChange)

      document.body.style.overflow = ""

      backgroundSiblings.forEach((el) => {
        el.removeAttribute("inert")
      })

      // After the background is un-inerted, or focusing a section would fail.
      moveFocus(restoreFocusRef.current ?? hamburgerButton)

      restoreFocusRef.current = null
    }

    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const iconOpen = open && !closing

  const lineStyle = (index: number): CSSProperties => {
    const closedTop = [0, 8, 16][index]

    return {
      position: "absolute",
      left: 0,
      top: iconOpen ? "8px" : `${closedTop}px`,
      width: "24px",
      height: iconOpen ? "3px" : "2px",
      borderRadius: "2px",
      transform: iconOpen
        ? index === 0
          ? "rotate(45deg)"
          : index === 2
            ? "rotate(-45deg)"
            : "scaleX(0)"
        : "rotate(0deg)",
      opacity: iconOpen && index === 1 ? 0 : 1,
    }
  }

  return (
    <nav
      ref={navRef}
      className="site-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: tokens.zIndex.nav,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundColor: scrolled ? "rgba(10,11,13,0.85)" : "transparent",
        borderBottom: scrolled
          ? `1px solid ${tokens.colors.border}`
          : "1px solid transparent",
      }}
    >
      <ContentContainer>
        <div
          className="px-container-mobile md:px-container-desktop"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: `${tokens.spacing[64]}px`,
          }}
        >
          {/* Monogram */}
          <a
            ref={logoRef}
            href="#hero"
            className="nav-logo nav-tap-target"
            onClick={() => {
              if (open) closeMenu(logoRef.current)
            }}
            style={{
              fontFamily: tokens.fonts.display,
              fontWeight: 700,
              fontSize: "1.125rem",
              letterSpacing: "-0.02em",
            }}
          >
            JB
          </a>

          {/* Links */}
          <div
            className="hidden md:flex"
            style={{ gap: `${tokens.spacing[32]}px` }}
          >
            {links.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className="text-link"
                style={{
                  fontFamily: tokens.typography.navigation.font,
                  fontSize: tokens.typography.navigation.size,
                  fontWeight: tokens.typography.navigation.weight,
                  lineHeight: tokens.typography.navigation.lineHeight,
                  letterSpacing: tokens.typography.navigation.letterSpacing,
                }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Hamburger (mobile/tablet only) */}
          <button
            ref={hamburgerRef}
            type="button"
            className="md:hidden nav-hamburger nav-tap-target"
            aria-label={iconOpen ? "Close menu" : "Open menu"}
            aria-expanded={iconOpen}
            aria-controls={open ? dialogId : undefined}
            data-menu-open={open}
            onClick={toggleMenu}
            style={{
              position: "relative",
              width: "24px",
              height: "18px",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <span className="nav-hamburger-line" style={lineStyle(0)} />
            <span className="nav-hamburger-line" style={lineStyle(1)} />
            <span className="nav-hamburger-line" style={lineStyle(2)} />
          </button>
        </div>
      </ContentContainer>

      {/* Mobile nav overlay — portaled to body so it positions against the
          viewport, not the nav's own box (backdrop-filter on nav makes it a
          containing block for fixed descendants).

          Rendered as a non-modal <dialog open> rather than via showModal():
          a modal dialog would make the nav bar inert, but the logo and the
          hamburger/close button must stay reachable and inside the focus
          trap. Modality (focus trap, inert background, Escape) is therefore
          handled manually in the effect above. The declarative open
          attribute also skips show()'s built-in autofocus, so focus
          placement stays under our control.

          No aria-modal: the logo and close button live outside the dialog
          (in <nav>), and screen readers honouring aria-modal could then
          never reach "Close menu". The background is made inert instead. */}
      {open &&
        createPortal(
          <dialog
            open
            id={dialogId}
            aria-label="Site menu"
            className="nav-overlay"
            data-closing={closing}
            style={{
              position: "fixed",
              top: `${tokens.spacing[64]}px`,
              left: 0,
              right: 0,
              bottom: 0,
              // Reset UA <dialog> defaults (fit-content sizing, max sizes,
              // margin/padding/border, Canvas colors) so the overlay fills
              // the area defined by its offsets.
              width: "auto",
              height: "auto",
              maxWidth: "none",
              maxHeight: "none",
              margin: 0,
              padding: 0,
              border: "none",
              color: "inherit",
              zIndex: tokens.zIndex.overlay,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              backgroundColor: "rgba(10,11,13,0.85)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ul
              className="px-container-mobile md:px-container-desktop"
              style={{
                listStyle: "none",
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: `${tokens.spacing[32]}px`,
                width: "100%",
              }}
            >
              {links.map((label, index) => (
                <li key={label}>
                  <a
                    ref={(el) => {
                      linkRefs.current[index] = el
                    }}
                    href={`#${label.toLowerCase()}`}
                    className="nav-overlay-link"
                    data-revealed={
                      closing || revealedLinks.has(index) ? "" : undefined
                    }
                    onAnimationStart={() =>
                      setRevealedLinks((prev) =>
                        prev.has(index) ? prev : new Set(prev).add(index),
                      )
                    }
                    onClick={() =>
                      closeMenu(document.getElementById(label.toLowerCase()))
                    }
                    style={{
                      fontFamily: tokens.typography.cardTitleLarge.font,
                      fontSize: tokens.typography.cardTitleLarge.size,
                      fontWeight: tokens.typography.cardTitleLarge.weight,
                      lineHeight: tokens.typography.cardTitleLarge.lineHeight,
                      letterSpacing:
                        tokens.typography.cardTitleLarge.letterSpacing,
                      display: "inline-block",
                      // Entry stagger; the animation itself lives in
                      // .nav-overlay-link (index.css), motion-safe only.
                      "--link-index": index,
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </dialog>,
          document.body,
        )}
    </nav>
  )
}
