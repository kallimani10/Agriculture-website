import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import RevealText from './RevealText'
import Button from './Button'
import Img from './Img'
import { fadeUp } from '../animations/motionVariants'

/** Full-bleed CTA band with a parallax agricultural background. */
export default function CTASection({ eyebrow, title, text, imageId, imageAlt = '', primary, secondary }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section ref={ref} className="px-3 py-3 sm:px-5 sm:py-5">
      <div className="relative isolate overflow-hidden rounded-[32px] bg-forest-900 text-white md:rounded-[44px]">
        <motion.div style={reduce ? undefined : { y, scale: 1.3 }} className="absolute inset-0 -z-10">
          <Img id={imageId} alt={imageAlt} sizes="100vw" className="h-full w-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/95 via-forest-950/75 to-forest-950/30" />
        <div className="furrows absolute inset-0 -z-10" />

        <div className="container-x py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            {eyebrow && (
              <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="eyebrow mb-6 text-leaf-300">
                {eyebrow}
              </motion.p>
            )}
            <RevealText text={title} className="display-lg text-white" />
            {text && (
              <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="lead mt-6 max-w-xl text-white/75">
                {text}
              </motion.p>
            )}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-10 flex flex-wrap gap-3">
              {primary && (
                <Button to={primary.to} size="lg">
                  {primary.label}
                </Button>
              )}
              {secondary && (
                <Button to={secondary.to} variant="outlineLight" size="lg">
                  {secondary.label}
                </Button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
