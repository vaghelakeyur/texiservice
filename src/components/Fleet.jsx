import { useRef, useState, useEffect } from 'react'
import useInView from '../hooks/useInView'
import './Fleet.css'

// ── Fare List Data ──
const fareCategories = [
  { id: 'sedan', label: 'Sedan',  icon: '🚗' },
  { id: 'suv',   label: 'SUV',    icon: '🚙' },
  { id: 'tempo', label: 'Tempo',  icon: '🚐' },
  { id: 'bus',   label: 'Bus',    icon: '🚌' },
]

const fareData = {
  sedan: {
    heading: '4 Seater / Sedan',
    rows: [
      { name: 'Hyundai Aura',   seating: 4, rate: '₹11' },
      { name: 'Swift Dzire',    seating: 4, rate: '₹11' },
      { name: 'Honda Amaze',    seating: 4, rate: '₹11' },
      { name: 'Hyundai Xcent',  seating: 4, rate: '₹11' },
    ],
  },
  suv: {
    heading: '6–7 Seater / SUV',
    rows: [
      { name: 'Toyota Innova',   seating: 7, rate: '₹15' },
      { name: 'Kia Carens',      seating: 7, rate: '₹16' },
      { name: 'Hyundai Alcazar', seating: 7, rate: '₹17' },
      { name: 'Mahindra Scorpio',seating: 7, rate: '₹19' },
      { name: 'Tata Safari',     seating: 7, rate: '₹20' },
    ],
  },
  tempo: {
    heading: '9–14 Seater / Tempo Traveller',
    rows: [
      { name: 'Force Traveller 9 Seater',  seating: 9,  rate: '₹22' },
      { name: 'Force Traveller 12 Seater', seating: 12, rate: '₹25' },
      { name: 'Force Traveller 14 Seater', seating: 14, rate: '₹28' },
    ],
  },
  bus: {
    heading: '20–50 Seater / Bus',
    rows: [
      { name: 'Mini Bus 20 Seater', seating: 20, rate: '₹35' },
      { name: 'Mini Bus 27 Seater', seating: 27, rate: '₹40' },
      { name: 'Luxury Bus 35 Seater', seating: 35, rate: '₹50' },
      { name: 'Luxury Bus 50 Seater', seating: 50, rate: '₹60' },
    ],
  },
}


