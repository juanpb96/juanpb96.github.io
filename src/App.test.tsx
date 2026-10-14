import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { App } from "./App"

describe("App", () => {
  it("announces every new-tab link as opening in a new tab", () => {
    const { container } = render(<App />)

    const newTabLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("target") === "_blank")

    expect(newTabLinks.length).toBeGreaterThan(0)
    for (const link of newTabLinks) {
      expect(link).toHaveAccessibleName(/\(opens in new tab\)$/)
    }

    // Any other new-tab link must be hidden from assistive tech entirely
    // (e.g. the mouse-only image overlay on project cards).
    const exposed = new Set<Element>(newTabLinks)
    for (const link of container.querySelectorAll('a[target="_blank"]')) {
      if (!exposed.has(link)) {
        expect(link).toHaveAttribute("aria-hidden", "true")
        expect(link).toHaveAttribute("tabindex", "-1")
      }
    }
  })
})
