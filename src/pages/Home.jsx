import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Check, Tractor, MessageSquareText, Cog, PackageCheck, HeartHandshake, Sprout, Search, ListChecks, Send, PhoneCall,
} from 'lucide-react'
import useSEO from '../hooks/useSEO'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import SectionHeading from '../components/SectionHeading'
import ServiceCard from '../components/ServiceCard'
import EquipmentShowcase from '../components/EquipmentShowcase'
import Gallery from '../components/Gallery'
import CTASection from '../components/CTASection'
import Button from '../components/Button'
import Img from '../components/Img'
import { ParallaxImage, TiltCard, AmbientBlobs } from '../components/Effects'
import { services } from '../data/services'
import { img, px } from '../data/media'
import { fadeUp, stagger, inView, ease } from '../animations/motionVariants'

gsap.registerPlugin(ScrollTrigger)

/* ───────── Intro ───────── */
function Intro() {
  const points = [
    'Tractor rental enquiries for seasonal field work',
    'Agricultural machinery, pumps and irrigation equipment',
    'Farming tools, implements and accessories',
    'One point of contact for rental and supply requirements',
  ]
  return (
    <section id="intro" className="section-y relative overflow-hidden">
      <AmbientBlobs />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Image composition */}
        <div className="relative order-2 lg:order-1">
          <ParallaxImage id={img.womenTractor} alt="Farmers working beside a tractor in an Indian field" className="aspect-[4/5] w-[82%]" sizes="(min-width:1024px) 40vw, 80vw" />
          <ParallaxImage
            id={img.irrigationSystem}
            alt="Irrigation system watering crops"
            className="absolute -bottom-10 right-0 aspect-square w-[46%] rounded-[30px] border-[6px] border-cream-50 shadow-2xl"
            rounded="rounded-[24px]"
            sizes="(min-width:1024px) 22vw, 45vw"
            amount={8}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease, delay: 0.5 }}
            className="absolute right-[6%] top-8 hidden sm:block"
          >
            <div className="animate-float rounded-2xl bg-gold-400 px-5 py-4 font-display text-forest-950 shadow-xl">
              <span className="block text-[0.65rem] font-bold uppercase tracking-[0.2em] opacity-70">We help with</span>
              <span className="block text-lg font-extrabold leading-tight">Rental &amp; Supply</span>
            </div>
          </motion.div>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Who we are"
            title="Everything Your Farm Needs, *Closer* Than Ever."
            description="Saikia Agriculture India is an agricultural equipment rental and supply business. We help farmers and agricultural customers find the machinery, tractors, water pumps, irrigation equipment and tools their work depends on — and make enquiring about them simple."
          />
          <motion.ul variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={inView} className="mt-9 space-y-3.5">
            {points.map((p) => (
              <motion.li key={p} variants={fadeUp} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-forest-900/80">{p}</span>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-10 flex flex-wrap gap-3">
            <Button to="/about" variant="dark">
              More about us
            </Button>
            <Button to="/services" variant="outlineDark">
              View services
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ───────── Categories (bento) ───────── */
function Categories() {
  // Varied compositions: each entry sets a card variant and grid span.
  const layout = [
    { v: 'feature', cls: 'md:col-span-2 lg:col-span-7 lg:row-span-2 min-h-[420px] lg:min-h-[560px]', sizes: '(min-width:1024px) 58vw, 100vw' },
    { v: 'feature', cls: 'lg:col-span-5 min-h-[300px]' },
    { v: 'minimal', cls: 'lg:col-span-5 min-h-[260px]' },
    { v: 'split', cls: 'lg:col-span-4' },
    { v: 'split', cls: 'lg:col-span-4' },
    { v: 'split', cls: 'lg:col-span-4' },
    { v: 'minimal', cls: 'lg:col-span-6 min-h-[260px]' },
    { v: 'feature', cls: 'md:col-span-2 lg:col-span-6 min-h-[300px]' },
  ]
  return (
    <section className="section-y bg-cream-100">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Equipment & services"
            title="Explore Our Agricultural *Equipment* & Services."
            description="Eight categories, one goal — helping you find the right equipment for the work in front of you."
          />
          <Button to="/services" variant="outlineDark" className="shrink-0">
            All services
          </Button>
        </div>
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5"
        >
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} variant={layout[i].v} className={layout[i].cls} sizes={layout[i].sizes} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ───────── Why choose us ───────── */
function WhyUs() {
  const reasons = [
    { icon: Tractor, title: 'Access to Essential Farming Equipment', text: 'Tractors, machinery, pumps, irrigation equipment and tools — the essentials of farm work, under one roof for enquiries.' },
    { icon: MessageSquareText, title: 'Convenient Equipment Rental Inquiries', text: 'A simple inquiry form and direct contact options make it easy to tell us what you need and when.' },
    { icon: Cog, title: 'Agricultural Machinery Solutions', text: 'We help you explore machinery suited to the stage of your crop cycle and the work you plan to do.' },
    { icon: PackageCheck, title: 'Equipment Supply Assistance', text: 'Prefer to own your equipment? We follow up on supply enquiries across equipment categories.' },
    { icon: HeartHandshake, title: 'Farmer-Focused Approach', text: 'Every conversation starts with your field, your crop and your timeline — not a one-size-fits-all answer.' },
    { icon: Sprout, title: 'Practical Farming Support', text: 'Straightforward guidance focused on what actually helps your farming operation move forward.' },
  ]
  return (
    <section className="section-y relative overflow-hidden bg-forest-900 text-cream-50">
      <div className="furrows absolute inset-0" aria-hidden="true" />
      <AmbientBlobs tone="dark" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading tone="light" eyebrow="Why Saikia Agriculture" title="Helping Agriculture *Move* Forward." description="We focus on one thing: making it easier for farmers and agricultural businesses to access the equipment they need." />
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[26px] lg:block">
              <Img id={img.redTractor} alt="Farmers driving a red tractor through a field in India" sizes="40vw" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />
            </div>
          </div>
        </div>
        <motion.ul variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <motion.li key={title} variants={fadeUp} className={i % 2 === 1 ? 'sm:translate-y-10' : ''}>
              <TiltCard className="h-full">
                <div className="group h-full rounded-[24px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-gold-400/40 hover:bg-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-leaf-400/15 text-leaf-300 transition-all duration-500 group-hover:-rotate-6 group-hover:bg-gold-400 group-hover:text-forest-950">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-sm font-bold text-white/25">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-lg font-bold leading-snug">{title}</h3>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-cream-50/60">{text}</p>
                </div>
              </TiltCard>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

/* ───────── How it works (GSAP progress line) ───────── */
function HowItWorks() {
  const ref = useRef(null)
  const lineRef = useRef(null)
  const steps = [
    { icon: Search, title: 'Explore Equipment', text: 'Browse our equipment categories and services to see what fits your work.' },
    { icon: ListChecks, title: 'Select Your Requirement', text: 'Note the equipment type, quantity, duration and the dates you need it.' },
    { icon: Send, title: 'Submit Your Inquiry', text: 'Send your details through the inquiry form in under two minutes.' },
    { icon: PhoneCall, title: 'Connect With Our Team', text: 'Our team reaches out using your preferred contact method to discuss next steps.' },
  ]

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 70%', scrub: 0.6 } },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={ref} className="section-y relative bg-cream-50">
      <div className="container-x">
        <SectionHeading align="center" eyebrow="How it works" title="From Requirement to *Conversation* in Four Steps." />
        <div className="relative mt-16 md:mt-20">
          {/* track + animated progress line (desktop) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-[2px] bg-forest-900/10 lg:block" aria-hidden="true">
            <div ref={lineRef} className="h-full origin-left bg-gradient-to-r from-emerald-600 to-gold-400" />
          </div>
          <motion.ol variants={stagger(0.15)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <motion.li key={title} variants={fadeUp} className="group relative text-center">
                <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-900 text-gold-400 ring-8 ring-cream-50 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-gold-400 font-display text-xs font-extrabold text-forest-950">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="mt-7 font-display text-6xl font-extrabold text-forest-900/[0.06]" aria-hidden="true">
                  0{i + 1}
                </p>
                <h3 className="-mt-9 font-display text-xl font-bold">{title}</h3>
                <p className="mx-auto mt-3 max-w-[260px] text-[0.93rem] leading-relaxed text-forest-900/65">{text}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
        <div className="mt-14 text-center">
          <Button to="/contact">Start your inquiry</Button>
        </div>
      </div>
    </section>
  )
}

/* ───────── Page ───────── */
const showcase = [
  { title: 'Tractors', tag: 'Rental', image: img.tractorPlough, alt: 'Tractor ploughing a field in India', text: 'Tractors for ploughing, tilling, haulage and seasonal field operations — enquire about rental options.', inquiry: 'tractor-rental' },
  { title: 'Water Pumps', tag: 'Water', image: img.dieselPump, alt: 'Diesel water pump on a farm', text: 'Pumping equipment for wells, borewells, canals and field water supply.', inquiry: 'water-pumps-motors' },
  { title: 'Motors', tag: 'Power', image: img.pumpHose, alt: 'Pump motor with hose equipment', text: 'Motors and pumping sets for agricultural use, discussed around your power availability.', inquiry: 'water-pumps-motors' },
  { title: 'Irrigation Equipment', tag: 'Irrigation', image: img.sprinklersField, alt: 'Sprinklers watering a crop field', text: 'Sprinklers, drip lines, pipes and fittings to distribute water efficiently.', inquiry: 'irrigation-equipment' },
  { title: 'Agricultural Machinery', tag: 'Machinery', image: img.combineSun, alt: 'Combine harvester working in sunlight', text: 'Machinery for land preparation, sowing, crop care and harvest-season work.', inquiry: 'agricultural-machinery' },
  { title: 'Farming Implements', tag: 'Implements', image: img.harrowing, alt: 'Harrowing implement preparing a field', text: 'Ploughs, harrows, cultivators and other implements for field preparation.', inquiry: 'farming-tools' },
]

const gallery = [
  { id: img.palakkad, tag: 'Landscape', caption: 'Paddy fields of Palakkad, Kerala', alt: 'Lush green paddy fields in Palakkad, Kerala', span: 'col-span-2 row-span-2' },
  { id: img.tractorEgrets, tag: 'Machinery', caption: 'Ploughing with egrets in tow', alt: 'Farmer on a tractor ploughing a field with egrets following' },
  { id: img.ricePlanting, tag: 'Farming', caption: 'Rice planting season', alt: 'Farmers planting rice seedlings in Maharajganj, India', span: 'row-span-2' },
  { id: img.sprinklerClose, tag: 'Irrigation', caption: 'Sprinkler irrigation', alt: 'Close-up of a sprinkler irrigating a field' },
  { id: img.harvestSunset, tag: 'Harvest', caption: 'Harvest at golden hour', alt: 'Harvesting in a paddy field at sunset', span: 'col-span-2' },
  { id: img.tractorSunlit, tag: 'Machinery', caption: 'Tractor in a sunlit field', alt: 'Tractor parked in a sunlit field' },
  { id: img.dripIrrigation, tag: 'Modern farming', caption: 'Drip irrigation lines', alt: 'Young plants watered by drip irrigation lines' },
  { id: img.fertilizer, tag: 'Farming', caption: 'Crop care in the field', alt: 'Farmer distributing fertiliser in a field in India', span: 'col-span-2' },
]

export default function Home() {
  useSEO({
    title: 'Agricultural Equipment, Machinery & Tractor Rental',
    description:
      'Saikia Agriculture India helps Indian farmers access tractor rentals, agricultural machinery, water pumps and motors, irrigation equipment and farming tools. Send your equipment inquiry today.',
    path: '/',
    image: px(img.tractorPlough, 1200),
  })

  return (
    <>
      <Hero />
      <Marquee
        items={['Agricultural Equipment', 'Tractor Rentals', 'Farm Machinery', 'Water Pumps', 'Irrigation Solutions', 'Farming Tools', 'Supporting Indian Farmers']}
      />
      <Intro />
      <Categories />
      <WhyUs />
      <EquipmentShowcase
        items={showcase}
        eyebrow="Equipment showcase"
        title="Built for the *Field.*"
        description="A look at the kinds of equipment you can enquire about. Availability and specifications are confirmed directly by our team."
      />
      <section className="section-y bg-cream-50">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="In the field" title="The Rhythm of Indian *Agriculture.*" />
            <p className="max-w-sm text-forest-900/60">From ploughing and planting to irrigation and harvest — the work our equipment categories are meant to support.</p>
          </div>
          <Gallery items={gallery} />
        </div>
      </section>
      <Marquee tone="gold" reverse duration={50} items={['Tractor Rental', 'Agricultural Machinery', 'Water Pumps & Motors', 'Irrigation Equipment', 'Farming Tools & Implements', 'Equipment Supply']} />
      <HowItWorks />
      <CTASection
        eyebrow="Ready when you are"
        title="Give Your Farming Operations the *Equipment* They Need."
        text="Explore agricultural equipment and connect with Saikia Agriculture India for your farming requirements."
        imageId={img.tractorGreen}
        imageAlt="Tractor ploughing a green field"
        primary={{ label: 'Enquire Now', to: '/contact' }}
        secondary={{ label: 'Explore Services', to: '/services' }}
      />
    </>
  )
}
