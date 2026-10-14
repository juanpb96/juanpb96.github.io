import { expect, test } from "@playwright/test"

import { expectNoAxeViolations, HIDE_NAV, openPage } from "./helpers"

const SECTION = "#hero"

test("hero has no axe violations and matches its snapshot @hero", async ({
  page,
}) => {
  await openPage(page)
  await expectNoAxeViolations(page, SECTION)
  await expect(page.locator(SECTION)).toHaveScreenshot("hero.png", {
    stylePath: HIDE_NAV,
  })
})
