import { tokens } from "../../tokens"

import { ContentContainer } from "../layout/ContentContainer"

import { GithubIcon } from "../icons/GithubIcon"

import { IconButton } from "../shared/IconButton"

import { LinkedinIcon } from "../icons/LinkedinIcon"

// Read once at module load rather than during render (react/purity).
const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${tokens.colors.border}`,

        fontSize: "13px",

        color: tokens.colors.textTertiary,

        width: "100vw",

        marginLeft: "calc(50% - 50vw)",

        marginRight: "calc(50% - 50vw)",
      }}
    >
      <ContentContainer>
        <div
          className="px-container-mobile md:px-container-desktop flex flex-col gap-2 md:flex-row md:items-center md:justify-between"
          style={{
            paddingTop: `${tokens.spacing[24]}px`,

            paddingBottom: `${tokens.spacing[24]}px`,
          }}
        >
          <span>
            {year} · Designed & developed by{" "}
            <span style={{ color: tokens.colors.textSecondary }}>
              Juan Bonilla
            </span>
          </span>
          {/* Each IconButton is a 44px tap target around an 18px glyph, so
              the first glyph sits (44 - 18) / 2 = 13px in from the button's
              edge. In the stacked mobile layout, pull the row back by that
              inset so the glyph lines up with the copy above it. */}
          <div className="flex items-center gap-2 -ml-[13px] md:ml-0">
            <IconButton
              href="https://www.linkedin.com/in/juanpablobonilla"
              ariaLabel="View LinkedIn profile"
              tooltip="LinkedIn"
            >
              <LinkedinIcon />
            </IconButton>
            <IconButton
              href="https://github.com/juanpb96"
              ariaLabel="View GitHub profile"
              tooltip="GitHub"
            >
              <GithubIcon />
            </IconButton>
          </div>
        </div>
      </ContentContainer>
    </footer>
  )
}
