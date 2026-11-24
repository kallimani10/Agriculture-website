import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import SocialIcons from './SocialIcons'
import { navLinks, siteConfig, PLACEHOLDER } from '../config/siteConfig'
import { servicePageList } from '../data/services'

function ContactLine({ icon: Icon, label, value, href }) {
  const content = value ? (
    <span className="text-cream-50/85">{value}</span>
  ) : (
    <span className="italic text-cream-50/40">
      {label}: {PLACEHOLDER}
    </span>
  )
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-leaf-400" aria-hidden="true" />
      {value && href ? (
        <a href={href} className="transition hover:text-gold-400">
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  )
}

export default function Footer() {
  const { phone, email, address, hours } = siteConfig.contact
  const year = new Date().getFullYear()

  return (
    <footer className="furrows relative overflow-hidden bg-forest-950 text-cream-50">
      {/* Oversized wordmark */}
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-extrabold leading-none tracking-[-0.06em] text-white/[0.025]">
        SAIKIA
      </div>

      <div className="container-x relative pb-10 pt-20 md:pt-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-cream-50/65">
              Saikia Agriculture India helps farmers and agricultural businesses access the equipment they need — from tractor
              rentals and farm machinery to water pumps, irrigation equipment and essential tools.
            </p>
            <SocialIcons className="mt-7" />
          </div>

          <nav aria-label="Quick links" className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-leaf-300">Explore</h3>
            <ul className="mt-6 space-y-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="group inline-flex items-center gap-1.5 text-cream-50/75 transition hover:text-cream-50">
                    {l.label}
                    <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Equipment categories" className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-leaf-300">Equipment</h3>
            <ul className="mt-6 space-y-3">
              {servicePageList.map((s) => (
                <li key={s.id}>
                  <Link to={`/services#${s.id}`} className="text-cream-50/75 transition hover:text-cream-50">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-leaf-300">Get in touch</h3>
            <ul className="mt-6 space-y-4 text-[0.95rem]">
              <ContactLine icon={Phone} label="Phone" value={phone} href={phone && `tel:${phone.replace(/\s/g, '')}`} />
              <ContactLine icon={Mail} label="Email" value={email} href={email && `mailto:${email}`} />
              <ContactLine icon={MapPin} label="Location" value={address} />
              <ContactLine icon={Clock} label="Hours" value={hours} />
            </ul>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 font-display text-sm font-bold text-forest-950 transition hover:bg-gold-500"
            >
              Send an inquiry <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-cream-50/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link to="/privacy-policy" className="transition hover:text-cream-50">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition hover:text-cream-50">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
