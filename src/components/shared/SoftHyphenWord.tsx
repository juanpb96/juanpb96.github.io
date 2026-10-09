import type { ReactNode } from "react"

interface SoftHyphenWordProps {
  children: ReactNode
}

/* A long word with soft hyphens (&shy;) at its syllable breaks. The
   inline-block keeps it whole while it fits on a line; browsers otherwise
   break at the first soft hyphen that fits ("En-gineer"). Only a word wider
   than its container wraps, at the soft hyphens. */
export function SoftHyphenWord({ children }: SoftHyphenWordProps) {
  return <span className="inline-block max-w-full">{children}</span>
}
