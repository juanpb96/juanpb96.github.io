import { ContactSection } from "./components/contact/ContactSection"

import { ExperienceSection } from "./components/experience/ExperienceSection"

import { Footer } from "./components/footer/Footer"

import { HeroSection } from "./components/hero/HeroSection"

import { PageShell } from "./components/layout/PageShell"

import { SectionDivider } from "./components/layout/SectionDivider"

import { Nav } from "./components/nav/Nav"

import { MAIN_CONTENT_ID, SkipLink } from "./components/nav/SkipLink"

import { ProjectsSection } from "./components/projects/ProjectsSection"

export function App() {
  return (
    <PageShell>
      <SkipLink />
      <Nav />
      <main id={MAIN_CONTENT_ID}>
        <HeroSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <ExperienceSection />
        <SectionDivider />
        <ContactSection />
      </main>
      <Footer />
    </PageShell>
  )
}
