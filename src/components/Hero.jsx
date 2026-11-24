import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { Pause, Play, Tractor, Droplets, Sprout, ChevronDown } from 'lucide-react'
import Button from './Button'
import RevealText from './RevealText'
import { heroVideo } from '../data/media'
import { ease } from '../animations/motionVariants'

/** Pick the best video rendition for this device & connection. */
function pickSource() {
  const conn = navigator.connection || {}
  if (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '')) return null // image only
  const px = window.innerWidth * Math.min(window.devicePixelRatio || 1, 2)
  if (window.innerWidth < 768) return heroVideo.sd
  if (px >= 2600 && conn.effectiveType !== '3g') return heroVideo.uhd // genuine 4K source
  return heroVideo.hd
}

const floatingLabels = [
  { icon: Tractor, title: 'Tractor Rental', note: 'Seasonal & short-term', cls: 'mr-0', delay: 1.4 },
  { icon: Droplets, title: 'Water Pumps & Motors', note: 'For farm water supply', cls: 'mr-14', delay: 1.6 },
  { icon: Sprout, title: 'Irrigation Equipment', note: 'Sprinkler & drip', cls: 'mr-4', delay: 1.8 },
]

export default function Hero() {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const reduce = useReducedMotion()
  const [src, setSrc] = useState(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduce) return // reduced motion → static poster image
    setSrc(pickSource())
  }, [reduce])

  // Ensure muted autoplay starts reliably (iOS Safari reads the property, not the attribute).
  useEffect(() => {
    const v = videoRef.current
    if (!v || !src) return
    v.muted = true
    const p = v.play()
    if (p && p.catch) p.catch(() => setPaused(true))
  }, [src])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPaused(false)
    } else {
      v.pause()
      setPaused(true)
    }
  }

  const showVideo = src && !failed

  return (
    <section ref={ref} className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-forest-950 text-white" aria-label="Introduction">
      {/* Media layer */}
      <motion.div style={reduce ? undefined : { scale: mediaScale }} className="absolute inset-0">
        {/* Poster / fallback image — always rendered beneath the video */}
        <img
          src={heroVideo.poster}
          alt="Tractor ploughing farmland in India"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {showVideo && (
          <video
            ref={videoRef}
            key={src}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${ready ? 'opacity-100' : 'opacity-0'}`}
            src={src}
            poster={heroVideo.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onCanPlay={() => setReady(true)}
            onError={() => setFailed(true)}
          />
        )}
      </motion.div>

      {/* Overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/45 to-forest-950/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/85 via-forest-950/35 to-transparent" />
      <div className="grain absolute inset-0" />

      {/* Content */}
      <motion.div style={reduce ? undefined : { y: contentY, opacity: contentOpacity }} className="container-x relative flex flex-1 flex-col justify-end pb-28 pt-36 md:pb-32 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
          className="eyebrow mb-6 text-leaf-300"
        >
          Agricultural equipment · Machinery · Tractor rental
        </motion.p>

        <RevealText
          as="h1"
          onMount
          delay={0.6}
          stagger={0.07}
          text="Powering Indian Agriculture. Supporting *Every* *Farmer.*"
          className="hero-title max-w-[1180px] text-white"
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.3 }}
          className="lead mt-7 max-w-xl text-white/80"
        >
          From agricultural machinery and tractor rentals to essential farming equipment, Saikia Agriculture India helps bring the
          right resources closer to the people who grow our future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 1.5 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          <Button to="/services" size="lg">
            Explore Our Services
          </Button>
          <Button to="/contact" variant="outlineLight" size="lg">
            Enquire Now
          </Button>
        </motion.div>
      </motion.div>

      {/* Floating equipment labels (desktop) */}
      <div className="pointer-events-none absolute right-[5%] top-[13%] hidden flex-col items-end gap-3 xl:flex [@media(max-height:760px)]:hidden" aria-hidden="true">
        {floatingLabels.map(({ icon: Icon, title, note, cls, delay }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay }}
            className={cls}
          >
            <div className="flex animate-float items-center gap-3 rounded-2xl border border-white/15 bg-white/10 py-2.5 pl-2.5 pr-5 backdrop-blur-md" style={{ animationDelay: `${i * 1.3}s` }}>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-400 text-forest-950">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-sm font-bold">{title}</span>
                <span className="block text-xs text-white/65">{note}</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom bar: scroll indicator + video control */}
      <motion.div style={reduce ? undefined : { opacity: contentOpacity }} className="absolute inset-x-0 bottom-0">
        <div className="container-x flex items-center justify-between pb-7">
          <motion.a
            href="#intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="group flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 hover:text-white"
          >
            <span className="relative grid h-11 w-7 place-items-start justify-center rounded-full border border-white/40 pt-2">
              <motion.span
                className="block h-2 w-1 rounded-full bg-gold-400"
                animate={reduce ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
            <span className="hidden sm:inline">Scroll to explore</span>
            <ChevronDown className="h-4 w-4 sm:hidden" />
          </motion.a>

          {showVideo && ready && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label={paused ? 'Play background video' : 'Pause background video'}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white/80 backdrop-blur-sm transition hover:border-white hover:text-white"
            >
              {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
          )}
        </div>
      </motion.div>
    </section>
  )
}
