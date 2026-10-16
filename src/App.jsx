import { useEffect, useRef, useState } from 'react'
import Intro from './components/Intro'
import Invitation from './components/Invitation'
import MusicPlayer from './components/MusicPlayer'
import { Closing, FunctionPage, WeddingInvite } from './components/Wedding'
import { wedding } from './data/content'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const skip = reduced() || (import.meta.env.DEV && new URLSearchParams(location.search).has('skipIntro'))
  const [open, setOpen] = useState(skip)
  const [gone, setGone] = useState(skip)
  const musicRef = useRef(null)

  const handleOpen = () => {
    musicRef.current?.start()
    setOpen(true)
  }

  useEffect(() => {
    document.documentElement.style.overflow = gone ? '' : 'hidden'
  }, [gone])

  return (
    <>
      <MusicPlayer ref={musicRef} />
      {!gone && <Intro onOpen={handleOpen} onDone={() => setGone(true)} />}
      <main className="stage">
        <Invitation open={open} />
        <WeddingInvite />
        {wedding.pages.map((p) => (
          <FunctionPage key={p.id} page={p} />
        ))}
        <Closing />
      </main>
    </>
  )
}
