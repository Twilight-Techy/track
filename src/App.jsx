import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import { Cursor, Noise, Loader, Nav, Footer } from './components/Chrome.jsx'
import { Hero, Marquee } from './components/Hero.jsx'
import { Problem, Approach, Benefits } from './components/Sections.jsx'
import { HowItWorks, Snapshot, Health } from './components/Showcase.jsx'
import { GoDeeper, Why, Waitlist, FinalCTA } from './components/Closing.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  const lenisRef = useRef(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    lenisRef.current = lenis
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const scrollTo = (hash) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(hash === '#top' ? 0 : hash, { offset: -76, duration: 1.4 })
    } else if (hash === '#top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <Cursor />
      <Noise />
      <AnimatePresence>
        {loading && <Loader done={() => setLoading(false)} />}
      </AnimatePresence>
      <Nav scrollTo={scrollTo} />
      <main>
        <Hero ready={!loading} scrollTo={scrollTo} />
        <Marquee />
        <Problem />
        <Approach />
        <Benefits scrollTo={scrollTo} />
        <HowItWorks />
        <Snapshot />
        <Health scrollTo={scrollTo} />
        <GoDeeper scrollTo={scrollTo} />
        <Why />
        <Waitlist />
        <FinalCTA scrollTo={scrollTo} />
      </main>
      <Footer scrollTo={scrollTo} />
    </MotionConfig>
  )
}
