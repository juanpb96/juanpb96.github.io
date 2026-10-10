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
  ariaDisabled?: never
  onClick?: never
}

interface ButtonElementProps extends ButtonBaseProps {
  type: "button" | "submit"
  ariaDisabled?: boolean
  onClick?: () => void
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
  ariaDisabled,
  onClick,
}: ButtonProps) {
  const classes = `button button-${variant}${className ? ` ${className}` : ""}`
  const style = {
    padding: "13px 28px",
    borderRadius: `${tokens.radius.sm}px`,
    fontSize: "0.9375rem",
    fontWeight: 500,
    fontFamily: tokens.fonts.display,
  }

  if (href === undefined) {
    /* ariaDisabled maps to aria-disabled rather than disabled: the button
       stays focusable, so focus isn't dropped to <body> while it's
       unavailable. The caller must still ignore activations itself. */
    return (
      <button
        type={type}
        aria-disabled={ariaDisabled || undefined}
        onClick={onClick}
        className={classes}
        style={style}
      >
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
