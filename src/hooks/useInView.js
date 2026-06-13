import { useEffect, useRef, useState } from 'react'

/**
 * Returns [ref, isVisible].
 * One-shot — once the element enters the viewport it stays visible.
 * Options are passed once at hook creation; changing them won't recreate the observer.
 */
export default function useInView(threshold = 0.08, rootMargin = '0px 0px -40px 0px') {
  const ref     = useRef(null)
  const [visible, setVisible] = useState(false)

  // Stabilize option refs so the effect only runs once per mount
  const thresholdRef   = useRef(threshold)
  const rootMarginRef  = useRef(rootMargin)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el) // one-shot — disconnect immediately
        }
      },
      { threshold: thresholdRef.current, rootMargin: rootMarginRef.current }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, []) // empty deps — intentional: options are read from stable refs

  return [ref, visible]
}
