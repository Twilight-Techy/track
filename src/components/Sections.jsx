import React from 'react'
import { FadeUp, SectionHead, Icon, Arrow, EASE } from '../lib/ui.jsx'
import { motion, useScroll, useSpring } from 'framer-motion'

/* ================= PROBLEM ================= */

const PROBLEMS = [
  { icon: 'cash', t: 'Revenue & Expenses', d: 'Money moves in and out across accounts, notebooks and apps, never in one place.' },
  { icon: 'eye', t: 'Customer Visibility', d: 'You know your regulars, but not how their buying is quietly changing.' },
  { icon: 'box', t: 'Inventory & Outputs', d: 'Stock and output get tracked in fragments, so surprises arrive late.' },
  { icon: 'compass', t: 'Decision Making', d: 'Choices get made on memory and mood instead of a clear picture.' }
]

export function Problem() {
  return (
    <section className="section bg-cream" id="problem">
      <div className="container">
        <SectionHead
          eyebrow="The problem"
          title="When your business information is everywhere, getting the full picture takes work."
        />
        <div className="p-grid">
          {PROBLEMS.map((p, i) => (
            <FadeUp key={p.t} delay={i * 0.09}>
              <article className="p-card" data-hover>
                <div className="p-card-top">
                  <span className="icon-wrap">
                    <Icon name={p.icon} size={20} />
                  </span>
                  <span className="idx">0{i + 1}</span>
                </div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= APPROACH ================= */

const STEPS = [
  { t: 'Add financial data', d: 'Connect accounts or record sales and expenses in seconds.' },
  { t: 'Track revenue & expenses', d: 'Money in, money out, structured automatically.' },
  { t: 'Monitor cashflow', d: 'See what you have on hand and what is coming next.' },
  { t: 'Identify risks', d: 'Flags surface the changes that deserve your attention.' },
  { t: 'Stay aligned', d: 'Share one picture with the people who matter.' }
]

const OUTCOMES = ['Structured daily visibility', 'Business trends, tracked weekly', 'Decisions made with confidence']

export function Approach() {
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 55%'] })
  const line = useSpring(scrollYProgress, { stiffness: 70, damping: 20 })
  return (
    <section className="section bg-mist" id="approach">
      <div className="container app-grid">
        <div className="app-left">
          <SectionHead
            eyebrow="The TRACK approach"
            title="A simpler way to understand your business."
            sub="TRACK brings everything into one place and turns it into a picture you can actually read."
          />
          <FadeUp delay={0.35}>
            <div className="app-card" data-hover>
              <span className="app-mark">T</span>
              <b className="serif">TRACK</b>
              <p>Your business in one simple, clear view.</p>
            </div>
          </FadeUp>
        </div>
        <div className="app-right" ref={ref}>
          <motion.span className="app-line" style={{ scaleY: line }} aria-hidden="true" />
          {STEPS.map((s, i) => (
            <FadeUp key={s.t} delay={i * 0.06}>
              <div className="step-row" data-hover>
                <span className="step-idx">0{i + 1}</span>
                <div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </div>
            </FadeUp>
          ))}
          <FadeUp delay={0.2}>
            <div className="app-outcomes">
              <span className="lbl">The result</span>
              <ul className="checks">
                {OUTCOMES.map((o) => (
                  <li key={o}>
                    <span className="row-check">
                      <Icon name="check" size={12} />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ================= BENEFITS ================= */

const BENEFITS = [
  { icon: 'cash', t: 'Understand cash position', d: 'See what comes in, what goes out, and what is actually left.' },
  { icon: 'chart', t: 'See business patterns', d: 'Weekly and monthly rhythms surface, so you can plan around them.' },
  { icon: 'users', t: 'Track customer activity', d: 'Know who buys, how often, and the moment something changes.' },
  { icon: 'flag', t: 'Identify important changes', d: 'Thoughtful flags surface the moments that deserve your attention.' },
  { icon: 'target', t: 'Make clearer decisions', d: 'Trade guesses for a structured picture you can rely on.' }
]

export function Benefits({ scrollTo }) {
  return (
    <section className="section bg-cream" id="benefits">
      <div className="container">
        <SectionHead
          eyebrow="Core benefits"
          title="Understand your business more clearly."
          sub="Six shifts you feel within the first weeks of using TRACK."
        />
        <div className="b-grid">
          {BENEFITS.map((b, i) => (
            <FadeUp key={b.t} delay={(i % 3) * 0.08}>
              <article className="p-card b-card" data-hover>
                <div className="p-card-top">
                  <span className="icon-wrap">
                    <Icon name={b.icon} size={20} />
                  </span>
                  <span className="idx">0{i + 1}</span>
                </div>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </article>
            </FadeUp>
          ))}
          <FadeUp delay={0.16}>
            <article className="b-dark" data-hover>
              <Icon name="spark" size={22} />
              <p className="serif">
                Businesses that understand themselves see problems earlier, invest smarter, and grow with confidence.
              </p>
              <a
                href="#how"
                className="b-link"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#how')
                }}
              >
                See how the transformation works <Arrow size={13} />
              </a>
            </article>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
