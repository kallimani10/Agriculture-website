import { siteConfig } from '../config/siteConfig'

const paths = {
  facebook: 'M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v1.9H8v3.2h2.6V21H14v-9.3h2.6l.4-3.2H14z',
  instagram:
    'M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21.9 8.1c-.1-1.6-.4-3-1.6-4.2S17.5 2.3 15.9 2.2C14.3 2.1 9.7 2.1 8.1 2.2 6.5 2.3 5.1 2.6 3.9 3.8S2.3 6.5 2.2 8.1c-.1 1.6-.1 6.2 0 7.8.1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.6.1 6.2.1 7.8 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-6.2 0-7.8zm-2.2 9.9a3.2 3.2 0 0 1-1.8 1.8c-1.3.5-4.3.4-5.9.4s-4.6.1-5.9-.4a3.2 3.2 0 0 1-1.8-1.8c-.5-1.3-.4-4.3-.4-5.9s-.1-4.6.4-5.9A3.2 3.2 0 0 1 6.1 4.4c1.3-.5 4.3-.4 5.9-.4s4.6-.1 5.9.4a3.2 3.2 0 0 1 1.8 1.8c.5 1.3.4 4.3.4 5.9s.1 4.6-.4 5.9z',
  youtube:
    'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z',
  x: 'M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z',
  linkedin:
    'M6.9 21H3.2V9h3.7v12zM5 7.4a2.1 2.1 0 1 1 0-4.3 2.1 2.1 0 0 1 0 4.3zM21 21h-3.7v-5.8c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1V21H9.4V9h3.5v1.6h.1c.5-.9 1.7-2 3.5-2 3.7 0 4.4 2.5 4.4 5.6V21z',
}

const labels = { facebook: 'Facebook', instagram: 'Instagram', youtube: 'YouTube', x: 'X (Twitter)', linkedin: 'LinkedIn' }

/** Renders only the social profiles that are configured in siteConfig. */
export default function SocialIcons({ className = '' }) {
  const entries = Object.entries(siteConfig.social).filter(([, url]) => url)
  if (!entries.length) {
    return <p className={`text-sm text-cream-50/45 ${className}`}>Social media profiles — to be updated</p>
  }
  return (
    <ul className={`flex gap-2 ${className}`}>
      {entries.map(([key, url]) => (
        <li key={key}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels[key]}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream-50/80 transition duration-300 hover:-translate-y-1 hover:border-gold-400 hover:bg-gold-400 hover:text-forest-950"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d={paths[key]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
