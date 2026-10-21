/// <reference types="vitest/config" />

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "node:path"

// Vite config — https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: process.env.VITE_HOST ?? "localhost",
    port: parseInt(process.env.PORT || "8443"),
    strictPort: true,
  },
  preview: {
    host: process.env.VITE_HOST ?? "localhost",
    port: parseInt(process.env.PORT || "8443"),
  },
  // Component tests (pnpm test) render in jsdom; src/test/setup.ts adds
  // the jest-dom matchers and unmounts between tests. Browser checks in e2e/
  // run with Playwright (pnpm run e2e), not Vitest. Edge function tests live in
  // netlify/, outside netlify/edge-functions/ so Netlify doesn't bundle them.
  test: {
    include: ["src/**/*.test.{ts,tsx}", "netlify/*.test.ts"],
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
})
