import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, ArrowUpRight, Plus } from 'lucide-react'
import useSEO from '../hooks/useSEO'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import FAQAccordion from '../components/FAQAccordion'
import CTASection from '../components/CTASection'
import Button from '../components/Button'
import Img from '../components/Img'
import RevealText from '../components/RevealText'
import { ParallaxImage, AmbientBlobs } from '../components/Effects'
import { servicePageList, inquiryTypes, getService } from '../data/services'
import { faqs } from '../data/faq'
import { getIcon } from '../lib/icons'
import { img, px, servicesVideo } from '../data/media'
import { fadeUp, stagger, inView, ease, clipRevealLeft } from '../animations/motionVariants'

/* Shared bits */
function Header({ s, tone = 'dark' }) {
  const Icon = getIcon(s.icon)
  const dark = tone === 'dark'
  return (
    <>
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex items-center gap-4">
        <span className={`grid h-14 w-14 place-items-center rounded-2xl ${dark ? 'bg-forest-900 text-gold-400' : 'bg-gold-400 text-forest-950'}`}>
          <Icon className="h-6 w-6" />
        </span>
        <span className={`font-display text-sm font-bold uppercase tracking-[0.22em] ${dark ? 'text-emerald-600' : 'text-leaf-300'}`}>Service {s.number}</span>
      </motion.div>
      <RevealText text={s.fullTitle} className={`display-md mt-6 ${dark ? 'text-forest-900' : 'text-cream-50'}`} />
      <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className={`lead mt-5 ${dark ? 'text-forest-900/70' : 'text-cream-50/75'}`}>
        {s.description}
      </motion.p>
    </>
  )
}

