import AxeBuilder from "@axe-core/playwright"
import { expect, type Page } from "@playwright/test"
import path from "node:path"

// The footer prints the current year; freeze the clock so its snapshot does
// not change every January.
const FIXED_NOW = new Date("2026-06-01T12:00:00Z")

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]

// Stylesheet for section screenshots that hides the fixed nav bar.
export const HIDE_NAV = path.join(import.meta.dirname, "hide-nav.css")

export async function openPage(page: Page) {
  await page.clock.setFixedTime(FIXED_NOW)
  await page.goto("/")
  await page.evaluate(() => document.fonts.ready)
}

export async function expectNoAxeViolations(page: Page, selector: string) {
  const { violations } = await new AxeBuilder({ page })
    .include(selector)
    .withTags(WCAG_TAGS)
    .analyze()
  expect(violations).toEqual([])
}
