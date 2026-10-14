import { act, fireEvent, render, screen } from "@testing-library/react"

import userEvent from "@testing-library/user-event"

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { Nav } from "./Nav"

import { MAIN_CONTENT_ID, SkipLink } from "./SkipLink"

// Mirrors the CLOSE_ANIMATION_MS delay in Nav.tsx.
const CLOSE_DELAY_MS = 260

type User = ReturnType<typeof userEvent.setup>

// Same shape as App: SkipLink, Nav, main and footer are siblings, so the
// overlay's sibling loop inerts everything but the nav.
function Page({ withNav = true }: { withNav?: boolean }) {
  return (
    <>
      <SkipLink />
      {withNav && <Nav />}
      <main id={MAIN_CONTENT_ID}>
        <section id="projects" />
        <section id="experience" />
        <section id="contact" />
      </main>
      <footer />
    </>
  )
}

// Nav only reads `matches` from the change event, so the stub passes just that.
type BreakpointListener = (e: Pick<MediaQueryListEvent, "matches">) => void

let breakpointListener: BreakpointListener | null

// Answer for "(prefers-reduced-motion: reduce)"; the stub below derives
// "(prefers-reduced-motion: no-preference)" (which gates the overlay
// animations in index.css) from it. Defaults to motion allowed per test.
let prefersReducedMotion: boolean

function mediaQueryMatches(query: string) {
  if (query === "(prefers-reduced-motion: reduce)") return prefersReducedMotion

  if (query === "(prefers-reduced-motion: no-preference)") {
    return !prefersReducedMotion
  }

  return false
}

// Narrows a query result without a non-null assertion; a missing element
// fails the test with a readable message instead of a later TypeError.
function required<T>(value: T | null, what: string): T {
  if (value === null) throw new Error(`Missing ${what}`)

  return value
}

function crossBreakpoint(matches: boolean) {
  act(() => {
    breakpointListener?.({ matches })
  })
}

function setup() {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

  const view = render(<Page />)

  return { user, ...view }
}

async function openMenu(user: User) {
  await user.click(screen.getByRole("button", { name: "Open menu" }))
}

function overlayLinks() {
  const dialog = screen.getByRole("dialog", { name: "Site menu" })

  return ["Projects", "Experience", "Contact"].map((name) =>
    required(
      dialog.querySelector<HTMLAnchorElement>(
        `a[href="#${name.toLowerCase()}"]`,
      ),
      `${name} overlay link`,
    ),
  )
}

// Runs the entry animation's start for the given links, which is what makes
// them visible (and reachable by Tab) in a real browser.
function revealLinks(links: HTMLAnchorElement[]) {
  links.forEach((link) => fireEvent.animationStart(link))
}

function finishClose() {
  act(() => {
    vi.advanceTimersByTime(CLOSE_DELAY_MS)
  })
}

beforeEach(() => {
  vi.useFakeTimers()

  // Testing Library only drives fake timers it recognises as Jest's; without
  // this, its async act() waits on a (faked) setTimeout(0) and never settles.
  vi.stubGlobal("jest", {
    advanceTimersByTime: (ms: number) => vi.advanceTimersByTime(ms),
  })

  breakpointListener = null

  prefersReducedMotion = false

  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: mediaQueryMatches(query),
      media: query,
      onchange: null,
      addEventListener: (_type: string, listener: BreakpointListener) => {
        breakpointListener = listener
      },
      removeEventListener: () => {
        breakpointListener = null
      },
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    })),
  )
})

afterEach(() => {
  vi.unstubAllGlobals()

  vi.useRealTimers()

  document.body.style.overflow = ""
})

