import "react"

// Custom properties set through the `style` prop. Declaring each one here keeps
// them type-checked (no `as` casts at the call site). Add new ones alongside.
declare module "react" {
  interface CSSProperties {
    /** Position of an overlay link, used by index.css to stagger its entry. */
    "--link-index"?: number
    /** Experience grid gap; the column separator reads it to stay centred. */
    "--experience-gap"?: string
    /** Experience first column: proportional (md-mdlg) and fixed (mdlg+). */
    "--experience-col-fraction"?: number
    "--experience-col-fixed"?: string
    /** Hero column max width, read by mdlg:max-w-(--hero-column-max). */
    "--hero-column-max"?: string
    /** IconButton inset, read by the Footer's -ml-(--icon-button-inset). */
    "--icon-button-inset"?: string
    /** Nav overlay fade-out duration, set from Nav.tsx's CLOSE_FADE_MS. */
    "--nav-close-duration"?: string
  }
}
