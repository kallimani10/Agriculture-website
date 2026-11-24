import { motion, useReducedMotion } from 'framer-motion'
import { ease } from '../animations/motionVariants'

/**
 * Masked, staggered word-by-word headline reveal.
 * Wrap words in *asterisks* to highlight them, e.g. "Powering *Indian* Agriculture".
 */
export default function RevealText({
  text,
  as = 'h2',
  className = '',
  highlightClass = 'text-gold-400',
  delay = 0,
  stagger = 0.055,
  onMount = false,
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.h2
  const words = text.split(' ')

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } },
  }
  const word = {
    hidden: reduce ? { opacity: 0 } : { y: '110%' },
    show: { y: '0%', opacity: 1, transition: { duration: reduce ? 0.3 : 0.95, ease } },
  }

  const trigger = onMount
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.3 } }

  return (
    <MotionTag className={className} variants={container} {...trigger}>
      <span className="sr-only">{text.replaceAll('*', '')}</span>
      {words.map((w, i) => {
        const hl = w.includes('*')
        const clean = w.replaceAll('*', '')
        return (
          <span key={i} aria-hidden="true" className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span variants={word} className={`inline-block ${hl ? highlightClass : ''}`}>
              {clean}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        )
      })}
    </MotionTag>
  )
}
