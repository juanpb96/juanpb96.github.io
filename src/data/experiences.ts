import colcanLogo from '../assets/experience/colcan.png'
import globantLogo from '../assets/experience/globant.png'
import monksLogo from '../assets/experience/monks.png'

export interface Experience {
  role: string
  company: string
  formerName?: string
  period: string
  description: string
  achievements: string[]
  tags: string[]
  logo?: string
}

export function isCurrentExperience(exp: Experience): boolean {
  return exp.period.toLowerCase().includes('present')
}

export const experiences: Experience[] = [
  {
    role: 'Web UI Developer',
    company: 'Globant',
    period: '2025 - 2026',
    description: 'Contributed to a large-scale desktop-to-web migration, resolving framework-level defects and building shared tooling to standardize workflows across the application.',
    achievements: [
      'Resolved framework-level defects, including React Strict Mode fetch duplication and modal focus traps.',
      'Collaborated on a major desktop-to-web application migration, modernizing complex workflows.',
      'Built a centralized import/export hook to standardize file workflows across multiple pages.',
      'Expanded test coverage for dialog lifecycles and form layout sanitization.',
    ],
    tags: ['React', 'TypeScript', 'CSS', 'Jest', 'Testing Library'],
    logo: globantLogo,
  },
  {
    role: 'Front-end Developer',
    company: 'Monks',
    formerName: 'Zemoga',
    period: '2021 - 2025',
    description: 'Built and maintained pixel-perfect, responsive interfaces within a large-scale design system, combining reusable component architecture with automated end-to-end testing.',
    achievements: [
      'Reduced visual inconsistency reports through rigorous pixel-perfect comparison against design specs.',
      'Adapted complex interfaces across multiple viewports while navigating a large-scale design system.',
      'Built reusable component architecture combining functional components with custom hooks.',
      'Automated end-to-end user journey validation with Playwright.',
    ],
    tags: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS', 'Playwright'],
    logo: monksLogo,
  },
  {
    role: 'Front-end Developer',
    company: 'Colcan',
    period: '2021 - 2021',
    description: 'Developed Angular-based user interfaces connected to backend REST APIs, using Git for version control.',
    achievements: [
      'Developed user interfaces using Angular.',
      'Connected UI components to backend REST APIs to fetch and display data.',
      'Used Git for version control.',
    ],
    tags: ['Angular', 'REST APIs', 'Git'],
    logo: colcanLogo,
  },
]
