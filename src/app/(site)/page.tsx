import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getProjects, getTestimonials } from '@/lib/content'

export const revalidate = 60

export default async function Home() {
  const [projects, testimonials] = await Promise.all([getProjects(), getTestimonials()])
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects projects={projects} />
        <Testimonials testimonials={testimonials} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
