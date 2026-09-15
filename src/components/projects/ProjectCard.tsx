import { useState } from 'react'
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
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={large ? 'pt-8 pb-8 md:pt-5 md:pb-6' : undefined}
      style={{
        borderRadius: `${tokens.radius.lg}px`,
        backgroundColor: tokens.colors.surface,
        border: `1px solid ${hovered ? tokens.colors.borderStrong : tokens.colors.border}`,
        paddingLeft: `${tokens.spacing[large ? 32 : 24]}px`,
        paddingRight: `${tokens.spacing[large ? 32 : 24]}px`,
        paddingTop: large ? undefined : `${tokens.spacing[24]}px`,
        paddingBottom: large ? undefined : `${tokens.spacing[24]}px`,
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? `0 0 40px ${tokens.colors.accentGlow}` : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: `${tokens.spacing[20]}px`,
        height: '100%',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: `${tokens.spacing[16]}px` }}>
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
          className="hidden md:block"
          style={{
            width: '100%',
            aspectRatio: '4 / 3',
            objectFit: 'cover',
            borderRadius: `${tokens.radius.sm}px`,
            border: `1px solid ${tokens.colors.border}`,
          }}
        />
      ) : (
        <img
          src={image}
          alt={imageAlt}
          className="hidden md:block"
          style={{
            width: '100%',
            aspectRatio: '51 / 10',
            objectFit: 'cover',
            borderRadius: `${tokens.radius.sm}px`,
            border: `1px solid ${tokens.colors.border}`,
          }}
        />
      )}

      {/* Description */}
      <p style={{ fontSize: '14px', color: tokens.colors.textSecondary, margin: 0, lineHeight: 1.6 }}>{description}</p>

      {/* Tags + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <div style={{ display: 'flex', gap: `${tokens.spacing[8]}px`, flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: `${tokens.spacing[4]}px 10px`,
                borderRadius: `${tokens.radius.full}px`,
                border: `1px solid ${tokens.colors.border}`,
                backgroundColor: 'rgba(255,255,255,0.03)',
                fontSize: '11px',
                color: tokens.colors.textSecondary,
                fontFamily: tokens.fonts.mono,
              }}
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
