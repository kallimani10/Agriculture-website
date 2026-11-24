import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone, Mail } from 'lucide-react'
import Logo from './Logo'
import Button from './Button'
import { navLinks, siteConfig } from '../config/siteConfig'
import { ease } from '../animations/motionVariants'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on route change.
  useEffect(() => setOpen(false), [pathname])

  // Lock page scroll + close on Escape while drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const solid = scrolled
  const { phone, email } = siteConfig.contact

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Main navigation"
          className={`mx-auto flex max-w-[1320px] items-center justify-between rounded-full py-2.5 pl-4 pr-2.5 transition-all duration-500 sm:pl-5 ${
            solid
              ? 'border border-forest-900/10 bg-cream-50/85 shadow-[0_10px_40px_-15px_rgba(13,43,31,0.35)] backdrop-blur-xl'
              : 'border border-white/10 bg-forest-950/20 backdrop-blur-md'
          }`}
        >
          <Logo light={!solid} />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `group relative block px-4 py-2 font-display text-[0.92rem] font-semibold transition-colors duration-300 ${
                      solid
                        ? isActive ? 'text-forest-900' : 'text-forest-900/65 hover:text-forest-900'
                        : isActive ? 'text-white' : 'text-white/75 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      {/* hover underline */}
                      <span
                        className={`absolute inset-x-4 bottom-1 h-[2px] origin-left scale-x-0 rounded-full transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-x-100 ${
                          solid ? 'bg-forest-900/30' : 'bg-white/40'
                        }`}
                      />
                      {/* active indicator */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-4 bottom-1 h-[2px] rounded-full bg-gold-400"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden min-[420px]:block">
              <Button to="/contact" size="sm">
                Enquire Now
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden ${
                solid ? 'bg-forest-900 text-cream-50' : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-forest-950/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.6, ease }}
              className="furrows absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-forest-900 p-6 text-cream-50"
            >
              <div className="flex items-center justify-between">
                <Logo light onClick={() => setOpen(false)} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <motion.ul
                className="mt-14 space-y-1"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
              >
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.to}
                    variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease } } }}
                  >
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) =>
                        `flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-3xl font-bold transition-colors ${
                          isActive ? 'text-gold-400' : 'text-cream-50 hover:text-leaf-300'
                        }`
                      }
                    >
                      <span className="font-sans text-xs font-medium text-white/40">0{i + 1}</span>
                      {l.label}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-auto space-y-4">
                <Button to="/contact" className="w-full" magnetic={false}>
                  Enquire Now
                </Button>
                <div className="space-y-2 text-sm text-cream-50/60">
                  {phone && (
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-cream-50">
                      <Phone className="h-4 w-4" /> {phone}
                    </a>
                  )}
                  {email && (
                    <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-cream-50">
                      <Mail className="h-4 w-4" /> {email}
                    </a>
                  )}
                  <p className="text-xs text-cream-50/40">{siteConfig.tagline}</p>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
