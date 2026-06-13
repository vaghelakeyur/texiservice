import { useEffect, useRef, useCallback } from 'react'
import './AnimatedCursor.css'

export default function AnimatedCursor() {
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const posRef   = useRef({ x: -100, y: -100 })
  const ringPos  = useRef({ x: -100, y: -100 })
  const rafRef   = useRef(null)
  const hovering = useRef(false)
  const clicking = useRef(false)

  const animate = useCallback(() => {
    const ease = 0.13
    ringPos.current.x += (posRef.current.x - ringPos.current.x) * ease
    ringPos.current.y += (posRef.current.y - ringPos.current.y) * ease

    if (dotRef.current) {
      dotRef.current.style.transform =
        `translate(${posRef.current.x}px, ${posRef.current.y}px) translate(-50%, -50%)`
    }
    if (ringRef.current) {
      ringRef.current.style.transform =
        `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    // Hide default cursor
    document.documentElement.classList.add('custom-cursor-active')

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = (e) => {
      const el = e.target
      if (
        el.closest('a, button, [role="button"], input, select, textarea, label, .btn-primary, .btn-outline')
      ) {
        hovering.current = true
        dotRef.current?.classList.add('cursor-dot--hover')
        ringRef.current?.classList.add('cursor-ring--hover')
      }
    }

    const onLeave = (e) => {
      const el = e.target
      if (
        el.closest('a, button, [role="button"], input, select, textarea, label, .btn-primary, .btn-outline')
      ) {
        hovering.current = false
        dotRef.current?.classList.remove('cursor-dot--hover')
        ringRef.current?.classList.remove('cursor-ring--hover')
      }
    }

    const onDown = () => {
      clicking.current = true
      dotRef.current?.classList.add('cursor-dot--click')
      ringRef.current?.classList.add('cursor-ring--click')
    }

    const onUp = () => {
      clicking.current = false
      dotRef.current?.classList.remove('cursor-dot--click')
      ringRef.current?.classList.remove('cursor-ring--click')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover',  onEnter)
    document.addEventListener('mouseout',   onLeave)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover',  onEnter)
      document.removeEventListener('mouseout',   onLeave)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
    
  )
}
