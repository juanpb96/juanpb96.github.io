import { expect, test } from "@playwright/test"

import { expectNoAxeViolations, HIDE_NAV, openPage } from "./helpers"

const SECTION = "#experience"

test("experience has no axe violations and matches its snapshot @experience", async ({
  page,
}) => {
  await openPage(page)
  await expectNoAxeViolations(page, SECTION)
  await expect(page.locator(SECTION)).toHaveScreenshot("experience.png", {
    stylePath: HIDE_NAV,
  })
})
