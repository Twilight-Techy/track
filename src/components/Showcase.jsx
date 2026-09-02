import React, { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { EASE, FadeUp, SectionHead, Icon, Arrow, Magnetic, CountStat, useCountUp } from '../lib/ui.jsx'

/* ================= HOW IT WORKS ================= */

const HOW = [
  { n: '01', t: 'Connect / Record', d: 'Bring sales, expenses and operations into one place — spreadsheets, POS exports or quick entries.' },
  { n: '02', t: 'Understand', d: 'TRACK structures everything into a clear, readable view of your business.' },
  { n: '03', t: 'Identify', d: 'Patterns, risks and opportunities surface on their own.' },
  { n: '04', t: 'Act', d: 'Decide with confidence — and watch the picture improve week by week.' }
]

export function HowItWorks() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 65%'] })
  const scaleX = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })
  return (
    <section className="section bg-paper" id="how">
      <div className="container">
        <SectionHead
          eyebrow="How it works"
          title="From business information to clearer decisions."
          sub="Four steps from scattered information to confident decisions."
        />
        <div className="how" ref={ref}>
          <span className="how-base" aria-hidden="true" />
          <motion.span className="how-progress" style={{ scaleX }} aria-hidden="true" />
          <div className="how-grid">
            {HOW.map((s, i) => (
              <FadeUp key={s.n} delay={i * 0.1}>
                <div className="how-step" data-hover>
                  <span className="how-num serif">{s.n}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================= SNAPSHOT ================= */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const REV = [3.1, 3.4, 3.2, 3.9, 4.3, 4.8]
const EXP = [2.4, 2.2, 2.5, 2.2, 2.3, 2.1]

const HIGHLIGHTS = [
  'Revenue up 12% vs last month',
  'Expenses within budget for a third month',
  'Cash runway healthy at 5.2 months',
  'Two flags need your attention this week'
]

export function Snapshot() {
  return (
    <section className="section bg-cream" id="snapshot">
      <div className="container">
        <SectionHead
          eyebrow="Business health snapshot"
          title="Your business, in one clearer view."
          sub="Sample view — the weekly snapshot of a business running on TRACK."
        />
        <FadeUp delay={0.15} y={44}>
          <div className="dash" data-hover>
            <div className="dash-top">
              <span className="d-dot r" /><span className="d-dot y" /><span className="d-dot g" />
              <span className="dash-title">TRACK — Business Snapshot · Week 24</span>
              <span className="dash-live"><i />Updated today</span>
            </div>
            <div className="dash-body">
              <div className="dash-stats cols-6">
                <CountStat label="Revenue" value={4.8} prefix="₦" suffix="M" decimals={1} note="+12%" tone="up" />
                <CountStat label="Expenses" value={2.1} prefix="₦" suffix="M" decimals={1} note="on budget" tone="up" />
                <CountStat label="Net position" value={2.7} prefix="₦" suffix="M" decimals={1} note="+18%" tone="up" />
                <CountStat label="Cash on hand" value={940} prefix="₦" suffix="K" note="5.2 mo runway" tone="up" />
                <CountStat label="Events this week" value={48} note="12 need review" tone="down" />
                <CountStat label="Flags raised" value={3} note="2 to review" tone="down" />
              </div>
              <div className="chart-row">
                <div className="chart-panel">
                  <div className="chart-head">
                    <span className="lbl">Revenue & Expenses</span>
                    <span className="chart-legend">
                      <i className="rev" /> Revenue <i className="exp" /> Expenses
                    </span>
                  </div>
                  <div className="bars">
                    {MONTHS.map((m, i) => (
                      <div className="bar-group" key={m}>
                        <motion.span
                          className="bar rev"
                          style={{ height: `${(REV[i] / 5) * 100}%` }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease: EASE }}
                        />
                        <motion.span
                          className="bar exp"
                          style={{ height: `${(EXP[i] / 5) * 100}%` }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true, margin: '-60px' }}
                          transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease: EASE }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="bar-labels">
                    {MONTHS.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
                <div className="highlights">
                  <span className="lbl">Snapshot highlights</span>
                  {HIGHLIGHTS.map((h, i) => (
                    <FadeUp key={h} delay={0.2 + i * 0.08} y={14}>
                      <div className="h-row">
                        <span className="row-check">
                          <Icon name="check" size={12} />
                        </span>
                        {h}
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ================= HEALTH SCORE ================= */

const DIMS = [
  { icon: 'cash', t: 'Cash', v: 81 },
  { icon: 'users', t: 'Customers', v: 68 },
  { icon: 'box', t: 'Operations', v: 74 },
  { icon: 'heart', t: 'People', v: 66 },
  { icon: 'chart', t: 'Growth', v: 71 },
  { icon: 'grid', t: 'Structure', v: 63 }
]

function Gauge() {
  const C = 2 * Math.PI * 52
  const [ref, n] = useCountUp(72, { duration: 1.8 })
  return (
    <div className="gauge-wrap">
      <svg viewBox="0 0 120 120" className="gauge" aria-hidden="true">
        <circle cx="60" cy="60" r="52" className="gauge-track" />
        <motion.circle
          cx="60"
          cy="60"
          r="52"
          className="gauge-fill"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C * (1 - 0.72) }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.8, ease: EASE }}
        />
      </svg>
      <div className="gauge-num">
        <b ref={ref}>{n}</b>
        <small>/ 100</small>
        <span>Business Health Score</span>
      </div>
    </div>
  )
}

export function Health({ scrollTo }) {
  return (
    <section className="section bg-navy" id="health">
      <div className="container health-grid">
        <div>
          <SectionHead
            eyebrow="Business health score"
            tone="light"
            title="How well do you understand your business today?"
            sub="Take the free assessment and get your Business Health Score instantly — across the six dimensions every healthy business tracks."
          />
          <FadeUp delay={0.3}>
            <Magnetic>
              <a
                className="btn btn-gold"
                href="#waitlist"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#waitlist')
                }}
              >
                Check Your Business Health <Arrow />
              </a>
            </Magnetic>
          </FadeUp>
          <div className="dims">
            {DIMS.map((d, i) => (
              <FadeUp key={d.t} delay={0.35 + i * 0.06} y={16}>
                <div className="dim" data-hover>
                  <Icon name={d.icon} size={17} />
                  <span>{d.t}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        <FadeUp delay={0.2} y={48}>
          <div className="score-card" data-hover>
            <div className="score-head">
              <div>
                <span className="lbl on-dark">A snapshot of your business</span>
                <b className="serif">Clarity, quantified.</b>
              </div>
              <span className="score-badge"><Icon name="shield" size={16} /> Free assessment</span>
            </div>
            <Gauge />
            <div className="score-bars">
              {DIMS.map((d, i) => (
                <div className="srow" key={d.t}>
                  <span className="srow-l">{d.t}</span>
                  <span className="track">
                    <motion.i
                      initial={{ width: 0 }}
                      whileInView={{ width: `${d.v}%` }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 1.1, delay: 0.2 + i * 0.08, ease: EASE }}
                    />
                  </span>
                  <span className="srow-v">{d.v}</span>
                </div>
              ))}
            </div>
            <p className="score-foot">Based on 24 questions · takes under 4 minutes</p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
