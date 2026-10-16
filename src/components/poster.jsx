import { useEffect, useMemo, useRef, useState } from 'react'
import { img } from '../asset'

// Every page is laid out on the design's own 853 x 1280 grid. P() turns a design
// pixel position into a percentage, so everything scales together with the card.
export const P = (x, y) => ({ left: `${(x / 853) * 100}%`, top: `${(y / 1280) * 100}%` })
// Delay (seconds) after the card opens; text appears top to bottom
export const T = (s) => ({ '--d': `${s}s` })

export function Txt({ x, y, w = 420, cls = '', d = 2, children, as: Tag = 'div' }) {
  return (
    <Tag className={`rv txt ${cls}`} style={{ ...P(x, y), width: `${(w / 853) * 100}%`, ...T(d) }}>
      {children}
    </Tag>
  )
}

// small gold dash ornament, used on both sides of labels
export const Dash = ({ w = 34 }) => (
  <svg className="dash" width={w} height="8" viewBox="0 0 34 8" aria-hidden="true">
    <path d="M0 4h26" stroke="currentColor" strokeWidth="0.8" />
    <path d="M30 1l3 3-3 3-3-3z" fill="currentColor" />
  </svg>
)

export const Label = ({ children }) => (
  <span className="flex items-center justify-center gap-[0.7em]">
    <Dash />
    <span>{children}</span>
    <Dash />
  </span>
)

export const Rule = ({ y, d = 3 }) => (
  <div className="rv rule" style={{ ...P(428, y), width: `${(290 / 853) * 100}%`, ...T(d) }}>
    <svg viewBox="0 0 60 18" aria-hidden="true">
      <path d="M30 1c-3 5-9 6-14 8 5 2 11 3 14 8 3-5 9-6 14-8-5-2-11-3-14-8z" fill="none" stroke="#b8893b" strokeWidth="1" />
    </svg>
  </div>
)

export const Star = ({ x, y, s = 16, d = 0, cls = '' }) => (
  <svg
    className={`spark ${cls}`}
    style={{ ...P(x, y), width: `${(s / 853) * 100}%`, '--sd': `${d}s` }}
    viewBox="-10 -10 20 20"
    aria-hidden="true"
  >
    <path d="M0-10C1 -3 3 -1 10 0 3 1 1 3 0 10-1 3-3 1-10 0-3-1-1-3 0-10z" fill="#f7d98a" />
  </svg>
)

// Opens when `open` is true, or (auto) when the page scrolls into view.
export function Poster({ open, auto = false, bg = 'eng/bg-plain.jpg', petalCount = 11, label, children }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (!auto || !ref.current) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [auto])
  const on = auto ? seen : open

  // Petals drift down slowly from both top corners
  const petals = useMemo(
    () =>
      Array.from({ length: petalCount }, (_, i) => ({
        left: (i % 2 ? 62 : 4) + ((i * 37) % 34),
        size: 9 + ((i * 7) % 8),
        dur: 14 + ((i * 5) % 9),
        delay: 4 + ((i * 3.3) % 12),
        drift: ((i * 29) % 90) - 40,
        pink: i % 3 !== 0,
      })),
    [petalCount],
  )

  return (
    <section ref={ref} className={`poster ${on ? 'is-open' : ''}`} aria-label={label}>
      <div className="poster-clip">
        <img src={img(bg)} alt="" className="poster-bg" draggable="false" />
        {/* glow behind the deities, breathing softly */}
        <span className="halo" style={{ ...P(148, 345), width: '30%', aspectRatio: '1' }} />
        <span className="halo" style={{ ...P(700, 340), width: '26%', aspectRatio: '1', '--hd': '1.4s' }} />
        <Star x={95} y={262} s={18} d={0.3} />
        <Star x={205} y={300} s={13} d={1.7} />
        <Star x={640} y={268} s={14} d={0.9} />
        <Star x={765} y={300} s={18} d={2.2} />
        {children}
        {[
          [52, 1137, 1],
          [163, 1223, 0.7],
          [803, 1134, 1],
          [686, 1222, 0.7],
        ].map(([x, y, k], i) => (
          <span key={i} className="flame" style={{ ...P(x, y), width: `${((46 * k) / 853) * 100}%`, '--fd': `${i * 0.37}s` }} />
        ))}
        <div className="petals" aria-hidden="true">
          {petals.map((p, i) => (
            <span
              key={i}
              className={`petal ${p.pink ? '' : 'petal-cream'}`}
              style={{ left: `${p.left}%`, width: `${p.size / 8.53}%`, '--dur': `${p.dur}s`, '--pd': `${p.delay}s`, '--drift': `${p.drift}px` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
