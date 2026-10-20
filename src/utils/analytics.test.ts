import { afterEach, describe, expect, it, vi } from "vitest"

import { track } from "./analytics"

afterEach(() => {
  delete window.umami
})

describe("track", () => {
  it("forwards the event and its data to Umami", () => {
    const umamiTrack = vi.fn()
    window.umami = { track: umamiTrack }

    track("social_click", { network: "github", location: "footer" })
    track("cta_get_in_touch")

    expect(umamiTrack).toHaveBeenNthCalledWith(1, "social_click", {
      network: "github",
      location: "footer",
    })
    expect(umamiTrack).toHaveBeenNthCalledWith(2, "cta_get_in_touch", undefined)
  })

  it("does nothing when the tracker isn't loaded", () => {
    expect(() => track("contact_sent")).not.toThrow()
  })

  it("swallows errors from the tracker", () => {
    window.umami = {
      track: () => {
        throw new Error("tracker failed")
      },
    }

    expect(() => track("contact_failed")).not.toThrow()
  })
})
