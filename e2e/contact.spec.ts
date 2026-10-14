import { expect, test } from "@playwright/test"

import { expectNoAxeViolations, HIDE_NAV, openPage } from "./helpers"

const SECTION = "#contact"

test("contact has no axe violations and matches its snapshot @contact", async ({
  page,
}) => {
  await openPage(page)
  await expectNoAxeViolations(page, SECTION)
  await expect(page.locator(SECTION)).toHaveScreenshot("contact.png", {
    stylePath: HIDE_NAV,
  })
})
