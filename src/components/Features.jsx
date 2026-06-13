import useInView from '../hooks/useInView'
import { MdVerifiedUser, MdMoneyOff, MdSupportAgent, MdEventAvailable, MdCleaningServices, MdPhone } from 'react-icons/md'
import './Features.css'

const features = [
  { icon: <MdVerifiedUser />, title: 'Safe & Verified Drivers', desc: 'All our drivers undergo thorough background checks, training, and periodic evaluation for your safety.' },
  { icon: <MdMoneyOff />, title: 'No Hidden Charges', desc: 'Transparent pricing from the start. No surge pricing, no surprise fees at the end of your trip.' },
  { icon: <MdSupportAgent />, title: '24/7 Support', desc: "Our support team is available round the clock. Call, WhatsApp, or chat — we're always here." },
  { icon: <MdEventAvailable />, title: 'Free Cancellation', desc: 'Cancel up to 1 hour before pickup at no charge. Your plans change — we understand that.' },
  { icon: <MdCleaningServices />, title: 'Clean & Sanitized', desc: 'All vehicles are deep-cleaned and sanitized before every trip for your comfort and health.' },
]

export default function Features() {
  const [textRef, textVisible] = useInView()
  const [gridRef, gridVisible] = useInView()

  return (
    <section className="features-section" id="about">
      <div className="container">
        <div className="features-inner">
          <div ref={textRef} className={`features-text reveal reveal-left${textVisible ? ' visible' : ''}`}>
            <div className="section-title" style={{ textAlign: 'left', marginBottom: 32 }}>
              <span className="badge">Why RK taxi service</span>
              <h2>Experience Travel Like Never Before</h2>
              <p>Whether you need a quick ride across town or a week-long getaway to the mountains, we have the perfect solution.</p>
            </div>
            <div className="features-cta">
              <a href="#booking" className="btn-primary">Book a Ride Now</a>
              <a href="tel:+918460811110" className="features-phone">
                <MdPhone style={{ verticalAlign: 'middle', marginRight: 4 }} /> +91 84608 11110
              </a>
            </div>
            <div className="trust-badges">
              <div className="trust-badge"><span className="trust-num">50K+</span><span className="trust-label">Rides Completed</span></div>
              <div className="trust-badge"><span className="trust-num">200+</span><span className="trust-label">Cities</span></div>
              <div className="trust-badge"><span className="trust-num">500+</span><span className="trust-label">Verified Drivers</span></div>
              <div className="trust-badge"><span className="trust-num">4.9★</span><span className="trust-label">Rating</span></div>
            </div>
          </div>
          <div ref={gridRef} className="features-grid">
            {features.map((f, i) => (
              <div className={`feature-item reveal reveal-up${gridVisible ? ' visible' : ''} stagger-${(i % 6) + 1}`} key={f.title}>
                <div className="feature-icon" style={{ fontSize: 32, color: 'var(--primary)' }}>{f.icon}</div>
                <div><h4>{f.title}</h4><p>{f.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
