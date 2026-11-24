import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, MapPinned } from 'lucide-react'
import useSEO from '../hooks/useSEO'
import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'
import Img from '../components/Img'
import { siteConfig, PLACEHOLDER } from '../config/siteConfig'
import { img, px } from '../data/media'
import { fadeUp, stagger } from '../animations/motionVariants'

function InfoCard({ icon: Icon, label, value, href, note }) {
  const body = (
    <>
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf-100 text-emerald-600 transition-all duration-500 group-hover:-rotate-6 group-hover:bg-forest-900 group-hover:text-gold-400">
        <Icon className="h-5 w-5" />
      </span>
      <span className="mt-6 block font-display text-xs font-bold uppercase tracking-[0.2em] text-forest-900/45">{label}</span>
      {value ? (
        <span className="mt-2 block break-words font-display text-lg font-bold leading-snug text-forest-900">{value}</span>
      ) : (
        <span className="mt-2 block font-display text-lg font-bold italic text-forest-900/35">{PLACEHOLDER}</span>
      )}
      {note && <span className="mt-1 block text-sm text-forest-900/50">{note}</span>}
    </>
  )
  const cls =
    'group block h-full rounded-[24px] bg-white p-7 ring-1 ring-forest-900/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(13,43,31,0.35)]'
  return (
    <motion.li variants={fadeUp}>
      {value && href ? (
        <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
          {body}
        </a>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </motion.li>
  )
}

export default function Contact() {
  useSEO({
    title: 'Contact Us — Equipment Inquiry',
    description:
      'Contact Saikia Agriculture India for tractor rental, agricultural machinery, water pumps, irrigation equipment and farming tools. Submit your equipment inquiry online.',
    path: '/contact',
    image: px(img.fieldWorkers, 1200),
  })

  const { phone, email, address, hours, whatsapp } = siteConfig.contact
  const mapsSearch = address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : null

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Contact us"
        title="Let's Connect for Your Agricultural *Equipment* Needs."
        text="Tell us what equipment or machinery you need. Our team can assist you with your inquiry."
        imageId={img.fieldWorkers}
        imageAlt="Farmers working together in an agricultural field"
      />

      {/* Contact info */}
      <section className="relative z-10 -mt-14 pb-6 md:-mt-20">
        <div className="container-x">
          <motion.ul variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard icon={Phone} label="Phone Number" value={phone} href={phone && `tel:${phone.replace(/\s/g, '')}`} />
            <InfoCard icon={Mail} label="Email Address" value={email} href={email && `mailto:${email}`} />
            <InfoCard icon={MapPin} label="Business Location" value={address} href={mapsSearch} />
            <InfoCard icon={Clock} label="Business Hours" value={hours} />
          </motion.ul>
        </div>
      </section>

      {/* Form */}
      <section id="inquiry" className="section-y scroll-mt-24 bg-cream-100">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading eyebrow="Inquiry form" title="Tell Us What You *Need.*" description="The more detail you share — equipment, duration, location and timeline — the better we can help." titleClass="display-md" />
              <ul className="mt-8 space-y-4 text-[0.95rem] text-forest-900/70">
                {['Choose an inquiry type that matches your need', 'Describe the equipment and any specifications', 'Pick how you would like us to contact you'].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="font-display font-extrabold text-emerald-600">0{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ul>
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-display text-sm font-bold text-white transition hover:bg-emerald-500"
                >
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </a>
              )}
              <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[24px] bg-forest-800 lg:block">
                <Img id={img.irrigationPump} alt="Irrigation pump in green fields" sizes="30vw" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-y" aria-label="Location map">
        <div className="container-x">
          <SectionHeading eyebrow="Find us" title="Our *Location.*" titleClass="display-md" />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative mt-10 overflow-hidden rounded-[28px] bg-forest-900 ring-1 ring-forest-900/10"
          >
            {siteConfig.mapEmbedUrl ? (
              <iframe
                title={`${siteConfig.name} location on Google Maps`}
                src={siteConfig.mapEmbedUrl}
                className="block h-[420px] w-full border-0 md:h-[480px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <div className="furrows relative grid h-[360px] place-items-center p-8 text-center text-cream-50 md:h-[420px]">
                <div className="pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '28px 28px' }} />
                <div className="relative max-w-md">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-400 text-forest-950">
                    <MapPinned className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-bold">Map coming soon</h3>
                  <p className="mt-3 text-cream-50/65">
                    The business location map will appear here once the verified address is added. Until then, please use the inquiry form or contact details above.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <CTASection
        eyebrow="We're listening"
        title="Your Agricultural Equipment Requirements *Matter.*"
        imageId={img.harvestSunset}
        imageAlt="Paddy field harvest at sunset"
        primary={{ label: 'Send Your Inquiry', to: '/contact#inquiry' }}
      />
    </>
  )
}
