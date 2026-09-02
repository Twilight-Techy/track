import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE, FadeUp, SectionHead, Icon, Arrow, Magnetic, MaskWords, Eyebrow } from '../lib/ui.jsx'

/* ================= GO DEEPER ================= */

const DSTEPS = [
  { t: 'Book a session', d: 'Pick a time that works for you.' },
  { t: 'Get a 1-on-1 breakdown', d: 'We walk your numbers with you, plainly.' },
  { t: 'Ask about trends & flags', d: 'Leave with three clear next steps.' }
]

const CLOSER = ['What is actually working', 'Where money leaks quietly', 'What needs your attention first']

export function GoDeeper({ scrollTo }) {
  return (
    <section className="section bg-mist" id="deeper">
      <div className="container deeper-grid">
        <div>
          <SectionHead
            eyebrow="Go deeper"
            title="Want to go a step further?"
            sub="With a 1-on-1 business health session, we walk through your snapshot together: what's working, what's leaking, and what deserves your attention first."
          />
          <div className="d-steps">
            {DSTEPS.map((s, i) => (
              <FadeUp key={s.t} delay={0.25 + i * 0.09} y={18}>
                <div className="dstep" data-hover>
                  <span className="dnum">{i + 1}</span>
                  <div>
                    <h4>{s.t}</h4>
                    <p>{s.d}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
        <FadeUp delay={0.2} y={40}>
          <div className="closer" data-hover>
            <div className="closer-head">
              <span className="lbl">A closer look</span>
              <span className="icon-wrap">
                <Icon name="search" size={17} />
              </span>
            </div>
            {CLOSER.map((c, i) => (
              <FadeUp key={c} delay={0.3 + i * 0.08} y={14}>
                <div className="closer-row">
                  <span>{c}</span>
                  <Arrow size={13} />
                </div>
              </FadeUp>
            ))}
            <a
              href="#waitlist"
              className="b-link"
              onClick={(e) => {
                e.preventDefault()
                scrollTo('#waitlist')
              }}
            >
              See what's next <Arrow size={13} />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ================= WHY TRACK ================= */

const WHY = [
  { icon: 'eye', t: 'Clear', d: 'One readable picture of the business, not a pile of dashboards.' },
  { icon: 'bulb', t: 'Practical', d: 'Built for how real businesses operate. No jargon, no theatre.' },
  { icon: 'heart', t: 'Thoughtful', d: 'Designed to respect your attention. Only what matters surfaces.' }
]

export function Why() {
  return (
    <section className="section bg-cream" id="why">
      <div className="container">
        <SectionHead eyebrow="Why TRACK" title="Built around understanding the business first." />
        <div className="why-grid">
          {WHY.map((w, i) => (
            <FadeUp key={w.t} delay={i * 0.1}>
              <article className="p-card w-card" data-hover>
                <span className="icon-wrap">
                  <Icon name={w.icon} size={20} />
                </span>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= WAITLIST ================= */

export function Waitlist() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setJoined(true)
  }
  return (
    <section className="section bg-paper" id="waitlist">
      <div className="container">
        <FadeUp y={40}>
          <div className="wait-card" data-hover>
            <div>
              <Eyebrow>Early access</Eyebrow>
              <h2 className="h2">
                <MaskWords text="Be among the first to experience TRACK." delay={0.1} />
              </h2>
              <p className="s-sub">
                We are onboarding a small group of businesses each week. Join the waitlist and we will reach out when
                your place is ready.
              </p>
            </div>
            <div className="wait-right">
              <AnimatePresence mode="wait">
                {joined ? (
                  <motion.div
                    key="ok"
                    className="wait-success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <span className="row-check big">
                      <Icon name="check" size={16} />
                    </span>
                    <div>
                      <b>You're on the list.</b>
                      <p>We'll email you the moment your place opens up.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    className="wait-form"
                    onSubmit={submit}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                  >
                    <label className="sr-only" htmlFor="email">Email address</label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="you@yourbusiness.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Magnetic>
                      <button className="btn btn-gold" type="submit">
                        Join the Waitlist <Arrow />
                      </button>
                    </Magnetic>
                  </motion.form>
                )}
              </AnimatePresence>
              <p className="wait-note">No spam. One email when it's your turn.</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ================= FINAL CTA ================= */

export function FinalCTA({ scrollTo }) {
  const go = (e, hash) => {
    e.preventDefault()
    scrollTo(hash)
  }
  return (
    <section className="section bg-navy final">
      <span className="shape-a" aria-hidden="true" />
      <span className="shape-b" aria-hidden="true" />
      <div className="container final-inner">
        <FadeUp>
          <Eyebrow tone="light">Ready when you are</Eyebrow>
        </FadeUp>
        <h2 className="h2 xl">
          <MaskWords text="Start with a clearer picture of your business." accent={['business.']} delay={0.1} />
        </h2>
        <FadeUp delay={0.35}>
          <p className="s-sub on-dark center">
            Take the free assessment, get your Business Health Score instantly, and see where to focus first.
          </p>
        </FadeUp>
        <FadeUp delay={0.5}>
          <div className="hero-cta center">
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
      </div>
    </section>
  )
}
