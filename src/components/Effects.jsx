import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion } from 'framer-motion'
import { useFinePointer } from '../hooks/useMediaQuery'
import Img from './Img'
import { clipReveal, inView } from '../animations/motionVariants'

/** 3D-style tilt that follows the pointer (desktop only). */
export function TiltCard({ children, className = '', max = 7 }) {
  const ref = useRef(null)
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 20 })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 20 })

  if (!fine || reduce) return <div className={className}>{children}</div>

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

/** Image that drifts vertically as you scroll, revealed with a clip wipe. */
export function ParallaxImage({ id, alt, className = '', sizes = '50vw', amount = 12, reveal = true, rounded = 'rounded-[28px]' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])

  // The observer sits on the outer wrapper: a fully clipped element is reported
  // as not intersecting by Chrome, so the clip is applied to the inner layer.
  return (
    <motion.div
      ref={ref}
      initial={reveal ? 'hidden' : undefined}
      whileInView={reveal ? 'show' : undefined}
      viewport={inView}
      className={className.includes('absolute') ? className : `relative ${className}`}
    >
      <motion.div variants={reveal ? clipReveal : undefined} className={`absolute inset-0 overflow-hidden bg-forest-800 ${rounded}`}>
        <motion.div style={reduce ? undefined : { y, scale: 1 + amount / 50 }} className="absolute inset-0">
          <Img id={id} alt={alt} sizes={sizes} className="h-full w-full object-cover" />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/** Soft, slowly drifting gradient blobs for section backgrounds. */
export function AmbientBlobs({ tone = 'light' }) {
  const a = tone === 'light' ? 'bg-leaf-300/30' : 'bg-emerald-500/25'
  const b = tone === 'light' ? 'bg-gold-400/20' : 'bg-gold-400/10'
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={`absolute -left-32 top-10 h-[420px] w-[420px] animate-drift rounded-full blur-[110px] ${a}`} />
      <div className={`absolute -right-24 bottom-0 h-[380px] w-[380px] animate-drift rounded-full blur-[110px] [animation-delay:-8s] ${b}`} />
    </div>
  )
}
