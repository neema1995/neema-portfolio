import { About } from '@/components/sections/About'
import { Achievements } from '@/components/sections/Achievements'
import { Contact } from '@/components/sections/Contact'
import { Education } from '@/components/sections/Education'
import { Experience } from '@/components/sections/Experience'
import { Footer } from '@/components/sections/Footer'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { BackToTop } from '@/components/shared/BackToTop'
import { Loader } from '@/components/shared/Loader'
import { NavBar } from '@/components/ui/NavBar'

/*
 * Single-page portfolio. Section order matches the navigation in
 * data/personal.ts, and each section owns its own <section id>.
 *
 * NOTE: a GitHub Stats section is intentionally absent — the source resume
 * lists no GitHub profile. See data/personal.ts for the related TODO.
 */
export default function HomePage() {
  return (
    <>
      <Loader />
      <NavBar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Education />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  )
}
