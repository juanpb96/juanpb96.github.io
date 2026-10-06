import creativeAgencyHero from "../assets/projects/creative-agency-hero.webp"
import githubSearchHero from "../assets/projects/github-search-hero.webp"
import spaceTourismHero from "../assets/projects/space-tourism-hero.webp"

export interface Project {
  title: string
  description: string
  tags: string[]
  liveUrl: string
  githubUrl: string
  image: string
  imageAlt: string
  // Zooms into screenshots whose subject is small inside a lot of empty
  // page, so it still reads at thumbnail size.
  imageScale?: number
}

// The first project is the featured one; the rest render as "Also built"
// rows.
export const projects: Project[] = [
  {
    title: "Space Tourism Website",
    description:
      "Multi-page space tourism site: home, destination, crew, and technology, with client-side routing and Storybook-driven component development. Animated with Framer Motion.",
    tags: ["React", "TypeScript", "Framer Motion", "React Router", "Storybook"],
    liveUrl: "/FEM_space-tourism-website/home",
    githubUrl: "https://github.com/juanpb96/FEM_space-tourism-website",
    image: spaceTourismHero,
    imageAlt: "Space Tourism Website landing page",
  },
  {
    title: "GitHub User Search App",
    description:
      "Profile search with light/dark themes. When a search fails, focus moves to the error message.",
    tags: ["React", "Redux", "SCSS"],
    liveUrl: "/FEM_github-user-search-app/",
    githubUrl: "https://github.com/juanpb96/FEM_github-user-search-app",
    image: githubSearchHero,
    imageAlt: "GitHub User Search App result card",
    imageScale: 2.4,
  },
  {
    title: "Creative Agency Single Page Site",
    description:
      "Layered landing page with an image carousel built with proper ARIA roles.",
    tags: ["HTML5", "Tailwind", "JavaScript"],
    liveUrl: "/FEM_creative-single-page-site/",
    githubUrl: "https://github.com/juanpb96/FEM_creative-single-page-site",
    image: creativeAgencyHero,
    imageAlt: "Creative Agency site hero with headline and team photo",
  },
]
