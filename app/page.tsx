import { Navbar } from "@/components/site/navbar"
import { Hero } from "@/components/site/hero"
import { About } from "@/components/site/about"
import { Skills } from "@/components/site/skills"
import { Projects } from "@/components/site/projects"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
