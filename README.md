# TRACK · A clearer picture of your business

An award-style marketing site for **TRACK**, a business-clarity platform. Built from a static
design mock and elevated with motion design: preloader, smooth scrolling, line-mask headline
reveals, magnetic buttons, a custom cursor, scroll-linked charts and a business-health gauge.

## Stack

- [React 18](https://react.dev) + [Vite 5](https://vitejs.dev)
- [Framer Motion](https://www.framer.com/motion/): reveals, scroll-linked animation, gauge/charts
- [Lenis](https://github.com/darkroomengineering/lenis): smooth scrolling
- Fraunces (display serif) + Inter (UI) via Google Fonts

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Highlights

- **Preloader** with brand mark + counter, curtain exit
- **Hero** dashboard card with 3D tilt, count-up ₦ stats and floating chips
- **Gold marquee** band, pausable on hover
- **Sticky two-column** "TRACK approach" with a scroll-drawn timeline
- **Scroll-linked progress line** across the four "How it works" steps
- **Animated snapshot dashboard**: bar chart, highlights, count-up metrics
- **Business Health Score**: animated SVG gauge (72/100) + dimension bars
- **Waitlist form** with success state, full-screen mobile menu, custom cursor, grain overlay
- `prefers-reduced-motion` respected throughout

## Structure

```
src/
  lib/ui.jsx            motion primitives (MaskWords, FadeUp, CountStat, Magnetic, icons)
  components/
    Chrome.jsx          cursor · loader · nav · footer
    Hero.jsx            hero + marquee
    Sections.jsx        problem · approach · benefits
    Showcase.jsx        how it works · snapshot · health score
    Closing.jsx         go deeper · why · waitlist · final CTA
  App.jsx               lenis setup + page assembly
  styles.css            design system
```

## Design tokens

Navy `#0d2132` · Gold `#c9972c` · Cream `#f6f1e6`; Fraunces for display, Inter for UI.
