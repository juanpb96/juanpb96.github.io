import { describe, expect, it } from "vitest"
import { readFileSync } from "node:fs"
import path from "node:path"

import { tokens } from "./tokens"

// src/index.css mirrors some tokens as CSS custom properties (for global CSS
// and Tailwind utilities). Nothing links the two copies at build time, so
// this test fails when one side is edited without the other.

// Read from disk: Vitest does not process CSS, so `?raw` imports come back empty.
const css = readFileSync(path.join(import.meta.dirname, "index.css"), "utf8")

// Whitespace differs between the two files ("rgba(255,255,255,0.07)" in TS,
// "rgba(255, 255, 255, 0.07)" in CSS), so compare without it.
const normalize = (value: string) => value.replace(/\s+/g, "")

const kebab = (key: string) =>
  key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

function cssValue(property: string) {
  const match = new RegExp(`${property}\\s*:\\s*([^;]+);`).exec(css)
  if (match === null) throw new Error(`${property} is missing from index.css`)
  return match[1].trim()
}

function customProperty(name: string) {
  return cssValue(`(?<![\\w-])--${name}`)
}

describe("index.css mirrors tokens.ts", () => {
  it.each(Object.entries(tokens.colors))("colors.%s", (key, value) => {
    expect(normalize(customProperty(kebab(key)))).toBe(normalize(value))
  })

  it.each(Object.entries(tokens.fonts))("fonts.%s", (key, value) => {
    expect(normalize(customProperty(`font-${kebab(key)}`))).toBe(
      normalize(value),
    )
  })

  it.each(Object.entries(tokens.motion))("motion.%s", (key, value) => {
    expect(customProperty(`duration-${kebab(key)}`)).toBe(value)
  })

  it("nav height matches container.navHeight", () => {
    expect(customProperty("nav-height")).toBe(`${tokens.container.navHeight}px`)
  })

  it("container padding matches spacing[32] and spacing[48]", () => {
    expect(customProperty("spacing-container-mobile")).toBe(
      `${tokens.spacing[32]}px`,
    )
    expect(customProperty("spacing-container-desktop")).toBe(
      `${tokens.spacing[48]}px`,
    )
  })

  it("body line-height matches typography.body", () => {
    const body = /(?:^|\n)body\s*\{([^}]*)\}/.exec(css)
    if (body === null) throw new Error("body rule is missing from index.css")
    expect(/line-height\s*:\s*([^;]+);/.exec(body[1])?.[1].trim()).toBe(
      String(tokens.typography.body.lineHeight),
    )
  })
})
