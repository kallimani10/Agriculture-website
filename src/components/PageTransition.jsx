import { motion } from 'framer-motion'
import { pageTransition } from '../animations/motionVariants'

/** Wraps each route for a smooth fade/slide transition between pages. */
export default function PageTransition({ children }) {
  return (
    <motion.main id="main" initial="initial" animate="animate" exit="exit" variants={pageTransition}>
      {children}
    </motion.main>
  )
}
