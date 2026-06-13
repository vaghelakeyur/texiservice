import { useState } from 'react'
import useInView from '../hooks/useInView'
import { MdPhone, MdEmail, MdLocationOn, MdAccessTime, MdSend, MdCheckCircle, MdReplay } from 'react-icons/md'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [titleRef, titleVisible] = useInView()
  const [infoRef, infoVisible] = useInView()
  const [formRef, formVisible] = useInView()

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSent(true)
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div ref={titleRef} className={`section-title reveal reveal-up${titleVisible ? ' visible' : ''}`}>
          <span className="badge">Get in Touch</span>
          <h2>We'd Love to Hear from You</h2>
          <p>Have a question, need a custom quote, or want to give feedback? Our team responds within 1 hour.</p>
        </div>

        <div className="contact-inner">
          <div ref={infoRef} className={`contact-info reveal reveal-left${infoVisible ? ' visible' : ''}`}>
            <h3>Contact RK taxi service</h3>
            <p>Reach out to us for bookings, travel inquiries, corporate tie-ups, or general queries. We're available 24×7 to assist you.</p>
            <div className="contact-cards">
              <div className="contact-card">
                <div className="cc-icon"><MdPhone style={{ fontSize: 22 }} /></div>
                <div className="cc-text"><strong>Phone / WhatsApp</strong><a href="tel:+918460811110">+91 84608 11110</a></div>
              </div>
              <div className="contact-card">
                <div className="cc-icon"><MdEmail style={{ fontSize: 22 }} /></div>
                <div className="cc-text"><strong>Email</strong><a href="mailto:support@taxiaapki.com">support@taxiaapki.com</a></div>
              </div>
              <div className="contact-card">
                <div className="cc-icon"><MdLocationOn style={{ fontSize: 22 }} /></div>
                <div className="cc-text"><strong>Office Address</strong><span>Office No. 509, "SILVER PRIME", Rail Nagar, Rajkot – 360001</span></div>
              </div>
              <div className="contact-card">
                <div className="cc-icon"><MdAccessTime style={{ fontSize: 22 }} /></div>
                <div className="cc-text"><strong>Working Hours</strong><span>24 Hours / 7 Days a Week</span></div>
              </div>
            </div>
            <div className="contact-social">
              <a href="https://facebook.com/taxiaapki" target="_blank" rel="noopener noreferrer" className="social-btn">
                <FaFacebook style={{ fontSize: 16 }} /> Facebook
              </a>
              <a href="https://www.instagram.com/taxi_aapki" target="_blank" rel="noopener noreferrer" className="social-btn">
                <FaInstagram style={{ fontSize: 16 }} /> Instagram
              </a>
            </div>
          </div>

          <div ref={formRef} className={`contact-form-card reveal reveal-right${formVisible ? ' visible' : ''}`}>
            {!sent ? (
              <>
                <h3>Send Us a Message</h3>
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="cf-row">
                    <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                      <label htmlFor="cf-name">Full Name *</label>
                      <input id="cf-name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} />
                      {errors.name && <span className="error-msg">{errors.name}</span>}
                    </div>
                    <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                      <label htmlFor="cf-email">Email Address *</label>
                      <input id="cf-email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
                      {errors.email && <span className="error-msg">{errors.email}</span>}
                    </div>
                  </div>
                  <div className="cf-row">
                    <div className="form-group">
                      <label htmlFor="cf-phone">Phone Number</label>
                      <input id="cf-phone" name="phone" type="tel" placeholder="Optional" value={form.phone} onChange={handleChange} maxLength={10} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cf-subject">Subject</label>
                      <select id="cf-subject" name="subject" value={form.subject} onChange={handleChange}>
                        <option value="">Select a topic</option>
                        <option>Booking Query</option>
                        <option>Custom Package</option>
                        <option>Corporate Tie-up</option>
                        <option>Complaint</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                    <label htmlFor="cf-message">Message *</label>
                    <textarea id="cf-message" name="message" placeholder="Tell us how we can help you..." value={form.message} onChange={handleChange} rows={5} />
                    {errors.message && <span className="error-msg">{errors.message}</span>}
                  </div>
                  <button type="submit" className="btn-primary" style={{ justifyContent: 'center', gap: 8 }}>
                    <MdSend style={{ fontSize: 18 }} /> Send Message
                  </button>
                </form>
              </>
            ) : (
              <div className="cf-success">
                <div className="cf-success-icon"><MdCheckCircle style={{ fontSize: 64, color: '#10b981' }} /></div>
                <h4>Message Sent!</h4>
                <p>Thanks for contacting RK taxi service. Our team will get back to you within 1 hour.</p>
                <button className="btn-primary" style={{ gap: 8 }} onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}>
                  <MdReplay style={{ fontSize: 18 }} /> Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
