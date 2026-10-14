import { render, screen } from "@testing-library/react"

import userEvent from "@testing-library/user-event"

import { beforeEach, describe, expect, it } from "vitest"

import { BuildProcessCard } from "./BuildProcessCard"

const TITLE = "How this site gets built"

describe("BuildProcessCard", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("renders the title once, in the heading", () => {
    const { container } = render(<BuildProcessCard />)

    const heading = screen.getByRole("heading", { level: 2 })
    expect(heading.textContent).toBe(TITLE)
    expect(container.textContent?.split(TITLE)).toHaveLength(2)
  })

  it("names the toggle by the heading and collapses the content", async () => {
    const user = userEvent.setup()
    render(<BuildProcessCard />)

    const toggle = screen.getByRole("button", { name: TITLE })
    expect(toggle).toHaveAttribute("aria-expanded", "true")

    await user.click(toggle)

    expect(toggle).toHaveAttribute("aria-expanded", "false")
    expect(localStorage.getItem("hero-build-card-expanded")).toBe("false")
  })
})
