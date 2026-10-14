import { expect, test } from "@playwright/test"

import { expectNoAxeViolations, HIDE_NAV, openPage } from "./helpers"

const SECTION = "footer"

test("footer has no axe violations and matches its snapshot @footer", async ({
  page,
}) => {
  await openPage(page)
  await expectNoAxeViolations(page, SECTION)
  await expect(page.locator(SECTION)).toHaveScreenshot("footer.png", {
    stylePath: HIDE_NAV,
  })
})
