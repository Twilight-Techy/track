import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { EASE, FadeUp, MaskWords, Eyebrow, Magnetic, Arrow, Icon, CountStat } from '../lib/ui.jsx'

const DECISIONS = [
  { t: 'Restocked best-selling line', d: 'Mon' },
  { t: 'Paused underperforming ad', d: 'Wed' },
  { t: 'Negotiated supplier terms', d: 'Fri' }
]

export function Hero({ ready, scrollTo }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rX = useTransform(my, [-0.5, 0.5], [7, -7])
  const rY = useTransform(mx, [-0.5, 0.5], [-9, 9])
  const sX = useSpring(rX, { stiffness: 90, damping: 16 })
  const sY = useSpring(rY, { stiffness: 90, damping: 16 })

  const onMove = (e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }
  const go = (e, hash) => {
    e.preventDefault()
    scrollTo(hash)
  }

  return (
    <section className="hero" id="top" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="hero-lines" aria-hidden="true">
        <i /><i /><i /><i /><i />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <FadeUp play={ready} y={14}>
            <Eyebrow tone="light">Business clarity platform</Eyebrow>
          </FadeUp>
          <h1 className="h1">
            <MaskWords
              play={ready}
              delay={0.15}
              text="Get a clearer picture of what's happening in your business."
              accent={['business.']}
            />
          </h1>
          <FadeUp play={ready} delay={0.55}>
            <p className="hero-sub">
              TRACK brings your financial and operational information together into one simple, structured view — so you
              can understand performance, spot issues early, and make decisions with confidence.
            </p>
          </FadeUp>
          <FadeUp play={ready} delay={0.7}>
            <div className="hero-cta">
              <Magnetic>
                <a className="btn btn-gold" href="#waitlist" onClick={(e) => go(e, '#waitlist')}>
                  Create Free Business Report <Arrow />
                </a>
              </Magnetic>
              <Magnetic>
                <a className="btn btn-ghost" href="#health" onClick={(e) => go(e, '#health')}>
                  Book a Business Health Session <Arrow />
                </a>
              </Magnetic>
            </div>
          </FadeUp>
          <FadeUp play={ready} delay={0.85}>
            <p className="hero-note">Free to start · No card required · Built for real businesses</p>
          </FadeUp>
        </div>

        <div className="hero-visual">
          <motion.div
            className="dash-card tilt"
            style={{ rotateX: sX, rotateY: sY }}
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
            data-hover
          >
            <div className="dash-top">
              <span className="d-dot r" /><span className="d-dot y" /><span className="d-dot g" />
              <span className="dash-title">TRACK — Overview</span>
              <span className="dash-live"><i />Live</span>
            </div>
            <div className="dash-stats cols-3">
              <CountStat label="Revenue" value={4.2} prefix="₦" suffix="M" decimals={1} note="+12% this month" tone="up" play={ready} />
              <CountStat label="Expenses" value={1.9} prefix="₦" suffix="M" decimals={1} note="−4% this month" tone="up" play={ready} />
              <CountStat label="Net position" value={2.3} prefix="₦" suffix="M" decimals={1} note="+18% this month" tone="up" play={ready} />
            </div>
            <div className="dash-list">
              <span className="lbl">Recent decisions</span>
              {DECISIONS.map((row, i) => (
                <motion.div
                  key={row.t}
                  className="list-row"
                  initial={{ opacity: 0, x: 24 }}
                  animate={ready ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 + i * 0.12, duration: 0.7, ease: EASE }}
                >
                  <span className="row-check"><Icon name="check" size={12} /></span>
                  <span className="row-t">{row.t}</span>
                  <span className="row-d">{row.d}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="chip chip-a"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
          >
            <Icon name="pulse" size={15} /> Health score <b>72</b>
          </motion.div>
          <motion.div
            className="chip chip-b"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.35, duration: 0.8, ease: EASE }}
          >
            <b>₦2.3M</b> net this month ↑
          </motion.div>
        </div>
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}

/* ---------- gold marquee band ---------- */

const ITEMS = ['Clarity', 'Confidence', 'Control', 'Cashflow', 'Customers', 'Operations']

export function Marquee() {
  const row = (key) => (
    <div className="marquee-half" key={key} aria-hidden={key === 'b'}>
      {ITEMS.map((w) => (
        <span key={w}>
          {w} <em>✦</em>
        </span>
      ))}
    </div>
  )
  return (
    <div className="marquee">
      <div className="marquee-track">
        {row('a')}
        {row('b')}
      </div>
    </div>
  )
}
