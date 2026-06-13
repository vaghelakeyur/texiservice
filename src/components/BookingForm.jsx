import { useState } from 'react'
import useInView from '../hooks/useInView'
import './BookingForm.css'

const TRIP_TYPES = ['One Way', 'Round Trip', 'Local Rental', 'Airport Transfer']
const CAB_TYPES = [
  {
    id: 'sedan',
    label: 'Sedan',
    desc: 'Up to 4 passengers',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2020_Maruti_Suzuki_Swift_Dzire_ZXi_Plus_%28white%29%2C_front_8.16.19.jpg/320px-2020_Maruti_Suzuki_Swift_Dzire_ZXi_Plus_%28white%29%2C_front_8.16.19.jpg',
    fallback: '🚗',
  },
  {
    id: 'suv',
    label: 'SUV',
    desc: 'Up to 6 passengers',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2019_Toyota_Innova_Crysta_2.8_V_AT_Diesel_%28facelift%2C_grey%29%2C_front_8.16.19.jpg/320px-2019_Toyota_Innova_Crysta_2.8_V_AT_Diesel_%28facelift%2C_grey%29%2C_front_8.16.19.jpg',
    fallback: '🚙',
  },
  {
    id: 'luxury',
    label: 'Luxury',
    desc: 'Premium comfort',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/2021_Toyota_Camry_%28AXVH71R%29_Ascent_Sport_sedan_%282021-11-02%29_01.jpg/320px-2021_Toyota_Camry_%28AXVH71R%29_Ascent_Sport_sedan_%282021-11-02%29_01.jpg',
    fallback: '🏎️',
  },
  {
    id: 'tempo',
    label: 'Tempo',
    desc: 'Up to 12 passengers',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Force_Traveller_%28front_quarter%29.jpg/320px-Force_Traveller_%28front_quarter%29.jpg',
    fallback: '🚌',
  },
]

