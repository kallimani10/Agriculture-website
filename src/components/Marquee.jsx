import { Wheat } from 'lucide-react'

/**
 * Seamless infinite marquee. Content is duplicated and translated by -50%.
 * Pauses on hover; the CSS animation is disabled under prefers-reduced-motion.
 */
export default function Marquee({ items, reverse = false, duration = 45, tone = 'dark', className = '' }) {
  const toneCls =
    tone === 'dark'
      ? 'bg-forest-900 text-cream-50'
      : tone === 'gold'
        ? 'bg-gold-400 text-forest-950'
        : 'bg-cream-100 text-forest-900'
  const sepCls = tone === 'gold' ? 'text-forest-900/50' : tone === 'dark' ? 'text-gold-400' : 'text-emerald-600'

  const row = (hidden) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <li key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-xl font-extrabold uppercase tracking-tight md:px-9 md:text-3xl">{t}</span>
          <Wheat className={`h-5 w-5 shrink-0 md:h-6 md:w-6 ${sepCls}`} aria-hidden="true" />
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`group relative overflow-hidden py-5 md:py-7 ${toneCls} ${className}`}>
      <span className="sr-only">{items.join(' • ')}</span>
      <div
        className={`flex w-max group-hover:[animation-play-state:paused] ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ '--marquee-duration': `${duration}s` }}
        aria-hidden="true"
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
