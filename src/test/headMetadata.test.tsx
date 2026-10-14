import { readFileSync } from "node:fs"

import { render } from "@testing-library/react"

import { describe, expect, it } from "vitest"

import { ContactSection } from "../components/contact/ContactSection"

import { Footer } from "../components/footer/Footer"

// index.html is static (the page is client-rendered, so scrapers never run
// React). Its Person JSON-LD repeats the profile URLs the components render;
// this keeps the two from drifting apart.
function readSameAs(): string[] {
  const html = new DOMParser().parseFromString(
    readFileSync("index.html", "utf8"),
    "text/html",
  )

  const json = html.querySelector('script[type="application/ld+json"]')

  return JSON.parse(json?.textContent ?? "{}").sameAs ?? []
}

function externalHrefs(container: HTMLElement): string[] {
  return [...container.querySelectorAll("a[href^='https://']")].map(
    (link) => link.getAttribute("href") ?? "",
  )
}

describe("index.html Person JSON-LD", () => {
  it("lists every profile link the Footer renders in sameAs", () => {
    const { container } = render(<Footer />)

    const hrefs = externalHrefs(container)

    expect(hrefs.length).toBeGreaterThan(0)
    expect([...readSameAs()].sort()).toEqual([...hrefs].sort())
  })

  it("does not link the contact section to a profile missing from sameAs", () => {
    const { container } = render(<ContactSection />)

    const sameAs = readSameAs()

    for (const href of externalHrefs(container)) {
      expect(sameAs).toContain(href)
    }
  })
})
