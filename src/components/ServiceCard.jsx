import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Img from './Img'
import { getIcon } from '../lib/icons'
import { fadeUp } from '../animations/motionVariants'

/**
 * Category card for the home bento grid.
 *  variant="feature" → large image card with overlay text
 *  variant="split"   → image top, text block bottom (light)
 *  variant="minimal" → dark text card with small image reveal on hover
 */
export default function ServiceCard({ service, variant = 'feature', className = '', sizes = '(min-width:1024px) 33vw, 100vw' }) {
  const Icon = getIcon(service.icon)
  const href = `/services#${service.anchor || service.id}`

  if (variant === 'split') {
    return (
      <motion.article variants={fadeUp} className={`group flex flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_1px_0_rgba(13,43,31,0.06)] ring-1 ring-forest-900/[0.06] transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(13,43,31,0.35)] ${className}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-forest-800">
          <Img id={service.image} alt={service.title} sizes={sizes} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-110" />
          <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1 font-display text-xs font-bold text-forest-900 backdrop-blur">
            {service.number}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-leaf-100 text-emerald-600 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="font-display text-lg font-bold leading-tight">{service.title}</h3>
          </div>
          <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-forest-900/65">{service.short}</p>
          <Link to={href} className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-bold text-emerald-600 transition group-hover:gap-3" aria-label={`Explore ${service.title}`}>
            Explore <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.article>
    )
  }

  if (variant === 'minimal') {
    return (
      <motion.article variants={fadeUp} className={`group relative overflow-hidden rounded-[26px] bg-forest-900 p-7 text-cream-50 ${className}`}>
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <Img id={service.image} alt="" sizes={sizes} className="h-full w-full scale-110 object-cover transition-transform duration-[1.4s] group-hover:scale-100" />
          <div className="absolute inset-0 bg-forest-950/70" />
        </div>
        <div className="relative flex h-full flex-col">
          <div className="flex items-start justify-between">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-gold-400 transition-transform duration-500 group-hover:rotate-12">
              <Icon className="h-6 w-6" />
            </span>
            <span className="font-display text-sm font-bold text-white/35">{service.number}</span>
          </div>
          <h3 className="mt-10 font-display text-xl font-bold">{service.title}</h3>
          <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-cream-50/65">{service.short}</p>
          <Link to={`/contact?type=${service.inquiry}`} className="mt-6 inline-flex items-center gap-1.5 font-display text-sm font-bold text-gold-400 transition group-hover:gap-3" aria-label={`Enquire about ${service.title}`}>
            Enquire <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.article>
    )
  }

  // feature
  return (
    <motion.article variants={fadeUp} className={`group relative isolate overflow-hidden rounded-[26px] bg-forest-800 text-white ${className}`}>
      <Img id={service.image} alt={service.title} sizes={sizes} className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-110" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/95 via-forest-950/40 to-transparent transition-opacity duration-500 group-hover:from-forest-950" />
      <div className="flex h-full min-h-[320px] flex-col justify-between p-7">
        <div className="flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-400 text-forest-950 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
            <Icon className="h-6 w-6" />
          </span>
          <span className="rounded-full border border-white/25 px-3 py-1 font-display text-xs font-bold backdrop-blur">{service.number}</span>
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold md:text-[1.7rem]">{service.title}</h3>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/75">{service.short}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={href} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-display text-sm font-bold text-forest-900 transition hover:bg-gold-400" aria-label={`Explore ${service.title}`}>
              Explore <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to={`/contact?type=${service.inquiry}`} className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-2 font-display text-sm font-bold text-white transition hover:border-white hover:bg-white/10" aria-label={`Enquire about ${service.title}`}>
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
