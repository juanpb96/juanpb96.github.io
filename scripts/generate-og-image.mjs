// Renders scripts/og-image.html to public/og-image.png (1200×630), the image
// index.html points og:image and twitter:image at. Run `pnpm run og` after
// changing the template or the name/role copy, and commit the PNG.
// Uses the Playwright dev dependency's Chromium; set PLAYWRIGHT_CHROMIUM_PATH
// to use a Chromium you already have, as for `pnpm run e2e`.
import path from "node:path"
import { pathToFileURL } from "node:url"
import { chromium } from "@playwright/test"

const ROOT = path.resolve(import.meta.dirname, "..")
const TEMPLATE = path.join(ROOT, "scripts", "og-image.html")
const OUTPUT = path.join(ROOT, "public", "og-image.png")

const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
    : {},
)

try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  })

  await page.goto(pathToFileURL(TEMPLATE).href)
  await page.evaluate(() => document.fonts.ready)

  // A font that failed to load would silently render in the fallback, so
  // fail instead.
  const notLoaded = await page.evaluate(() =>
    [...document.fonts]
      .filter((font) => font.status !== "loaded")
      .map((font) => `${font.family} (${font.status})`),
  )

  if (notLoaded.length > 0) {
    throw new Error(`Fonts not loaded: ${notLoaded.join(", ")}`)
  }

  await page.screenshot({ path: OUTPUT, type: "png" })

  console.log(`Wrote ${path.relative(ROOT, OUTPUT)}`)
} finally {
  await browser.close()
}
