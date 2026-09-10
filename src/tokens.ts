// ─── Design tokens (mirrors CSS custom properties) ───────────────────────────

const colors = {
  bg: '#0a0b0d',
  surface: '#111316',
  surfaceRaised: '#16191f',
  border: 'rgba(255,255,255,0.07)',
  borderStrong: 'rgba(255,255,255,0.13)',
  textPrimary: '#eef0f4',
  textSecondary: '#8b909a',
  textTertiary: '#4a4f5a',
  accent: '#4d9cf8',
  accentDim: 'rgba(77,156,248,0.18)',
  accentGlow: 'rgba(77,156,248,0.10)',
  accentBorder: 'rgba(77,156,248,0.3)',
} as const;

const fonts = {
  display: "'Instrument Sans', sans-serif",
  mono: "'JetBrains Mono', monospace",
  body: "'Inter', sans-serif",
} as const;

const typography = {
  heroTitle: {
    font: fonts.display,
    size: 88,
    sizeMobile: 56,
    weight: 700,
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
  },
  sectionTitle: {
    font: fonts.display,
    size: 64,
    sizeMobile: 40,
    weight: 700,
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
  },
  cardTitleLarge: {
    font: fonts.display,
    size: 28,
    weight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  cardTitleDefault: {
    font: fonts.display,
    size: 22,
    weight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
  },
  body: {
    font: fonts.body,
    size: 16,
    weight: 400,
    lineHeight: 1.6,
    letterSpacing: 0,
  },
  navigation: {
    font: fonts.body,
    size: 16,
    weight: 500,
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },
  metaTags: {
    font: fonts.mono,
    size: 12,
    weight: 500,
    lineHeight: 1.33,
    letterSpacing: 0,
  },
} as const;

const spacing = {
  4: 4,
  8: 8,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  48: 48,
  64: 64,
  80: 80,
  120: 120,
} as const;

const radius = {
  sm: 10,
  md: 16,
  lg: 20,
  full: 999,
} as const;

const container = {
  maxWidth: 1500,
} as const;

const zIndex = {
  overlay: 90,
  nav: 100,
} as const;

export const tokens = {
  colors,
  fonts,
  typography,
  spacing,
  radius,
  container,
  zIndex,
} as const;
