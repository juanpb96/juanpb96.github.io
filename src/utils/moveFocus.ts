// Moves focus to where the user should continue from after an in-page jump
// (mobile nav overlay link, skip link). A section/landmark target isn't
// focusable on its own, so it gets a temporary tabindex="-1", removed on blur
// so clicks inside it don't keep focusing it. preventScroll leaves the
// anchor's own scroll alone.
export function moveFocus(target: HTMLElement | null) {
  if (!target) return

  if (!target.hasAttribute("tabindex")) {
    target.tabIndex = -1

    target.addEventListener("blur", () => target.removeAttribute("tabindex"), {
      once: true,
    })
  }

  target.focus({ preventScroll: true })
}
