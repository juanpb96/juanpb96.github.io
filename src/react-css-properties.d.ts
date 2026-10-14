import "react"

// Custom properties set through the `style` prop. Declaring each one here keeps
// them type-checked (no `as` casts at the call site). Add new ones alongside.
declare module "react" {
  interface CSSProperties {
    /** Position of an overlay link, used by index.css to stagger its entry. */
    "--link-index"?: number
  }
}
