import useInView from '../hooks/useInView'
import { MdCalendarMonth, MdLocationOn, MdAutoAwesome, MdPhone } from 'react-icons/md'
import './Packages.css'

const packages = [
  { icon: '🏔️', name: 'Manali Getaway', duration: '4 Days / 3 Nights', from: 'Chandigarh', price: '₹8,999', perPerson: 'per person', highlights: ['Solang Valley', 'Rohtang Pass', 'Mall Road', 'Hadimba Temple'], tag: 'Trending', tagColor: '#f59e0b', destImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Solang_Valley%2C_Manali_-_July_2022.jpg/640px-Solang_Valley%2C_Manali_-_July_2022.jpg', destAlt: 'Solang Valley, Manali', carImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2019_Toyota_Innova_Crysta_2.8_V_AT_Diesel_%28facelift%2C_grey%29%2C_front_8.16.19.jpg/320px-2019_Toyota_Innova_Crysta_2.8_V_AT_Diesel_%28facelift%2C_grey%29%2C_front_8.16.19.jpg', carAlt: 'Toyota Innova Crysta', carName: 'Toyota Innova Crysta', carFallback: '🚙' },
  { icon: '🏰', name: 'Rajasthan Royal Tour', duration: '6 Days / 5 Nights', from: 'Jaipur', price: '₹14,999', perPerson: 'per person', highlights: ['Jaipur', 'Jodhpur', 'Udaipur', 'Jaisalmer'], tag: 'Best Seller', tagColor: '#10b981', destImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Hawa_Mahal_2010.jpg/480px-Hawa_Mahal_2010.jpg', destAlt: 'Hawa Mahal, Jaipur', carImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/2021_Toyota_Camry_%28AXVH71R%29_Ascent_Sport_sedan_%282021-11-02%29_01.jpg/320px-2021_Toyota_Camry_%28AXVH71R%29_Ascent_Sport_sedan_%282021-11-02%29_01.jpg', carAlt: 'Toyota Camry', carName: 'Toyota Camry', carFallback: '🏎️' },
  { icon: '🌊', name: 'Goa Beach Bliss', duration: '3 Days / 2 Nights', from: 'Mumbai', price: '₹6,499', perPerson: 'per person', highlights: ['Baga Beach', 'Old Goa Churches', 'Water Sports', 'Sunset Cruise'], tag: 'Popular', tagColor: '#6366f1', destImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Baga_beach_Goa_India.jpg/640px-Baga_beach_Goa_India.jpg', destAlt: 'Baga Beach, Goa', carImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2020_Maruti_Suzuki_Swift_Dzire_ZXi_Plus_%28white%29%2C_front_8.16.19.jpg/320px-2020_Maruti_Suzuki_Swift_Dzire_ZXi_Plus_%28white%29%2C_front_8.16.19.jpg', carAlt: 'Maruti Swift Dzire', carName: 'Maruti Swift Dzire', carFallback: '🚗' },
  { icon: '🌿', name: 'Kerala Backwaters', duration: '5 Days / 4 Nights', from: 'Kochi', price: '₹12,499', perPerson: 'per person', highlights: ['Munnar Tea Gardens', 'Alleppey Houseboat', 'Thekkady', 'Kovalam Beach'], tag: 'Nature', tagColor: '#10b981', destImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Munnar_tea_gardens.jpg/640px-Munnar_tea_gardens.jpg', destAlt: 'Munnar Tea Gardens, Kerala', carImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Force_Traveller_%28front_quarter%29.jpg/320px-Force_Traveller_%28front_quarter%29.jpg', carAlt: 'Force Traveller', carName: 'Force Traveller', carFallback: '🚌' },
]

function PkgDestImage({ pkg }) {
  const handleError = (e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex' }
  return (
    <div className="pkg-dest-wrap">
      <img src={pkg.destImage} alt={pkg.destAlt} className="pkg-dest-img" onError={handleError} loading="lazy" />
      <span className="pkg-dest-fallback" style={{ display: 'none' }}>{pkg.icon}</span>
      <div className="pkg-tag" style={{ background: pkg.tagColor }}>{pkg.tag}</div>
    </div>
  )
}

function PkgCarImage({ pkg }) {
  const handleError = (e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'inline' }
  return (
    <div className="pkg-vehicle-row">
      <div className="pkg-car-thumb">
        <img src={pkg.carImage} alt={pkg.carAlt} className="pkg-car-img" onError={handleError} loading="lazy" />
        <span className="pkg-car-fallback" style={{ display: 'none' }}>{pkg.carFallback}</span>
      </div>
      <div className="pkg-vehicle-info">
        <span className="pkg-vehicle-label">Ride In</span>
        <span className="pkg-vehicle-name">{pkg.carName}</span>
      </div>
    </div>
  )
}

export default function Packages() {
  const [titleRef, titleVisible] = useInView()
  const [gridRef, gridVisible] = useInView()
  const [ctaRef, ctaVisible] = useInView()

  return (
    <section className="packages-section" id="packages">
      <div className="container">
        <div ref={titleRef} className={`section-title reveal reveal-up${titleVisible ? ' visible' : ''}`}>
          <span className="badge">Holiday Packages</span>
          <h2>Curated Trips for Every Traveller</h2>
          <p>Explore India's most breathtaking destinations with our all-inclusive travel packages.</p>
        </div>
        <div ref={gridRef} className="packages-grid">
          {packages.map((pkg, i) => (
            <div className={`pkg-card reveal reveal-up${gridVisible ? ' visible' : ''} stagger-${(i % 4) + 1}`} key={pkg.name}>
              <PkgDestImage pkg={pkg} />
              <div className="pkg-body">
                <h3>{pkg.name}</h3>
                <div className="pkg-meta">
                  <span><MdCalendarMonth style={{ fontSize: 15, verticalAlign: 'middle', marginRight: 4 }} />{pkg.duration}</span>
                  <span><MdLocationOn style={{ fontSize: 15, verticalAlign: 'middle', marginRight: 4 }} />From {pkg.from}</span>
                </div>
                <ul className="pkg-highlights">
                  {pkg.highlights.map((h) => (
                    <li key={h}><MdAutoAwesome style={{ fontSize: 13, color: '#f59e0b', marginRight: 4 }} />{h}</li>
                  ))}
                </ul>
                <PkgCarImage pkg={pkg} />
              </div>
              <div className="pkg-footer">
                <div className="pkg-price">
                  <span className="price-from">Starting from</span>
                  <span className="price-val">{pkg.price}</span>
                  <span className="price-per">{pkg.perPerson}</span>
                </div>
                <a href="#booking" className="btn-primary pkg-btn">Explore</a>
              </div>
            </div>
          ))}
        </div>
        <div ref={ctaRef} className={`packages-cta reveal reveal-up${ctaVisible ? ' visible' : ''}`}>
          <p>Don't see your destination? We customize packages for any location in India.</p>
          <a href="tel:+918460811110" className="btn-primary">
            <MdPhone style={{ fontSize: 18 }} /> Talk to an Expert
          </a>
        </div>
      </div>
    </section>
  )
}
