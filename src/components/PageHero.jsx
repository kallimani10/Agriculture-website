import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import RevealText from './RevealText'
import { px } from '../data/media'
import { ease } from '../animations/motionVariants'

/**
 * Inner-page hero with parallax image (or optional background video),
 * breadcrumb, masked headline and supporting text.
 */
export default function PageHero({ eyebrow, title, text, imageId, imageAlt, video, crumb, children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [videoSrc, setVideoSrc] = useState(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!video || reduce) return
    const conn = navigator.connection || {}
    if (conn.saveData) return
    setVideoSrc(window.innerWidth < 768 ? null : video.hd)
  }, [video, reduce])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <section ref={ref} className="relative flex min-h-[78svh] items-end overflow-hidden bg-forest-950 pt-32 text-white md:min-h-[86svh]">
      <motion.div
        style={reduce ? undefined : { y }}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease }}
        className="absolute inset-0"
      >
        <img
          src={px(imageId, 1800)}
          srcSet={`${px(imageId, 800)} 800w, ${px(imageId, 1400)} 1400w, ${px(imageId, 2000)} 2000w`}
          sizes="100vw"
          alt={imageAlt}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        {videoSrc && !failed && (
          <video
            src={videoSrc}
            poster={px(imageId, 1600)}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            onCanPlay={() => setReady(true)}
            onError={() => setFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/55 to-forest-950/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/70 to-transparent" />
      <div className="grain absolute inset-0" />

      <div className="container-x relative pb-16 md:pb-24">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <ol className="mb-8 flex items-center gap-2 text-sm text-white/65">
            <li>
              <Link to="/" className="transition hover:text-gold-400">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li aria-current="page" className="font-semibold text-white">
              {crumb}
            </li>
          </ol>
        </motion.nav>

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="eyebrow mb-5 text-leaf-300"
          >
            {eyebrow}
          </motion.p>
        )}
        <RevealText as="h1" onMount delay={0.35} text={title} className="display-xl max-w-5xl text-white" />
        {text && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.9 }}
            className="lead mt-7 max-w-2xl text-white/80"
          >
            {text}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.1 }}
            className="mt-9"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
