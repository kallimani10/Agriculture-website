import { useState } from 'react'
import { px, pxSrcSet } from '../data/media'

/**
 * Responsive, lazy-loaded Pexels image with a soft fade-in and a graceful
 * error fallback (a brand gradient is shown instead of a broken icon).
 */
export default function Img({ id, alt, className = '', sizes = '100vw', widths, eager = false, width = 1200 }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <span role="img" aria-label={alt} className={`block bg-gradient-to-br from-forest-800 to-emerald-600 ${className}`} />
  }

  return (
    <img
      src={px(id, width)}
      srcSet={pxSrcSet(id, widths)}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
    />
  )
}
