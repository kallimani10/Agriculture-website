import { useEffect, useState } from 'react'

export default function useMediaQuery(query) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false)
  const [matches, setMatches] = useState(get)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/** True on devices with a precise pointer (mouse / trackpad) that support hover. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')
