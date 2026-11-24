import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EquipmentCard from './EquipmentCard'
import SectionHeading from './SectionHeading'
import Button from './Button'

gsap.registerPlugin(ScrollTrigger)

/**
 * Horizontal equipment showcase.
 * Desktop (≥1024px, motion allowed): GSAP ScrollTrigger pins the section and
 * scrolls the track sideways. Mobile/tablet: native swipeable scroll-snap row.
 */
export default function EquipmentShowcase({ items, eyebrow, title, description }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const track = trackRef.current
      const distance = () => Math.max(0, track.scrollWidth - track.parentElement.clientWidth)
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
      // images/fonts can shift layout after mount
      const refresh = () => ScrollTrigger.refresh()
      const t = setTimeout(refresh, 900)
      window.addEventListener('load', refresh)
      return () => {
        clearTimeout(t)
        window.removeEventListener('load', refresh)
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-beige-200 lg:flex lg:h-screen lg:flex-col lg:justify-center">
      <div className="furrows-dark absolute inset-0" aria-hidden="true" />
      <div className="container-x relative pt-20 md:pt-28 lg:pt-24">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div className="shrink-0">
            <Button to="/contact" variant="dark">
              Send an equipment inquiry
            </Button>
          </div>
        </div>
      </div>

      <div className="relative mt-12 pb-20 md:pb-28 lg:mt-12 lg:pb-0">
        <div className="no-scrollbar overflow-x-auto lg:overflow-visible">
          <ul
            ref={trackRef}
            className="flex w-max snap-x snap-mandatory gap-5 px-5 sm:px-8 lg:snap-none lg:gap-6 lg:px-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]"
          >
            {items.map((item, i) => (
              <li key={item.title} className="w-[78vw] max-w-[360px] shrink-0 snap-start sm:w-[46vw] lg:w-[min(27vw,380px)]">
                <EquipmentCard item={item} index={i} />
              </li>
            ))}
          </ul>
        </div>
        <p className="container-x mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-forest-900/40 lg:hidden" aria-hidden="true">
          Swipe to explore →
        </p>
      </div>
    </section>
  )
}
