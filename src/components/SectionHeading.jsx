import { motion } from 'framer-motion'
import RevealText from './RevealText'
import { fadeUp } from '../animations/motionVariants'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className = '',
  titleClass = 'display-lg',
  as = 'h2',
}) {
  const centered = align === 'center'
  const dark = tone === 'dark'
  const reveal = { variants: fadeUp, initial: 'hidden', whileInView: 'show', viewport: { once: true } }

  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <motion.p {...reveal} className={`eyebrow mb-5 ${dark ? 'text-emerald-600' : 'text-leaf-300'}`}>
          {eyebrow}
        </motion.p>
      )}
      <RevealText
        as={as}
        text={title}
        className={`${titleClass} ${dark ? 'text-forest-900' : 'text-cream-50'}`}
        highlightClass={dark ? 'text-emerald-600' : 'text-gold-400'}
      />
      {description && (
        <motion.p
          {...reveal}
          className={`lead mt-6 max-w-2xl ${dark ? 'text-forest-900/70' : 'text-cream-50/75'} ${centered ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
