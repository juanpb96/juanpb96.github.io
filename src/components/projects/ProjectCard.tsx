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
  fontSize: `${tokens.typography.metaTags.size}px`,
  fontWeight: tokens.typography.metaTags.weight,
  lineHeight: tokens.typography.metaTags.lineHeight,
  letterSpacing: tokens.typography.metaTags.letterSpacing,
}

const descriptionStyle: CSSProperties = {
  fontSize: "14px",
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
    fontSize: `${type.size}px`,
    fontWeight: type.weight,
    lineHeight: type.lineHeight,
    letterSpacing: type.letterSpacing,
    color: tokens.colors.textPrimary,
    margin: 0,
  }
}

export function ProjectCard({ number, project, large }: ProjectCardProps) {
  const { title, description, tags, liveUrl, githubUrl } = project

  const image = (
    <div
      className="aspect-[16/10] overflow-hidden"
      style={{
        borderRadius: `${large ? tokens.radius.md : tokens.radius.sm}px`,
        border: `1px solid ${tokens.colors.border}`,
      }}
    >
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: project.imageScale
            ? `scale(${project.imageScale})`
            : undefined,
        }}
      />
    </div>
  )

  if (large) {
    return (
      <article className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[3fr_2fr] lg:gap-12">
        {image}
        <div
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
          <div className="flex flex-col gap-4 md:flex-row">
            <Button
              variant="primary"
              href={liveUrl}
              external
              className="w-full md:w-auto"
            >
              View live site
              <span className="sr-only">: {title}</span>
              <ArrowUpRightIcon className="button-arrow button-arrow-diagonal" />
            </Button>
            <Button
              variant="secondary"
              href={githubUrl}
              external
              className="w-full md:w-auto"
            >
              View code
              <span className="sr-only">: {title}</span>
              <GithubIcon size={16} />
            </Button>
          </div>
        </div>
      </article>
    )
  }

  // Row: stacked below md; thumbnail beside the stacked copy from md; one
  // line of columns from lg, where the tags tuck under the title. Grid areas
  // move the tags between those spots without duplicating them in the DOM.
  return (
    <article className="grid grid-cols-1 gap-y-2 md:grid-cols-[180px_minmax(0,1fr)] md:gap-x-6 md:[grid-template-areas:'thumb_num'_'thumb_title'_'thumb_desc'_'thumb_tags'_'thumb_links'] lg:grid-cols-[180px_auto_minmax(0,1fr)_minmax(0,1.2fr)_auto] lg:gap-x-8 lg:[grid-template-areas:'thumb_num_title_desc_links'_'thumb_num_tags_desc_links']">
      <div className="mb-2 md:mb-0 md:self-start md:[grid-area:thumb] lg:self-center">
        {image}
      </div>
      <span
        className="md:[grid-area:num] lg:self-center"
        style={{ ...numberStyle, color: tokens.colors.textTertiary }}
      >
        {number}
      </span>
      <h3
        className="md:[grid-area:title] lg:self-end"
        style={titleStyle(false)}
      >
        {title}
      </h3>
      <p
        className="mt-2 md:[grid-area:desc] lg:mt-0 lg:self-center"
        style={descriptionStyle}
      >
        {description}
      </p>
      <div className="mt-2 md:[grid-area:tags] lg:mt-0 lg:self-start">
        <TagList tags={tags} />
      </div>
      <div
        className="mt-2 flex gap-6 md:[grid-area:links] lg:mt-0 lg:self-center"
        style={{
          fontFamily: tokens.fonts.body,
          fontSize: "14px",
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
          <GithubIcon size={14} />
        </a>
      </div>
    </article>
  )
}
