import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Img from './Img'

/** Showcase card — tall image, floating label, description and enquiry CTA. */
export default function EquipmentCard({ item, index, className = '' }) {
  return (
    <article className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] bg-cream-50 text-forest-900 ${className}`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-forest-800 lg:aspect-[4/3] [@media(min-height:1000px)]:lg:aspect-[4/5]">
        <Img
          id={item.image}
          alt={item.alt}
          sizes="(min-width:1024px) 30vw, 80vw"
          className="h-full w-full object-cover transition-transform duration-[1.3s] ease-[var(--ease-premium)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-forest-950/50 px-3 py-1.5 font-display text-xs font-bold text-white backdrop-blur-md">
          {String(index + 1).padStart(2, '0')} / {item.tag}
        </span>
        <span className="absolute bottom-4 left-4 right-4 font-display text-2xl font-extrabold leading-tight text-white">{item.title}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex-1 text-[0.93rem] leading-relaxed text-forest-900/70">{item.text}</p>
        <Link
          to={`/contact?type=${item.inquiry}`}
          className="mt-5 inline-flex items-center justify-between rounded-full border border-forest-900/15 py-2.5 pl-5 pr-2.5 font-display text-sm font-bold transition-colors duration-300 group-hover:border-forest-900 group-hover:bg-forest-900 group-hover:text-cream-50"
          aria-label={`Enquire about ${item.title}`}
        >
          Enquire about this
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-400 text-forest-950 transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </article>
  )
}
