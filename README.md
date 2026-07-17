# GenerEdge — Professional Landing Page

A modern, fully responsive landing page for **GenerEdge, Inc.** — the platform that
connects small business owners with mission-driven lenders (credit unions, CDFIs and
minority banks) for transparent, low-cost financing.

## Highlights

- **Single-page experience** covering the full GenerEdge story: the problem with
  traditional lending, financing options, the streamlined process, lender partnerships,
  the mission, and a lead-capture form (`#form`).
- **Premium fintech design**: dark navy + indigo brand palette, glassmorphism hero card,
  animated gradients, scroll-reveal sections and animated stat counters.
- **Fully responsive** — desktop, tablet and mobile (with slide-down mobile menu).
- **Accessible**: semantic HTML, ARIA labels, keyboard-friendly navigation,
  `prefers-reduced-motion` support.
- **Zero build step** — plain HTML/CSS/JS. Open `index.html` in a browser and it works.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Page markup: hero, problem, financing, process, lenders, about, form, footer |
| `styles.css` | Full design system (custom properties, components, responsive rules) |
| `script.js` | Sticky header, mobile nav, scroll reveals, stat counters, form validation |

## Running locally

```bash
# any static server works, e.g.
python3 -m http.server 8080
# then open http://localhost:8080
```

## Notes

- The lead form validates client-side and currently simulates submission.
  Wire the `submit` handler in `script.js` to your CRM or form endpoint
  (Gravity Forms, HubSpot, etc.) to go live.
- Fonts are loaded from Google Fonts (Sora + Inter) with system-font fallbacks.
