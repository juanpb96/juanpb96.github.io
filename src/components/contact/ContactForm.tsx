import { useEffect, useRef, useState } from "react"

import type { FormEvent, Ref } from "react"

import { flushSync } from "react-dom"

import { ArrowRightIcon } from "../icons/ArrowRightIcon"

import { ErrorIcon } from "../icons/ErrorIcon"

import { SpinnerIcon } from "../icons/SpinnerIcon"

import { Button } from "../shared/Button"

import { WeightTransitionText } from "../shared/WeightTransitionText"

import { moveFocus } from "../../utils/moveFocus"

import { tokens } from "../../tokens"

type SubmitStatus = "idle" | "submitting" | "success" | "error"

// Netlify Forms accepts a urlencoded POST to any static path ("/" is
// index.html); the hidden form-name field tells it which form this is.
// Anything but a 2xx means the submission wasn't stored.
async function submitToNetlify(form: HTMLFormElement) {
  const body = new URLSearchParams()

  for (const [key, value] of new FormData(form)) {
    body.append(key, String(value))
  }

  const response = await fetch("/", {
    method: "POST",

    headers: { "Content-Type": "application/x-www-form-urlencoded" },

    body: body.toString(),
  })

  if (!response.ok) {
    throw new Error(`Form submission failed with status ${response.status}`)
  }
}

interface FormFieldProps {
  id: string

  name: string

  label: string

  placeholder?: string

  type?: "text" | "email"

  multiline?: boolean

  required?: boolean

  readOnly?: boolean

  inputRef?: Ref<HTMLInputElement>
}