describe("Nav mobile overlay", () => {
  it("opens a dialog named Site menu with focus on the close button and scroll locked", async () => {
    const { user } = setup()

    const toggle = screen.getByRole("button", { name: "Open menu" })

    expect(toggle).toHaveAttribute("aria-expanded", "false")

    await openMenu(user)

    const dialog = screen.getByRole("dialog", { name: "Site menu" })

    expect(dialog).not.toHaveAttribute("aria-modal")

    const close = screen.getByRole("button", { name: "Close menu" })

    expect(close).toHaveAttribute("aria-expanded", "true")

    expect(close).toHaveAttribute("aria-controls", dialog.id)

    expect(close).toHaveFocus()

    expect(document.body.style.overflow).toBe("hidden")
  })

  it("makes the skip link, main and footer inert while open, but not the nav, and restores them on close", async () => {
    const { user, container } = setup()

    const skipLink = screen.getByRole("link", { name: "Skip to main content" })

    const main = screen.getByRole("main")

    const footer = required(container.querySelector("footer"), "footer")

    const nav = screen.getByRole("navigation")

    await openMenu(user)

    expect(skipLink).toHaveAttribute("inert")

    expect(main).toHaveAttribute("inert")

    expect(footer).toHaveAttribute("inert")

    expect(nav).not.toHaveAttribute("inert")

    await user.click(screen.getByRole("button", { name: "Close menu" }))

    finishClose()

    expect(skipLink).not.toHaveAttribute("inert")

    expect(main).not.toHaveAttribute("inert")

    expect(footer).not.toHaveAttribute("inert")

    expect(document.body.style.overflow).toBe("")
  })

  it("wraps Tab forward: close button, links, logo, close button", async () => {
    const { user } = setup()

    await openMenu(user)

    const links = overlayLinks()

    revealLinks(links)

    const close = screen.getByRole("button", { name: "Close menu" })

    const logo = screen.getByRole("link", {
      name: "JB, Juan Bonilla, back to top",
    })

    for (const expected of [...links, logo, close]) {
      await user.tab()

      expect(expected).toHaveFocus()
    }
  })

  it("wraps Shift+Tab backward: close button, logo, links in reverse, close button", async () => {
    const { user } = setup()

    await openMenu(user)

    const links = overlayLinks()

    revealLinks(links)

    const close = screen.getByRole("button", { name: "Close menu" })

    const logo = screen.getByRole("link", {
      name: "JB, Juan Bonilla, back to top",
    })

    for (const expected of [logo, ...[...links].reverse(), close]) {
      await user.tab({ shift: true })

      expect(expected).toHaveFocus()
    }
  })

  it("skips links whose entry animation hasn't started yet", async () => {
    const { user } = setup()

    await openMenu(user)

    const [projects, experience, contact] = overlayLinks()

    expect(projects).not.toHaveAttribute("data-revealed")

    revealLinks([projects])

    expect(projects).toHaveAttribute("data-revealed")

    await user.tab()

    expect(projects).toHaveFocus()

    await user.tab()

    expect(
      screen.getByRole("link", { name: "JB, Juan Bonilla, back to top" }),
    ).toHaveFocus()

    expect(experience).not.toHaveFocus()

    expect(contact).not.toHaveFocus()
  })

  it("lets Tab reach every link straight away under reduced motion, with no entry animation", async () => {
    prefersReducedMotion = true

    const { user } = setup()

    await openMenu(user)

    // No animationstart is fired: under reduced motion index.css applies no
    // entry animation, so the links are visible from the moment it opens.
    const links = overlayLinks()

    for (const link of links) {
      expect(link).not.toHaveAttribute("data-revealed")
    }

    const close = screen.getByRole("button", { name: "Close menu" })

    const logo = screen.getByRole("link", {
      name: "JB, Juan Bonilla, back to top",
    })

    for (const expected of [...links, logo, close]) {
      await user.tab()

      expect(expected).toHaveFocus()
    }
  })

  it("closes on Escape after the close animation and returns focus to the toggle", async () => {
    const { user } = setup()

    await openMenu(user)

    await user.keyboard("{Escape}")

    // Still mounted while the fade-out runs.
    expect(
      screen.getByRole("dialog", { name: "Site menu" }),
    ).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(CLOSE_DELAY_MS - 1)
    })

    expect(
      screen.getByRole("dialog", { name: "Site menu" }),
    ).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1)
    })

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

    const toggle = screen.getByRole("button", { name: "Open menu" })

    expect(toggle).toHaveAttribute("aria-expanded", "false")

    expect(toggle).toHaveFocus()
  })

  it("ignores a second Escape or a toggle click while closing", async () => {
    const { user } = setup()

    await openMenu(user)

    await user.keyboard("{Escape}")

    act(() => {
      vi.advanceTimersByTime(CLOSE_DELAY_MS / 2)
    })

    await user.keyboard("{Escape}")

    // The toggle already reads "Open menu" while the overlay fades out.
    await user.click(screen.getByRole("button", { name: "Open menu" }))

    // The first close still lands on its original schedule...
    act(() => {
      vi.advanceTimersByTime(CLOSE_DELAY_MS / 2)
    })

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

    // ...and nothing reopens it or schedules another close afterwards.
    act(() => {
      vi.advanceTimersByTime(CLOSE_DELAY_MS * 2)
    })

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

    expect(screen.getByRole("button", { name: "Open menu" })).toHaveFocus()

    expect(document.body.style.overflow).toBe("")
  })

  it("closes when the viewport crosses the md breakpoint and focuses the logo", async () => {
    const { user } = setup()

    await openMenu(user)

    expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 48rem)")

    // Shrinking back below the breakpoint doesn't close it.
    crossBreakpoint(false)

    finishClose()

    expect(
      screen.getByRole("dialog", { name: "Site menu" }),
    ).toBeInTheDocument()

    crossBreakpoint(true)

    finishClose()

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

    expect(
      screen.getByRole("link", { name: "JB, Juan Bonilla, back to top" }),
    ).toHaveFocus()

    expect(breakpointListener).toBeNull()
  })

  it("focuses the target section after a link click, with a temporary tabindex removed on blur", async () => {
    const { user, container } = setup()

    await openMenu(user)

    const [, experienceLink] = overlayLinks()

    revealLinks([experienceLink])

    await user.click(experienceLink)

    finishClose()

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

    const section = required(
      container.querySelector<HTMLElement>("#experience"),
      "#experience",
    )

    expect(section).toHaveFocus()

    expect(section).toHaveAttribute("tabindex", "-1")

    act(() => {
      section.blur()
    })

    expect(section).not.toHaveAttribute("tabindex")
  })

  it("closes on a logo click while open and keeps focus on the logo", async () => {
    const { user } = setup()

    await openMenu(user)

    const logo = screen.getByRole("link", {
      name: "JB, Juan Bonilla, back to top",
    })

    await user.click(logo)

    finishClose()

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

    expect(logo).toHaveFocus()
  })

  it("restores scroll and the inert background when unmounted while open", async () => {
    const { user, rerender } = setup()

    await openMenu(user)

    const main = screen.getByRole("main")

    expect(main).toHaveAttribute("inert")

    expect(document.body.style.overflow).toBe("hidden")

    rerender(<Page withNav={false} />)

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()

    expect(main).not.toHaveAttribute("inert")

    expect(
      screen.getByRole("link", { name: "Skip to main content" }),
    ).not.toHaveAttribute("inert")

    expect(document.body.style.overflow).toBe("")

    // No pending close timer fires into the unmounted component.
    act(() => {
      vi.runOnlyPendingTimers()
    })
  })

  it("resets the revealed links when the menu reopens", async () => {
    const { user } = setup()

    await openMenu(user)

    revealLinks(overlayLinks())

    await user.keyboard("{Escape}")

    finishClose()

    await openMenu(user)

    for (const link of overlayLinks()) {
      expect(link).not.toHaveAttribute("data-revealed")
    }

    await user.tab()

    expect(
      screen.getByRole("link", { name: "JB, Juan Bonilla, back to top" }),
    ).toHaveFocus()
  })
})
