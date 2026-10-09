import type { CSSProperties } from "react"
import type { Project } from "../../data/projects"
import { tokens } from "../../tokens"
import { ArrowUpRightIcon } from "../icons/ArrowUpRightIcon"
import { GithubIcon } from "../icons/GithubIcon"
import { Button } from "../shared/Button"
import { TagList } from "../shared/TagList"

interface ProjectCardProps {
  number: string
  project: Project
  // Featured layout (image beside the copy, button links) instead of an
  // "Also built" row (thumbnail, text links).
  large?: boolean
}

const numberStyle: CSSProperties = {
  fontFamily: tokens.typography.metaTags.font,
  fontSize: tokens.typography.metaTags.size,
  fontWeight: tokens.typography.metaTags.weight,
  lineHeight: tokens.typography.metaTags.lineHeight,
  letterSpacing: tokens.typography.metaTags.letterSpacing,
}

const descriptionStyle: CSSProperties = {
  fontSize: "0.875rem",
  color: tokens.colors.textSecondary,
  lineHeight: 1.6,
  margin: 0,
}

function titleStyle(large?: boolean): CSSProperties {
  const type = large
    ? tokens.typography.cardTitleLarge
    : tokens.typography.cardTitleDefault
  return {
    fontFamily: type.font,
    fontSize: type.size,
    fontWeight: type.weight,
    lineHeight: type.lineHeight,
    letterSpacing: type.letterSpacing,
    color: tokens.colors.textPrimary,
    margin: 0,
  }
}

export function ProjectCard({ number, project, large }: ProjectCardProps) {
  const { title, description, tags, liveUrl, githubUrl } = project

  // Featured: bleeds to the card's edges (the card clips the corners). From
  // lg it sits beside the copy: its 16:10 ratio sets the row height unless
  // the copy is taller, in which case it stretches and the absolutely
  // positioned image crops to fill. w-full pins the width to the column so a
  // stretched height can't widen it back through the ratio. Rows: a framed
  // 16:10 thumbnail (border in .project-thumb so hover can recolor it).
  const image = (
    <div
      className={
        large
          ? "relative aspect-[16/10] w-full overflow-hidden lg:self-stretch"
          : "project-thumb relative aspect-[16/10] overflow-hidden"
      }
      style={large ? undefined : { borderRadius: `${tokens.radius.sm}px` }}
    >
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        className={large ? "absolute inset-0" : undefined}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: project.imageScale
            ? `scale(${project.imageScale})`
            : undefined,
        }}
      />
      {/* Mouse/touch shortcut to the live site, laid over the image so its
          alt stays exposed. Keyboard and screen reader users get the
          labelled "View live site" link instead. */}
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="project-image-link absolute inset-0"
      />
    </div>
  )

  if (large) {
    return (
      <article
        className="grid grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)]"
        style={{
          backgroundColor: tokens.colors.surface,
          border: `1px solid ${tokens.colors.border}`,
          borderRadius: `${tokens.radius.lg}px`,
        }}
      >
        {image}
        <div
          className="p-6 md:p-8 lg:self-center"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: `${tokens.spacing[20]}px`,
          }}
        >
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-baseline">
            <span style={{ ...numberStyle, color: tokens.colors.accent }}>
              {number}
            </span>
            <h3 style={titleStyle(true)}>{title}</h3>
          </div>
          <p style={descriptionStyle}>{description}</p>
          <TagList tags={tags} />
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              variant="primary"
              href={liveUrl}
              external
              className="w-full sm:w-auto"
            >
              View live site
              <span className="sr-only">: {title}</span>
              <ArrowUpRightIcon className="button-arrow button-arrow-diagonal" />
            </Button>
            <Button
              variant="secondary"
              href={githubUrl}
              external
              className="w-full sm:w-auto"
            >
              View code
              <span className="sr-only">: {title}</span>
              <GithubIcon size="1rem" />
            </Button>
          </div>
        </div>
      </article>
    )
  }

  // Row: stacked below sm; thumbnail beside the stacked copy from sm; one
  // line of columns from lg, where the tags tuck under the title. Grid areas
  // move the tags between those spots without duplicating them in the DOM.
  return (
    <article className="grid grid-cols-1 gap-y-2 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-x-6 sm:[grid-template-areas:'thumb_num'_'thumb_title'_'thumb_desc'_'thumb_tags'_'thumb_links'] lg:grid-cols-[180px_auto_minmax(0,1fr)_minmax(0,1.2fr)_auto] lg:gap-x-8 lg:[grid-template-areas:'thumb_num_title_desc_links'_'thumb_num_tags_desc_links']">
      <div className="mb-2 sm:mb-0 sm:self-start sm:[grid-area:thumb] lg:self-center">
        {image}
      </div>
      <span
        className="sm:[grid-area:num] lg:self-center"
        style={{ ...numberStyle, color: tokens.colors.textTertiary }}
      >
        {number}
      </span>
      <h3
        className="sm:[grid-area:title] lg:self-end"
        style={titleStyle(false)}
      >
        {title}
      </h3>
      <p
        className="mt-2 sm:[grid-area:desc] lg:mt-0 lg:self-center"
        style={descriptionStyle}
      >
        {description}
      </p>
      <div className="mt-2 sm:[grid-area:tags] lg:mt-0 lg:self-start">
        <TagList tags={tags} />
      </div>
      <div
        className="mt-2 flex gap-6 sm:[grid-area:links] lg:mt-0 lg:self-center"
        style={{
          fontFamily: tokens.fonts.body,
          fontSize: "0.875rem",
          fontWeight: 500,
        }}
      >
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          View live site
          <span className="sr-only">: {title} (opens in new tab)</span>
          <ArrowUpRightIcon className="button-arrow button-arrow-diagonal" />
        </a>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          View code
          <span className="sr-only">: {title} (opens in new tab)</span>
          <GithubIcon size="0.875rem" />
        </a>
      </div>
    </article>
  )
}
