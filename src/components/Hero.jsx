import { useEffect, useState } from 'react'
import { MdMyLocation, MdPhone } from 'react-icons/md'
import './Hero.css'

const LINES = [
  { text: 'Ride Safe,', highlight: false },
  { text: 'Ride ', highlight: true, highlightWord: 'Comfortable' },
  { text: 'with RK taxi service', highlight: false },
]

// Static array — defined once outside component, not recreated on every render
const PARTICLES = Array.from({ length: 18 }, (_, i) => i + 1)

export default function Hero() {
  const [displayed, setDisplayed] = useState([])   // lines fully shown
  const [current, setCurrent]     = useState(0)    // index of line being typed
  const [charIdx, setCharIdx]     = useState(0)    // char position in current line

  useEffect(() => {
    if (current >= LINES.length) return

    const line     = LINES[current]
    const fullText = line.highlight ? line.text + line.highlightWord : line.text

    if (charIdx < fullText.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), 55)
      return () => clearTimeout(t)
    } else {
      // line done — pause then move to next
      const t = setTimeout(() => {
        setDisplayed(d => [...d, line])
        setCurrent(c => c + 1)
        setCharIdx(0)
      }, 180)
      return () => clearTimeout(t)
    }
  }, [current, charIdx])

  // Build what to show for the currently-typing line
  const activeLine   = current < LINES.length ? LINES[current] : null
  const activeTyping = activeLine
    ? (activeLine.highlight
        ? activeLine.text + activeLine.highlightWord
        : activeLine.text
      ).slice(0, charIdx)
    : ''

  return (
    <section className="hero" id="home">
      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Floating particles background */}
      <div className="hero-particles" aria-hidden="true">
        {PARTICLES.map((n) => (
          <div key={n} className={`particle particle-${n}`} />
        ))}
      </div>

      {/* Glowing route lines SVG */}
      <svg className="hero-routes" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="routeGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0"/>
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="routeGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0"/>
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="routeGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0"/>
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Curved route paths */}
        <path d="M-50,600 Q200,400 500,300 T1100,150 T1500,50" stroke="url(#routeGrad1)" strokeWidth="1.5" fill="none" filter="url(#glow)" className="route-path route-path-1"/>
        <path d="M-50,500 Q300,350 700,250 T1300,100 T1500,80" stroke="url(#routeGrad2)" strokeWidth="1" fill="none" filter="url(#glow)" className="route-path route-path-2"/>
        <path d="M0,700 Q400,500 800,400 T1440,200"            stroke="url(#routeGrad3)" strokeWidth="1.2" fill="none" filter="url(#glow)" className="route-path route-path-3"/>
        {/* Moving dot on route 1 */}
        <circle r="4" fill="#7c3aed" filter="url(#glow)" opacity="0.9">
          <animateMotion dur="8s" repeatCount="indefinite" path="M-50,600 Q200,400 500,300 T1100,150 T1500,50"/>
        </circle>
        {/* Moving dot on route 2 */}
        <circle r="3" fill="#06b6d4" filter="url(#glow)" opacity="0.8">
          <animateMotion dur="11s" repeatCount="indefinite" begin="-3s" path="M-50,500 Q300,350 700,250 T1300,100 T1500,80"/>
        </circle>
        {/* Moving dot on route 3 */}
        <circle r="3.5" fill="#f97316" filter="url(#glow)" opacity="0.7">
          <animateMotion dur="14s" repeatCount="indefinite" begin="-6s" path="M0,700 Q400,500 800,400 T1440,200"/>
        </circle>
      </svg>

      {/* Pulsing location pins */}
      <div className="hero-pins" aria-hidden="true">
        <div className="pin pin-1"><span className="pin-dot"/><span className="pin-ring"/></div>
        <div className="pin pin-2"><span className="pin-dot"/><span className="pin-ring"/></div>
        <div className="pin pin-3"><span className="pin-dot"/><span className="pin-ring"/></div>
        <div className="pin pin-4"><span className="pin-dot"/><span className="pin-ring"/></div>
      </div>

      <div className="container hero-content">
        <div className="hero-text hero-animate-text">
          <div className="hero-badge"><MdMyLocation style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 6 }} />YOUR JOURNEY, OUR PRIORITY</div>
          <h1>
            {/* Fully typed lines */}
            {displayed.map((line, i) => (
              <span key={i} className="hero-typed-line">
                {line.highlight ? (
                  <>
                    {line.text}
                    <span className="hero-highlight">{line.highlightWord}</span>
                  </>
                ) : line.text}
                <br />
              </span>
            ))}

            {/* Currently typing line */}
            {activeLine && (
              <span className="hero-typed-line">
                {activeLine.highlight ? (
                  <>
                    {activeTyping.slice(0, activeLine.text.length)}
                    {activeTyping.length > activeLine.text.length && (
                      <span className="hero-highlight">
                        {activeTyping.slice(activeLine.text.length)}
                      </span>
                    )}
                  </>
                ) : activeTyping}
                <span className="hero-cursor">|</span>
              </span>
            )}
          </h1>
          <p>
            Premium taxi services across India — local rides, outstation trips,
            and airport transfers at unbeatable rates. Available 24/7.
          </p>
          <div className="hero-actions">
            <a href="#booking" className="btn-primary hero-btn">
              <MdMyLocation style={{ fontSize: 18 }} /> Book a Ride
            </a>
            <a href="tel:+918460811110" className="btn-outline">
              <MdPhone style={{ fontSize: 18 }} /> Call Now
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">50K+</span>
              <span className="stat-label">Happy Riders</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">200+</span>
              <span className="stat-label">Cities Covered</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">4.9★</span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
        </div>

        {/* ── Right side taxi image ── */}
        <div className="hero-img-wrap hero-animate-card">
          {/* Glow ring behind image */}
          <div className="hero-img-glow" aria-hidden="true" />
          {/* Floating badge — top left */}
          <div className="hero-img-badge hero-img-badge--tl">
            <span>🛡️</span> Verified Driver
          </div>
          {/* Floating badge — bottom right */}
          <div className="hero-img-badge hero-img-badge--br">
            <span>⭐</span> 4.9 Rated
          </div>
          <img
            src="/img/delivery_taxi_13-removebg-preview.png"
            alt="RK Taxi Service — Premium Cab"
            className="hero-taxi-img"
            loading="eager"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#booking" className="scroll-down" aria-label="Scroll down">
        <div className="scroll-dot" />
      </a>
    </section>
  )
}
