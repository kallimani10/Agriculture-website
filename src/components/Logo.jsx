import { Link } from 'react-router-dom'

export function LogoMark({ className = 'h-10 w-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="18" fill="currentColor" />
      <path d="M32 11c-9.5 8.4-13.6 17.4-13.6 25.4a13.6 13.6 0 0 0 27.2 0C45.6 28.4 41.5 19.4 32 11z" fill="#e7b955" />
      <path d="M32 22v31M32 35l-7-6.2M32 43.5l8.2-7" stroke="#0d2b1f" strokeWidth="3.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/** Brand lockup. `light` = for dark backgrounds. */
export default function Logo({ light = false, onClick }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-3" aria-label="Saikia Agriculture India — Home">
      <LogoMark
        className={`h-10 w-10 shrink-0 transition-transform duration-500 group-hover:-rotate-[8deg] ${light ? 'text-forest-700' : 'text-forest-900'}`}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.05rem] font-extrabold tracking-tight ${light ? 'text-cream-50' : 'text-forest-900'}`}>
          SAIKIA
        </span>
        <span
          className={`mt-1 whitespace-nowrap font-display text-[0.6rem] font-semibold uppercase tracking-[0.28em] ${light ? 'text-leaf-300' : 'text-emerald-600'}`}
        >
          Agriculture India
        </span>
      </span>
    </Link>
  )
}
