import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'
import { EASE, Magnetic, Arrow } from '../lib/ui.jsx'

export const NAV_LINKS = [
  ['How it works', '#how'],
  ['Benefits', '#benefits'],
  ['Business health', '#health'],
  ['About', '#why']
]

/* ---------- grain overlay ---------- */

export function Noise() {
  return <div className="noise" aria-hidden="true" />
}

/* ---------- custom cursor ---------- */

export function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    let x = -100, y = -100, rx = -100, ry = -100, s = 1, ts = 1, raf
    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      const t = e.target.closest('a, button, [data-hover], input, textarea, label')
      ts = t ? 1.9 : 1
    }
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      s += (ts - s) * 0.18
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${s.toFixed(3)})`
      raf = requestAnimationFrame(loop)
    }
    loop()
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])
  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  )
}

/* ---------- preloader ---------- */

export function Loader({ done }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const c = animate(0, 100, {
      duration: 1.25,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: done
    })
    return () => c.stop()
  }, [done])
  return (
    <motion.div className="loader" exit={{ y: '-100%' }} transition={{ duration: 0.9, ease: EASE }}>
      <div className="loader-inner">
        <motion.span
          className="loader-mark"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          TRACK<span>.</span>
        </motion.span>
        <div className="loader-meta">
          <span>Business clarity platform</span>
          <span className="loader-num">{n}</span>
        </div>
        <div className="loader-bar">
          <div className="loader-bar-fill" style={{ width: `${n}%` }} />
        </div>
      </div>
    </motion.div>
  )
}

/* ---------- navigation ---------- */

export function Nav({ scrollTo }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const go = (e, hash) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(hash)
  }
  return (
    <>
      <header className={`nav ${scrolled || open ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#top" className="logo" onClick={(e) => go(e, '#top')}>
            TRACK<span>.</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map(([label, hash]) => (
              <a key={hash} href={hash} onClick={(e) => go(e, hash)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <Magnetic>
              <a className="btn btn-cream" href="#waitlist" onClick={(e) => go(e, '#waitlist')}>
                Create Free Business Report
                <Arrow />
              </a>
            </Magnetic>
            <button className={`burger ${open ? 'open' : ''}`} aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="container menu-inner">
              {NAV_LINKS.map(([label, hash], i) => (
                <motion.a
                  key={hash}
                  href={hash}
                  className="menu-link"
                  onClick={(e) => go(e, hash)}
                  initial={{ y: 44, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.22 + i * 0.07, duration: 0.6, ease: EASE }}
                >
                  <small>0{i + 1}</small> {label}
                </motion.a>
              ))}
              <motion.a
                href="#waitlist"
                className="btn btn-gold"
                onClick={(e) => go(e, '#waitlist')}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
              >
                Create Free Business Report <Arrow />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ---------- footer ---------- */

export function Footer({ scrollTo }) {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-top">
          <a className="logo" href="#top" onClick={(e) => go(e, '#top')}>
            TRACK<span>.</span>
          </a>
          <p className="foot-tag">One clear picture of your business — so the next decision comes easier.</p>
          <button className="top-btn" onClick={() => scrollTo('#top')} aria-label="Back to top" data-hover>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="foot-links">
          {NAV_LINKS.map(([label, hash]) => (
            <a
              key={hash}
              href={hash}
              onClick={(e) => {
                e.preventDefault()
                scrollTo(hash)
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#waitlist')
            }}
          >
            Waitlist
          </a>
        </div>
        <div className="foot-bottom">
          <span>© 2026 TRACK. All rights reserved.</span>
          <span>Built for clarity.</span>
        </div>
      </div>
    </footer>
  )

  function go(e, hash) {
    e.preventDefault()
    scrollTo(hash)
  }
}
