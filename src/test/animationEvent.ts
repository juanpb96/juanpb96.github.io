// jsdom has no AnimationEvent, so React DOM falls back to listening for the
// vendor-prefixed "webkitAnimationStart" and onAnimationStart never sees the
// standard "animationstart" that fireEvent.animationStart dispatches. React
// DOM picks the event name when it's first loaded, so this must be imported
// before anything that loads it (first import in setup.ts).
if (!("AnimationEvent" in window)) {
  class AnimationEvent extends Event {
    readonly animationName: string

    readonly elapsedTime: number

    readonly pseudoElement: string

    constructor(type: string, init: AnimationEventInit = {}) {
      super(type, init)

      this.animationName = init.animationName ?? ""

      this.elapsedTime = init.elapsedTime ?? 0

      this.pseudoElement = init.pseudoElement ?? ""
    }
  }

  Object.defineProperty(window, "AnimationEvent", {
    configurable: true,
    writable: true,
    value: AnimationEvent,
  })
}
