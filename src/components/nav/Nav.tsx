import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { tokens } from '../../tokens'
import { ContentContainer } from '../layout/ContentContainer'

const links = ['Projects', 'Experience', 'Contact']

const CLOSE_ANIMATION_MS = 260

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const openMenu = () => {
    setOpen(true)
    setClosing(false)
  }

  const closeMenu = () => {
    setClosing(true)
    window.setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, CLOSE_ANIMATION_MS)
  }

  const toggleMenu = () => {
    if (open && !closing) {
      closeMenu()
    } else if (!open) {
      openMenu()
    }
  }

  useEffect(() => {
    if (!open) return

    linkRefs.current[0]?.focus()

    const getFocusables = (): HTMLElement[] =>
      [...linkRefs.current, logoRef.current, hamburgerRef.current].filter(
        (el): el is HTMLAnchorElement | HTMLButtonElement => el !== null,
      )

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
        return
      }
      if (e.key !== 'Tab') return

      const focusables = getFocusables()
      if (focusables.length === 0) return

      const currentIndex = focusables.indexOf(document.activeElement as HTMLElement)
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
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    // Reinforce the trap: make everything outside Nav/overlay unreachable,
    // in case focus or assistive tech ever slips past the keydown handler.
    const backgroundSiblings = navRef.current?.parentElement
      ? Array.from(navRef.current.parentElement.children).filter((el) => el !== navRef.current)
      : []
    backgroundSiblings.forEach((el) => {
      ;(el as HTMLElement).inert = true
    })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      backgroundSiblings.forEach((el) => {
        ;(el as HTMLElement).inert = false
      })
      hamburgerRef.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const iconOpen = open && !closing

  const lineStyle = (index: number): CSSProperties => {
    const closedTop = [0, 8, 16][index]
    return {
      position: 'absolute',
      left: 0,
      top: iconOpen ? '8px' : `${closedTop}px`,
      width: '24px',
      height: iconOpen ? '3px' : '2px',
      borderRadius: '2px',
      transform: iconOpen
        ? index === 0
          ? 'rotate(45deg)'
          : index === 2
            ? 'rotate(-45deg)'
            : 'scaleX(0)'
        : 'rotate(0deg)',
      opacity: iconOpen && index === 1 ? 0 : 1,
      transitionProperty: 'transform, opacity, top, height',
      transitionDuration: '0.35s',
      transitionTimingFunction: open
        ? 'cubic-bezier(0.4, 0, 0.2, 1)'
        : 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    }
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: tokens.zIndex.nav,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: scrolled ? 'rgba(10,11,13,0.85)' : 'transparent',
        borderBottom: scrolled ? `1px solid ${tokens.colors.border}` : '1px solid transparent',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <ContentContainer>
        <div
          className="px-container-mobile md:px-container-desktop"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: `${tokens.spacing[64]}px`,
          }}
        >
          {/* Monogram */}
          <a
            ref={logoRef}
            href="#hero"
            className="nav-logo nav-tap-target"
            onClick={() => {
              if (open) closeMenu()
            }}
            style={{
              fontFamily: tokens.fonts.display,
              fontWeight: 700,
              fontSize: '18px',
              letterSpacing: '-0.02em',
            }}
          >
            JB
          </a>

          {/* Links */}
          <div className="hidden md:flex" style={{ gap: `${tokens.spacing[32]}px` }}>
            {links.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                style={{
                  color: tokens.colors.textSecondary,
                  textDecoration: 'none',
                  fontFamily: tokens.typography.navigation.font,
                  fontSize: `${tokens.typography.navigation.size}px`,
                  fontWeight: tokens.typography.navigation.weight,
                  lineHeight: tokens.typography.navigation.lineHeight,
                  letterSpacing: tokens.typography.navigation.letterSpacing,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = tokens.colors.textPrimary)}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = tokens.colors.textSecondary)}
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
            aria-label={iconOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={iconOpen}
            onClick={toggleMenu}
            style={{
              position: 'relative',
              width: '24px',
              height: '18px',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
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
          containing block for fixed descendants) */}
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: 'fixed',
              top: `${tokens.spacing[64]}px`,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: tokens.zIndex.overlay,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(10,11,13,0.85)',
              display: 'flex',
              alignItems: 'center',
              animation: closing
                ? 'nav-overlay-fade-out 0.25s ease forwards'
                : 'nav-overlay-curtain 0.4s ease forwards',
            }}
          >
            <ul
              className="px-container-mobile md:px-container-desktop"
              style={{
                listStyle: 'none',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: `${tokens.spacing[32]}px`,
                width: '100%',
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
                    onClick={closeMenu}
                    style={{
                      fontFamily: tokens.typography.cardTitleLarge.font,
                      fontSize: `${tokens.typography.cardTitleLarge.size}px`,
                      fontWeight: tokens.typography.cardTitleLarge.weight,
                      lineHeight: tokens.typography.cardTitleLarge.lineHeight,
                      letterSpacing: tokens.typography.cardTitleLarge.letterSpacing,
                      display: 'inline-block',
                      opacity: closing ? 1 : 0,
                      animation: closing
                        ? 'none'
                        : 'nav-link-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                      animationDelay: closing ? undefined : `${400 + index * 70}ms`,
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>,
          document.body,
        )}
    </nav>
  )
}
