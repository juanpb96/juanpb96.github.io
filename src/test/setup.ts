import "@testing-library/jest-dom/vitest"

import { cleanup } from "@testing-library/react"

import { afterEach } from "vitest"

// Vitest runs without globals, so Testing Library can't register its own
// automatic cleanup; unmount whatever each test rendered here instead.
afterEach(() => {
  cleanup()
})