export default function BookingForm() {
  const [titleRef, titleVisible] = useInView()
  const [formRef, formVisible] = useInView()
  const [sideRef, sideVisible] = useInView()
  const [tripType, setTripType] = useState('One Way')
  const [cabType, setCabType] = useState('sedan')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    pickup: '',
    drop: '',
    date: '',
    time: '',
    passengers: '1',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit phone number'
    if (!form.pickup.trim()) e.pickup = 'Pickup location is required'
    if (!form.drop.trim()) e.drop = 'Drop location is required'
    if (!form.date) e.date = 'Date is required'
    if (!form.time) e.time = 'Time is required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    const selectedCab = CAB_TYPES.find((c) => c.id === cabType)

    // Build WhatsApp message with booking details
    const message = [
      `🚕 *New Cab Booking Request*`,
      ``,
      `👤 *Name:* ${form.name}`,
      `📞 *Phone:* ${form.phone}`,
      `🚘 *Trip Type:* ${tripType}`,
      `🚗 *Cab Type:* ${selectedCab?.label} (${selectedCab?.desc})`,
      `📍 *Pickup:* ${form.pickup}`,
      `🏁 *Drop:* ${form.drop}`,
      `📅 *Date:* ${form.date}`,
      `⏰ *Time:* ${form.time}`,
      `👥 *Passengers:* ${form.passengers}`,
      form.notes ? `📝 *Notes:* ${form.notes}` : null,
    ]
      .filter(Boolean)
      .join('\n')

    const waUrl = `https://wa.me/919016160151?text=${encodeURIComponent(message)}`
    window.open(waUrl, '_blank', 'noopener,noreferrer')

    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setForm({ name: '', phone: '', pickup: '', drop: '', date: '', time: '', passengers: '1', notes: '' })
    setErrors({})
    setTripType('One Way')
    setCabType('sedan')
  }

  // Get today's date string for min attribute
  const today = new Date().toISOString().split('T')[0]

  return (
    <section className="booking-section" id="booking">
      <div className="container">
        <div
          ref={titleRef}
          className={`section-title reveal reveal-up${titleVisible ? ' visible' : ''}`}
        >
          <span className="badge">Book a Ride</span>
          <h2>Quick & Easy Cab Booking</h2>
          <p>Fill in your trip details and we'll arrange the perfect cab for you in minutes.</p>
        </div>

        <div className="booking-wrapper">
          {!submitted ? (
            <form
              ref={formRef}
              className={`booking-form reveal reveal-left${formVisible ? ' visible' : ''}`}
              onSubmit={handleSubmit}
              noValidate
            >

              {/* Trip Type Tabs */}
              <div className="form-section">
                <label className="form-label">Trip Type</label>
                <div className="trip-tabs">
                  {TRIP_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`trip-tab ${tripType === type ? 'active' : ''}`}
                      onClick={() => setTripType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cab Type Cards */}
              <div className="form-section">
                <label className="form-label">Select Cab Type</label>
                <div className="cab-cards">
                  {CAB_TYPES.map((cab) => (
                    <button
                      key={cab.id}
                      type="button"
                      className={`cab-card ${cabType === cab.id ? 'active' : ''}`}
                      onClick={() => setCabType(cab.id)}
                    >
                      <div className="cab-img-wrap">
                        <img
                          src={cab.image}
                          alt={cab.label}
                          className="cab-img"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextElementSibling.style.display = 'block'
                          }}
                          loading="lazy"
                        />
                        <span className="cab-img-fallback" style={{ display: 'none' }}>
                          {cab.fallback}
                        </span>
                      </div>
                      <span className="cab-label">{cab.label}</span>
                      <span className="cab-desc">{cab.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Info */}
              <div className="form-row">
                <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                  <label htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                  {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>
                <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={form.phone}
                    onChange={handleChange}
                    maxLength={10}
                    autoComplete="tel"
                  />
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>
              </div>

              {/* Locations */}
              <div className="form-row">
                <div className={`form-group ${errors.pickup ? 'has-error' : ''}`}>
                  <label htmlFor="pickup">📍 Pickup Location *</label>
                  <input
                    id="pickup"
                    name="pickup"
                    type="text"
                    placeholder="Enter pickup city / address"
                    value={form.pickup}
                    onChange={handleChange}
                  />
                  {errors.pickup && <span className="error-msg">{errors.pickup}</span>}
                </div>
                <div className={`form-group ${errors.drop ? 'has-error' : ''}`}>
                  <label htmlFor="drop">🏁 Drop Location *</label>
                  <input
                    id="drop"
                    name="drop"
                    type="text"
                    placeholder="Enter drop city / address"
                    value={form.drop}
                    onChange={handleChange}
                  />
                  {errors.drop && <span className="error-msg">{errors.drop}</span>}
                </div>
              </div>

              {/* Date, Time, Passengers */}
              <div className="form-row form-row-3">
                <div className={`form-group ${errors.date ? 'has-error' : ''}`}>
                  <label htmlFor="date">📅 Travel Date *</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={handleChange}
                  />
                  {errors.date && <span className="error-msg">{errors.date}</span>}
                </div>
                <div className={`form-group ${errors.time ? 'has-error' : ''}`}>
                  <label htmlFor="time">⏰ Pickup Time *</label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={form.time}
                    onChange={handleChange}
                  />
                  {errors.time && <span className="error-msg">{errors.time}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="passengers">👥 Passengers</label>
                  <select id="passengers" name="passengers" value={form.passengers} onChange={handleChange}>
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
                      <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="form-group">
                <label htmlFor="notes">Special Instructions (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  placeholder="Any special requirements, preferred route, child seat, etc."
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <button type="submit" className="btn-primary submit-btn">
                🚕 Confirm Booking
              </button>
            </form>
          ) : (
            <div
              ref={formRef}
              className={`booking-success reveal reveal-up${formVisible ? ' visible' : ''}`}
            >
              <div className="success-icon">🎉</div>
              <h3>Booking Confirmed!</h3>
              <p>
                Thank you, <strong>{form.name}</strong>! Your{' '}
                <strong>{cabType.toUpperCase()}</strong> cab has been booked for a{' '}
                <strong>{tripType}</strong> trip.
              </p>
              <div className="success-details">
                <div className="detail-row"><span>📍 Pickup</span><span>{form.pickup}</span></div>
                <div className="detail-row"><span>🏁 Drop</span><span>{form.drop}</span></div>
                <div className="detail-row"><span>📅 Date</span><span>{form.date} at {form.time}</span></div>
                <div className="detail-row"><span>👥 Passengers</span><span>{form.passengers}</span></div>
                <div className="detail-row"><span>📞 Phone</span><span>{form.phone}</span></div>
              </div>
              <p className="success-note">
                Our team will contact you at <strong>{form.phone}</strong> to confirm your ride.
                Your booking details have been sent to us on WhatsApp! 🎉
              </p>
              <a
                href={`https://wa.me/919016160151`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Open WhatsApp Chat
              </a>
              <button className="btn-primary" onClick={handleReset} style={{ marginTop: '12px' }}>
                Book Another Ride
              </button>
            </div>
          )}

          {/* Info Sidebar */}
          <div
            ref={sideRef}
            className={`booking-info reveal reveal-right${sideVisible ? ' visible' : ''}`}
          >
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h4>Call to Book</h4>
              <p>Prefer to book over the phone? Call us anytime.</p>
              <a href="tel:+918460811110" className="info-phone">+91 84608 11110</a>
            </div>
            <div className="info-card highlight">
              <div className="info-icon">🕐</div>
              <h4>24/7 Available</h4>
              <p>Our cabs are available round the clock, every day of the year.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💰</div>
              <h4>Best Price Promise</h4>
              <p>Transparent pricing with zero hidden charges. What you see is what you pay.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🛡️</div>
              <h4>Safe & Secure</h4>
              <p>All drivers are background-verified. Real-time GPS tracking on every ride.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
