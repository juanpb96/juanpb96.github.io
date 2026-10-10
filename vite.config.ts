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
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || "8443"),
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || "8443"),
  },
  // Component tests (pnpm test) render in jsdom; src/test/setup.ts adds
  // the jest-dom matchers and unmounts between tests.
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
})
