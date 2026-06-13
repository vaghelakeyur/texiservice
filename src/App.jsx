import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AnimatedCursor from './components/AnimatedCursor'
import './App.css'

// Lazy-load all below-fold sections — they won't be downloaded until needed
const BookingForm  = lazy(() => import('./components/BookingForm'))
const Services     = lazy(() => import('./components/Services'))
const HowItWorks   = lazy(() => import('./components/HowItWorks'))
const Fleet        = lazy(() => import('./components/Fleet'))
const Features     = lazy(() => import('./components/Features'))
const Packages     = lazy(() => import('./components/Packages'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Footer       = lazy(() => import('./components/Footer'))
const ScrollToTop  = lazy(() => import('./components/ScrollToTop'))

// Minimal inline fallback — no extra component needed
const SectionFallback = () => <div style={{ minHeight: '200px' }} aria-hidden="true" />

function App() {
  return (
    <>
      <AnimatedCursor />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <BookingForm />
          <Services />
          <HowItWorks />
          <Fleet />
          <Features />
          <Packages />
          <Testimonials />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
        <ScrollToTop />
      </Suspense>
    </>
  )
}

export default App
