import { expect, test } from "@playwright/test"

import { expectNoAxeViolations, openPage } from "./helpers"

const NAV = "nav.site-nav"
const OVERLAY = "dialog.nav-overlay"

test("nav has no axe violations and matches its snapshot @nav", async ({
  page,
}) => {
  await openPage(page)
  await expectNoAxeViolations(page, NAV)
  await expect(page.locator(NAV)).toHaveScreenshot("nav.png")
})

test("mobile menu overlay has no axe violations and matches its snapshot @nav", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "mobile",
    "The menu button is mobile-only",
  )
  await openPage(page)
  await page.getByRole("button", { name: "Open menu" }).click()
  await expect(page.locator(OVERLAY)).toBeVisible()
  await expectNoAxeViolations(page, OVERLAY)
  await expect(page).toHaveScreenshot("nav-overlay.png")
})
