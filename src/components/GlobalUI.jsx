import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring, useMotionValue, useReducedMotion } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { useFinePointer } from '../hooks/useMediaQuery'
import { LogoMark } from './Logo'
import { ease } from '../animations/motionVariants'

/** Thin gold bar at the top showing reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-leaf-400 via-gold-400 to-gold-500"
    />
  )
}

/** Scroll to top on route change, or to the #hash target if present. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // wait for the page transition to mount the new page
      const t = setTimeout(() => {
        const el = document.getElementById(hash.slice(1))
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 90
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 650)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

/** Floating buttons: Enquire (hidden on contact page) + back to top. */
export function FloatingActions() {
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease }}
          className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"
        >
          {pathname !== '/contact' && (
            <Link
              to="/contact"
              className="group flex items-center gap-2 rounded-full bg-forest-900 py-3 pl-4 pr-5 font-display text-sm font-bold text-cream-50 shadow-[0_15px_40px_-12px_rgba(7,26,18,0.6)] transition hover:bg-emerald-600"
            >
              <MessageCircle className="h-4 w-4 text-gold-400 transition-transform duration-500 group-hover:rotate-12" />
              Enquire
            </Link>
          )}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="grid h-12 w-12 place-items-center rounded-full border border-forest-900/10 bg-cream-50 text-forest-900 shadow-lg transition hover:-translate-y-1 hover:bg-gold-400"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Subtle cursor ring that grows over interactive elements (desktop only). */
export function CursorFollower() {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })
  const [hover, setHover] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!fine || reduce) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      setHover(Boolean(e.target.closest('a, button, [role="button"], input, select, textarea, label')))
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [fine, reduce, x, y])

  if (!fine || reduce) return null
  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[80] mix-blend-difference"
    >
      <motion.div
        animate={{ scale: hover ? 1.9 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease }}
        className="-ml-4 -mt-4 h-8 w-8 rounded-full border border-white/80"
      />
    </motion.div>
  )
}

/** Brief branded intro shown once per browser session. */
export function IntroLoader() {
  const [done, setDone] = useState(() => {
    try {
      return sessionStorage.getItem('saikia-intro') === '1'
    } catch {
      return true
    }
  })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (done) return
    const t = setTimeout(() => {
      setDone(true)
      try {
        sessionStorage.setItem('saikia-intro', '1')
      } catch {
        /* ignore */
      }
    }, reduce ? 300 : 1500)
    return () => clearTimeout(t)
  }, [done, reduce])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] grid place-items-center bg-forest-900"
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.9, ease }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-5">
            <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease }}>
              <LogoMark className="h-16 w-16 text-forest-700" />
            </motion.div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.25 }}
                className="font-display text-sm font-bold uppercase tracking-[0.4em] text-cream-50"
              >
                Saikia Agriculture India
              </motion.p>
            </div>
            <motion.div
              className="h-px w-40 origin-left bg-gold-400"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease, delay: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
