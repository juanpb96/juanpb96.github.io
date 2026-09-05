import { ContactSection } from './components/contact/ContactSection'
import { ExperienceSection } from './components/experience/ExperienceSection'
import { Footer } from './components/footer/Footer'
import { HeroSection } from './components/hero/HeroSection'
import { PageShell } from './components/layout/PageShell'
import { SectionDivider } from './components/layout/SectionDivider'
import { Nav } from './components/nav/Nav'
import { ProjectsSection } from './components/projects/ProjectsSection'

export function App() {
  return (
    <PageShell>
      <Nav />
      <HeroSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider />
      <ExperienceSection />
      <SectionDivider />
      <ContactSection />
      <Footer />
    </PageShell>
  )
}