function FormField({
  id,
  name,
  label,
  placeholder,
  type = "text",
  multiline,
  required,
  readOnly,
  inputRef,
}: FormFieldProps) {
  const [focused, setFocused] = useState(false)

  const fieldStyle = {
    width: "100%",

    padding: "12px 14px",

    borderRadius: `${tokens.radius.sm}px`,

    fontSize: "14px",

    fontFamily: tokens.fonts.body,
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <label
        htmlFor={id}
        style={{ fontSize: "13px", fontFamily: tokens.fonts.display }}
      >
        <WeightTransitionText
          active={focused}
          color={tokens.colors.textTertiary}
          activeColor={tokens.colors.textPrimary}
        >
          {label}
        </WeightTransitionText>
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          readOnly={readOnly}
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="contact-form-field contact-form-textarea"
          style={fieldStyle}
        />
      ) : (
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          readOnly={readOnly}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="contact-form-field"
          style={fieldStyle}
        />
      )}
    </div>
  )
}

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>("idle")

  // Shown back in the success message so a typo in it is easy to spot.
  const [sentEmail, setSentEmail] = useState("")

  // Set synchronously, so a second submit (double click, Enter in a field)
  // landing before the re-render to "submitting" is still ignored.
  const submittingRef = useRef(false)

  const successHeadingRef = useRef<HTMLHeadingElement>(null)

  const nameInputRef = useRef<HTMLInputElement>(null)

  const submitting = status === "submitting"

  const sent = status === "success"

  // The success panel replaces the form, hiding the submit button that held
  // focus, which would drop focus to <body>; its heading takes it instead,
  // which is also what announces the result.
  useEffect(() => {
    if (status === "success") moveFocus(successHeadingRef.current)
  }, [status])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submittingRef.current || status === "success") return

    const form = event.currentTarget

    submittingRef.current = true

    setStatus("submitting")

    try {
      await submitToNetlify(form)

      setSentEmail(String(new FormData(form).get("email") ?? ""))

      form.reset()

      setStatus("success")
    } catch {
      // Field values are kept so the message can be resent as is.
      setStatus("error")
    } finally {
      submittingRef.current = false
    }
  }

  function handleSendAnother() {
    // Commit synchronously so the form is visible (and no longer inert)
    // before focus moves into it; otherwise the button that held focus
    // unmounts and focus drops to <body>.
    flushSync(() => setStatus("idle"))

    nameInputRef.current?.focus()
  }

  return (
    <div
      style={{
        border: `1px solid ${tokens.colors.borderStrong}`,

        borderRadius: `${tokens.radius.lg}px`,

        backgroundColor: tokens.colors.surface,

        padding: `${tokens.spacing[32]}px`,

        // The form and the success panel share one grid cell, so the card
        // keeps the form's height (which varies with viewport width and the
        // resizable textarea) when the panel replaces it, and the layout
        // around it doesn't jump.
        display: "grid",
      }}
    >
      {/* visibility: hidden (rather than unmounting) keeps the form's height
          in the shared cell, and also takes it out of the accessibility
          tree; inert makes sure nothing in it is focusable or clickable. */}
      <div
        inert={sent}
        style={{
          gridArea: "1 / 1",

          visibility: sent ? "hidden" : undefined,
        }}
      >
        <h3
          style={{
            fontFamily: tokens.fonts.display,

            fontWeight: 600,

            fontSize: "18px",

            color: tokens.colors.textPrimary,

            lineHeight: 1.4,

            margin: `0 0 ${tokens.spacing[24]}px 0`,
          }}
        >
          Prefer not to leave the page? Send a message instead.
        </h3>

        {/* Netlify Forms detects submissions by parsing the static build
            output at deploy time — it can't see forms that only exist after
            this React app hydrates. The name/data-netlify attributes and the
            hidden form-name input below are necessary but not sufficient on
            their own; index.html carries a hidden static replica of this
            form (same name + field names) purely so Netlify's build-time
            scan can register it. Submission itself goes through
            handleSubmit, so the visitor stays on the page instead of landing
            on Netlify's default thank-you page. */}
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: `${tokens.spacing[20]}px`,
          }}
        >
          <input type="hidden" name="form-name" value="contact" />

          <FormField
            id="contact-name"
            name="name"
            label="Name"
            placeholder="Your name"
            required
            readOnly={submitting}
            inputRef={nameInputRef}
          />
          <FormField
            id="contact-email"
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
            readOnly={submitting}
          />
          <FormField
            id="contact-message"
            name="message"
            label="Message"
            placeholder="What would you like to discuss?"
            multiline
            required
            readOnly={submitting}
          />

          {/* role="alert" is announced when inserted, so it can mount with
              the error; retrying unmounts it, and a repeat failure mounts
              (and announces) it again. The icon is decorative: the title
              states the error, so nothing relies on color alone. */}
          {status === "error" && (
            <div
              role="alert"
              style={{
                display: "flex",

                gap: `${tokens.spacing[16]}px`,

                padding: `${tokens.spacing[16]}px`,

                border: `1px solid ${tokens.colors.errorBorder}`,

                borderRadius: `${tokens.radius.sm}px`,

                backgroundColor: tokens.colors.errorBg,
              }}
            >
              <ErrorIcon
                style={{
                  flexShrink: 0,

                  marginTop: "3px",

                  color: tokens.colors.error,
                }}
              />
              <div>
                <p
                  style={{
                    margin: `0 0 ${tokens.spacing[4]}px 0`,

                    fontSize: "14px",

                    fontWeight: 500,

                    lineHeight: 1.6,

                    color: tokens.colors.textPrimary,
                  }}
                >
                  Your message didn't go through.
                </p>
                <p
                  style={{
                    margin: 0,

                    fontSize: "13px",

                    lineHeight: 1.6,

                    color: tokens.colors.textSecondary,
                  }}
                >
                  Your text is still here, so you can try again. If it keeps
                  failing, write to{" "}
                  <a href="mailto:hello@juanbonilla.me" className="inline-link">
                    hello@juanbonilla.me
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          <Button
            variant="primary"
            type="submit"
            ariaDisabled={submitting}
            className="w-full self-start sm:w-auto"
          >
            {submitting ? (
              <>
                Sending…
                <SpinnerIcon className="spinner" />
              </>
            ) : (
              <>
                {status === "error" ? "Try again" : "Send message"}
                <ArrowRightIcon className="button-arrow" />
              </>
            )}
          </Button>

          {/* Present from the start (and empty) so screen readers pick up
              the change; a changing button label alone isn't reliably
              announced. Absolutely positioned by sr-only, so it adds no flex
              gap. An explicit role rather than <output>, whose implicit live
              region screen readers support less consistently. */}
          <p
            role="status" // oxlint-disable-line jsx-a11y/prefer-tag-over-role
            className="sr-only"
          >
            {submitting ? "Sending…" : ""}
          </p>
        </form>
      </div>

      {sent && (
        <div
          style={{
            gridArea: "1 / 1",

            display: "flex",

            flexDirection: "column",

            justifyContent: "center",

            alignItems: "flex-start",
          }}
        >
          <h3
            ref={successHeadingRef}
            className="contact-form-success-heading"
            style={{
              fontFamily: tokens.typography.cardTitleDefault.font,

              fontWeight: tokens.typography.cardTitleDefault.weight,

              fontSize: `${tokens.typography.cardTitleDefault.size}px`,

              lineHeight: tokens.typography.cardTitleDefault.lineHeight,

              letterSpacing: tokens.typography.cardTitleDefault.letterSpacing,

              color: tokens.colors.textPrimary,

              margin: `0 0 ${tokens.spacing[8]}px 0`,
            }}
          >
            Message sent
          </h3>
          <p
            style={{
              margin: `0 0 ${tokens.spacing[24]}px 0`,

              fontSize: "14px",

              lineHeight: 1.7,

              color: tokens.colors.textSecondary,

              overflowWrap: "anywhere",
            }}
          >
            Thanks! I got your message. I'll get back to you at{" "}
            <strong
              style={{ fontWeight: 500, color: tokens.colors.textPrimary }}
            >
              {sentEmail}
            </strong>{" "}
            very soon.
          </p>
          <Button
            variant="secondary"
            type="button"
            onClick={handleSendAnother}
            className="w-full sm:w-auto"
          >
            Send another message
          </Button>
        </div>
      )}
    </div>
  )
}