const fleet = [
  // ── Maruti Suzuki ──
  {
    name: 'Alto K10',
    model: 'Maruti Suzuki',
    passengers: 5,
    price: '₹9/km',
    features: ['AC', 'GPS', 'Music System'],
    tag: 'Economy',
    tagColor: '#f59e0b',
    bgColor: '#fffbeb',
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80',
  },
  {
    name: 'Swift',
    model: 'Maruti Suzuki',
    passengers: 5,
    price: '₹10/km',
    features: ['AC', 'GPS', 'Music System'],
    tag: 'Budget Friendly',
    tagColor: '#0ea5e9',
    bgColor: '#f0f9ff',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
  },
  {
    name: 'Baleno',
    model: 'Maruti Suzuki',
    passengers: 5,
    price: '₹11/km',
    features: ['AC', 'GPS', 'Music System'],
    tag: 'Premium Hatch',
    tagColor: '#6366f1',
    bgColor: '#f5f3ff',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
  },
  {
    name: 'Brezza',
    model: 'Maruti Suzuki',
    passengers: 5,
    price: '₹13/km',
    features: ['AC', 'GPS', 'Sunroof'],
    tag: 'Compact SUV',
    tagColor: '#10b981',
    bgColor: '#f0fdf4',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
  },
  {
    name: 'Ertiga',
    model: 'Maruti Suzuki',
    passengers: 7,
    price: '₹14/km',
    features: ['AC', 'GPS', 'Music System'],
    tag: 'Family MPV',
    tagColor: '#ec4899',
    bgColor: '#fdf2f8',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
  },
  {
    name: 'XL6',
    model: 'Maruti Suzuki',
    passengers: 6,
    price: '₹15/km',
    features: ['AC', 'Captain Seats', 'GPS'],
    tag: '6 Seater',
    tagColor: '#8b5cf6',
    bgColor: '#faf5ff',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
  },
  // ── Hyundai ──
  {
    name: 'Grand i10 Nios',
    model: 'Hyundai',
    passengers: 5,
    price: '₹10/km',
    features: ['AC', 'GPS', 'Music System'],
    tag: 'City Ride',
    tagColor: '#f97316',
    bgColor: '#fff7ed',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
  },
  {
    name: 'i20',
    model: 'Hyundai',
    passengers: 5,
    price: '₹11/km',
    features: ['AC', 'GPS', 'Sunroof'],
    tag: 'Premium Hatch',
    tagColor: '#0ea5e9',
    bgColor: '#f0f9ff',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
  },
  {
    name: 'Venue',
    model: 'Hyundai',
    passengers: 5,
    price: '₹13/km',
    features: ['AC', 'GPS', 'Music System'],
    tag: 'Compact SUV',
    tagColor: '#10b981',
    bgColor: '#f0fdf4',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
  },
  {
    name: 'Creta',
    model: 'Hyundai',
    passengers: 5,
    price: '₹15/km',
    features: ['AC', 'Panoramic Roof', 'GPS'],
    tag: 'Best Seller',
    tagColor: '#f59e0b',
    bgColor: '#fffbeb',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
  },
  {
    name: 'Alcazar',
    model: 'Hyundai',
    passengers: 7,
    price: '₹17/km',
    features: ['AC', 'Captain Seats', 'GPS', 'Sunroof'],
    tag: '6/7 Seater',
    tagColor: '#6366f1',
    bgColor: '#f5f3ff',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
  },
  // ── Tata Motors ──
  {
    name: 'Tiago',
    model: 'Tata Motors',
    passengers: 5,
    price: '₹9/km',
    features: ['AC', 'GPS', 'Music System'],
    tag: 'Economy',
    tagColor: '#f97316',
    bgColor: '#fff7ed',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
  },
  {
    name: 'Punch',
    model: 'Tata Motors',
    passengers: 5,
    price: '₹11/km',
    features: ['AC', 'GPS', 'Music System'],
    tag: 'Micro SUV',
    tagColor: '#0ea5e9',
    bgColor: '#f0f9ff',
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80',
  },
  {
    name: 'Nexon',
    model: 'Tata Motors',
    passengers: 5,
    price: '₹13/km',
    features: ['AC', 'GPS', 'Sunroof'],
    tag: 'Compact SUV',
    tagColor: '#10b981',
    bgColor: '#f0fdf4',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
  },
  {
    name: 'Harrier',
    model: 'Tata Motors',
    passengers: 5,
    price: '₹18/km',
    features: ['AC', 'Panoramic Roof', 'GPS', 'Leather Seats'],
    tag: 'Premium SUV',
    tagColor: '#6366f1',
    bgColor: '#f5f3ff',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
  },
  {
    name: 'Safari',
    model: 'Tata Motors',
    passengers: 7,
    price: '₹20/km',
    features: ['AC', 'Panoramic Roof', 'GPS', 'Captain Seats'],
    tag: '6/7 Seater',
    tagColor: '#ec4899',
    bgColor: '#fdf2f8',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
  },
  // ── Mahindra ──
  {
    name: 'Thar',
    model: 'Mahindra & Mahindra',
    passengers: 4,
    price: '₹16/km',
    features: ['AC', 'GPS', '4x4'],
    tag: 'Adventure',
    tagColor: '#92400e',
    bgColor: '#fef3c7',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
  },
  {
    name: 'Scorpio N',
    model: 'Mahindra & Mahindra',
    passengers: 7,
    price: '₹19/km',
    features: ['AC', 'GPS', 'Sunroof', 'Music System'],
    tag: '6/7 Seater',
    tagColor: '#f59e0b',
    bgColor: '#fffbeb',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
  },
  {
    name: 'XUV700',
    model: 'Mahindra & Mahindra',
    passengers: 7,
    price: '₹22/km',
    features: ['AC', 'ADAS', 'Panoramic Roof', 'GPS'],
    tag: 'Flagship SUV',
    tagColor: '#6366f1',
    bgColor: '#f5f3ff',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
  },
  {
    name: 'Bolero',
    model: 'Mahindra & Mahindra',
    passengers: 7,
    price: '₹14/km',
    features: ['AC', 'GPS', 'Music System'],
    tag: 'Rugged MPV',
    tagColor: '#10b981',
    bgColor: '#f0fdf4',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
  },
  // ── Kia ──
  {
    name: 'Sonet',
    model: 'Kia',
    passengers: 5,
    price: '₹13/km',
    features: ['AC', 'GPS', 'Sunroof'],
    tag: 'Compact SUV',
    tagColor: '#0ea5e9',
    bgColor: '#f0f9ff',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
  },
  {
    name: 'Seltos',
    model: 'Kia',
    passengers: 5,
    price: '₹15/km',
    features: ['AC', 'Panoramic Roof', 'GPS', 'Music System'],
    tag: 'Premium SUV',
    tagColor: '#ec4899',
    bgColor: '#fdf2f8',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80',
  },
  {
    name: 'Carens',
    model: 'Kia',
    passengers: 7,
    price: '₹16/km',
    features: ['AC', 'GPS', 'Captain Seats', 'Music System'],
    tag: '6/7 Seater',
    tagColor: '#f97316',
    bgColor: '#fff7ed',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
  },
  // ── Toyota ──
  {
    name: 'Glanza',
    model: 'Toyota',
    passengers: 5,
    price: '₹11/km',
    features: ['AC', 'GPS', 'Music System'],
    tag: 'Premium Hatch',
    tagColor: '#f59e0b',
    bgColor: '#fffbeb',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80',
  },
  {
    name: 'Urban Cruiser Hyryder',
    model: 'Toyota',
    passengers: 5,
    price: '₹15/km',
    features: ['AC', 'Hybrid', 'GPS', 'Sunroof'],
    tag: 'Hybrid SUV',
    tagColor: '#10b981',
    bgColor: '#f0fdf4',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
  },
  {
    name: 'Innova Crysta',
    model: 'Toyota',
    passengers: 8,
    price: '₹18/km',
    features: ['AC', 'Extra Legroom', 'GPS', 'Music System'],
    tag: 'Most Loved',
    tagColor: '#6366f1',
    bgColor: '#f5f3ff',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
  },
  {
    name: 'Innova Hycross',
    model: 'Toyota',
    passengers: 8,
    price: '₹20/km',
    features: ['AC', 'Hybrid', 'Panoramic Roof', 'GPS'],
    tag: 'Hybrid MPV',
    tagColor: '#ec4899',
    bgColor: '#fdf2f8',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
  },
  {
    name: 'Fortuner',
    model: 'Toyota',
    passengers: 7,
    price: '₹25/km',
    features: ['AC', 'Leather Seats', 'GPS', '4x4'],
    tag: 'Premium SUV',
    tagColor: '#1e293b',
    bgColor: '#f1f5f9',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
  },
]

