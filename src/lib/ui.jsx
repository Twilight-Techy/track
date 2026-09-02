import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1]

/* ---------- small building blocks ---------- */

export function Eyebrow({ children, tone = 'gold' }) {
  return (
    <span className={`eyebrow tone-${tone}`}>
      <i />
      {children}
    </span>
  )
}

export function FadeUp({ children, delay = 0, y = 26, play = true, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView && play ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/* Word-by-word line-mask reveal for display headings */
export function MaskWords({ text, accent = [], delay = 0, stagger = 0.035, play = true, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px' })
  const words = String(text).split(' ')
  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="mask">
            <motion.span
              className={'mask-inner' + (accent.includes(w) ? ' accent' : '')}
              initial={{ y: '115%' }}
              animate={inView && play ? { y: '0%' } : { y: '115%' }}
              transition={{ duration: 1.05, delay: delay + i * stagger, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>{' '}
        </React.Fragment>
      ))}
    </span>
  )
}

export function SectionHead({ eyebrow, title, accent = [], sub, tone = 'gold', className = '' }) {
  return (
    <div className={`shead ${className}`}>
      <FadeUp>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </FadeUp>
      <h2 className="h2">
        <MaskWords text={title} accent={accent} delay={0.08} />
      </h2>
      {sub ? (
        <FadeUp delay={0.28}>
          <p className="s-sub">{sub}</p>
        </FadeUp>
      ) : null}
    </div>
  )
}

/* ---------- count-up numbers ---------- */

export function useCountUp(target, { duration = 1.7, decimals = 0, play = true } = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px 0px' })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView || !play) return
    const c = animate(0, target, { duration, ease: EASE, onUpdate: (x) => setV(x) })
    return () => c.stop()
  }, [inView, play, target, duration])
  return [ref, v.toFixed(decimals)]
}

export function CountStat({ label, value, prefix = '', suffix = '', decimals = 0, note, tone = 'down', play = true }) {
  const [ref, n] = useCountUp(value, { decimals, play })
  return (
    <div className="stat" data-hover>
      <span className="lbl">{label}</span>
      <b ref={ref}>
        {prefix}
        {n}
        {suffix}
      </b>
      {note ? <span className={`delta ${tone}`}>{note}</span> : null}
    </div>
  )
}

/* ---------- magnetic hover ---------- */

export function Magnetic({ children, strength = 0.2, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.2 })
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.2 })
  const onMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.div ref={ref} className={className} style={{ x: sx, y: sy, display: 'inline-block' }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  )
}

/* ---------- icons ---------- */

const ICONS = {
  cash: (
    <>
      <rect x="2.5" y="6.5" width="19" height="13" rx="2.5" />
      <circle cx="12" cy="13" r="3" />
      <path d="M6.2 10.2v.01M17.8 15.8v.01" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20v-8M9.3 20V5.5M14.6 20v-6M20 20V9" />
      <path d="M2.5 20h19" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  box: (
    <>
      <path d="M12 3l8.5 4.5v9L12 21l-8.5-4.5v-9L12 3Z" />
      <path d="M3.5 7.5L12 12l8.5-4.5M12 12v9" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.8 9.2-1.8 4.6-4.6 1.8 1.8-4.6 4.6-1.8Z" />
    </>
  ),
  pulse: <path d="M3 12h4l2.5-6 4 12L16 12h5" />,
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5" />
      <path d="M15.5 5.6a3.5 3.5 0 0 1 0 5.8M17.5 14.4c2 .7 3.2 2.3 3.6 4.6" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4c4-2 7 2 11 0v9c-4 2-7-2-11 0" />
    </>
  ),
  spark: <path d="M12 3l1.9 5.6L20 10.5l-6.1 1.9L12 18l-1.9-5.6L4 10.5l6.1-1.9L12 3Z" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3.5 12.5 8.5 4.7 8.5-4.7M3.5 16.5 12 21.2l8.5-4.7" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2.2 2.2 4.3-4.4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-8 8H4l1.7-3.4A8 8 0 1 1 21 12Z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 1 3.6 10.8c-.7.6-1.1 1.3-1.3 2.2h-4.6c-.2-.9-.6-1.6-1.3-2.2A6 6 0 0 1 12 3Z" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-9.3-9.2C1.5 7.6 3.6 4.5 7 4.5c2.1 0 3.9 1.2 5 3 1.1-1.8 2.9-3 5-3 3.4 0 5.5 3.1 4.3 6.3C19.5 15.4 12 20 12 20Z" />
}

export function Icon({ name, size = 22, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}

export function Arrow({ size = 15 }) {
  return (
    <svg className="btn-arrow" width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
