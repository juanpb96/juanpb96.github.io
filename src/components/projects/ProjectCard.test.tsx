import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import type { Project } from "../../data/projects"
import { track } from "../../utils/analytics"
import { ProjectCard } from "./ProjectCard"

vi.mock("../../utils/analytics", () => ({ track: vi.fn() }))

const project: Project = {
  title: "Test Project",
  description: "A project for the tests.",
  tags: ["React"],
  liveUrl: "/FEM_test-project/",
  githubUrl: "https://github.com/juanpb96/FEM_test-project",
  image: "/test.webp",
  imageAlt: "Test Project screenshot",
}

// The image overlay is aria-hidden and out of the tab order (a mouse/touch
// shortcut), so it has no accessible query.
function imageLink(container: HTMLElement) {
  const link = container.querySelector("a.project-image-link")
  if (!(link instanceof HTMLAnchorElement)) throw new Error("no image link")
  return link
}

// Links open in a new tab; jsdom would log a navigation error on click.
function preventNavigation(container: HTMLElement) {
  container.addEventListener("click", (event) => event.preventDefault())
}

beforeEach(() => {
  vi.mocked(track).mockClear()
})

describe.each([
  { large: true, placement: "featured", liveVia: "button" },
  { large: false, placement: "row", liveVia: "link" },
] as const)("ProjectCard ($placement)", ({ large, placement, liveVia }) => {
  it("tracks project_live from the labelled live link", async () => {
    const user = userEvent.setup()
    const { container } = render(
      <ProjectCard number="01" project={project} large={large} />,
    )
    preventNavigation(container)

    await user.click(
      screen.getByRole("link", { name: /View live site: Test Project/ }),
    )

    expect(track).toHaveBeenCalledTimes(1)
    expect(track).toHaveBeenCalledWith("project_live", {
      project: "Test Project",
      placement,
      via: liveVia,
    })
  })

  it("tracks project_live from the image overlay", async () => {
    const user = userEvent.setup()
    const { container } = render(
      <ProjectCard number="01" project={project} large={large} />,
    )
    preventNavigation(container)

    await user.click(imageLink(container))

    expect(track).toHaveBeenCalledTimes(1)
    expect(track).toHaveBeenCalledWith("project_live", {
      project: "Test Project",
      placement,
      via: "image",
    })
  })

  it("tracks project_code from the code link, once per keyboard activation", async () => {
    const user = userEvent.setup()
    const { container } = render(
      <ProjectCard number="01" project={project} large={large} />,
    )
    preventNavigation(container)

    screen.getByRole("link", { name: /View code: Test Project/ }).focus()
    await user.keyboard("{Enter}")

    expect(track).toHaveBeenCalledTimes(1)
    expect(track).toHaveBeenCalledWith("project_code", {
      project: "Test Project",
      placement,
      via: liveVia,
    })
  })

  it("keeps every project link opening in a new tab", () => {
    const { container } = render(
      <ProjectCard number="01" project={project} large={large} />,
    )

    for (const link of container.querySelectorAll("a")) {
      expect(link).toHaveAttribute("target", "_blank")
      expect(link).toHaveAttribute("rel", "noopener noreferrer")
    }
  })
})