function Features({ items, tone = 'dark', cols = 1 }) {
  const dark = tone === 'dark'
  return (
    <motion.ul variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={inView} className={`mt-8 grid gap-3 ${cols === 2 ? 'sm:grid-cols-2' : ''}`}>
      {items.map((f) => (
        <motion.li key={f} variants={fadeUp} className={`flex items-start gap-3 rounded-xl p-3 ${dark ? 'bg-white ring-1 ring-forest-900/5' : 'bg-white/5 ring-1 ring-white/10'}`}>
          <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${dark ? 'bg-leaf-100 text-emerald-600' : 'bg-gold-400 text-forest-950'}`}>
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span className={`text-[0.93rem] ${dark ? 'text-forest-900/80' : 'text-cream-50/85'}`}>{f}</span>
        </motion.li>
      ))}
    </motion.ul>
  )
}

function EnquireCTA({ s, variant = 'gold' }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-9 flex flex-wrap gap-3">
      <Button to={`/contact?type=${s.inquiry}`} variant={variant}>
        Enquire Now
      </Button>
    </motion.div>
  )
}

/* 01 — Alternating: image left */
function TractorSection({ s }) {
  return (
    <section id={s.id} className="section-y scroll-mt-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <ParallaxImage id={s.image} alt="Farmer on a tractor ploughing a field" className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]" sizes="(min-width:1024px) 45vw, 100vw" />
          <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
            {s.gallery.map((g, i) => (
              <motion.div
                key={g}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.1 }}
                className="group aspect-square overflow-hidden rounded-2xl border-4 border-cream-50 bg-forest-800 shadow-xl"
              >
                <Img id={g} alt="Tractor working in an agricultural field" sizes="15vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="pt-6 lg:pt-0">
          <Header s={s} />
          <Features items={s.features} />
          <EnquireCTA s={s} />
        </div>
      </div>
    </section>
  )
}

/* 02 — Alternating: text left, horizontal image strip */
function MachinerySection({ s }) {
  return (
    <section id={s.id} className="section-y scroll-mt-28 bg-cream-100">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Header s={s} />
            <EnquireCTA s={s} variant="dark" />
          </div>
          <div className="lg:col-span-7">
            <ParallaxImage id={s.image} alt="Drone view of a combine harvester working a field" className="aspect-[16/10]" sizes="(min-width:1024px) 55vw, 100vw" />
            <Features items={s.features} cols={2} />
          </div>
        </div>
        <ul className="no-scrollbar -mx-5 mt-12 flex snap-x gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
          {s.gallery.map((g, i) => (
            <motion.li
              key={g}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative aspect-[4/3] w-[75vw] shrink-0 snap-start sm:w-auto"
            >
              <motion.div
                variants={clipRevealLeft}
                transition={{ duration: 1.2, ease, delay: i * 0.12 }}
                className="group absolute inset-0 overflow-hidden rounded-[22px] bg-forest-800"
              >
              <Img id={g} alt={['Tractor cultivating a field', 'Modern farming machinery on display', 'Combine harvester in a field'][i]} sizes="33vw" className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
              <span className="absolute bottom-3 left-3 rounded-full bg-cream-50/90 px-3 py-1 text-xs font-bold text-forest-900 backdrop-blur">
                {['Tillage', 'Machinery', 'Harvest'][i]}
              </span>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* 03 — Dark full-bleed band */
function PumpsSection({ s }) {
  return (
    <section id={s.id} className="relative scroll-mt-28 overflow-hidden bg-forest-900 py-20 text-cream-50 md:py-28">
      <div className="furrows absolute inset-0" aria-hidden="true" />
      <AmbientBlobs tone="dark" />
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Header s={s} tone="light" />
          <Features items={s.features} tone="light" />
          <EnquireCTA s={s} />
        </div>
        <div className="grid grid-cols-5 gap-4">
          <ParallaxImage id={s.image} alt="Diesel water pump on a farm" className="col-span-3 aspect-[3/4]" sizes="30vw" />
          <div className="col-span-2 flex flex-col gap-4 pt-16">
            {s.gallery.map((g, i) => (
              <ParallaxImage key={g} id={g} alt={i === 0 ? 'Irrigation pump in green fields' : 'Pump with hose equipment'} className="aspect-[3/4]" rounded="rounded-[22px]" sizes="20vw" amount={6} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* 04 — Interactive expanding image panels */
function IrrigationSection({ s }) {
  const panels = [
    { id: s.image, label: 'Sprinklers', alt: 'Agricultural sprinklers on a farm field' },
    { id: s.gallery[0], label: 'Drip lines', alt: 'Drip irrigation watering young plants' },
    { id: s.gallery[1], label: 'Water distribution', alt: 'Farm irrigation system at work' },
    { id: s.gallery[2], label: 'Accessories', alt: 'Close-up of an irrigation sprinkler' },
    { id: s.gallery[3], label: 'Paddy irrigation', alt: 'Irrigated paddy field' },
  ]
  const [active, setActive] = useState(0)
  return (
    <section id={s.id} className="section-y scroll-mt-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <Header s={s} />
          </div>
          <div>
            <Features items={s.features} cols={2} />
            <EnquireCTA s={s} variant="dark" />
          </div>
        </div>
        <div className="mt-14 flex h-[460px] flex-col gap-3 md:h-[480px] md:flex-row" role="tablist" aria-label="Irrigation equipment types">
          {panels.map((p, i) => {
            const on = i === active
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative overflow-hidden rounded-[24px] bg-forest-800 text-left transition-[flex-grow] duration-700 ease-[var(--ease-premium)] ${on ? 'grow-[5]' : 'grow'} basis-0`}
              >
                <Img id={p.id} alt={p.alt} sizes="(min-width:768px) 50vw, 100vw" className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ${on ? 'scale-100' : 'scale-125'}`} />
                <span className={`absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent transition-opacity duration-500 ${on ? 'opacity-100' : 'opacity-80'}`} />
                <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
                  <span>
                    <span className="block font-display text-xs font-bold text-white/60">0{i + 1}</span>
                    <span className={`block whitespace-nowrap font-display font-bold transition-all duration-500 ${on ? 'text-2xl' : 'text-sm md:[writing-mode:vertical-rl] md:rotate-180'}`}>{p.label}</span>
                  </span>
                  {on && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-400 text-forest-950">
                      <ArrowUpRight className="h-5 w-5" />
                    </motion.span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* 05 — Card grid */
function ToolsSection({ s }) {
  const cards = [
    { id: s.image, label: 'Tractor implements', alt: 'Close-up of ploughing equipment' },
    { id: s.gallery[0], label: 'Hand tools', alt: 'Shovel and hoe' },
    { id: s.gallery[1], label: 'Field work', alt: 'Shovel in a trench in a green field' },
    { id: s.gallery[2], label: 'Field preparation', alt: 'Harrowing a field' },
  ]
  return (
    <section id={s.id} className="section-y scroll-mt-28 bg-beige-200">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Header s={s} />
          <Features items={s.features} />
          <EnquireCTA s={s} variant="dark" />
        </div>
        <motion.ul variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="grid grid-cols-2 gap-4 lg:col-span-7">
          {cards.map((c, i) => (
            <motion.li key={c.id} variants={fadeUp} className={`group relative overflow-hidden rounded-[24px] bg-forest-800 ${i === 0 ? 'row-span-2' : ''} ${i === 3 ? 'col-span-2 aspect-[2/1]' : 'aspect-[4/5]'} ${i === 0 ? 'aspect-auto' : ''}`}>
              <Img id={c.id} alt={c.alt} sizes="30vw" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
              <span className="absolute inset-0 bg-gradient-to-t from-forest-950/70 to-transparent" />
              <span className="absolute bottom-4 left-4 font-display font-bold text-white">{c.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

/* 06 — Supply: large image with overlapping feature panel */
function SupplySection({ s }) {
  return (
    <section id={s.id} className="section-y scroll-mt-28">
      <div className="container-x">
        <div className="relative">
          <ParallaxImage id={s.image} alt="Customer looking at agricultural machinery" className="aspect-[4/3] md:aspect-[21/9]" sizes="100vw" />
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease }}
            className="relative z-10 -mt-24 rounded-[28px] bg-cream-50 p-7 shadow-[0_40px_80px_-40px_rgba(13,43,31,0.45)] ring-1 ring-forest-900/5 md:mx-10 md:-mt-40 md:p-12 lg:ml-auto lg:mr-10 lg:max-w-[640px]"
          >
            <Header s={s} />
            <Features items={s.features} />
            <EnquireCTA s={s} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* 07 — Other (editable list) */
function OtherSection({ s }) {
  return (
    <section id={s.id} className="scroll-mt-28 px-3 pb-6 sm:px-5">
      <div className="relative overflow-hidden rounded-[32px] bg-forest-900 text-cream-50 md:rounded-[44px]">
        <div className="furrows absolute inset-0" aria-hidden="true" />
        <div className="container-x relative grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <Header s={s} tone="light" />
            <Features items={s.features} tone="light" />
          </div>
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-leaf-300">For example, you may ask about</p>
            <motion.ul variants={stagger(0.06)} initial="hidden" whileInView="show" viewport={inView} className="mt-5 flex flex-wrap gap-3">
              {s.examples.map((e) => (
                <motion.li key={e} variants={fadeUp} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-display font-semibold transition hover:border-gold-400 hover:text-gold-400">
                  <Plus className="h-4 w-4 text-gold-400" /> {e}
                </motion.li>
              ))}
            </motion.ul>
            <p className="mt-5 text-sm text-cream-50/50">Listing an example does not indicate availability — all requirements are confirmed directly with you.</p>
            <EnquireCTA s={s} />
          </div>
        </div>
      </div>
    </section>
  )
}

const sectionMap = {
  'tractor-rental': TractorSection,
  'agricultural-machinery': MachinerySection,
  'water-pumps-motors': PumpsSection,
  'irrigation-equipment': IrrigationSection,
  'farming-tools': ToolsSection,
  'equipment-supply': SupplySection,
  'other-equipment': OtherSection,
}

/* Sticky category navigator with scroll-spy */
function CategoryNav() {
  const [active, setActive] = useState(servicePageList[0].id)
  useEffect(() => {
    const els = servicePageList.map((s) => document.getElementById(s.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }

  return (
    <nav aria-label="Service categories" className="sticky top-[84px] z-30 border-y border-forest-900/10 bg-cream-50/90 backdrop-blur-lg sm:top-[92px]">
      <ul className="no-scrollbar container-x flex gap-1 overflow-x-auto py-3">
        {servicePageList.map((s) => {
          const on = active === s.id
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                onClick={go(s.id)}
                aria-current={on ? 'true' : undefined}
                className={`relative block rounded-full px-4 py-2 font-display text-sm font-semibold transition-colors duration-300 ${on ? 'text-cream-50' : 'text-forest-900/65 hover:text-forest-900'}`}
              >
                {on && <motion.span layoutId="svc-pill" className="absolute inset-0 -z-10 rounded-full bg-forest-900" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="relative">
                  {s.number} · {s.title}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/* Rental CTA with equipment selector */
function RentalCTA() {
  const navigate = useNavigate()
  const [type, setType] = useState('tractor-rental')
  return (
    <section className="section-y relative overflow-hidden bg-cream-100">
      <AmbientBlobs />
      <div className="container-x relative">
        <div className="grid items-center gap-10 overflow-hidden rounded-[32px] bg-white p-7 ring-1 ring-forest-900/5 md:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
          <div>
            <SectionHeading eyebrow="Equipment on rent" title="Looking for Equipment on *Rent?*" description="Tell us what agricultural equipment you need and submit an inquiry." titleClass="display-md" />
            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault()
                navigate(`/contact?type=${type}`)
              }}
            >
              <label htmlFor="rent-select" className="sr-only">
                Select equipment
              </label>
              <select id="rent-select" value={type} onChange={(e) => setType(e.target.value)} className="field flex-1">
                {inquiryTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <Button type="submit" magnetic={false}>
                Submit Inquiry
              </Button>
            </form>
            <p className="mt-3 text-xs text-forest-900/45">Select equipment, then complete your details on the inquiry form.</p>
          </div>
          <div className="relative grid grid-cols-2 gap-4">
            <ParallaxImage id={img.tractorDetail} alt="Close-up of a tractor" className="aspect-[3/4]" rounded="rounded-[22px]" sizes="25vw" amount={8} />
            <ParallaxImage id={img.irrigationField} alt="Irrigation system on a farm field" className="mt-12 aspect-[3/4]" rounded="rounded-[22px]" sizes="25vw" amount={8} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  useSEO({
    title: 'Services — Tractor Rental, Machinery, Pumps & Irrigation',
    description:
      'Explore tractor rental services, agricultural machinery, water pumps and motors, irrigation equipment, farming tools and equipment supply from Saikia Agriculture India.',
    path: '/services',
    image: px(img.combineDrone, 1200),
  })

  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="Our services"
        title="Agricultural Equipment & Machinery for *Every* Farming Need."
        text="Explore agricultural machinery, equipment rental options, irrigation solutions, and essential farming tools."
        imageId={img.tractorCultivating}
        imageAlt="Tractor cultivating an agricultural field"
        video={servicesVideo}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#tractor-rental" size="lg" onClick={(e) => {
            e.preventDefault()
            const el = document.getElementById('tractor-rental')
            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 150, behavior: 'smooth' })
          }}>
            Browse services
          </Button>
          <Button to="/contact" variant="outlineLight" size="lg">
            Enquire Now
          </Button>
        </div>
      </PageHero>

      <CategoryNav />

      {servicePageList.map((s) => {
        const Section = sectionMap[s.id]
        return <Section key={s.id} s={getService(s.id)} />
      })}

      <RentalCTA />

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-40">
              <SectionHeading eyebrow="FAQ" title="Questions, *Answered.*" description="Common questions about equipment inquiries. Can't find your answer? Reach out directly." titleClass="display-md" />
              <Button to="/contact" variant="outlineDark" className="mt-8">
                Ask a question
              </Button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Next step"
        title="Find the Right Equipment for Your Agricultural *Needs.*"
        imageId={img.combineDrone}
        imageAlt="Aerial view of a combine harvester in a field"
        primary={{ label: 'Contact Us', to: '/contact' }}
      />
    </>
  )
}
