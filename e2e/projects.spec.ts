import { expect, test } from "@playwright/test"

import { expectNoAxeViolations, HIDE_NAV, openPage } from "./helpers"

const SECTION = "#projects"

test("projects has no axe violations and matches its snapshot @projects", async ({
  page,
}) => {
  await openPage(page)
  await expectNoAxeViolations(page, SECTION)
  await expect(page.locator(SECTION)).toHaveScreenshot("projects.png", {
    stylePath: HIDE_NAV,
  })
})
