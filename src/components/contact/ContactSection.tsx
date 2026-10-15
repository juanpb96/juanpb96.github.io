import { tokens } from "../../tokens"
import { ContactForm } from "./ContactForm"
import { SoftHyphenWord } from "../shared/SoftHyphenWord"

export function ContactSection() {
  return (
    <section
      id="contact"
      className="px-container-mobile md:px-container-desktop"
      style={{
        paddingTop: `clamp(${tokens.spacing[64]}px, 10vw, ${tokens.spacing[120]}px)`,
        paddingBottom: `clamp(${tokens.spacing[64]}px, 10vw, ${tokens.spacing[120]}px)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid texture */}
      <div
        className="grid-texture"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.2,
          pointerEvents: "none",
        }}
      />

      <div
        className="grid grid-cols-1 mdlg:grid-cols-2"
        style={{
          gap: `clamp(${tokens.spacing[48]}px, 8vw, ${tokens.spacing[80]}px)`,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left */}
        <div>
          <h2
            style={{
              fontFamily: tokens.typography.sectionTitle.font,
              fontWeight: tokens.typography.sectionTitle.weight,
              fontSize: `clamp(${tokens.typography.sectionTitle.sizeMobile}, 5vw, ${tokens.typography.sectionTitle.size})`,
              letterSpacing: tokens.typography.sectionTitle.letterSpacing,
              lineHeight: tokens.typography.sectionTitle.lineHeight,
              color: tokens.colors.textPrimary,
              margin: `0 0 ${tokens.spacing[24]}px 0`,
            }}
          >
            Let's create <SoftHyphenWord>some&shy;thing</SoftHyphenWord>{" "}
            <SoftHyphenWord>ex&shy;cep&shy;tion&shy;al</SoftHyphenWord>.
          </h2>
          <p
            style={{
              fontFamily: tokens.typography.sectionIntro.font,
              fontSize: tokens.typography.sectionIntro.size,
              fontWeight: tokens.typography.sectionIntro.weight,
              lineHeight: tokens.typography.sectionIntro.lineHeight,
              color: tokens.colors.textSecondary,
              marginBottom: "12px",
              maxWidth: "420px",
            }}
          >
            If you'd like to discuss a project, collaborate, or simply say
            hello, feel free to reach out through{" "}
            <a href="mailto:hello@juanbonilla.me" className="inline-link">
              email
            </a>{" "}
            or{" "}
            <a
              href="https://www.linkedin.com/in/juanpablobonilla"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-link"
            >
              LinkedIn
              <span className="sr-only"> (opens in new tab)</span>
            </a>
            .
          </p>
          <p
            style={{
              fontSize: "0.75rem",
              color: tokens.colors.textTertiary,
              lineHeight: 1.7,
              maxWidth: "420px",
            }}
          >
            Bogotá, GMT-5. Usually replies within a day
          </p>
        </div>

        {/* Right: Contact form */}
        <ContactForm />
      </div>
    </section>
  )
}
