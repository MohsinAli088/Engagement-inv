import { useEffect, useState } from 'react'
import { img } from '../asset'

// Opening screen. It waits for the artwork and fonts, then asks for one tap:
// browsers only allow music after a tap, so the same tap opens the card.
export default function Gate({ leaving, onOpen }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    const art = ['eng/bg.jpg', 'eng/ring.png'].map(
      (n) =>
        new Promise((res) => {
          const i = new Image()
          i.onload = i.onerror = res
          i.src = img(n)
        }),
    )
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve()
    Promise.all([...art, fonts]).then(() => alive && setReady(true))
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className={`gate ${leaving ? 'is-leaving' : ''}`} role="dialog" aria-label="Engagement invitation">
      <div className="gate-inner">
        <div className="gate-om" lang="sa" aria-hidden="true">ॐ</div>
        <p className="gate-names">
          Dr. Shiva Shalini
          <span>&amp;</span>
          Dr. Sankalp Shashwat
        </p>
        <p className="gate-sub">invite you to their engagement</p>
        <button type="button" className="gate-btn" disabled={!ready} onClick={onOpen}>
          {ready ? 'Tap to open' : 'Preparing your invitation'}
        </button>
      </div>
    </div>
  )
}
