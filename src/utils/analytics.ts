// Custom events for Umami (loaded from /a/s.js in index.html). This is the
// only file that knows about the vendor: components call track(), which does
// nothing when the tracker isn't there (blocked, dev, tests). No form field
// values or other personal data go into an event.
// Type aliases rather than interfaces, so they fit Umami's
// Record<string, string> event data.
type ProjectEventData = {
  project: string
  placement: "featured" | "row"
  via: "button" | "link" | "image"
}

type AnalyticsEvents = {
  cta_get_in_touch: undefined
  project_live: ProjectEventData
  project_code: Omit<ProjectEventData, "via"> & { via: "button" | "link" }
  contact_sent: undefined
  contact_failed: undefined
  social_click: {
    network: "linkedin" | "github"
    location: "footer" | "contact"
  }
  email_click: { location: "contact" }
}

export type AnalyticsEvent = keyof AnalyticsEvents

export function track<E extends AnalyticsEvent>(
  event: E,
  ...data: AnalyticsEvents[E] extends undefined ? [] : [AnalyticsEvents[E]]
) {
  try {
    window.umami?.track(event, data[0])
  } catch {
    // Analytics must never break the control that triggered it.
  }
}
