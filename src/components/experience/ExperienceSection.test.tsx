import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { experiences } from "../../data/experiences"
import { ExperienceSection } from "./ExperienceSection"

const scrollIntoView = vi.fn()

beforeEach(() => {
  scrollIntoView.mockReset()

  // jsdom implements neither.
  Element.prototype.scrollIntoView = scrollIntoView

  window.matchMedia = vi.fn().mockReturnValue({ matches: false })
})

function stepperButtons() {
  return screen.getAllByRole("button", { name: /^View .* experience/ })
}

function cardFor(role: HTMLElement) {
  const card = role.closest<HTMLElement>(".experience-card")

  if (!card) throw new Error("role heading is not inside a card")

  return card
}

describe("ExperienceSection", () => {
  it("renders one h3 per role, in order, under the Experience h2", () => {
    render(<ExperienceSection />)

    // Soft hyphens (&shy;, U+00AD) split the visible word, so compare
    // without them. Built from the char code: the formatter would turn an
    // escape into an invisible literal.
    const softHyphen = String.fromCharCode(0xad)

    expect(
      screen
        .getByRole("heading", { level: 2 })
        .textContent?.split(softHyphen)
        .join(""),
    ).toBe("Experience")
    expect(
      screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent),
    ).toEqual(experiences.map((exp) => exp.role))
  })

  it("scrolls to and focuses the card when its stepper button is clicked", async () => {
    const user = userEvent.setup()

    render(<ExperienceSection />)

    await user.click(stepperButtons()[1])

    const card = cardFor(screen.getAllByRole("heading", { level: 3 })[1])

    expect(scrollIntoView).toHaveBeenCalledTimes(1)
    expect(scrollIntoView.mock.contexts[0]).toBe(card)
    expect(card).toHaveFocus()
    expect(card).toHaveAttribute("tabindex", "-1")
  })

  it("focuses the card on keyboard activation and continues Tab from there", async () => {
    const user = userEvent.setup()

    render(
      <>
        <ExperienceSection />
        <a href="#after">After</a>
      </>,
    )

    const last = experiences.length - 1

    stepperButtons()[last].focus()

    await user.keyboard("{Enter}")

    const card = cardFor(screen.getAllByRole("heading", { level: 3 })[last])

    expect(card).toHaveFocus()
    expect(stepperButtons()[last]).toHaveAttribute("aria-pressed", "true")

    await user.tab()

    expect(screen.getByRole("link", { name: "After" })).toHaveFocus()

    // The temporary tabindex goes away once focus leaves the card.
    expect(card).not.toHaveAttribute("tabindex")
  })
})
