import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'
import Img from './Img'
import { px } from '../data/media'
import { clipReveal, ease } from '../animations/motionVariants'

/**
 * Asymmetric image gallery with clip reveals, hover zoom, captions and an
 * accessible lightbox (Esc to close, ← → to navigate).
 */
export default function Gallery({ items }) {
  const [active, setActive] = useState(-1)
  const open = active >= 0

  const close = useCallback(() => setActive(-1), [])
  const next = useCallback(() => setActive((i) => (i + 1) % items.length), [items.length])
  const prev = useCallback(() => setActive((i) => (i - 1 + items.length) % items.length), [items.length])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close, next, prev])

  return (
    <>
      <ul className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4 md:gap-4 lg:auto-rows-[250px]">
        {items.map((g, i) => (
          <motion.li
            key={g.id}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className={`relative ${g.span || ''}`}
          >
            <motion.div
              variants={clipReveal}
              transition={{ duration: 1.2, ease, delay: (i % 4) * 0.08 }}
              className="absolute inset-0 overflow-hidden rounded-[22px] bg-forest-800"
            >
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group absolute inset-0 h-full w-full text-left"
              aria-label={`View larger: ${g.caption}`}
            >
              <Img id={g.id} alt={g.alt} sizes="(min-width:768px) 40vw, 50vw" className="h-full w-full object-cover transition-transform duration-[1.3s] ease-[var(--ease-premium)] group-hover:scale-110" />
              <span className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/0 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute right-3 top-3 grid h-9 w-9 scale-75 place-items-center rounded-full bg-white/90 text-forest-900 opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
              <span className="absolute inset-x-4 bottom-4 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-leaf-300">{g.tag}</span>
                <span className="mt-1 block font-display text-sm font-bold text-white md:text-base">{g.caption}</span>
              </span>
            </button>
            </motion.div>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={items[active].caption}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-forest-950/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button type="button" onClick={close} aria-label="Close" autoFocus className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous image" className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:left-8">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next image" className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-8">
              <ChevronRight className="h-6 w-6" />
            </button>
            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease }}
                className="max-h-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={px(items[active].id, 1800)} alt={items[active].alt} className="max-h-[78vh] w-auto rounded-2xl object-contain" />
                <figcaption className="mt-4 flex items-center justify-between gap-4 text-white">
                  <span className="font-display font-bold">{items[active].caption}</span>
                  <span className="text-sm text-white/50">
                    {active + 1} / {items.length}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
