import creativeAgencyThumb400 from "../assets/projects/creative-agency-thumb-400w.webp?no-inline"
import creativeAgencyThumb800 from "../assets/projects/creative-agency-thumb-800w.webp?no-inline"
import creativeAgencyThumb from "../assets/projects/creative-agency-thumb.webp?no-inline"
import githubSearchThumb400 from "../assets/projects/github-search-thumb-400w.webp?no-inline"
import githubSearchThumb800 from "../assets/projects/github-search-thumb-800w.webp?no-inline"
import githubSearchThumb from "../assets/projects/github-search-thumb.webp?no-inline"
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
  // Width variants of image for an "Also built" row (srcset syntax). Row
  // images are pre-cropped to the row's 16:10 frame; ProjectCard sets sizes
  // from the row layout and imageScale. ?no-inline keeps small variants out
  // of the JS bundle.
  imageSrcSet?: string
}

// The first project is the featured one; the rest render as "Also built"
// rows.
export const projects: Project[] = [
  {
    title: "Space Tourism Website",
    description:
      "Multi-page space tourism site: home, destination, crew, and technology, with client-side routing and Storybook-driven component development. Animated with Framer Motion.",
    tags: ["React", "TypeScript", "Framer Motion", "React Router", "Storybook"],
    liveUrl: "/FEM_space-tourism-website/",
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
    image: githubSearchThumb,
    imageSrcSet: `${githubSearchThumb400} 400w, ${githubSearchThumb800} 800w, ${githubSearchThumb} 1307w`,
    imageAlt: "GitHub User Search App result card",
    imageScale: 2.4,
  },
  {
    title: "Creative Agency Single Page Site",
    description:
      "Branding agency landing page with layered visual design and an image carousel built with proper ARIA roles.",
    tags: ["HTML5", "Tailwind", "JavaScript"],
    liveUrl: "/FEM_creative-single-page-site/",
    githubUrl: "https://github.com/juanpb96/FEM_creative-single-page-site",
    image: creativeAgencyThumb,
    imageSrcSet: `${creativeAgencyThumb400} 400w, ${creativeAgencyThumb800} 800w, ${creativeAgencyThumb} 981w`,
    imageAlt: "Creative Agency site hero with headline and team photo",
  },
]
