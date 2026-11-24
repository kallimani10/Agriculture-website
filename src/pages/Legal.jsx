import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import useSEO from '../hooks/useSEO'
import { siteConfig } from '../config/siteConfig'

const content = {
  privacy: {
    title: 'Privacy Policy',
    path: '/privacy-policy',
    description: `Privacy Policy for ${siteConfig.name}.`,
  },
  terms: {
    title: 'Terms & Conditions',
    path: '/terms',
    description: `Terms and Conditions for ${siteConfig.name}.`,
  },
}

/**
 * PLACEHOLDER legal page. Replace the body below with the business's
 * reviewed Privacy Policy / Terms & Conditions text before launch.
 */
export default function Legal({ kind = 'privacy' }) {
  const c = content[kind]
  useSEO({ title: c.title, description: c.description, path: c.path })

  return (
    <section className="bg-cream-50 pb-24 pt-40 md:pt-48">
      <div className="container-x max-w-3xl">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-forest-900 text-gold-400">
          <FileText className="h-6 w-6" />
        </span>
        <h1 className="display-lg mt-8">{c.title}</h1>
        <div className="mt-8 rounded-2xl border border-gold-500/40 bg-gold-400/10 p-6 text-earth-800">
          <p className="font-semibold">This page is a placeholder.</p>
          <p className="mt-2 leading-relaxed">
            The official {c.title.toLowerCase()} for {siteConfig.name} will be published here. Content should be prepared and reviewed by
            the business before the website goes live.
          </p>
        </div>
        <p className="mt-8 text-forest-900/70">
          For any questions in the meantime, please{' '}
          <Link to="/contact" className="font-semibold text-emerald-600 underline underline-offset-4 hover:text-forest-900">
            contact us
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
