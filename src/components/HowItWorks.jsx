import useInView from '../hooks/useInView'
import { MdEditNote, MdCheckCircle, MdLocalTaxi, MdEmojiEvents } from 'react-icons/md'
import './HowItWorks.css'

const steps = [
  {
    step: '01',
    icon: <MdEditNote />,
    title: 'Fill the Booking Form',
    desc: 'Enter your pickup location, drop destination, travel date, time, and preferred cab type.',
  },
  {
    step: '02',
    icon: <MdCheckCircle />,
    title: 'Get Confirmation',
    desc: 'Our team calls you within minutes to confirm the booking and share driver details.',
  },
  {
    step: '03',
    icon: <MdLocalTaxi />,
    title: 'Driver Arrives',
    desc: 'Your verified driver arrives on time. Track your cab in real-time on your phone.',
  },
  {
    step: '04',
    icon: <MdEmojiEvents />,
    title: 'Enjoy Your Journey',
    desc: 'Sit back, relax, and enjoy a safe, comfortable ride to your destination.',
  },
]

export default function HowItWorks() {
  const [titleRef, titleVisible] = useInView()
  const [gridRef, gridVisible]   = useInView()

  return (
    <section className="how-section" id="how-it-works">
      <div className="container">

        <div
          ref={titleRef}
          className={`section-title reveal reveal-up${titleVisible ? ' visible' : ''}`}
        >
          <span className="badge">How It Works</span>
          <h2>Book a Cab in 4 Simple Steps</h2>
          <p>Getting your ride with RK taxi service takes less than 2 minutes. Here's how it works.</p>
        </div>

        <div ref={gridRef} className="steps-grid">
          {steps.map((s, i) => (
            <div
              className={`step-card reveal reveal-up${gridVisible ? ' visible' : ''} stagger-${i + 1}`}
              key={s.step}
            >
              {/* Number badge — top-left */}
              <div className="step-number">{s.step}</div>

              {/* Icon circle — centre */}
              <div className="step-icon-wrap" aria-hidden="true">
                <span className="step-icon">{s.icon}</span>
              </div>

              <h3>{s.title}</h3>
              <p>{s.desc}</p>

              {/* Arrow connector — between cards */}
              {i < steps.length - 1 && (
                <div className="step-arrow" aria-hidden="true">
                  <svg viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0 8 H26 M20 2 L28 8 L20 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
