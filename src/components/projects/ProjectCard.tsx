import { useState, type CSSProperties } from 'react'
import { tokens } from '../../tokens'
import spaceTourismHero from '../../assets/projects/space-tourism-hero.webp'
import { GithubIcon } from './GithubIcon'
import { GlobeIcon } from './GlobeIcon'
import { IconButton } from './IconButton'

interface ProjectCardProps {
  number: string
  title: string
  description: string
  tags: string[]
  large?: boolean
  liveUrl?: string
  githubUrl?: string
  image?: string
  imageAlt?: string
  mobileImageZoom?: boolean
}

export function ProjectCard({
  number,
  title,
  description,
  tags,
  large,
  liveUrl = '#',
  githubUrl = '#',
  image,
  imageAlt,
  mobileImageZoom,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)
  const [tagsExpanded, setTagsExpanded] = useState(false)
  const hasCollapsibleTags = tags.length > 3

  const tagStyle: CSSProperties = {
    padding: `${tokens.spacing[4]}px 10px`,
    borderRadius: `${tokens.radius.full}px`,
    backgroundColor: 'rgba(255,255,255,0.03)',
    fontSize: '11px',
    fontFamily: tokens.fonts.mono,
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={large ? 'px-6 pt-6 pb-6 lg:px-8 lg:pt-5 lg:pb-6' : 'px-6 pt-6 pb-6'}
      style={{
        borderRadius: `${tokens.radius.lg}px`,
        backgroundColor: tokens.colors.surface,
        border: `1px solid ${hovered ? tokens.colors.borderStrong : tokens.colors.border}`,
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? `0 0 40px ${tokens.colors.accentGlow}` : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: `${tokens.spacing[20]}px`,
        height: '100%',
      }}
    >
      {/* Header */}
      <div
        className="flex flex-col items-start sm:flex-row sm:items-baseline"
        style={{ gap: `${tokens.spacing[16]}px` }}
      >
        <span style={{ fontFamily: tokens.fonts.mono, fontSize: '13px', color: tokens.colors.textTertiary }}>{number}</span>
        <h3
          style={{
            fontFamily: tokens.fonts.display,
            fontWeight: 700,
            fontSize: large ? '28px' : '22px',
            letterSpacing: '-0.02em',
            color: tokens.colors.textPrimary,
            margin: 0,
          }}
        >
          {title}
        </h3>
      </div>

      {/* Mockup */}
      {large ? (
        <img
          src={spaceTourismHero}
          alt="Space Tourism Website landing page"
          className="aspect-[4/3] md:aspect-[30/15] lg:aspect-[4/3]"
          style={{
            width: '100%',
            objectFit: 'cover',
            borderRadius: `${tokens.radius.sm}px`,
            border: `1px solid ${tokens.colors.border}`,
          }}
        />
      ) : (
        <div
          className="aspect-[4/3] md:aspect-[30/15] lg:aspect-[51/10]"
          style={{
            width: '100%',
            overflow: 'hidden',
            borderRadius: `${tokens.radius.sm}px`,
            border: `1px solid ${tokens.colors.border}`,
          }}
        >
          <img
            src={image}
            alt={imageAlt}
            className={mobileImageZoom ? 'scale-[1.8] md:scale-100' : undefined}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      {/* Description */}
      <p style={{ fontSize: '14px', color: tokens.colors.textSecondary, margin: 0, lineHeight: 1.6 }}>{description}</p>

      {/* Tags + CTA */}
      <div
        className="flex flex-col items-start md:flex-row md:items-center md:justify-between"
        style={{ gap: `${tokens.spacing[16]}px`, marginTop: 'auto' }}
      >
        <div style={{ display: 'flex', gap: `${tokens.spacing[8]}px`, flexWrap: 'wrap' }}>
          {(hasCollapsibleTags ? tags.slice(0, 2) : tags).map((tag) => (
            <span key={tag} style={{ ...tagStyle, border: `1px solid ${tokens.colors.border}`, color: tokens.colors.textSecondary }}>
              {tag}
            </span>
          ))}
          {hasCollapsibleTags && (
            <button
              type="button"
              onClick={() => setTagsExpanded((expanded) => !expanded)}
              aria-expanded={tagsExpanded}
              aria-label={tagsExpanded ? 'Show fewer tags' : `Show ${tags.length - 2} more tags`}
              className="project-tag-toggle md:hidden"
              style={{ ...tagStyle, cursor: 'pointer' }}
            >
              {tagsExpanded ? '−' : `+${tags.length - 2}`}
            </button>
          )}
          {hasCollapsibleTags &&
            tags.slice(2).map((tag) => (
              <span
                key={tag}
                className={tagsExpanded ? undefined : 'hidden md:inline'}
                style={{ ...tagStyle, border: `1px solid ${tokens.colors.border}`, color: tokens.colors.textSecondary }}
              >
                {tag}
              </span>
            ))}
        </div>
        <div style={{ display: 'flex', gap: `${tokens.spacing[8]}px` }}>
          <IconButton href={liveUrl} ariaLabel="View live site" tooltip="Live site">
            <GlobeIcon />
          </IconButton>
          <IconButton href={githubUrl} ariaLabel="View source code on GitHub" tooltip="GitHub">
            <GithubIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}
