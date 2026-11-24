import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { ease } from '../animations/motionVariants'

function Item({ item, index, open, onToggle }) {
  const id = useId()
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease, delay: index * 0.05 }}
      className={`rounded-2xl border transition-colors duration-500 ${open ? 'border-emerald-600/30 bg-white shadow-[0_20px_50px_-30px_rgba(13,43,31,0.35)]' : 'border-forest-900/10 bg-white/50 hover:bg-white'}`}
    >
      <h3>
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex w-full items-center gap-5 px-5 py-5 text-left md:px-7 md:py-6"
        >
          <span className={`font-display text-sm font-bold transition-colors ${open ? 'text-emerald-600' : 'text-forest-900/35'}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="flex-1 font-display text-base font-bold leading-snug md:text-lg">{item.q}</span>
          <span
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500 ${open ? 'rotate-45 bg-forest-900 text-gold-400' : 'bg-leaf-100 text-forest-900'}`}
            aria-hidden="true"
          >
            <Plus className="h-5 w-5" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-btn`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-6 pl-[3.6rem] pr-8 leading-relaxed text-forest-900/70 md:px-7 md:pl-[4.6rem] md:pr-20">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}

export default function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <Item key={i} item={item} index={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
      ))}
    </ul>
  )
}
