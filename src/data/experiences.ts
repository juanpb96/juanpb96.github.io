export interface Experience {
  role: string
  company: string
  period: string
  location: string
  description: string
  achievements: string[]
  tags: string[]
}

export function isCurrentExperience(exp: Experience): boolean {
  return exp.period.toLowerCase().includes('present')
}

export const experiences: Experience[] = [
  {
    role: 'Senior Frontend Engineer',
    company: 'Acme Studio',
    period: '2025 - 2026',
    location: 'Remote',
    description: 'Building modern web platforms and design systems focused on accessibility, performance, and developer experience.',
    achievements: [
      'Developed scalable component libraries.',
      'Improved Lighthouse performance score to 98+.',
      'Reduced bundle size by 35%.',
      'Collaborated closely with UX and Product teams.',
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'Accessibility', 'Storybook'],
  },
  {
    role: 'Frontend Developer',
    company: 'Flux Digital',
    period: '2021 - 2023',
    location: 'Madrid, Spain',
    description: 'Designed and implemented enterprise dashboards and internal platforms with a focus on maintainability.',
    achievements: [
      'Built reusable UI architecture.',
      'Migrated legacy applications.',
      'Improved Core Web Vitals.',
      'Introduced automated testing.',
    ],
    tags: ['React', 'Redux', 'Jest', 'Tailwind'],
  },
  {
    role: 'Junior Frontend Developer',
    company: 'Creative Labs',
    period: '2019 - 2021',
    location: 'Barcelona',
    description: 'Started career building consumer-facing web products. Focused on responsive layout and cross-browser compatibility.',
    achievements: [
      'Shipped 12 production features.',
      'Established CSS architecture conventions.',
      'Mentored two intern developers.',
      'Achieved 100% accessibility audit pass rate.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Sass'],
  },
]
