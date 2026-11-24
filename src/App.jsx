import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'
import { ScrollProgress, ScrollToTop, FloatingActions, CursorFollower, IntroLoader } from './components/GlobalUI'
import Home from './pages/Home'

// Home is eagerly loaded for the fastest first paint; other pages are code-split.
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Contact = lazy(() => import('./pages/Contact'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-forest-950" role="status" aria-label="Loading page">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-gold-400" />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const page = (el) => <PageTransition>{el}</PageTransition>

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[200] rounded-full bg-gold-400 px-5 py-3 font-display font-bold text-forest-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <IntroLoader />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={page(<Home />)} />
            <Route path="/about" element={page(<About />)} />
            <Route path="/services" element={page(<Services />)} />
            <Route path="/contact" element={page(<Contact />)} />
            <Route path="/privacy-policy" element={page(<Legal kind="privacy" />)} />
            <Route path="/terms" element={page(<Legal kind="terms" />)} />
            <Route path="*" element={page(<NotFound />)} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
      <FloatingActions />
      <CursorFollower />
    </>
  )
}
