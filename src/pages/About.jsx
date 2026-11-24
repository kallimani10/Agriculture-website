import { motion } from 'framer-motion'
import { ShieldCheck, Lightbulb, Users, BadgeCheck, Accessibility, TrendingUp, Target, Eye, Quote } from 'lucide-react'
import useSEO from '../hooks/useSEO'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Marquee from '../components/Marquee'
import CTASection from '../components/CTASection'
import Button from '../components/Button'
import Img from '../components/Img'
import { ParallaxImage, TiltCard, AmbientBlobs } from '../components/Effects'
import { servicePageList } from '../data/services'
import { getIcon } from '../lib/icons'
import { img, px } from '../data/media'
import { fadeUp, slideLeft, slideRight, stagger, inView, ease } from '../animations/motionVariants'

const values = [
  { icon: ShieldCheck, title: 'Reliability', text: 'Clear communication and follow-through on every inquiry we receive.' },
  { icon: Lightbulb, title: 'Practical Solutions', text: 'Recommendations grounded in the real work happening on your field.' },
  { icon: Users, title: 'Customer Focus', text: 'Your crop, your land and your timeline shape every conversation.' },
  { icon: BadgeCheck, title: 'Quality', text: 'A commitment to equipment that is fit for demanding farm work.' },
  { icon: Accessibility, title: 'Accessibility', text: 'Making equipment easier to reach through rental and supply options.' },
  { icon: TrendingUp, title: 'Agricultural Development', text: 'Supporting a better-equipped and more efficient farming ecosystem.' },
]

const approach = [
  { title: 'Understanding equipment requirements', text: 'We start by listening — the work you plan, your field size, crop, location and timeline.' },
  { title: 'Exploring relevant equipment categories', text: 'Together we narrow down the categories and equipment types that suit the job.' },
  { title: 'Supporting rental and supply inquiries', text: 'Whether you want to rent for a season or purchase, we take your inquiry forward.' },
  { title: 'Making communication convenient', text: 'Reach us the way that suits you — phone, WhatsApp or email — and we respond accordingly.' },
  { title: 'Connecting you with suitable solutions', text: 'The goal is simple: the right equipment, matched to your farming requirement.' },
]

