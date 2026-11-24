import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * Returns a ref plus a boolean that turns true once the element enters the
 * viewport. Respects prefers-reduced-motion (always "in view").
 */
export default function useScrollAnimation(options = { once: true, amount: 0.25 }) {
  const ref = useRef(null)
  const inView = useInView(ref, options)
  const reduce = useReducedMotion()
  return { ref, inView: reduce ? true : inView, reduce }
}
