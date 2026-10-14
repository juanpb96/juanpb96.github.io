// Renders scripts/og-image.html at 1200×630 and saves public/og-image.png.
// Run `pnpm run og` after changing the name/role/accent copy in the template.
// Uses Playwright's bundled Chromium; the browser is only needed for this
// render, so it is a dev dependency (see AGENTS.md).
import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import { chromium } from "playwright"

const ROOT = path.resolve(import.meta.dirname, "..")
const TEMPLATE_URL = new URL("./og-image.html", import.meta.url).href
const OUTPUT = path.join(ROOT, "public", "og-image.png")

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
})

try {
  await page.goto(TEMPLATE_URL, { waitUntil: "networkidle" })
  await page.evaluate(() => document.fonts.ready)
  const png = await page.screenshot({ type: "png" })
  await mkdir(path.dirname(OUTPUT), { recursive: true })
  await writeFile(OUTPUT, png)
  console.log(`Wrote ${OUTPUT} (${(png.length / 1024).toFixed(1)} KB)`)
} finally {
  await browser.close()
}
