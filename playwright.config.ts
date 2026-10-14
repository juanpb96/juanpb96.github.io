import { defineConfig, devices } from "@playwright/test"

// Browser checks (pnpm run e2e): axe + visual snapshots per page section.
// Specs live in e2e/ and are tagged per section (@nav, @hero, ...); CI picks
// the tags a PR touches (see .github/scripts/ci-changes.sh).
//
// Snapshot baselines are only valid from the pinned Playwright Docker image
// that CI uses; see "Browser checks" in AGENTS.md to update them.

const PORT = 4173

export default defineConfig({
  testDir: "./e2e",
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  // One baseline folder per spec, without the OS suffix: baselines always come
  // from the Linux Docker image.
  snapshotPathTemplate:
    "{testDir}/{testFilePath}-snapshots/{arg}-{projectName}{ext}",
  use: {
    baseURL: `http://localhost:${PORT}`,
    reducedMotion: "reduce",
    // Local runs may point at a preinstalled Chromium; CI uses the bundled one.
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : {},
  },
  projects: [
    {
      name: "mobile",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 375, height: 812 },
      },
    },
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  webServer: {
    command: "pnpm run build && pnpm run preview",
    env: { PORT: String(PORT) },
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
