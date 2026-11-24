/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION — edit business details here.
 * ─────────────────────────────────────────────────────────────
 *  Anything set to `null` is treated as "not yet confirmed" and the
 *  website shows a clearly-marked placeholder instead of inventing data.
 *  Replace `null` with the real value once it has been verified.
 */
export const siteConfig = {
  name: 'Saikia Agriculture India',
  shortName: 'Saikia Agri',
  tagline: 'Agricultural Equipment • Machinery • Tractor Rental',
  url: 'https://saikiaagricultureindia.com',

  contact: {
    phone: null, // e.g. '+91 98765 43210'
    whatsapp: null, // digits only with country code, e.g. '919876543210'
    email: null, // e.g. 'info@saikiaagricultureindia.com'
    address: null, // full business address (single string)
    hours: null, // e.g. 'Mon – Sat, 9:00 AM – 6:00 PM'
  },

  /**
   * Google Maps embed URL — use ONLY a verified business location.
   * In Google Maps: Share → Embed a map → copy the `src` of the iframe.
   */
  mapEmbedUrl: null,

  /** Social links — leave null to hide an icon. */
  social: {
    facebook: null,
    instagram: null,
    youtube: null,
    x: null,
    linkedin: null,
  },

  /**
   * Inquiry form submission.
   * Set VITE_FORM_ENDPOINT in a `.env` file (see README) to a service that
   * accepts JSON POST requests — e.g. Formspree, Web3Forms, Getform, or your
   * own backend / serverless function. Until it is set, the form validates
   * input but will NOT pretend to send it.
   */
  form: {
    endpoint: import.meta.env.VITE_FORM_ENDPOINT || null,
    accessKey: import.meta.env.VITE_FORM_ACCESS_KEY || null, // optional (Web3Forms etc.)
  },
}

export const PLACEHOLDER = 'To be updated'

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
]