export default function About() {
  useSEO({
    title: 'About Us',
    description:
      'Learn about Saikia Agriculture India — an agricultural equipment rental and supply business helping farmers access tractors, machinery, water pumps, irrigation equipment and tools.',
    path: '/about',
    image: px(img.paddyPalms, 1200),
  })

  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About Saikia Agriculture India"
        title="Supporting Agriculture Through Better *Equipment* *Access.*"
        text="We help farmers and agricultural businesses find and access the equipment their work depends on."
        imageId={img.paddyPalms}
        imageAlt="Green rice fields beneath palm leaves in India"
      />

      {/* About — editorial two-column */}
      <section className="section-y relative overflow-hidden">
        <AmbientBlobs />
        <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow="What we do" title="Equipment Rental & Supply, Built Around the *Farmer.*" />
            <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={inView} className="lead mt-8 space-y-5 text-forest-900/75">
              <motion.p variants={fadeUp}>
                Saikia Agriculture India provides agricultural equipment and machinery solutions through rental and supply. Our focus is
                straightforward: help the people who farm get access to the equipment they need, when they need it.
              </motion.p>
              <motion.p variants={fadeUp}>
                Customers come to us with very practical questions — a tractor for land preparation, a pump for a new borewell, sprinklers
                for a vegetable plot, or implements for the coming season. We take each requirement as it is and help find a suitable way
                forward.
              </motion.p>
              <motion.p variants={fadeUp}>
                Every inquiry starts with understanding your field, your crop and your timeline, so that the conversation is about what
                genuinely helps your farming operation.
              </motion.p>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-10">
              <p className="font-display text-sm font-bold uppercase tracking-[0.18em] text-forest-900/45">Customers can inquire about</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {servicePageList.map((s) => {
                  const Icon = getIcon(s.icon)
                  return (
                    <li key={s.id} className="flex items-center gap-2 rounded-full border border-forest-900/10 bg-white px-4 py-2 text-sm font-medium text-forest-900/80 transition hover:border-emerald-600 hover:text-emerald-600">
                      <Icon className="h-4 w-4 text-emerald-600" /> {s.title}
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <ParallaxImage id={img.tractorCultivating} alt="Tractor cultivating a field" className="col-span-2 aspect-[16/10]" sizes="(min-width:1024px) 45vw, 100vw" />
              <ParallaxImage id={img.dripIrrigation} alt="Drip irrigation watering young plants" className="aspect-square" rounded="rounded-[22px]" sizes="25vw" amount={8} />
              <ParallaxImage id={img.harvestSmile} alt="Smiling farmer harvesting rice in a green field" className="aspect-square" rounded="rounded-[22px]" sizes="25vw" amount={8} />
            </div>
            <motion.figure
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: 0.3 }}
              className="relative -mt-10 ml-6 mr-6 rounded-2xl bg-forest-900 p-6 text-cream-50 shadow-2xl md:ml-12"
            >
              <Quote className="h-6 w-6 text-gold-400" aria-hidden="true" />
              <blockquote className="mt-3 font-display text-lg font-semibold leading-snug">
                The right equipment at the right time can change how a season goes. Making that access easier is what we work towards.
              </blockquote>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="relative overflow-hidden bg-forest-900 py-20 text-cream-50 md:py-28">
        <div className="furrows absolute inset-0" aria-hidden="true" />
        <div className="container-x relative grid gap-5 md:grid-cols-2">
          {[
            { icon: Target, label: 'Our Mission', text: 'To make essential agricultural equipment and machinery more accessible through practical rental and supply solutions.', image: img.tractorFarm, v: slideRight },
            { icon: Eye, label: 'Our Vision', text: 'To contribute to a more equipped and efficient agricultural ecosystem by supporting the people and businesses involved in farming.', image: img.keralaPaddy, v: slideLeft },
          ].map(({ icon: Icon, label, text, image, v }) => (
            <motion.article key={label} variants={v} initial="hidden" whileInView="show" viewport={inView} className="group relative isolate overflow-hidden rounded-[30px] border border-white/10 p-8 md:p-12">
              <Img id={image} alt="" sizes="50vw" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25 transition-all duration-[1.4s] group-hover:scale-110 group-hover:opacity-35" />
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-forest-950/80 to-forest-900/60" />
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-400 text-forest-950 transition-transform duration-500 group-hover:rotate-12">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-10 font-display text-sm font-bold uppercase tracking-[0.22em] text-leaf-300">{label}</h2>
              <p className="mt-4 font-display text-2xl font-bold leading-snug md:text-[2rem] md:leading-[1.2]">“{text}”</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Core values */}
      <section className="section-y bg-cream-100">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Our core values" title="What Guides *Every* Conversation." />
          <motion.ul variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ icon: Icon, title, text }, i) => (
              <motion.li key={title} variants={fadeUp}>
                <TiltCard className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-[24px] bg-white p-8 ring-1 ring-forest-900/5 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(13,43,31,0.35)]">
                    <span className="absolute -right-4 -top-6 font-display text-[7rem] font-extrabold leading-none text-forest-900/[0.04] transition-colors duration-500 group-hover:text-emerald-600/10" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <motion.span
                      whileHover={{ rotate: [0, -12, 10, 0], transition: { duration: 0.6 } }}
                      className="relative grid h-14 w-14 place-items-center rounded-2xl bg-leaf-100 text-emerald-600 transition-colors duration-500 group-hover:bg-forest-900 group-hover:text-gold-400"
                    >
                      <Icon className="h-6 w-6" />
                    </motion.span>
                    <h3 className="relative mt-7 font-display text-xl font-bold">{title}</h3>
                    <p className="relative mt-3 leading-relaxed text-forest-900/65">{text}</p>
                  </div>
                </TiltCard>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <Marquee tone="light" duration={55} items={['Reliability', 'Practical Solutions', 'Customer Focus', 'Quality', 'Accessibility', 'Agricultural Development']} />

      {/* Approach — journey */}
      <section className="section-y">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading eyebrow="Our approach" title="A Simple Journey From *Need* to Solution." description="How we work with every customer who reaches out." />
              <div className="relative mt-10 hidden aspect-[5/4] overflow-hidden rounded-[26px] lg:block">
                <Img id={img.machinerySales} alt="Customer discussing agricultural machinery" sizes="40vw" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
          <ol className="relative lg:col-span-7">
            <span className="absolute bottom-6 left-[27px] top-6 w-px bg-gradient-to-b from-emerald-600 via-leaf-400 to-gold-400" aria-hidden="true" />
            {approach.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease }}
                className="group relative flex gap-6 pb-10 last:pb-0"
              >
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-4 border-cream-50 bg-forest-900 font-display font-extrabold text-gold-400 transition-transform duration-500 group-hover:scale-110">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 rounded-[22px] border border-forest-900/10 bg-white p-6 transition-colors duration-500 group-hover:border-emerald-600/40 md:p-7">
                  <h3 className="font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-forest-900/65">{s.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
        <div className="container-x mt-16 flex justify-center">
          <Button to="/contact" variant="dark">
            Discuss your requirement
          </Button>
        </div>
      </section>

      <CTASection
        eyebrow="Work with us"
        title="Let's Build Better Farming *Possibilities* Together."
        imageId={img.palakkad}
        imageAlt="Green paddy fields in Kerala"
        primary={{ label: 'Explore Our Services', to: '/services' }}
        secondary={{ label: 'Contact Us', to: '/contact' }}
      />
    </>
  )
}
