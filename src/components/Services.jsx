import useInView from '../hooks/useInView'
import { MdLocationCity, MdRoute, MdFlight, MdBeachAccess, MdBusinessCenter, MdCelebration, MdArrowForward, MdCheckCircleOutline } from 'react-icons/md'
import './Services.css'

const services = [
  {
    icon: <MdLocationCity />,
    title: 'Local City Rides',
    desc: 'Comfortable and affordable rides within the city. Perfect for daily commutes, errands, and local travel.',
    features: ['Hourly packages', 'Fixed fare', 'AC vehicles'],
    color: '#f59e0b',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2020_Maruti_Suzuki_Swift_Dzire_ZXi_Plus_%28white%29%2C_front_8.16.19.jpg/480px-2020_Maruti_Suzuki_Swift_Dzire_ZXi_Plus_%28white%29%2C_front_8.16.19.jpg',
    imageAlt: 'Maruti Suzuki Dzire - Local City Cab',
  },
  {
    icon: <MdRoute />,
    title: 'Outstation Trips',
    desc: 'Plan your inter-city travel with our reliable outstation cab service — one way or round trip.',
    features: ['One-way & round trip', 'Multiple cities', 'Expert long-route drivers'],
    color: '#6366f1',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2019_Toyota_Innova_Crysta_2.8_V_AT_Diesel_%28facelift%2C_grey%29%2C_front_8.16.19.jpg/480px-2019_Toyota_Innova_Crysta_2.8_V_AT_Diesel_%28facelift%2C_grey%29%2C_front_8.16.19.jpg',
    imageAlt: 'Toyota Innova Crysta - Outstation Trip',
  },
  {
    icon: <MdFlight />,
    title: 'Airport Transfers',
    desc: 'Timely and stress-free airport pickups and drops. We track your flight and ensure zero delays.',
    features: ['Flight tracking', 'On-time guarantee', 'Meet & greet'],
    color: '#10b981',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/2021_Toyota_Camry_%28AXVH71R%29_Ascent_Sport_sedan_%282021-11-02%29_01.jpg/480px-2021_Toyota_Camry_%28AXVH71R%29_Ascent_Sport_sedan_%282021-11-02%29_01.jpg',
    imageAlt: 'Toyota Camry - Airport Transfer',
  },
  {
    icon: <MdBeachAccess />,
    title: 'Holiday Packages',
    desc: "Curated travel packages to India's most breathtaking destinations. Fully customizable itineraries.",
    features: ['All-inclusive', 'Guided tours', 'Hotel tie-ups'],
    color: '#ec4899',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2019_Toyota_Innova_Crysta_2.8_V_AT_Diesel_%28facelift%2C_grey%29%2C_front_8.16.19.jpg/480px-2019_Toyota_Innova_Crysta_2.8_V_AT_Diesel_%28facelift%2C_grey%29%2C_front_8.16.19.jpg',
    imageAlt: 'Toyota Innova Crysta - Holiday Package',
  },
  {
    icon: <MdBusinessCenter />,
    title: 'Corporate Cabs',
    desc: 'Dedicated cab solutions for businesses — employee pickup, event logistics, and executive travel.',
    features: ['Monthly billing', 'Priority support', 'Dedicated fleet'],
    color: '#8b5cf6',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/2021_BMW_530i_M_Sport_%28G30%2C_facelift%2C_white%29%2C_front_8.15.21.jpg/480px-2021_BMW_530i_M_Sport_%28G30%2C_facelift%2C_white%29%2C_front_8.15.21.jpg',
    imageAlt: 'BMW 5 Series - Corporate Cab',
  },
  {
    icon: <MdCelebration />,
    title: 'Event & Wedding',
    desc: 'Make your special day even more memorable with our premium fleet for weddings and events.',
    features: ['Decorated vehicles', 'Multi-car booking', 'Punctual service'],
    color: '#ef4444',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Force_Traveller_%28front_quarter%29.jpg/480px-Force_Traveller_%28front_quarter%29.jpg',
    imageAlt: 'Force Traveller - Wedding & Events',
  },
]

function ServiceCarImage({ service }) {
  const handleError = (e) => {
    e.target.style.display = 'none'
    e.target.nextElementSibling.style.display = 'flex'
  }
  return (
    <div className="service-car-img-wrap" style={{ background: `${service.color}10` }}>
      <img src={service.image} alt={service.imageAlt} className="service-car-img" onError={handleError} loading="lazy" />
      <div className="service-car-fallback" style={{ display: 'none' }}>
        <span className="service-fallback-icon" style={{ color: service.color, fontSize: 48 }}>{service.icon}</span>
      </div>
    </div>
  )
}

export default function Services() {
  const [titleRef, titleVisible] = useInView()
  const [gridRef, gridVisible] = useInView()

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div ref={titleRef} className={`section-title reveal reveal-up${titleVisible ? ' visible' : ''}`}>
          <span className="badge">Our Services</span>
          <h2>Everything You Need to Travel</h2>
          <p>From local rides to full holiday packages — we cover every kind of journey you can imagine.</p>
        </div>
        <div ref={gridRef} className="services-grid">
          {services.map((s, i) => (
            <div className={`service-card reveal reveal-up${gridVisible ? ' visible' : ''} stagger-${(i % 6) + 1}`} key={s.title}>
              <ServiceCarImage service={s} />
              <div className="service-icon-wrap" style={{ background: `${s.color}18`, color: s.color, fontSize: 26 }}>
                <span className="service-icon">{s.icon}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="service-features">
                {s.features.map((f) => (
                  <li key={f}>
                    <MdCheckCircleOutline style={{ fontSize: 16, color: s.color, flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#booking" className="service-cta">
                Book Now <MdArrowForward style={{ fontSize: 16 }} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
