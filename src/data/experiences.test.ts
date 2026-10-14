import { describe, expect, it } from "vitest"

import { experiences, isCurrentExperience } from "./experiences"
import type { Experience } from "./experiences"

const base: Experience = {
  role: "Dev",
  company: "Acme",
  period: "2020 - 2021",
  description: "",
  achievements: [],
  tags: [],
}

describe("isCurrentExperience", () => {
  it("is false when the entry is not marked current", () => {
    expect(isCurrentExperience(base)).toBe(false)
  })

  it("is true when the entry is marked current", () => {
    expect(isCurrentExperience({ ...base, current: true })).toBe(true)
  })

  it("supports having no current experience at all", () => {
    expect(
      [base, { ...base, company: "Other" }].some(isCurrentExperience),
    ).toBe(false)
  })
})

describe("experiences data", () => {
  it("marks an entry current whenever its period ends in Present", () => {
    for (const exp of experiences) {
      const endsInPresent = /present$/i.test(exp.period.trim())

      expect(isCurrentExperience(exp), exp.company).toBe(endsInPresent)
    }
  })
})
