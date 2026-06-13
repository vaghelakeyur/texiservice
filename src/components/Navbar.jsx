import { useState, useEffect, memo } from 'react'
import { MdPhone } from 'react-icons/md'
import './Navbar.css'

const TICKER_ITEMS = [
  '🚖 RK Taxi Service — Reliable, Safe & Affordable Rides',
  '📞 Call Now: +91 84608 11110',
  '✅ Book Your Ride Today!',
  '✈️ Airport Transfers',
  '🏙️ City Tours',
  '💼 Corporate Packages Available',
  '🕐 24/7 Service',
  '🌟 Trusted by 10,000+ Happy Riders',
  '🗺️ Outstation & Holiday Packages',
]

const TickerBar = memo(function TickerBar() {
  // Repeat items 4x so the seamless loop never shows a gap at any screen width
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="ticker-bar" aria-label="Announcements ticker">
      <div className="ticker-track">
        <div className="ticker-list">
          {items.map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <span className="ticker-sep" aria-hidden="true">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
})

// Exact RK taxi service logo — outline car matching the brand screenshot
const RKLogo = memo(function RKLogo() {
  return (
    <div className="rk-logo-wrap">
      <svg
        className="rk-logo-svg"
        viewBox="0 0 120 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M5 46 C5 46 8 34 18 28 C24 24 32 20 44 18 C54 16 66 16 76 19 C88 22 96 28 104 34 C110 38 114 42 115 46 C116 50 114 54 110 55 L10 55 C6 55 4 52 5 46 Z"
          stroke="#f5c518" strokeWidth="2.2" fill="none" strokeLinejoin="round"
        />
        <path
          d="M30 28 C34 18 44 12 56 11 C66 10 76 13 84 20 C90 25 94 28 94 28"
          stroke="#f5c518" strokeWidth="2.2" fill="none" strokeLinecap="round"
        />
        <path d="M34 28 L38 18" stroke="#f5c518" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M88 28 L84 18" stroke="#f5c518" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="62" y1="28" x2="62" y2="54" stroke="#f5c518" strokeWidth="1.4" strokeLinecap="round"/>
        <path
          d="M104 36 C110 38 116 42 118 47 C119 50 118 54 115 55"
          stroke="#f5c518" strokeWidth="2" fill="none" strokeLinecap="round"
        />
        <path
          d="M5 46 C3 44 1 40 3 36 C5 32 10 30 14 30"
          stroke="#f5c518" strokeWidth="2" fill="none" strokeLinecap="round"
        />
        <circle cx="90" cy="55" r="9" stroke="#f5c518" strokeWidth="2" fill="none"/>
        <circle cx="90" cy="55" r="4" stroke="#f5c518" strokeWidth="1.5" fill="none"/>
        <circle cx="30" cy="55" r="9" stroke="#f5c518" strokeWidth="2" fill="none"/>
        <circle cx="30" cy="55" r="4" stroke="#f5c518" strokeWidth="1.5" fill="none"/>
        <line x1="1" y1="38" x2="12" y2="38" stroke="#f5c518" strokeWidth="2" strokeLinecap="round"/>
        <line x1="1" y1="43" x2="9" y2="43" stroke="#f5c518" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="1" y1="48" x2="6" y2="48" stroke="#f5c518" strokeWidth="1" strokeLinecap="round"/>
      </svg>
      <div className="rk-logo-text">
        <span className="rk-logo-name">RK taxi service</span>
        <span className="rk-logo-tag">Book your ride</span>
      </div>
    </div>
  )
})

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    // Read saved preference; default to light (false)
    const saved = localStorage.getItem('theme')
    return saved === 'dark'
  })

  // Apply theme on every render cycle so initial value also takes effect
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home',     href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Fleet',    href: '#fleet' },
    { label: 'Fare',     href: '#fare' },
    { label: 'Packages', href: '#packages' },
    { label: 'About',    href: '#about' },
  ]

  return (
    <>
    <TickerBar />
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#home" className="navbar-logo">
          <RKLogo />
        </a>

        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-right">
          <a href="tel:+918460811110" className="navbar-phone">
            <MdPhone style={{ fontSize: 16, verticalAlign: 'middle', marginRight: 4 }} /> +91 84608 11110
          </a>

          {/* Dark / Light toggle */}
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(d => !d)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            <span className="theme-toggle-track">
              <span className="theme-toggle-thumb" />
              <span className="theme-icon theme-icon-sun">☀️</span>
              <span className="theme-icon theme-icon-moon">🌙</span>
            </span>
          </button>

          <a href="#booking" className="btn-primary navbar-cta">
            Book Now
          </a>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#booking" className="btn-primary" onClick={() => setMenuOpen(false)}>
              Book Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
    </>
  )
}