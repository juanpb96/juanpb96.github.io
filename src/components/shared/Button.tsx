import type { ReactNode } from "react"
import { tokens } from "../../tokens"

interface ButtonBaseProps {
  variant: "primary" | "secondary"
  className?: string
  children: ReactNode
}

interface ButtonLinkProps extends ButtonBaseProps {
  href: string
  external?: boolean
  type?: never
}

interface ButtonElementProps extends ButtonBaseProps {
  type: "button" | "submit"
  href?: never
  external?: never
}

type ButtonProps = ButtonLinkProps | ButtonElementProps

/* Renders a link when given an href, a <button> otherwise; both share the
   .button classes in index.css, which own the colors and state styles. */
export function Button({
  variant,
  className,
  children,
  href,
  external,
  type,
}: ButtonProps) {
  const classes = `button button-${variant}${className ? ` ${className}` : ""}`
  const style = {
    padding: "13px 28px",
    borderRadius: `${tokens.radius.sm}px`,
    fontSize: "15px",
    fontWeight: 500,
    fontFamily: tokens.fonts.display,
  }

  if (href === undefined) {
    return (
      <button type={type} className={classes} style={style}>
        {children}
      </button>
    )
  }

  return (
    <a
      href={href}
      className={classes}
      style={style}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  )
}
