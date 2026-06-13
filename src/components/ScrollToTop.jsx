import { useState, useEffect, useRef } from 'react'
import { MdKeyboardArrowUp } from 'react-icons/md'
import './ScrollToTop.css'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const rafRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      // Throttle with RAF so it fires at most once per frame
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        setVisible(window.scrollY > 400)
        rafRef.current = null
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      className={`scroll-to-top ${visible ? 'visible' : ''}`}
      onClick={scrollUp}
      aria-label="Back to top"
    >
      <MdKeyboardArrowUp style={{ fontSize: 28 }} />
    </button>
  )
}
