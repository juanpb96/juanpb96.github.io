/// <reference types="vite/client" />

// Set by the Umami tracker script (index.html); absent when it is blocked or
// not loaded. Only src/utils/analytics.ts reads it.
interface Window {
  umami?: {
    track: (event: string, data?: Record<string, string>) => void
  }
}
