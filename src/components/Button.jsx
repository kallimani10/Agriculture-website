import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Magnetic from './Magnetic'

const styles = {
  gold: 'bg-gold-400 text-forest-950 hover:bg-gold-500 shadow-[0_12px_30px_-12px_rgba(231,185,85,0.8)]',
  dark: 'bg-forest-900 text-cream-50 hover:bg-forest-800',
  light: 'bg-cream-50 text-forest-900 hover:bg-white',
  outlineLight: 'border border-white/35 text-white hover:border-white hover:bg-white/10 backdrop-blur-sm',
  outlineDark: 'border border-forest-900/25 text-forest-900 hover:border-forest-900 hover:bg-forest-900/5',
}

const sizes = {
  sm: 'px-4 py-2.5 text-sm',
  md: 'px-6 py-3.5 text-[0.92rem]',
  lg: 'px-7 py-4 text-[0.98rem]',
}

/**
 * Call-to-action button. Renders a router <Link> for `to`, an <a> for `href`
 * (external / tel / mailto), otherwise a <button>.
 */
export default function Button({
  to,
  href,
  children,
  variant = 'gold',
  icon = true,
  magnetic = true,
  className = '',
  size = 'md',
  type = 'button',
  ...rest
}) {
  const cls = `group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-display font-bold tracking-tight transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${sizes[size]} ${styles[variant]} ${className}`

  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="relative grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-black/10" aria-hidden="true">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-5 group-hover:-translate-y-5" />
          <ArrowUpRight className="absolute h-4 w-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </>
  )

  let el
  if (to) {
    el = (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  } else if (href) {
    el = (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    )
  } else {
    el = (
      <button type={type} className={cls} {...rest}>
        {inner}
      </button>
    )
  }

  return magnetic ? <Magnetic>{el}</Magnetic> : el
}
