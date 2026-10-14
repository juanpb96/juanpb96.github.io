import { render, screen } from "@testing-library/react"

import userEvent from "@testing-library/user-event"

import { describe, expect, it } from "vitest"

import { TagList } from "./TagList"

const tags = ["React", "TypeScript", "Vite", "Tailwind", "Vitest"]

describe("TagList", () => {
  it("names the collapsed toggle starting with its visible text", () => {
    render(<TagList tags={tags} />)

    const toggle = screen.getByRole("button", { expanded: false })

    expect(toggle).toHaveTextContent(/^\+3/)
    expect(toggle).toHaveAccessibleName("+3 more tags")
    expect(toggle).not.toHaveAttribute("aria-label")
  })

  it("names the expanded toggle as showing fewer tags", async () => {
    const user = userEvent.setup()
    render(<TagList tags={tags} />)

    await user.click(screen.getByRole("button", { name: "+3 more tags" }))

    const toggle = screen.getByRole("button", { expanded: true })
    expect(toggle).toHaveAccessibleName("Show fewer tags")
  })

  it("renders no toggle for short lists", () => {
    render(<TagList tags={tags.slice(0, 3)} />)

    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })
})
