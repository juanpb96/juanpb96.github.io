import { useState } from 'react'
import { ArrowRightIcon } from '../icons/ArrowRightIcon'
import { tokens } from '../../tokens'

interface FieldLabelProps {
  label: string
  focused: boolean
}

/* Same weight-crossfade technique as the Experience stepper's company name:
   Instrument Sans ships 400/500 as separate static faces (no variable wght
   axis), so font-weight can't be interpolated. Two stacked layers cross-fade
   via opacity instead, each carrying its own static color, which reads as a
   combined color + weight transition. */
function FieldLabel({ label, focused }: FieldLabelProps) {
  return (
    <span style={{ display: 'grid' }}>
      <span
        style={{
          gridArea: '1 / 1',
          fontWeight: 400,
          color: tokens.colors.textTertiary,
          opacity: focused ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        style={{
          gridArea: '1 / 1',
          fontWeight: 500,
          color: tokens.colors.textPrimary,
          opacity: focused ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        {label}
      </span>
    </span>
  )
}

interface FormFieldProps {
  id: string
  name: string
  label: string
  type?: 'text' | 'email'
  multiline?: boolean
  required?: boolean
}

function FormField({ id, name, label, type = 'text', multiline, required }: FormFieldProps) {
  const [focused, setFocused] = useState(false)

  const fieldStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: `${tokens.radius.sm}px`,
    fontSize: '14px',
    fontFamily: tokens.fonts.body,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label htmlFor={id} style={{ fontSize: '13px', fontFamily: tokens.fonts.display }}>
        <FieldLabel label={label} focused={focused} />
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="contact-form-field contact-form-textarea"
          style={fieldStyle}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
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
  return (
    <div
      style={{
        border: `1px solid ${tokens.colors.borderStrong}`,
        borderRadius: `${tokens.radius.lg}px`,
        backgroundColor: tokens.colors.surface,
        padding: `${tokens.spacing[32]}px`,
      }}
    >
      <h3
        style={{
          fontFamily: tokens.fonts.display,
          fontWeight: 600,
          fontSize: '18px',
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
          their own; index.html carries a hidden static replica of this form
          (same name + field names) purely so Netlify's build-time scan can
          register it. */}
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        style={{ display: 'flex', flexDirection: 'column', gap: `${tokens.spacing[20]}px` }}
      >
        <input type="hidden" name="form-name" value="contact" />

        <FormField id="contact-name" name="name" label="Name" required />
        <FormField id="contact-email" name="email" label="Email" type="email" required />
        <FormField id="contact-message" name="message" label="Message" multiline required />

        <button
          type="submit"
          className="cta-button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            alignSelf: 'flex-start',
            padding: '13px 28px',
            borderRadius: `${tokens.radius.sm}px`,
            fontSize: '15px',
            fontWeight: 500,
            fontFamily: tokens.fonts.display,
            cursor: 'pointer',
          }}
        >
          Send message
          <ArrowRightIcon className="cta-button-arrow" />
        </button>
      </form>
    </div>
  )
}