function FareList() {
  const [active, setActive] = useState('sedan')
  const [titleRef, titleVisible] = useInView()
  const [bodyRef, bodyVisible] = useInView()
  const current = fareData[active]

  return (
    <div className="fare-section">

      {/* Section Header — matches project section-title pattern */}
      <div
        ref={titleRef}
        className={`section-title reveal reveal-up${titleVisible ? ' visible' : ''}`}
      >
        <span className="badge">Fare List</span>
        <h2>Transparent & Competitive Pricing</h2>
        <p>Check out our competitive pricing for all vehicle categories.</p>
      </div>

      {/* Card wrapper */}
      <div
        ref={bodyRef}
        className={`fare-card reveal reveal-up${bodyVisible ? ' visible' : ''}`}
      >

        {/* Tab Bar */}
        <div className="fare-tabs" role="tablist" aria-label="Vehicle category tabs">
          {fareCategories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={active === cat.id}
              className={`fare-tab${active === cat.id ? ' fare-tab--active' : ''}`}
              onClick={() => setActive(cat.id)}
            >
              <span className="fare-tab-icon" aria-hidden="true">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Pricing Table */}
        <div className="fare-table-wrap">
          <table className="fare-table" aria-label={`${current.heading} pricing`}>
            <thead>
              <tr>
                <th>{current.heading}</th>
                <th>Seating</th>
                <th>Rate / km</th>
              </tr>
            </thead>
            <tbody>
              {current.rows.map((row, i) => (
                <tr key={row.name} className={`stagger-${(i % 6) + 1}`}>
                  <td>
                    <span className="fare-car-name">{row.name.toUpperCase()}</span>
                  </td>
                  <td>
                    <span className="fare-badge">{row.seating}</span>
                  </td>
                  <td>
                    <span className="fare-rate">{row.rate}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

function CarCard({ car }) {
  const handleError = (e) => {
    e.target.style.display = 'none'
    e.target.nextElementSibling.style.display = 'flex'
  }
  return (
    <div className="fleet-card">
      <div className="fleet-tag" style={{ background: car.tagColor }}>
        {car.tag}
      </div>

      <div className="fleet-img-wrap" style={{ background: car.bgColor }}>
        <img
          src={car.image}
          alt={`${car.name} - ${car.model}`}
          className="fleet-car-img"
          onError={handleError}
          loading="lazy"
        />
        <div className="fleet-img-fallback" style={{ display: 'none' }}>
          <span className="fleet-emoji-fb">🚗</span>
        </div>
      </div>

      <div className="fleet-info">
        <h3>{car.name}</h3>
        <p className="fleet-model">{car.model}</p>

        <div className="fleet-specs">
          <div className="spec">
            <span>👥</span>
            <span>{car.passengers} seats</span>
          </div>
          <div className="spec">
            <span>❄️</span>
            <span>AC</span>
          </div>
        </div>

        <div className="fleet-features">
          {car.features.map((f) => (
            <span key={f} className="fleet-feature-badge">{f}</span>
          ))}
        </div>
      </div>

      <div className="fleet-footer">
        <div className="fleet-price">
          <span className="price-value">{car.price}</span>
          <span className="price-note">onwards</span>
        </div>
        <a href="#booking" className="btn-primary fleet-btn">
          Book
        </a>
      </div>
    </div>
  )
}

export default function Fleet() {
  const [titleRef, titleVisible] = useInView()
  const scrollRef  = useRef(null)
  const rafRef     = useRef(null)
  const pausedRef  = useRef(false)
  const STEP = 320

  // Auto-scroll using RAF — no setInterval, smooth 60fps
  const startAuto = () => {
    pausedRef.current = false
    const tick = () => {
      if (!pausedRef.current) {
        const el = scrollRef.current
        if (el) {
          // Seamless loop: when past halfway, jump back silently
          if (el.scrollLeft >= el.scrollWidth / 2) {
            el.scrollLeft -= el.scrollWidth / 2
          }
          el.scrollLeft += 0.6
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  const stopAuto = () => {
    pausedRef.current = true
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }

  useEffect(() => {
    startAuto()
    return stopAuto
  }, [])

  const scrollBy = (dir) => {
    const el = scrollRef.current
    if (!el) return
    stopAuto()
    el.scrollBy({ left: dir === 'right' ? STEP : -STEP, behavior: 'smooth' })
    // Resume auto after user interaction
    setTimeout(startAuto, 1800)
  }

  return (
    <section className="fleet-section" id="fleet">
      <div className="container">
        <div
          ref={titleRef}
          className={`section-title reveal reveal-up${titleVisible ? ' visible' : ''}`}
        >
          <span className="badge">Our Fleet</span>
          <h2>Choose Your Perfect Ride</h2>
          <p>Well-maintained vehicles to suit every budget and group size. All cabs are AC, GPS-tracked, and sanitized.</p>
        </div>
      </div>

      {/* Scrollable carousel — full width, outside container */}
      <div className="fleet-carousel-outer">

        {/* Nav Buttons */}
        <button
          className="fleet-nav-btn fleet-nav-btn--left"
          onClick={() => scrollBy('left')}
          aria-label="Scroll left"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          className="fleet-nav-btn fleet-nav-btn--right"
          onClick={() => scrollBy('right')}
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Scroll Track */}
        <div
          className="fleet-scroll-track"
          ref={scrollRef}
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
          onTouchStart={stopAuto}
          onTouchEnd={() => setTimeout(startAuto, 1200)}
        >
          {[...fleet, ...fleet].map((car, i) => (
            <div className="fleet-scroll-item" key={`${car.name}-${i}`}>
              <CarCard car={car} />
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div className="fleet-fade fleet-fade--left"  aria-hidden="true" />
        <div className="fleet-fade fleet-fade--right" aria-hidden="true" />
      </div>

      {/* Fare List */}
      <div className="container" id="fare">
        <FareList />
      </div>
    </section>
  )
}
